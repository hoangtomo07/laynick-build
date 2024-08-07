"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const controlLogoutAuth = async (req, res) => {
  try {
    res.status(200).clearCookie('session_key').json({
      status: 200,
      message: 'Đăng xuất tài khoản thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlLogoutAuth;