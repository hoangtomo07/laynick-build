"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const controlGetLogoutPage = (req, res) => {
  try {
    res.clearCookie('session_key').redirect('/login');
  } catch (error) {
    res.redirect('/login');
  }
};
var _default = exports.default = controlGetLogoutPage;