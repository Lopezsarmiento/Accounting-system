"use strict";

const utils = {};

utils.createId = () => {
  return Math.floor(Math.random() * 100000000);
};

module.exports = utils;
