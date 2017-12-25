const express = require('express');
const router = express.Router();
const GroupModel = require('../models/group');

router.get('/', (req, res) => {
  GroupModel.find()
    .populate('completedStations')
    .then(groups => {
      res.status(200).json(groups);
    })
    .catch(err => {
      throw err;
    });
});

router.get('/:id', (req, res) => {
  GroupModel.findOne({ _id: req.params.id })
    .then(group => {
      res.status(200).json(group);
    })
    .catch(err => {
      throw err;
    });
});

router.post('/', (req, res) => {
  const group = new GroupModel({
    name: req.body.name
  });
  group.save().catch(err => {
    throw err;
  });
  res.sendStatus(201);
});

module.exports = router;
