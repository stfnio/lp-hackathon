const express = require('express');
const router = express.Router();
const TransactionModel = require('../models/transaction');
const UserModel = require('../models/user');

router.post('/', (req, res) => {
  TransactionModel.find()
    .then(transaction => {
      res.sendStatus(200);
    })
    .catch(err => {
      throw err;
    });
});

router.post('/fromValidator', (req, res) => {
  UserModel.findOne({ _id: req.body.user })
    .exec()
    .then(user => {
      res.sendStatus(200);
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
