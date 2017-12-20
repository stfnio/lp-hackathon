const config = require('../config');
const jwt = require('jwt-simple');
const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  givenToken = req.header('Authorization');
  if (!givenToken) res.status(404).send('The token is missing');
  const decodedToken = jwt.decode(givenToken, config.GOOGLE_API_SECRET, true);

  UserModel.findOne({
    email: decodedToken.email
  }).exec((err, user) => {
    if (err) throw err;

    if (user) {
      user.token = givenToken;

      user.save(err => {
        if (err) throw err;
      });

      res.set('Content-Type', 'application/json');
      res.status(200).send(user);
    } else {
      const user = new UserModel({
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        balance: 0,
        token: givenToken
      });

      user.save(err => {
        if (err) throw err;
      })

      res.set('Content-Type', 'application/json');
      res.status(201).send(user);
    }
  });
});

module.exports = router;