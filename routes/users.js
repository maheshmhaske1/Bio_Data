var express = require("express");
var router = express.Router();
const userController = require("../controller/user.controller");
const { upload_profile, upload_post } = require("../middleware/upload");
const { authenticate_user } = require("../middleware/auth");

// /* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/create", userController.createUser);
router.post("/login", userController.login);


module.exports = router;
