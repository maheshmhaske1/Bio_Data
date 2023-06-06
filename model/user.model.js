const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
  },
  cover_photo: {
    type: String,
    default: "",
  },
  mobile: {
    type: Number,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  token: {
    type: String,
  },
});

var userModel = mongoose.model("users", userSchema);
module.exports = userModel;
