// pages/api/challengeSolvers/[challengeId].ts
import { db } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const challengeId = req.query.challengeId as string;

  try {
    const solvers = await db.completedChallenge.findMany({
      where: { challengeId },
      include: { user: true },
    });

    res.status(200).json(solvers);
  } catch (error) {
    console.error('Error fetching challenge solvers:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
}
