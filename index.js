//index.js
const express = require('express');
const bodyParser = require('body-parser');
const { scheduleTask } = require('./schedular');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to schedule a task
app.post('/schedule-task', async (req, res) => {
  try {
    const { name, data, delay } = req.body;
    await scheduleTask(name, data, delay);
    res.status(200).json({ message: 'Task scheduled' });
  } catch (error) {
    console.error(`Error scheduling task: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
