const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
// const { addSolvedProblem } = require('@/lib/userUtils');
// const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
// CORS configuration
const corsOptions = {
    origin: ['https://louse-harmless-stag.ngrok-free.app', 'http://localhost:3000'], // Add localhost to the list
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  
  
  app.use(cors(corsOptions));

const port = 3002;

// Code execution API endpoint
app.post('/run-code', (req, res) => {
    const { language, code } = req.body;

    if (language === 'python') {
        const tempFilePath = `D:\\builds\\pydocs\\tempCode.py`; // Use an absolute path
        fs.writeFileSync(tempFilePath, code);

        // console.log("File created at:", tempFilePath); // Log to verify
        // console.log("Current working directory:", process.cwd()); // Log the CWD

        // Check if file exists
        if (fs.existsSync(tempFilePath)) {
            // console.log("File exists, executing...");

            exec(`python "${tempFilePath}"`, (error, stdout, stderr) => { // Added quotes around file path
                if (error) {
                    console.error(`exec error: ${error}`);
                    return res.status(500).send({ error: `Execution error: ${error.message}` });
                }

                res.send({ output: stdout, error: stderr });

                // Delete the file after execution
                fs.unlinkSync(tempFilePath);
            });
        } else {
            // console.error("File not found:", tempFilePath);
            res.status(500).send({ error: 'Temporary file not found' });
        }
    } else {
        res.status(400).send({ error: 'Unsupported language' });
    }
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
