// // pages/api/userSolvedChallenges/[userId].ts
// import { PrismaClient } from '@prisma/client';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const userId = req.query.userId as string;

//   try {
//     const solvedChallenges = await prisma.completedChallenge.findMany({
//       where: { userId },
//       include: { challenge: true },
//     });

//     res.status(200).json(solvedChallenges);
//   } catch (error) {
//     console.error('Error fetching solved challenges:', error);
//     res.status(500).json({ error: 'Internal Server Error', details: error });
//   }
// }
