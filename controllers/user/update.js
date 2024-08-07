"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
const controlUpdateUser = async (req, res) => {
  try {
    const {
      amount
    } = req.body;
    const {
      id,
      type
    } = req.query;
    if (!type || type !== 'status' && type !== 'wallet') {
      return res.status(400).json({
        error: 'Tham số không hợp lệ'
      });
    }
    if (type === 'wallet' && !amount) {
      return res.status(400).json({
        error: 'Vui lòng nhập số tiền'
      });
    }
    const user = await _user.User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'Người dùng cập nhật không tồn tại'
      });
    }
    if (type === 'status' && user.admin) {
      return res.status(400).json({
        error: 'Không thể tắt trạng thái admin'
      });
    }
    if (type === 'status') {
      await user.updateOne({
        status: !user.status
      });
    }
    await user.updateOne({
      wallet: amount
    });
    res.status(200).json({
      status: 200,
      message: 'Cập nhật người dùng thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlUpdateUser;