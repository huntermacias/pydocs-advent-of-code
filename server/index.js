const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3002;

// Code execution API endpoint
app.post('/run-code', (req, res) => {
    const { language, code } = req.body;

    if (language === 'python') {
        const tempFilePath = `D:\\builds\\pydocs\\tempCode-${uuidv4()}.py`; // Use an absolute path
        fs.writeFileSync(tempFilePath, code);

        console.log("File created at:", tempFilePath); // Log to verify
        console.log("Current working directory:", process.cwd()); // Log the CWD

        // Check if file exists
        if (fs.existsSync(tempFilePath)) {
            console.log("File exists, executing...");

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
            console.error("File not found:", tempFilePath);
            res.status(500).send({ error: 'Temporary file not found' });
        }
    } else {
        res.status(400).send({ error: 'Unsupported language' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
