"use strict";

// dependencies
const express = require("express");
const router = express.Router();

// modules
const { createId } = require("../utils/utils");
const { validateTransaction } = require("../models/transactions");
const { strings } = require("../constants/constants");

// state/db
const state = {
  balance: 0,
  transactionsHistory: [],
};

// routes
// @Description: Add transactions
// @Route: POST /api/v1/transactions
// @Required data: type: string e.g([debit, credit]), amount
router.post("/", (req, res) => {
  // validate payload
  const { error } = validateTransaction(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  // destructure payload
  const { type, amount } = req.body;

  // validate transaction is allowed
  const isAllowed = allowTransaction(type, amount, state.balance);
  if (!isAllowed) {
    return res
      .status(417)
      .json({ success: false, message: strings.insufficientFunds });
  }

  // build new transaction
  const newTransaction = {
    id: createId(),
    type,
    amount,
    effectiveDate: new Date(),
  };

  // add new transaction to history
  state.transactionsHistory.push(newTransaction);

  // update account balance
  updateBalance(type, amount);

  return res.status(200).json({
    success: true,
    data: newTransaction,
  });
});

// @Description: Get all transactions
// @Route: GET /api/v1/transactions
router.get("/", (req, res) => {
  // Return response to client
  return res.status(200).json({
    success: true,
    count: state.transactionsHistory.length,
    data: state,
  });
});

// @Description: Get transaction by id
// @Route: GET /api/v1/transactions/:transactionId
router.get("/:transactionId", (req, res) => {
  // validate id
  if (!req.params.transactionId) {
    return { Error: "Missing required id" };
  }

  // get specific transaction
  const found = state.transactionsHistory.find(
    (element) => element.id == req.params.transactionId
  );

  if (!found) {
    return res
      .status(404)
      .json({ success: false, message: "No transaction found" });
  }

  return res.status(200).json({
    success: true,
    data: found,
  });
});

// private functions
const allowTransaction = (type, amount, balance) => {
  // validate balance
  if (type === strings.debit) {
    return balance - parseInt(amount) >= 0 ? true : false;
  }
  return true;
};

const updateBalance = (type, amount) => {
  state.balance =
    type === strings.credit
      ? (state.balance += amount)
      : (state.balance -= amount);
};

// export modules
module.exports = router;
