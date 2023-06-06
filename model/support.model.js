const mongoose = require("mongoose");

const userSupportSchema = new mongoose.Schema({
  subject: {
    type: String,
  },
  language: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  isResolve: {
    type: Boolean,
    default: false,
  },
});

var userSupportModel = mongoose.model("userSupports", userSupportSchema);
module.exports = userSupportModel;
