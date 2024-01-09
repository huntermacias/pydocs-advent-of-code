// pages/api/challenges/index.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch all challenges from the database
    const challenges = await prisma.challenge.findMany({
      include: {
        topics: true,
        testCases: true,
        // completions: true
        // Add other relations you want to include
      },
      
    });

   
    if (challenges.length > 0) {
      res.status(200).json(challenges);
    } else {
      res.status(404).json({ message: 'No challenges found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
