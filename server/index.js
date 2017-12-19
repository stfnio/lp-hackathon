const express = require('express');
const path = require('path');
const config = require('./config')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

const authRoute = require('./routes/authRoute');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRoute);

app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));