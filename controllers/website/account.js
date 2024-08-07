"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
var _configs = require("../../configs");
const controlGetAccountPage = async (req, res) => {
  try {
    const result = await _user.User.findById(req.user.id).select('-_id full_name username ip created_at');
    const user = {
      full_name: result.full_name,
      username: result.username,
      ip: result.ip,
      created_at: (0, _configs.formatMongoDate)(result.created_at)
    };
    res.render('account', {
      user
    });
  } catch (error) {
    res.redirect('/login');
  }
};
var _default = exports.default = controlGetAccountPage;