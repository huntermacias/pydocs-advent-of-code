const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const { addSolvedProblem } = require('@/lib/userUtils');
// const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
// CORS configuration
const corsOptions = {
    origin: ['https://louse-harmless-stag.ngrok-free.app', 'http://localhost:3000',
    'https://pydocs-aoc.vercel.app'
], // Add localhost to the list
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  
  
  app.use(cors(corsOptions));

const port = 3002;

// Code execution API endpoint
app.post('/run-code', (req, res) => {
    console.log('running code')
    const { language, code } = req.body;

    if (language === 'python') {
        const tempFilePath = `tempCode.py`;
        fs.writeFileSync(tempFilePath, code);
        console.log('running docker')
        // Using Docker to run the Python code in an isolated environment
        const dockerCommand = `docker run --rm -v ${__dirname}:/app python:3 python /app/${tempFilePath}`;

        exec(dockerCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send({ error: `Execution error: ${error.message}` });
            }

            res.send({ output: stdout, error: stderr });

            // Delete the file after execution
            fs.unlinkSync(tempFilePath);
        });
    } else {
        res.status(400).send({ error: 'Unsupported language' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// New endpoint for recording solutions
app.post('/api/recordSolution', async (req, res) => {
    const { userId, problemId } = req.body;

    try {
        console.log('Attempting to record solution:', { userId, problemId });
        await addSolvedProblem(userId, problemId);
        res.json({ message: 'Solution recorded successfully' });
    } catch (error) {
        console.error('Error recording solution:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
