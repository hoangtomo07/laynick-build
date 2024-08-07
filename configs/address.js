"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const configGetIp = req => {
  const address = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
  return address;
};
var _default = exports.default = configGetIp;