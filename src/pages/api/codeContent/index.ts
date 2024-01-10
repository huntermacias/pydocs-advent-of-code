// src/pages/api/codeContent.ts

import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileName = req.query.fileName as string;
  // console.log('File name:', fileName);
  if (!fileName) {
    return res.status(400).json({ error: 'File name is missing' });
  }

  // Include `src` in the file path
  const filePath = path.join(process.cwd(), 'src/pages/concepts/', decodeURIComponent(fileName));
  // console.log('Resolved file path:', filePath);

  try {
    if (fs.existsSync(filePath)) {
      const code = fs.readFileSync(filePath, 'utf-8');
      res.status(200).json({ code });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
