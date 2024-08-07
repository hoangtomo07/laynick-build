"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
var _configs = require("../../configs");
var _product = require("../../models/product");
const controlRegisterProduct = async (req, res) => {
  try {
    const {
      product_id: id
    } = req.body;
    if (!id || !(0, _configs.isValidMongoId)(id)) {
      return res.status(400).json({
        error: 'ID sản phẩm không hợp lệ'
      });
    }
    const product = await _product.Product.findById(id);
    if (!product) {
      return res.status(404).json({
        error: 'Sản phẩm không tồn tại'
      });
    }
    const user = await _user.User.findById(req.user.id).select('carts wallet');
    if (user.wallet < product.price) {
      return res.status(200).json({
        status: 400,
        message: 'Số dư của bạn không đủ!'
      });
    }
    await user.updateOne({
      $push: {
        carts: product._id
      },
      wallet: user.wallet - product.price,
      membership: 'vip'
    });
    res.status(200).json({
      status: 200,
      message: 'Đăng ký sản phẩm thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlRegisterProduct;