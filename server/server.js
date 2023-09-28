const express = require("express");
const cors = require("cors");
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ "user": "Mohammad Rabbani", "id": 1 });
});

app.post('/predict', async (req, res) => {
  try {
    const { age, distance, nos } = req.body;

    if (age === undefined) {
      return res.status(400).json({ error: 'Missing input data' });
    }

    const pythonProcess = spawn('python', ['python_logic.py', age, distance, nos]);
    let result = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        const parsedResult = JSON.parse(result);
        console.log(parsedResult);
        res.json(parsedResult);
        console.log(parsedResult)

      } else {
        res.status(500).json({ error: `Python process exited with code ${code}`, stderr: errorOutput });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
