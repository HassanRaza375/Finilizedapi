const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Users = require("../module/user");
const mongoose = require("mongoose");
router.post("/SignUp", (req, res, next) => {
  Users.find({ Email: req.body.Email })
    .exec()
    .then((userw) => {
      if (userw.length >= 1) {
        res.status(409).json({
          message: userw,
          Result: "Already Exist",
        });
      } else {
        bcrypt.hash(req.body.Password, 10, function (err, hash) {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const User = new Users({
              _id: new mongoose.Types.ObjectId(),
              Email: req.body.Email,
              Password: hash,
            });
            User.save()
              .then((user) => {
                console.log(user);
                res.status(201).json({
                  Message: "User Created",
                });
              })
              .catch((err) => {
                console.log(res);
                res.status(500).json({
                  Error: err,
                  Message: "User Not Created",
                });
              });
          }
        });
      }
    });
});
router.delete("/:userId", (req, res, next) => {
  Users.find({ _id: req.params.userId })
    .exec()
    .then((results) => {
      res.status(200).json({ message: "Delete", ress: results });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
module.exports = router;
