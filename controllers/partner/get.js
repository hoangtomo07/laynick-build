"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configs = require("../../configs");
var _partner = require("../../models/partner");
const controlGetPartners = async (req, res) => {
  try {
    const {
      id
    } = req.query;
    if (id && (0, _configs.isValidMongoId)(id)) {
      const data = await _partner.Partner.findById(id).select('-_id partner_id partner_key');
      return res.status(200).json({
        status: 200,
        data
      });
    }
    const data = await _partner.Partner.find({}).select('partner_name ip status created_at').sort({
      created_at: -1
    });
    res.status(200).json({
      status: 200,
      data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlGetPartners;