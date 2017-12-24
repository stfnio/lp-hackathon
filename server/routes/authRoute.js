const jwt = require('jwt-simple');
const jws = require('jws-jwk');
const axios = require('axios');
const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

let jwk;

router.post('/', (req, res) => {
  token = req.header('Authorization');
  if (!token) res.status(404).send('The token is missing');

  if (jwk) {
    handleAuth(token, res);
  } else {
    axios
      .get('https://accounts.google.com/.well-known/openid-configuration')
      .then(response => {
        axios.get(response.data.jwks_uri).then(response => {
          jwk = response.data;
          handleAuth(token, res);
        });
      });
  }
});

function handleAuth(token, res) {
  jws.verify(token, jwk);
  payload = jwt.decode(token, '', true);

  UserModel.findOne({
    email: payload.email
  }).exec((err, user) => {
    if (err) throw err;

    if (user) {
      res
        .status(200)
        .json({ token: jwt.encode(user, process.env.GOOGLE_API_SECRET) });
    } else {
      const user = new UserModel({
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      });
      user.save(err => {
        if (err) throw err;
      });

      res
        .status(201)
        .json({ token: jwt.encode(user, process.env.GOOGLE_API_SECRET) });
    }
  });
}

module.exports = router;
