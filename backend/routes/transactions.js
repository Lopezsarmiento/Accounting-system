"use strict";

// dependencies
const express = require("express");
const router = express.Router();

// modules
const { createId } = require("../utils/utils");
const { validateTransaction } = require("../models/transactions");

// state/db
const state = {
  balance: 0,
  transactionsHistory: [],
};

// routes
// @Description: Add transacions
// @Route: POST /api/v1/transactions
router.post("/", (req, res) => {
  // validate payload
  const { error } = validateTransaction(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // destructure payload
  const { type, amount } = req.body;

  // validate transaction is allowed
  const isAllowed = allowTransaction(type, amount, state.balance);
  if (!isAllowed) {
    return res
      .status(417)
      .json({ success: false, message: "insufficient funds" });
  }

  // new transaction
  const newTransaction = {
    id: createId(),
    type,
    amount,
    effectiveDate: new Date().toDateString(),
  };

  // add new transaction to history
  state.transactionsHistory.push(newTransaction);

  // update account balance
  updateBalance(type, amount);

  return res.status(200).json({
    success: true,
    data: state,
  });
});

// private functions
const allowTransaction = (type, amount, balance) => {
  // validate balance
  if (type === "debit") {
    return balance - parseInt(amount) >= 0 ? true : false;
  }
  return true;
};

const updateBalance = (type, amount) => {
  state.balance =
    type === "credit" ? (state.balance += amount) : (state.balance -= amount);
};

// export modules
module.exports = router;
