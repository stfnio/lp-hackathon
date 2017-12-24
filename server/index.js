const express = require('express');
const path = require('path');
const config = require('./config');
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
const authRequired = require('./middleware/authRequired');
const adminRequired = require('./middleware/adminRequired');
const managerRequired = require('./middleware/managerRequired');
const app = express();

const mongoose = require('mongoose');
const mongoDB =
  'mongodb://heroku_ls71pk2d:mru8v2efleiq8e8auncsblsbdi@ds159776.mlab.com:59776/heroku_ls71pk2d';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const PORT = process.env.PORT || 5000;

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
app.use('/api/groups', adminRequired, groupsRoute);
app.use('/api/users', adminRequired, usersRoute);

app.get('/images/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'images/', req.params.id));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
