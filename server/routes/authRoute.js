const config = require('../config');
const jwt = require('jwt-simple');
const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', function (req, res){
    givenToken = req.header('Authorization');
    var decodedToken = jwt.decode(givenToken, config.GOOGLE_API_SECRET, true);

    UserModel.findOne({ email: decodedToken.email}).exec(function(err, user) {
        if (err) throw err;
        if (user) {
            user.token = givenToken;
            user.save(function(err) {
                if (err) throw err;
            });
            res.set('Content-Type', 'application/json');
            res.status(200).send(user);
        } else {
            var user = new UserModel({ email: decodedToken.email, name: decodedToken.name, picture: decodedToken.picture, balance: 0, token: givenToken});
            user.save(function(err) {
                if (err) throw err;
            })
            res.set('Content-Type', 'application/json');
            res.status(201).send(user);
        }
    });
});

module.exports = router;