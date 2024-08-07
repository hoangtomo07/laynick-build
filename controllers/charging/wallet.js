"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = require("../../models/user");
const controlWalletUser = async (id, amount) => {
  const user = await _user.User.findById(id);
  const wallet = user.wallet + Number(amount);
  await user.updateOne({
    wallet
  });
};
var _default = exports.default = controlWalletUser;