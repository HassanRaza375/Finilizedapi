const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Title: { type: String, required: true },
  image: { type: String, required: true },
  Type: { type: String, required: true },
  Author: { type: String, required: true },
  Description: { type: String, required: true },
  Date: { type: Date, required: true },
});
module.exports = mongoose.model("Post", postSchema);
