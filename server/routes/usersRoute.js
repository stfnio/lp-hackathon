const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

router.get("/", (req, res) => {
  res.set("Content-Type", "application/json");
  UserModel.find().exec(function(err, user) {
    if (err) throw err;
    res.status(200).send(user);
  });
});

router.put("/", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
