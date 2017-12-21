const express = require('express');
const router = express.Router();
const RewardModel = require('../models/reward');

router.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    RewardModel.find().exec(function(err, rewards) {
        if (err) throw err;
        res.status(200).send(rewards);
    });
});

module.exports = router;