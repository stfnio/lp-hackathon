const express = require('express');
const router = express.Router();
const RewardModel = require('../models/reward');

router.get('/', (req, res) => {
  RewardModel.find().exec((err, rewards) => {
    if (err) throw err;
    res.status(200).json(rewards);
  });
});

module.exports = router;
