// pages/api/leaderboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch users along with the count of their solved challenges
    const leaderboardData = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        imageUrl: true,
        completedChallenges: {
          select: {
            id: true // Selects only the ID to count the number of solved challenges
          }
        }
      }
    });

    // Calculate solved problems count for each user
    const leaderboard = leaderboardData.map(user => ({
      ...user,
      solvedProblemsCount: user.completedChallenges.length
    })).sort((a, b) => b.solvedProblemsCount - a.solvedProblemsCount); // Sorting by solved problems count in descending order

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
