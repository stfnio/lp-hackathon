const config = require('../config')
const jwt = require('jwt-simple');
const UserModel = require('../models/user')
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  token = req.header('Authorization');

  // decode JWT and process a user

  res.sendStatus(200);
});

module.exports = router;