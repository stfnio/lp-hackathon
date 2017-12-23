const express = require("express");
const router = express.Router();
const TransactionModel = require("../models/transaction");

router.post("/", (req, res) => {
  TransactionModel.find().exec(function(err, transacton) {
    if (err) throw err;
    res.sendStatus(200).send(transacton);
  });
});

module.exports = router;
