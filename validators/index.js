"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatorMongoId = exports.validatorCheckPages = void 0;
var _configs = require("../configs");
const validatorMongoId = (req, res, next) => {
  const {
    id
  } = req.query;
  if (!(0, _configs.isValidMongoId)(id)) {
    return res.status(400).json({
      error: 'Tham số truy vấn không hợp lệ'
    });
  }
  next();
};
exports.validatorMongoId = validatorMongoId;
const isNaN = x => {
  x = Number(x);
  return x != x;
};
const validatorCheckPages = (req, res, next) => {
  const {
    page,
    type
  } = req.query;
  if (type === 'tab') {
    return next();
  }
  if (!page) {
    return res.status(400).json({
      error: 'Tham số truy vấn không hợp lệ'
    });
  }
  const numberPage = Number(page);
  if (numberPage < 1 || typeof numberPage !== 'number' || isNaN(numberPage)) {
    return res.status(400).json({
      error: 'Tham số truy vấn không hợp lệ'
    });
  }
  req.page = numberPage;
  next();
};
exports.validatorCheckPages = validatorCheckPages;