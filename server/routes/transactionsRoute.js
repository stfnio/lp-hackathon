const express = require('express');
const router = express.Router();
const TransactionModel = require('../models/transaction');
const UserModel = require('../models/user');
const RewardModel = require('../models/reward');

router.post('/', (req, res) => {
  UserModel.findOne({ _id: req.body.user })
    .then(user => {
      const success = handleBalanceOperation(
        user,
        req.body.operationType,
        req.body.amount
      );
      if (success) {
        res.sendStatus(201);
      } else {
        res.status(400).json({ error: 1 });
      }
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
      const success = handleBalanceOperation(
        user,
        'Debit',
        reward.price,
        reward
      );
      if (success) {
        res.status(201).json({ message: 'Выдайте подарок ' + reward.title });
      } else {
        res.status(400).json({ error: 1 });
      }
    })
    .catch(err => {
      throw err;
    });
});

function handleBalanceOperation(user, type, amount, reward) {
  switch (type) {
    case 'Accrual':
      const tr = new TransactionModel({
        user: user._id,
        operationType: 'Accrual',
        amount: amount
      });
      tr.save(err => {
        if (err) throw err;
      });
      user.balance = user.balance + amount;
      user.save(err => {
        if (err) throw err;
      });
      return true;
    case 'Debit':
      if (user.balance >= amount) {
        const tr = new TransactionModel({
          user: user._id,
          operationType: 'Debit',
          amount: amount,
          reward: reward ? reward._id : null
        });
        tr.save(err => {
          if (err) throw err;
        });
        user.balance = user.balance - amount;
        user.save(err => {
          if (err) throw err;
        });
        return true;
      } else {
        return false;
      }
  }
}

module.exports = router;
