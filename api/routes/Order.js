const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Handling get /product request" });
});

router.get("/:ID", (req, res, next) => {
  const id = req.params.ID;
  if (id === "special") {
    res
      .status(200)
      .json({ msg: "Congratulation you have found a unique ID", ID: id });
  } else {
    res.status(200).json({ msg: "Passed an ID", ID: id });
  }
});

router.post("/", (req, res, next) => {
  res.status(200).json({ msg: "Handling post /product request" });
});
router.patch("/:ID", (req, res, next) => {
  res.status(200).json({ msg: "Handling patch /product request" });
});
router.delete("/:ID", (req, res, next) => {
  res.status(200).json({ msg: "Handling delete /product request" });
});

module.exports = router;
