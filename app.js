const express = require("express");
const app = express();
const productroutes = require("./api/routes/product");
app.use("/product", productroutes);
// app.use((req, res, next) => {
//   res.status(200).json({
//     msg: "its okay",
//   });
// });

module.exports = app;
