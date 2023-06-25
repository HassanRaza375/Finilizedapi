const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productroutes = require("./api/routes/product");
const orderroutes = require("./api/routes/Order");
// body parser to get data 
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

module.exports = app;
