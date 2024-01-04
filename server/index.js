const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3001;

// Code execution API endpoint
app.post('/run-code', (req, res) => {
    const { language, code } = req.body;

    // Check if the language is Python
    if (language === 'python') {
        // Write the code to a temporary file
        const tempFilePath = `tempCode-${uuidv4()}.py`;
        fs.writeFileSync(tempFilePath, code);

        // Execute the Python script
        exec(`python ${tempFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send({ error: `Execution error: ${error.message}` });
            }
            res.send({ output: stdout, error: stderr });
        });
		
        // Delete the temporary file
        fs.unlink(tempFilePath, (err) => {
            if (err) console.error(`Error deleting temp file: ${err}`);
        });
    } else {
        // If the language is not supported, send an error response
        res.status(400).send({ error: 'Unsupported language' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});