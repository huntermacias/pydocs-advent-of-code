"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

type TestCase = {
  input: string;
  output: string;
};

type ChallengeProps = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topics: { name: string }[];
  hints: string[];
  test_cases: TestCase[];
  isSolved: boolean; // Added field to track if the challenge is solved
};

type CodingChallengesProps = {
  challenges: ChallengeProps[];
  solvedChallenges: { challengeId: string }[]; // You would pass only the IDs of solved challenges for simplicity
};

const CodingChallenges = ({
  challenges,
  solvedChallenges,
}: CodingChallengesProps) => {
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] =
    useState<ChallengeProps | null>(null);

  // Prepare the challenges data by marking them as solved or not
  const preparedChallenges = challenges.map((challenge) => ({
    ...challenge,
    isSolved: solvedChallenges.some(
      (solved) => solved.challengeId === challenge.id
    ),
  }));

  const handleAcceptChallenge = (challenge: ChallengeProps) => {
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
            <TableHead>Solved</TableHead> {/* Added column for solved status */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {preparedChallenges.map((challenge, index) => (
            <TableRow key={index}>
              <TableCell>{challenge.title}</TableCell>
              <TableCell>{challenge.difficulty}</TableCell>
              <TableCell>
                {challenge.topics.map((topic) => topic.name).join(", ")}
              </TableCell>
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
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="sexyNightWolf">Close</Button>
                      </DialogClose>
                      <Button
                        variant="sexyNightWolf"
                        onClick={() => handleAcceptChallenge(challenge)}
                      >
                        {challenge.isSolved
                          ? "Revisit Challenge"
                          : "Solve Challenge"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    challenge.isSolved ? "nightWolfGreen" : "nightWolfRed"
                  }
                >
                  {challenge.isSolved ? "Solved" : "Unsolved"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CodingChallenges;
