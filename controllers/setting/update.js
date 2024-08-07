"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setting = require("../../models/setting");
var _create = _interopRequireDefault(require("./create"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const controlUpdateSetting = async (req, res) => {
  try {
    const {
      type
    } = req.query;
    const {
      apikey_login,
      notify,
      banner_url,
      charging_rank
    } = req.body;
    let setting = await _setting.Setting.findOne({});
    if (!setting) {
      setting = await (0, _create.default)();
    }
    if (type === 'config') {
      setting.apikey_login = apikey_login;
      setting.notify = notify;
      setting.banner_url = banner_url;
    } else {
      setting.charging_rank = charging_rank;
    }
    await setting.save();
    res.status(200).json({
      status: 200,
      message: 'Cập nhật cấu hình thành công'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlUpdateSetting;