import React from 'react';

type ChallengeInfo = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  createdAt: string;
  // Add other fields from the challenge object if necessary
};

type SolvedChallenge = {
  challenge: ChallengeInfo;
  challengeId: string;
  completedAt: string;
  id: string;
  userId: string;
};

type SolvedChallengesProps = {
  solvedChallenges: SolvedChallenge[];
};

const SolvedChallenges = ({ solvedChallenges }: SolvedChallengesProps) => {
  return (
    <section className="mb-10 solved-challenges-section">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-300">
        Challenges You Have Conquered
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {solvedChallenges.map((solved, index) => (
          <div key={index} className="bg-[#1E293B] rounded-lg shadow-lg p-4 border border-gray-600 hover:bg-[#334155] transition-all duration-300">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">{solved.challenge.title}</h3>
            {/* <p className="text-gray-300 challenge-description">{solved.challenge.description}</p> */}
            <p className="text-sm text-gray-400">Completed on: {new Date(solved.completedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolvedChallenges;
