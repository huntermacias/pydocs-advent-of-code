import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3001;

// Code execution API endpoint
app.post('/run-code', (req: Request, res: Response) => {
    const { language, code } = req.body;

    // Check if the language is Python
    if (language === 'python') {
        // Write the code to a temporary file
        const tempFilePath = 'tempCode.py';
        fs.writeFileSync(tempFilePath, code);

        // Execute the Python script
        exec(`python ${tempFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send({ error: `Execution error: ${error.message}` });
            }
            res.send({ output: stdout, error: stderr });
        });
    } else {
        // If the language is not supported, send an error response
        res.status(400).send({ error: 'Unsupported language' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
