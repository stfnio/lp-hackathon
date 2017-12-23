const UserModel = require("../models/user");
const config = require("../config");
const jwt = require("jwt-simple");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
console.log(token)
  if (token) {
    const payload = jwt.decode(token, config.GOOGLE_API_SECRET);

    UserModel.findOne({ email: payload.email }).exec((err, user) => {
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
};
