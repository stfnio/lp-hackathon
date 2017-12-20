const UserModel = require('../models/user') 
var authLogic = function(req, res, next) {
    const givenToken = req.header('Authorization');

    if (givenToken) {
      UserModel.findOne({token: givenToken}).exec((err, user) => {
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

module.exports = authLogic;