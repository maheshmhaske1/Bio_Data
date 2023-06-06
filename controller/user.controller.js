const userModel = require("../model/user.model");
const mailMiddleware = require("../middleware/mail.middleware");
const jwtMiddleware = require("../middleware/auth");
const fs = require("fs-extra");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();

exports.createUser = async (req, res) => {
  let { name, email, mobile, password, photo, dob, cover_photo } = req.body;

  const isUserFound = await userModel.findOne({ email: email });
  if (isUserFound) {
    return res.json({
      success: false,
      message: "user already exist please login",
    });
  }

  const hashed_password = await bcrypt.hash(password, 10);

  await new userModel({
    name: name,
    email: email,
    mobile: mobile,
    password: hashed_password,
    photo: photo,
    dob: dob,
    cover_photo: "",
  })
    .save()
    .then(async (success) => {
      console.log("success ==>", success);

      const token = await jwtMiddleware.generate_token_user(
        success._id,
        success.mobile
      );
      console.log(token);
      await userModel
        .findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(success._id) },
          { $set: { token: token } },
          { returnOriginal: false }
        )
        .then((success) => {
          return res.json({
            success: true,
            message: `user registered`,
            data: success,
          });
        })
        .catch((error) => {
          return res.json({
            success: false,
            message: "something went wrong",
            error,
          });
        });
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: "something went wrong",
        error,
      });
    });
};

exports.login = async (req, res) => {
  let { username, password } = req.body;

  let error_message = `please enter`;

  if (!username) {
    error_message += `, email`;
  }
  if (!password) {
    error_message += `, password`;
  }

  if (error_message !== "please enter") {
    return res.json({
      success: false,
      message: error_message,
    });
  }

  const isUserFound = await userModel.findOne({ email: username });
  console.log(isUserFound);
  if (!isUserFound) {
    return res.json({
      success: false,
      message: "user not registered please register",
    });
  }

  if (bcrypt.compareSync(password, isUserFound.password)) {
    return res.json({
      success: true,
      message: `logged in`,
      data: isUserFound,
    });
  } else {
    return res.json({
      success: false,
      message: `incorrect password`,
    });
  }
};
