"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAccessTokenUser = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Tạo token user
const generateAccessTokenUser = user => {
  return _jsonwebtoken.default.sign({
    id: user._id,
    admin: user.admin,
    wallet: user.wallet,
    status: user.status,
    full_name: user.full_name,
    membership: user.membership
  }, 'jwt-session_key-user', {
    expiresIn: '365d'
  });
};
exports.generateAccessTokenUser = generateAccessTokenUser;