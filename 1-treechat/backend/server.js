const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/chat', (req, res) => {
  const { modelId, message } = req.body;
  const apiKey = req.headers['x-api-key'];

  // TODO: Implement AI chat logic here
  const response = `AI Response: Model ID: ${modelId}, Message: ${message}, API Key: ${apiKey}`;

  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
