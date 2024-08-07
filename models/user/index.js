"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const userSchema = new _mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: true
  },
  membership: {
    type: String,
    enum: ["default", "vip"],
    default: "default"
  },
  chargings: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Charging"
  }],
  carts: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  history_hacks: [{
    _id: false,
    account_id: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
    },
    info: {
      type: {
        type: String
      },
      username: {
        type: String
      },
      password: {
        type: String
      }
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  wallet: {
    type: Number,
    default: 0
  },
  ip: {
    type: String,
    default: ""
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
const User = exports.User = _mongoose.default.model("User", userSchema);