import Image from "next/image";
import React, { useState, useEffect } from "react";

type User = {
  id: string;
  username: string;
  image_url: string;
  solvedProblemsCount: number;
};

const getRandomAvatar = (username: string) => {
  // Use username or any unique user attribute to generate a random avatar
  return `https://api.multiavatar.com/${username}.svg`;
};

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-dark-600 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl text-yellow-300 font-bold mb-6">Leaderboard</h1>
      <div className="w-full max-w-4xl">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center p-4 mb-4 ${
              index % 2 === 0 ? "bg-dark-500" : "bg-dark-700"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-yellow-500 text-2xl font-bold">
                {index + 1}
              </div>
              <Image
                src={getRandomAvatar(user.username)}
                alt={user.username}
                width={48} // Updated size to match the className
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="text-yellow-200 font-semibold">
                {user.username}
              </div>
              <div className="text-gray-400">
                Solved Problems: {user.solvedProblemsCount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
