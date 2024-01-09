// pages/api/challenges/[title].ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const title = Array.isArray(req.query.title) ? req.query.title[0] : req.query.title;

  // Make sure the title is a string
  if (typeof title !== 'string') {
    return res.status(400).json({ message: "Title must be a string" });
  }

  try {
    // Fetch challenge data from the database based on the title
    const challenge = await prisma.challenge.findFirst({
      where: { title },
      include: {
        topics: true,
        testCases: true,
        completions: {
          include: {
            challenge: true,
          },
        },
      },
    });
    // console.log('ch', challenge);


    if (challenge) {
      res.status(200).json(challenge);
    } else {
      res.status(404).json({ message: `Challenge with title '${title}' not found.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
