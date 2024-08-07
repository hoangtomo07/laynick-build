"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
var _product = require("../../models/product");
var _configs = require("../../configs");
const controlGetUpgradePage = async (req, res) => {
  try {
    const user = await _user.User.findById(req.user.id).select('carts');
    const results = await _product.Product.find({
      status: true
    }).select('title price old_price description');
    const products = results.map(result => {
      const {
        _id,
        title,
        price,
        old_price,
        description
      } = result;
      let register = false;
      for (let i = 0; i < user.carts.length; i++) {
        if (user.carts[i].toString() === _id.toString()) {
          register = true;
          break;
        }
      }
      return {
        id: _id,
        title,
        register,
        price: (0, _configs.convertCurrency)(price),
        old_price: (0, _configs.convertCurrency)(old_price),
        description: description
      };
    });
    res.render('upgrade', {
      products
    });
  } catch (error) {
    res.redirect('/login');
  }
};
var _default = exports.default = controlGetUpgradePage;