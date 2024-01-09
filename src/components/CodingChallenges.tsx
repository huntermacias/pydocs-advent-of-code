'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

type TestCase = {
  input: string;
  output: string;
};

type ChallengeProps = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topics: { name: string }[]; // Update the type declaration of the topics property
  hints: string[];
  test_cases: TestCase[];
};

type CodingChallengesProps = {
  challenges: ChallengeProps[];
};

const CodingChallenges = ({ challenges }: CodingChallengesProps) => {
  const router = useRouter();

  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeProps | null>(null);


  const handleAcceptChallenge = (challenge:ChallengeProps) => {
	  // Redirect to the dynamic page
	  router.push(`/advent-challenge/${encodeURIComponent(challenge.title)}`);
	};

  return (
    <section>
      <Table>
        <TableCaption>Pythonic Quests: Code and Conquer</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Topics</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {challenges.map((challenge, index) => (
            <TableRow key={index}>
              <TableCell>{challenge.title}</TableCell>
              <TableCell>{challenge.difficulty}</TableCell>
              <TableCell>{challenge.topics.map(topic => topic.name).join(', ')}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="sexyNightWolf">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{challenge.title}</DialogTitle>
                      <DialogDescription>
                        {challenge.description}
                      </DialogDescription>
                    </DialogHeader>
                    {/* Display other challenge details like difficulty, topics, hints, etc. */}
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="sexyNightWolf">Close</Button>
                      </DialogClose>
                      {/* Button to navigate to challenge-solving page */}
                      <Button variant="sexyNightWolf" onClick={() => handleAcceptChallenge(challenge)}>
                        Solve Challenge
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CodingChallenges;
