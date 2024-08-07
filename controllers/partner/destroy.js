"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _partner = require("../../models/partner");
var _configs = require("../../configs");
const controlDestroyPartner = async (req, res) => {
  try {
    const {
      id
    } = req.query;
    if (!id || !(0, _configs.isValidMongoId)(id)) {
      return res.status(400).json({
        error: 'ID đối tác không hợp lệ'
      });
    }
    const partner = await _partner.Partner.findByIdAndDelete(id);
    if (!partner) {
      return res.status(404).json({
        error: 'Đối tác không tồn tại'
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Xoá đối tác thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlDestroyPartner;