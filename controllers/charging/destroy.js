"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configs = require("../../configs");
var _charging = require("../../models/charging");
const controlDestroyCharging = async (req, res) => {
  try {
    const {
      id
    } = req.query;
    if (!id || !(0, _configs.isValidMongoId)(id)) {
      return res.status(400).json({
        error: 'ID thẻ cào không hợp lệ'
      });
    }
    const result = await _charging.Charging.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        error: 'Thẻ cào không tồn tại'
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Xoá thẻ cào thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlDestroyCharging;