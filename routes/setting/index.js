"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = _interopRequireDefault(require("../../middleware"));
var _get = _interopRequireDefault(require("../../controllers/setting/get"));
var _update = _interopRequireDefault(require("../../controllers/setting/update"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/', _middleware.default.verifyAuth, _get.default);
router.put('/update', _middleware.default.verifyAuth, _update.default);
var _default = exports.default = router;