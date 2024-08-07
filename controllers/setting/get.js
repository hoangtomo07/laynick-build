"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setting = require("../../models/setting");
var _create = _interopRequireDefault(require("./create"));
var _axios = _interopRequireDefault(require("axios"));
var _configs = require("../../configs");
const _excluded = ["_id", "created_at", "updated_at", "__v", "apikey_login"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const controlGetSettings = async (req, res) => {
  try {
    let setting = await _setting.Setting.findOne({});
    if (!setting) {
      setting = await (0, _create.default)();
    }
    const _setting$_doc = setting._doc,
      {
        _id,
        created_at,
        updated_at,
        __v,
        apikey_login
      } = _setting$_doc,
      other = _objectWithoutProperties(_setting$_doc, _excluded);
    try {
      const apikeyInfo = await _axios.default.get(`${_configs.urlApiKeyLogin}/api-keys/info?api_key=${apikey_login}`);
      if (apikeyInfo.data.status === 200) {
        setting = _objectSpread({
          apikey_login: apikeyInfo.data.data
        }, other);
      }
    } catch (error) {
      setting = _objectSpread({
        apikey_login: {
          api_key: apikey_login,
          status: false,
          use: '',
          expired_at: ''
        }
      }, other);
    }
    res.status(200).json({
      status: 200,
      data: setting
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlGetSettings;