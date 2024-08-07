"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _setting = require("../../models/setting");
var _create = _interopRequireDefault(require("../setting/create"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const controlGetHomePage = async (req, res) => {
  try {
    const {
      session_key
    } = req.cookies;
    let isLogin = null;
    _jsonwebtoken.default.verify(session_key, 'jwt-session_key-user', async (error, user) => {
      if (user) {
        isLogin = user;
      }
    });
    let setting = await _setting.Setting.findOne({}).select('notify banner_url');
    if (!setting) {
      setting = await (0, _create.default)();
    }
    res.render('home.ejs', {
      setting,
      isLogin
    });
  } catch (error) {
    res.redirect('/login');
  }
};
var _default = exports.default = controlGetHomePage;