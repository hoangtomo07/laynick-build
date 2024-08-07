"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setting = require("../../models/setting");
const formatNickname = nickname => {
  return nickname.slice(0, 3) + '*'.repeat(nickname.length - 3);
};
const controlGetEvaluatePage = async (req, res) => {
  try {
    const {
      charging_rank
    } = await _setting.Setting.findOne({}).select('charging_rank');
    const ranks = charging_rank.map(rank => {
      return {
        nickname: formatNickname(rank.nickname),
        amount: rank.amount
      };
    });
    res.render('evaluate', {
      ranks
    });
  } catch (error) {
    res.redirect('/login');
  }
};
var _default = exports.default = controlGetEvaluatePage;