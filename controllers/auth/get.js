"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
const controlGetCurrentAuth = async (req, res) => {
  try {
    const {
      id
    } = req.user;
    const data = await _user.User.findById(id).select('-_id full_name username');
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
var _default = exports.default = controlGetCurrentAuth;