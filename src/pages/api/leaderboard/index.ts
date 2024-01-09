// // pages/api/leaderboard.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Fetch users and their solved problems count
// const leaderboardData = await prisma.user.findMany({
// 	select: {
// 		id: true,
// 		username: true,
// 		imageUrl: true,
// 		completedChallenges: true // Replace with the actual field from your database
// 	},
// 	orderBy: {
// 		completedChallenges: {
// 			_count: 'desc' // Fix the property name to _count
// 		}
// 	}
// });

// res.status(200).json(leaderboardData);
//   } catch (error) {
//     console.error('Error fetching leaderboard data:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
