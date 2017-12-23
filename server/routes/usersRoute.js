const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

router.get('/', (req, res) => {
  UserModel.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
