const express = require('express');
const app = express();
const port = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Placeholder for chat tree and configurations
const chatTree = {};
const userConfigs = {};

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});