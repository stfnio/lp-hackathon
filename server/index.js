require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const UserModel = require('./models/user');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const rewardsRoute = require('./routes/rewardsRoute');
const transactionsRoute = require('./routes/transactionsRoute');
const groupsRoute = require('./routes/groupsRoute');
const usersRoute = require('./routes/usersRoute');
const readyRoute = require('./routes/readyRoute');
const gameRoute = require('./routes/gameRoute');
const stationsRoute = require('./routes/stationsRoute');
const authRequired = require('./middleware/authRequired');
const adminRequired = require('./middleware/adminRequired');
const managerRequired = require('./middleware/managerRequired');
const app = express();
const PORT = process.env.PORT || 5000;
const server = require('http').Server(app);
const io = require('socket.io');

server.listen(PORT);
console.log(`Listening on port ${PORT}`)

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use('/auth', authRoute);

app.use('/api/', authRequired, bodyParser.json(), morgan('tiny'));
app.use('/api/ready', readyRoute);
app.use('/api/rewards', rewardsRoute);
app.use('/api/game', gameRoute);
app.use('/api/transactions', managerRequired, transactionsRoute);
app.use('/api/stations', managerRequired, stationsRoute);
app.use('/api/groups', managerRequired, groupsRoute);
app.use('/api/users', usersRoute);

app.get('/images/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'images/', req.params.id));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

