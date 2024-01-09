import { db } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, challengeId } = req.body;

  try {
    // Insert a new solved problem record into the database
    const completedChallenge = await db.completedChallenge.create({
      data: {
        userId,       // Ensure this is the correct user ID
        challengeId,  // Ensure this is the correct challenge ID
      },
      include: {
        challenge: true, // Include the related challenge details
      },
    });

    // Extract challenge details
    const { title, description } = completedChallenge.challenge;

    res.status(200).json({ 
      message: 'Solution recorded successfully',
      challenge: {
        id: challengeId,
        title,
        description
      }
    });
  } catch (error) {
    console.error('Error recording solution:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error || 'An unexpected error occurred' });
  }
}
