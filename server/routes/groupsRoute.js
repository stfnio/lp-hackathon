const express = require('express');
const router = express.Router();
const adminRequired = require('../middleware/adminRequired');
const GroupModel = require('../models/group');
const StationModel = require('../models/station');
const UserModel = require('../models/user');

router.get('/', (req, res) => {
  GroupModel.find()
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

router.post('/stationCheckIn', (req, res) => {
  Promise.all([
    GroupModel.findOne({ _id: req.body.group }).populate('users'),
    StationModel.findOne({ _id: req.body.station })
  ])
    .then(([group, station]) => {
      group.users.forEach(u => {
        const currentBalance = u.balance + req.body.rewardPoints;
        UserModel.update(
          { _id: u._id },
          { balance: currentBalance },
          err => {
            if (err) throw err;
          }
        );
        req.io.sockets.emit('balanceUpdate', { user: u._id, balance: currentBalance}); 
      });
      group.completedStations.push(req.body.station);
      group.save(err => {
        if (err) throw err;
      });
      res.sendStatus(200);
    })
    .catch(err => {
      throw err;
    });
});

router.post('/', adminRequired, (req, res) => {
  const group = new GroupModel({
    name: req.body.name
  });
  group.save().catch(err => {
    throw err;
  });
  res.sendStatus(201);
});

module.exports = router;
