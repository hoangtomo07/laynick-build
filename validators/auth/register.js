"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
var _login = _interopRequireDefault(require("./login"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validatorRegisterUser = (req, res, next) => {
  const {
    full_name,
    username
  } = req.body;
  (0, _login.default)(req, res, async () => {
    if (full_name.length < 2) {
      return res.status(400).json({
        error: 'Tên của bạn không hợp lệ'
      });
    }
    const user = await _user.User.findOne({
      username
    }).select('username');
    if (user) {
      return res.status(404).json({
        error: 'Username đã tồn tại'
      });
    }
    next();
  });
};
var _default = exports.default = validatorRegisterUser;