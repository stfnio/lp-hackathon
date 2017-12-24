const UserModel = require('../models/user');
const config = require('../config');
const jwt = require('jwt-simple');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (token) {
    const payload = jwt.decode(token, config.GOOGLE_API_SECRET);

    UserModel.findOne({ email: payload.email })
      .then(user => {
        if (user) {
          res.locals.user = user;
          return next();
        } else {
          res.sendStatus(403);
        }
      })
      .catch(err => {
        throw err;
      });
  } else {
    res.sendStatus(403);
  }
};
