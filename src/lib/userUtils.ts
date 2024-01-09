import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

// Function to get user by external user ID
export const getUserByExternalId = async (externalUserId: string) => {
    const self = await currentUser();
    if (!self) {
        throw new Error("User not found");
    }

    const user = await db.user.findUnique({
        where: { externalUserId: self.id },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};


// Function to add a completed challenge to a user
export const addSolvedProblem = async (userId: string, challengeId: string) => {
  try {
    // Create a new entry in the CompletedChallenge table
    const completedChallenge = await db.completedChallenge.create({
      data: {
        userId, // Reference to the User who completed the challenge
        challengeId, // Reference to the Challenge that was completed
        completedAt: new Date() // Timestamp of completion
      }
    });

    console.log('Completed Challenge:', completedChallenge);
    return completedChallenge;
  } catch (error) {
    console.error('Error adding completed challenge:', error);
    throw error; // Propagate error for further handling
  }
};





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
  
  


