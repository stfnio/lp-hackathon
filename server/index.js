const express = require('express');
const path = require('path');
const config = require('./config')

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// Auth
app.post('/auth', (req, res) => {
  token = req.header('Authorization');

  console.log(token);

  res.sendStatus(200);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));