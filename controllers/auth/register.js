"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _user = require("../../models/user");
var _address = _interopRequireDefault(require("../../configs/address"));
var _token = require("../../configs/token");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const controlRegisterUser = async (req, res) => {
  try {
    const {
      full_name,
      username,
      password
    } = req.body;
    const salt = await _bcrypt.default.genSalt(10);
    const hashed = await _bcrypt.default.hash(password, salt);
    const ip = (0, _address.default)(req);
    const user = new _user.User({
      full_name,
      username,
      ip,
      password: hashed
    });
    const save = await user.save();
    const accessToken = (0, _token.generateAccessTokenUser)(save);
    res.status(200).cookie('session_key', accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'Strict'
    }).json({
      status: 200,
      message: 'Đăng nhập tài khoản thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlRegisterUser;