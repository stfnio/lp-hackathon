const express = require("express");
const router = express.Router();
const TransactionModel = require("../models/transaction");
const UserModel = require("../models/user");

router.post("/", (req, res) => {
  TransactionModel.find().exec((err, transacton) => {
    if (err) throw err;
    res.sendStatus(200).send(transacton);
  });
});

router.post("/fromValidator", (req, res) => {
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
