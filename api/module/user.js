const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});
module.exports = mongoose.model("User", UserSchema);
