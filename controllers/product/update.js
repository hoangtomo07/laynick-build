"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configs = require("../../configs");
var _product = require("../../models/product");
const controlUpdateProduct = async (req, res) => {
  try {
    const {
      id,
      type
    } = req.query;
    if (id && !(0, _configs.isValidMongoId)(id)) {
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
    if (type && id && type === 'status') {
      await product.updateOne({
        status: !product.status
      });
    } else {
      await product.updateOne(req.body);
    }
    res.status(200).json({
      status: 200,
      message: 'Cập nhật sản phẩm thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlUpdateProduct;