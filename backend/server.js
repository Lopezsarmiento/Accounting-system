"use strict";
// Dependencies
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// modules
const { routers } = require("./constants/constants");
const transactionsRouter = require("./routes/transactions");

// Retrieve values from config
dotenv.config({ path: "./config/config.env" });

// initialize app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(routers.transactions, transactionsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
