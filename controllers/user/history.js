"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
var _generate = _interopRequireDefault(require("../../services/user/generate"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const controlGetHistoryByProducts = (req, res) => {
  try {
    let userList = (0, _generate.default)(10);
    userList.sort((a, b) => (0, _momentTimezone.default)(a.created_at, 'HH:mm:ss').diff((0, _momentTimezone.default)(b.created_at, 'HH:mm:ss')));
    res.status(200).json({
      status: 200,
      message: 'Lấy lịch sử đăng nhập thành công',
      data: userList
    });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlGetHistoryByProducts;