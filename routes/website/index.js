"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = _interopRequireDefault(require("../../middleware"));
var _charging = _interopRequireDefault(require("../../controllers/charging"));
var _home = _interopRequireDefault(require("../../controllers/website/home"));
var _card = _interopRequireDefault(require("../../controllers/website/card"));
var _menu = _interopRequireDefault(require("../../controllers/website/menu"));
var _login = _interopRequireDefault(require("../../controllers/website/login"));
var _upgrade = _interopRequireDefault(require("../../controllers/website/upgrade"));
var _account = _interopRequireDefault(require("../../controllers/website/account"));
var _history = _interopRequireDefault(require("../../controllers/website/history"));
var _evaluate = _interopRequireDefault(require("../../controllers/website/evaluate"));
var _register = _interopRequireDefault(require("../../controllers/website/register"));
var _callback = _interopRequireDefault(require("../../controllers/charging/callback"));
var _charging2 = _interopRequireDefault(require("../../validators/charging/charging"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/", _home.default);
router.get("/login", _login.default);
router.get("/evaluate", _evaluate.default);
router.get("/register", _register.default);
router.get("/card", _middleware.default.verifyLogin, _card.default);
router.get("/menu", _middleware.default.verifyLogin, _menu.default);
router.get("/history", _middleware.default.verifyLogin, _history.default);
router.get("/upgrade", _middleware.default.verifyLogin, _upgrade.default);
router.get("/accounts", _middleware.default.verifyLogin, _account.default);

// Card
router.post("/charge/callback", _callback.default);
router.post("/api/chargingws/v2", _middleware.default.verifyLogin, _charging2.default, _charging.default);
var _default = exports.default = router;