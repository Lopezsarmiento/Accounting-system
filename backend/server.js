"use strict";
// Dependencies
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// modules

// Retrieve values from config
dotenv.config({ path: "./config/config.env" });

// Start DB connection
//connectDB();

// initialize app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
//app.use(route.home, indexRouter);

app.get("/", (req, res) => {
  res.send("accounting system");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
