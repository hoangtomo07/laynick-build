"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Charging = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const chargingSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  telco: {
    type: String,
    require: true
  },
  partner: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Partner',
    require: true
  },
  code: {
    type: String,
    require: true
  },
  serial: {
    type: String,
    require: true
  },
  declared_value: {
    type: Number,
    require: true
  },
  value: {
    type: Number
  },
  amount: {
    type: Number
  },
  request_id: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  trans_id: {
    type: Number,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  approved_at: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
const Charging = exports.Charging = _mongoose.default.model('Charging', chargingSchema);