const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

router.get("/", (req, res) => {
  UserModel.find().exec((err, user) => {
    if (err) throw err;
    res.status(200).json(user);
  });
});

module.exports = router;
