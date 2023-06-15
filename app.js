const express = require("express");
const app = express();
const productroutes = require("./api/routes/product");
const orderroutes = require("./api/routes/Order");
app.use("/product", productroutes);
app.use("/order", orderroutes);

module.exports = app;
