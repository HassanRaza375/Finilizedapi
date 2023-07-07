const express = require("express");
const Ordered = require("../module/order");
const Producted = require("../module/product");
const mongoose = require("mongoose");

const router = express.Router();
router.get("/", (req, res, next) => {
  Ordered.find()
    .populate("ProductID")
    .exec()
    .then((e) => {
      const response = {
        count: e.length,
        Orders: e,
      };
      res
        .status(200)
        .json({ msg: "Handling get /Order request", Response: response });
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
  Ordered.findById(id)
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
  Producted.findById(req.body.ProductId)
    .then((e) => {
      if (!e) {
        return res.status(404).json({ err: e.Model, msg: "not found product" });
      }
      const order = new Ordered({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        ProductID: req.body.ProductId,
      });
      return order.save();
    })
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
  Ordered.deleteOne({ _id: req.params.ID })
    .exec()
    .then((e) => {
      res.status(200).json({ message: e });
    })
    .catch((e) => {
      res.status(404).json({ message: e });
    });
});

module.exports = router;
