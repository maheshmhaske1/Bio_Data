var express = require("express");
var fs = require("fs");
var router = express.Router();

// /* GET home page. */
const AWS = require("aws-sdk");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = router;
