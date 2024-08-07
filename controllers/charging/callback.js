"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _wallet = _interopRequireDefault(require("./wallet"));
var _charging = require("../../models/charging");
var _status = _interopRequireDefault(require("../../services/charging/status"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const controlCallbackCharging = async (req, res) => {
  try {
    const {
      value,
      amount,
      trans_id,
      code,
      serial
    } = req.body;
    const stat = await _charging.Charging.findOne({
      code,
      serial,
      status: 99
    }).select('user code serial status value amount message trans_id description approved_at');
    if (!stat) {
      return res.status(400).json({
        error: 'NOT_FOUND'
      });
    }
    const {
      status,
      message,
      description
    } = (0, _status.default)(req.body.status, req.body.message);
    if (status === 1 || status === 2) {
      await (0, _wallet.default)(stat.user, value);
    }
    await stat.updateOne({
      status,
      value,
      amount,
      message,
      trans_id,
      description,
      approved_at: Date.now()
    });
    res.status(200).json({
      status: 200,
      message: 'OK'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlCallbackCharging;