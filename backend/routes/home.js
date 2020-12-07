"use strict";

// Dependencies
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Accounting-system API");
});

module.exports = router;
