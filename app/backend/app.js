// app.js
const express = require('express');
const { addNumbers } = require('./utils');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Sonar CI/CD project!');
});

app.get('/add', (req, res) => {
  const sum = addNumbers(5, 3);
  res.json({ sum });
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
