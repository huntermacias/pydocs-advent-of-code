import { db } from "./db";
  

export const getLeaderboardInfo = async () => {
    try {
      const users = await db.user.findMany({
        select: {
          id: true,
          username: true,
          completedChallenges: { select: { id: true } }
        }
      });
  
      const leaderboard = users.map(user => ({
        id: user.id,
        username: user.username,
        completedCount: user.completedChallenges.length
      })).sort((a, b) => b.completedCount - a.completedCount);
  
      return leaderboard;
    } catch (error) {
      console.error('Error fetching leaderboard info:', error);
      throw error; // Or handle error as needed
    }
  };
  
  


