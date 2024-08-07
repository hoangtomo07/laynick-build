"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _charging = require("../../models/charging");
var _get = _interopRequireDefault(require("../../services/charging/get"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const controlGetChargings = async (req, res) => {
  try {
    const {
      type
    } = req.query;
    if (type === 'tab') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const total = await _charging.Charging.find({}).select('telco code serial declared_value status message created_at').sort({
        created_at: -1
      }).limit(8);
      const success = await _charging.Charging.find({
        status: 1
      }).select('telco code serial declared_value status message created_at').sort({
        created_at: -1
      }).limit(8);
      return res.status(200).json({
        status: 200,
        data: {
          total,
          success
        }
      });
    }
    const pageSize = 20;
    const skip = (req.page - 1) * pageSize;
    const count = await _charging.Charging.countDocuments({});
    const pages = Math.ceil(count / pageSize);
    const data = await _charging.Charging.find({}).select('user telco partner code serial declared_value value amount request_id message status created_at approved_at').populate({
      path: 'user',
      select: 'full_name'
    }).populate({
      path: 'partner',
      select: 'partner_name'
    }).skip(skip).sort({
      created_at: -1
    });
    const {
      declared_value,
      value,
      amount
    } = await (0, _get.default)({});
    res.status(200).json({
      status: 200,
      data,
      pages,
      declared_value,
      value,
      amount
    });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlGetChargings;