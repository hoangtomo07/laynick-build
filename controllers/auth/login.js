"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlLoginUser = exports.controlLoginAuth = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _user = require("../../models/user");
var _address = _interopRequireDefault(require("../../configs/address"));
var _token = require("../../configs/token");
const _excluded = ["password", "status", "_id", "admin", "wallet", "membership"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const controlLoginUser = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await _user.User.findOne({
      username
    }).select('full_name username password wallet membership admin status');
    if (!user) {
      return res.status(404).json({
        error: 'Tài khoản của bạn không tồn tại'
      });
    }
    if (!user.status) {
      return res.status(400).json({
        error: 'Tài khoản đã bị khoá'
      });
    }
    const isPassword = await _bcrypt.default.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: 'Mật khẩu của bạn không chính xác'
      });
    }
    const ip = (0, _address.default)(req);
    await user.updateOne({
      ip
    });
    const accessToken = (0, _token.generateAccessTokenUser)(user);
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
exports.controlLoginUser = controlLoginUser;
const controlLoginAuth = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await _user.User.findOne({
      username,
      admin: true
    }).select('full_name username password wallet membership status admin');
    if (!user) {
      return res.status(404).json({
        error: 'Tài khoản của bạn không tồn tại'
      });
    }
    if (!user.status) {
      return res.status(400).json({
        error: 'Tài khoản của bạn không hoạt động'
      });
    }
    const isPassword = await _bcrypt.default.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: 'Mật khẩu của bạn không chính xác'
      });
    }
    const ip = (0, _address.default)(req);
    await user.updateOne({
      ip
    });
    const accessToken = (0, _token.generateAccessTokenUser)(user);
    const _user$_doc = user._doc,
      {
        password: pass,
        status,
        _id,
        admin,
        wallet,
        membership
      } = _user$_doc,
      other = _objectWithoutProperties(_user$_doc, _excluded);
    res.status(200).cookie('session_key', accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'Strict'
    }).json({
      status: 200,
      message: 'Đăng nhập tài khoản thành công',
      data: _objectSpread({}, other)
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
exports.controlLoginAuth = controlLoginAuth;