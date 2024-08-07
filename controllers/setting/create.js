"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setting = require("../../models/setting");
const controlCreateSettings = async () => {
  const setting = await new _setting.Setting().save();
  return setting;
};
var _default = exports.default = controlCreateSettings;