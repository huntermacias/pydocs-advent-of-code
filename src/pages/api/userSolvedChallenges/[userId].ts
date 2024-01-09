// pages/api/userSolvedChallenges/[userId].ts
import { db } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;

  try {
    const solvedChallenges = await db.completedChallenge.findMany({
      where: { userId },
      include: { challenge: true },
    });

    res.status(200).json(solvedChallenges);
  } catch (error) {
    console.error('Error fetching solved challenges:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
}
