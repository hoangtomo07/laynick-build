"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = _interopRequireDefault(require("../../middleware"));
var _get = _interopRequireDefault(require("../../controllers/charging/get"));
var _destroy = _interopRequireDefault(require("../../controllers/charging/destroy"));
var _total = _interopRequireDefault(require("../../controllers/charging/total"));
var _validators = require("../../validators");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/total', _middleware.default.verifyAuth, _total.default);
router.delete('/destroy', _middleware.default.verifyAuth, _destroy.default);
router.get('/', _middleware.default.verifyAuth, _validators.validatorCheckPages, _get.default);
var _default = exports.default = router;