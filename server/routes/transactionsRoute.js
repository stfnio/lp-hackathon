const express = require('express');
const router = express.Router();
const TransactionModel = require('../models/transaction');
const UserModel = require('../models/user');
const RewardModel = require('../models/reward');

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
  Promise.all([
    UserModel.findOne({ _id: req.body.user }),
    RewardModel.findOne({ _id: req.body.reward })
  ])
    .then(([user, reward]) => {
      console.log(reward.price);
      if (user.balance >= reward.price) {
        const tr = new TransactionModel({
          user: req.body.user,
          operationType: 'Debit',
          amount: reward.price,
          reward: req.body.reward
        });
        tr.save(err => {
          if (err) throw err;
        });
        user.balance = user.balance - reward.price;
        user.save(err => {
          if (err) throw err;
        });
        res.status(200).json({ message: 'Выдайте подарок ' + reward.title });
      } else {
        res.status(400).json({ error: 1 });
      }
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
