const express = require('express');
const router = express.Router();
const adminRequired = require('../middleware/adminRequired');
const UserModel = require('../models/user');

router.get('/:id', (req, res) => {
  UserModel.find()
    .populate('group')
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      throw err;
    });
});

router.get('/', adminRequired, (req, res) => {
  UserModel.find()
    .populate('group')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      throw err;
    });
});

router.put('/:id', adminRequired, (req, res) => {
  UserModel.update({ _id: req.params.id }, { role: 'Manager' }, err => {
    if (err) throw err;
  });
  res.sendStatus(200);
});

module.exports = router;
