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
};

module.exports = constants;
