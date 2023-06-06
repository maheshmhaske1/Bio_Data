const userSupport = require("../model/support.model");

exports.addUserSupport = async (req, res) => {
  const { subject, email, message, language } = req.body;

  if (!subject || !email || !message) {
    return res.json({
      status: false,
      message: "name ,email ,message are required fields",
    });
  }

  await new userSupport({
    name: name,
    email: email,
    language: language,
    message: message,
    isResolve: false,
  })
    .save()
    .then((success) => {
      return res.json({
        status: true,
        message: "your message is sent with our team",
        data: success,
      });
    })
    .catch((error) => {
      return res.json({
        status: true,
        message: "something went wrong",
        data: error,
      });
    });
};

exports.getAll = async (req, res) => {
  await userSupport
    .find()
    .then((success) => {
      return res.json({
        status: true,
        message: "your support messages sent by users",
        data: success,
      });
    })
    .catch((error) => {
      return res.json({
        status: true,
        message: "something went wrong",
        data: error,
      });
    });
};

exports.getUnread = async (req, res) => {
  await userSupport
    .find({ isResolve: false })
    .then((success) => {
      return res.json({
        status: true,
        message: "unread messages",
        data: success,
      });
    })
    .catch((error) => {
      return res.json({
        status: true,
        message: "something went wrong",
        data: error,
      });
    });
};

exports.getRead = async (req, res) => {
  await userSupport
    .find({ isResolve: true })
    .then((success) => {
      return res.json({
        status: true,
        message: "read messages",
        data: success,
      });
    })
    .catch((error) => {
      return res.json({
        status: true,
        message: "something went wrong",
        data: error,
      });
    });
};
