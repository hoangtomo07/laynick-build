"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const controlGetLoginPage = async (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    res.render('login');
  }
};
var _default = exports.default = controlGetLoginPage;