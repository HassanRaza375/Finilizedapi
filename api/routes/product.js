const express = require("express");
const router = express.Router();
const Producted = require("../module/product");
const mongoose = require("mongoose");
router.get("/", (req, res, next) => {
  Producted.find()
    .select("name price _id")
    .exec()
    .then((e) => {
      const response = {
        count: e.length,
        Products: e,
      };
      res
        .status(200)
        .json({ msg: "Handling get /product request", Response: response });
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
  Producted.findById(id)
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
  const products = new Producted({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  products
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res
    .status(200)
    .json({ msg: "Handling post /product request", pro: products });
});
router.patch("/:ID", (req, res, next) => {
  const id = req.params.ID;
  console.log(id);
  const updateops = {};
  for (const ops of req.body) {
    updateops[ops.propName] = ops.value;
  }
  // { name: req.body.newname, price: req.body.newprice }
  Producted.findOneAndUpdate({ _id: id }, { $set: updateops })
    .exec()
    .then((e) => {
      res.status(200).json({ message: e });
    })
    .catch((e) => {
      console.log(e);
    });
});
router.delete("/:ID", (req, res, next) => {
  const id = req.params.ID;
  Producted.deleteOne({ _id: id })
    .exec()
    .then((e) => {
      res.status(200).json({ message: e });
    })
    .catch((e) => {
      res.status(404).json({ message: e });
    });
});

module.exports = router;
