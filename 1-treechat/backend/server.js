const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to handle chat requests
app.post('/chat', (req, res) => {
  const { modelId, message } = req.body;
  const apiKey = req.headers['x-api-key'];

  // Placeholder for AI chat logic
  const response = `AI Response: Model ID: ${modelId}, Message: ${message}, API Key: ${apiKey}`;

  res.json({ response });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});