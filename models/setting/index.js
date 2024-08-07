"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Setting = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const settingSchema = new _mongoose.Schema({
  apikey_login: {
    type: String,
    default: ''
  },
  banner_url: {
    type: String,
    default: ''
  },
  notify: {
    text: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    }
  },
  charging_rank: [{
    _id: false,
    nickname: {
      type: String
    },
    amount: {
      type: Number
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
const Setting = exports.Setting = _mongoose.default.model('Setting', settingSchema);