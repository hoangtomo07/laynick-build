"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = _interopRequireDefault(require("../../middleware"));
var _get = _interopRequireDefault(require("../../controllers/auth/get"));
var _logout = _interopRequireDefault(require("../../controllers/auth/logout"));
var _register = _interopRequireDefault(require("../../controllers/auth/register"));
var _change = _interopRequireDefault(require("../../controllers/auth/change"));
var _logout2 = _interopRequireDefault(require("../../controllers/website/logout"));
var _login = require("../../controllers/auth/login");
var _player = _interopRequireWildcard(require("../../controllers/auth/player"));
var _login2 = _interopRequireDefault(require("../../validators/auth/login"));
var _register2 = _interopRequireDefault(require("../../validators/auth/register"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/dash/login", _login2.default, _login.controlLoginAuth);
router.post("/dash/logout", _middleware.default.verifyAuth, _logout.default);
router.get("/dash/current-user", _middleware.default.verifyAuth, _get.default);
router.post("/login", _login2.default, _login.controlLoginUser);
router.get("/logout", _middleware.default.verifyLogin, _logout2.default);
router.post("/register", _register2.default, _register.default);
router.post("/player_id_login", _middleware.default.verifyPlayer, _player.default);
router.post("/player_get_info", _middleware.default.verifyPlayer, _player.controlPlayerGetInfo);
router.post("/change-password", _middleware.default.verifyLogin, _change.default);
var _default = exports.default = router;