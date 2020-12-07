"use strict";

// Dependencies
const Joi = require("joi"); // uppercased as it returns a class

// modules
// modules
const { strings } = require("../constants/constants");

function validateTransaction(transaction) {
  const schema = Joi.object({
    type: Joi.string().valid(strings.credit, strings.debit).required(),
    amount: Joi.number().required(),
  });
  return schema.validate(transaction);
}

exports.validateTransaction = validateTransaction;
