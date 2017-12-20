const express = require('express');
const path = require('path');
const config = require('./config')
const UserModel = require('./models/user');
const cors = require('cors')

const app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://heroku_ls71pk2d:mru8v2efleiq8e8auncsblsbdi@ds159776.mlab.com:59776/heroku_ls71pk2d';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const PORT = process.env.PORT || 5000;

const authRoute = require('./routes/authRoute');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRoute);

app.use(function (req, res, next) {
  if (req.originalUrl === '/' || req.originalUrl === '/auth' || req.originalUrl.startsWith('/static')) {
    return next();
  } else {
    var givenToken = req.header('Authorization');
    if (givenToken) {
      UserModel.findOne({token: givenToken}).exec(function (err, user) {
        if (err) throw err;
        if (user) {
          return next();
        } else {
          res.sendStatus(403);
        }
      });
    } else {
      res.sendStatus(403);
    }
  }
});

app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));