import { db } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, challengeId } = req.body;

  try {
    // Check if the challenge is already completed by this user
    const existingRecord = await db.completedChallenge.findFirst({
      where: {
        userId: userId,
        challengeId: challengeId,
      },
    });

    if (existingRecord) {
      return res.status(409).json({ message: 'Challenge already completed by this user' });
    }
    

    // Insert a new solved problem record into the database
    const completedChallenge = await db.completedChallenge.create({
      data: {
        userId,
        challengeId,
      },
      include: {
        challenge: true,
      },
    });

    res.status(200).json({ 
      message: 'Solution recorded successfully',
      challenge: {
        id: challengeId,
        title: completedChallenge.challenge?.title,
        description: completedChallenge.challenge?.description
      }
    });
  } catch (error) {
    console.error('Error recording solution:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      details: error || 'An unexpected error occurred'
    });
  }
}
