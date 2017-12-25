const express = require('express');
const router = express.Router();
const StationModel = require('../models/station');

router.get('/:id', (req, res) => {
  StationModel.findOne({ _id: req.params.id })
    .then(station => {
      res.status(200).json(station);
    })
    .catch(err => {
      throw err;
    });
});

router.get('/', (req, res) => {
  StationModel.find()
    .then(stations => {
      res.status(200).json(stations);
    })
    .catch(err => {
      throw err;
    });
});

router.post('/', (req, res) => {
  const station = new StationModel({
    name: req.body.name,
    rewardPoints: req.body.rewardPoints,
    user: req.body.user
  });
  station.save().catch(err => {
    throw err;
  });
  res.sendStatus(201);
});

module.exports = router;
