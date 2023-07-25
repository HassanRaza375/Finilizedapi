const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productroutes = require("./api/routes/product");
const orderroutes = require("./api/routes/Order");
const postroutes = require("./api/routes/Post");
const scrollroutes = require("./api/routes/Infinite");
// body parser to get data
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hassanraza375:U7uYsL54njaa1OOw@cluster0.tgn1ggl.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use("/product", productroutes);
app.use("/order", orderroutes);
app.use("/Post", postroutes);
app.use("/infinie", scrollroutes);

module.exports = app;
