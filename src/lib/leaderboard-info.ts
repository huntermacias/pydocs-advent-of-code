import { db } from '@/lib/db';

export const getLeaderboardInfo = async () => {
    // Get all users with their solved problems
    const usersWithSolvedProblems = await db.user.findMany({
        select: {
            id: true,
            username: true,
            imageUrl: true, // Including imageUrl if you want to display user's image
            solvedProblems: {
                select: {
                    id: true // You only need to select 'id' or any single field for counting
                }
            }
        }
    });

    // Add count and rank information
    const leaderboard = usersWithSolvedProblems.map(user => ({
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
        solvedProblemsCount: user.solvedProblems.length
    }))
    .sort((a, b) => b.solvedProblemsCount - a.solvedProblemsCount) // Sort by solvedProblemsCount in descending order
    .map((user, index) => ({
        ...user,
        rank: index + 1 // Assign rank based on sorted order
    }));

    return leaderboard;
}
