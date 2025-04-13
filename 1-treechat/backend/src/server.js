const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(' ../frontend/build'));

app.get('/', (req, res) => {
  res.send('1-TreeChat Server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
