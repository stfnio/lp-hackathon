const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  UserModel.update(
    { _id: res.locals.user._id },
    { isReady: !res.locals.user.isReady },
    err => {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

module.exports = router;
