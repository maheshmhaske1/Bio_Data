var express = require("express");
var router = express.Router();
const userSupport = require("../controller/support.controller");

router.post("/add", userSupport.addUserSupport);
router.get("/getAll", userSupport.getAll);
router.get("/getRead", userSupport.getRead);
router.get("/getUnRead", userSupport.getUnread);

module.exports = router;
