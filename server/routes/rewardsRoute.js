const express = require('express');
const router = express.Router();
const RewardModel = require('../models/reward');

router.get('/', (req, res) => {
  req.io.sockets.emit('update', 'message'); 
  RewardModel.find()
    .then(rewards => {
      res.status(200).json(rewards);
    })
    .catch(err => {
      throw err;
    });
});

router.get('/:id', (req, res) => {
  RewardModel.findOne({ _id: req.params.id })
    .then(reward => {
      res.status(200).json(reward);
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
