"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _partner = require("../../models/partner");
const controlCreatePartner = async (req, res) => {
  try {
    const {
      partner_name,
      partner_url
    } = req.body;
    if (!partner_name || partner_name.length < 3) {
      return res.status(400).json({
        error: 'Tên đối tác không hợp lệ'
      });
    }
    if (!partner_url) {
      return res.status(400).json({
        error: 'Partner URL đối tác là bắt buộc'
      });
    }
    await new _partner.Partner(req.body).save();
    res.status(200).json({
      status: 200,
      message: 'Thêm mới đối tác thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlCreatePartner;