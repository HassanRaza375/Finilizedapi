const express = require("express");
const post = require("../module/Posts");
const mongoose = require("mongoose");

const router = express.Router();
router.get("/", (req, res, next) => {
  post
    .find()
    .exec()
    .then((e) => {
      const response = {
        count: e.length,
        Posts: e,
      };
      res
        .status(200)
        .json({ msg: "Handling get /Posts request", Response: response });
    })
    .catch((e) => {
      res.status(404).json({
        Err: e,
        Files: "not found",
      });
    });
});

router.get("/:ID", (req, res, next) => {
  const id = req.params.ID;
  post
    .findById(id)
    .exec()
    .then((e) => {
      if (e) {
        console.log(e);
        res.status(200).json(e);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ err: "Not found", message: e });
    });
});

router.post("/", (req, res, next) => {
  const Posts = new post({
    _id: new mongoose.Types.ObjectId(),
    Title: req.body.Title,
    image: req.body.image,
    Type: req.body.Type,
    Author: req.body.Author,
    Description: req.body.Description,
    Date: new Date(),
  });
  Posts.save()
    .then((e) => {
      console.log(e);
      res.status(201).json(e);
    })
    .catch((e) => {
      console.log(e);
    });
});
router.patch("/:ID", (req, res, next) => {
  res.status(200).json({ msg: "Handling patch /product request" });
});
router.delete("/:ID", (req, res, next) => {
  post
    .deleteOne({ _id: req.params.ID })
    .exec()
    .then((e) => {
      res.status(200).json({ message: e });
    })
    .catch((e) => {
      res.status(404).json({ message: e });
    });
});

module.exports = router;
