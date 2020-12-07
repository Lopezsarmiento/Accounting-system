"use strict";

const home = "/";
const api = "/api/v1";

const constants = {};

constants.routers = {
  home,
  transactions: `${api}/transactions`,
};

constants.strings = {
  credit: "credit",
  debit: "debit",
  insufficientFunds: "insufficient funds",
};

module.exports = constants;
