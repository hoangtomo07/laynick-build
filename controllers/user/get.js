"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
const controlGetUsers = async (req, res) => {
  try {
    const {
      type
    } = req.query;
    if (type) {
      const users = await _user.User.find({}).select('username membership created_at').sort({
        created_at: -1
      }).limit(8);
      return res.status(200).json({
        status: 200,
        data: users
      });
    }
    const pageSize = 20;
    const skip = (req.page - 1) * pageSize;
    const count = await _user.User.countDocuments({});
    const pages = Math.ceil(count / pageSize);
    const users = await _user.User.find({}).select('full_name username admin status membership wallet created_at').skip(skip).limit(pageSize).sort({
      created_at: -1
    });
    res.status(200).json({
      status: 200,
      data: users,
      pages
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlGetUsers;