"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const controlGetRegisterPage = async (req, res) => {
  try {
    res.render('register');
  } catch (error) {
    res.redirect('/login');
  }
};
var _default = exports.default = controlGetRegisterPage;