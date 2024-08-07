"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configs = require("../../configs");
var _product = require("../../models/product");
const controlGetProducts = async (req, res) => {
  try {
    const {
      id
    } = req.query;
    if (id && (0, _configs.isValidMongoId)(id)) {
      const data = await _product.Product.findById(id).select('title price old_price description');
      if (!data) {
        return res.status(404).json({
          error: 'Sản phẩm cần tìm không tồn tại'
        });
      }
      return res.status(200).json({
        status: 200,
        data
      });
    }
    const data = await _product.Product.find({}).select('title price old_price status created_at').sort({
      created_at: -1
    });
    res.status(200).json({
      status: 200,
      data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlGetProducts;