"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
var _configs = require("../../configs");
const controlGetMenuPage = async (req, res) => {
  try {
    const {
      id
    } = req.user;
    const user = await _user.User.findById(id).select('wallet membership');
    const data = {
      wallet: (0, _configs.convertCurrency)(user.wallet),
      membership: user.membership === 'vip' ? 'VIP' : 'Mặc định'
    };
    res.render('menu', {
      data
    });
  } catch (error) {
    res.redirect('/login');
  }
};
var _default = exports.default = controlGetMenuPage;