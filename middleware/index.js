"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = require("../models/user");
var _token = require("../configs/token");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const middleware = {
  verifyAuth: (req, res, next) => {
    const {
      session_key
    } = req.cookies;
    if (!session_key) {
      return res.status(401).json({
        status: 401,
        error: 'Vui lòng xác minh người dùng'
      });
    }
    _jsonwebtoken.default.verify(session_key, 'jwt-session_key-user', async (error, user) => {
      if (error) {
        return res.status(403).clearCookie('session_key').json({
          status: 403,
          error: 'Mã xác minh của bạn đã hết hạn'
        });
      }
      if (!user.status) {
        return res.status(403).clearCookie('session_key').json({
          status: 403,
          error: 'Tài khoản bạn đã bị tạm khóa'
        });
      }
      if (!user.admin) {
        return res.status(403).clearCookie('session_key').json({
          status: 403,
          error: 'Bạn không có quyền quản trị'
        });
      }
      const userToken = await _user.User.findById(user.id).select('full_name admin wallet membership status');
      if (!userToken) {
        return res.status(401).clearCookie('session_key').json({
          status: 401,
          error: 'Vui lòng xác minh người dùng'
        });
      }
      const accessToken = (0, _token.generateAccessTokenUser)(userToken);
      res.cookie('session_key', accessToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'Strict'
      });
      req.user = user;
      next();
    });
  },
  verifyLogin: (req, res, next) => {
    const {
      session_key
    } = req.cookies;
    if (!session_key) {
      return res.redirect('/login');
    }
    _jsonwebtoken.default.verify(session_key, 'jwt-session_key-user', async (error, user) => {
      if (error) {
        res.clearCookie('session_key');
        return res.redirect('/login');
      }
      if (!user.status) {
        res.clearCookie('session_key');
        return res.redirect('/login');
      }
      const userToken = await _user.User.findById(user.id).select('full_name admin wallet membership status');
      if (!userToken) {
        res.clearCookie('session_key');
        return res.redirect('/login');
      }
      const accessToken = (0, _token.generateAccessTokenUser)(userToken);
      res.cookie('session_key', accessToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'Strict'
      });
      req.user = user;
      next();
    });
  },
  verifyPlayer: (req, res, next) => {
    const {
      session_key
    } = req.cookies;
    if (!session_key) {
      return res.status(401).json({
        status: 401,
        error: 'Vui lòng đăng nhập để thực hiện'
      });
    }
    _jsonwebtoken.default.verify(session_key, 'jwt-session_key-user', async (error, user) => {
      if (error) {
        return res.status(403).clearCookie('session_key').json({
          status: 401,
          error: 'Vui lòng đăng nhập để thực hiện'
        });
      }
      if (!user.status) {
        return res.status(403).clearCookie('session_key').json({
          status: 401,
          error: 'Vui lòng đăng nhập để thực hiện'
        });
      }
      const userToken = await _user.User.findById(user.id).select('full_name admin wallet membership status');
      if (!userToken) {
        return res.status(401).clearCookie('session_key').json({
          status: 401,
          error: 'Vui lòng đăng nhập để thực hiện'
        });
      }
      req.user = user;
      next();
    });
  }
};
var _default = exports.default = middleware;