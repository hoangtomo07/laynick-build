"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = _interopRequireDefault(require("../../middleware"));
var _get = _interopRequireDefault(require("../../controllers/user/get"));
var _update = _interopRequireDefault(require("../../controllers/user/update"));
var _destroy = _interopRequireDefault(require("../../controllers/user/destroy"));
var _history = _interopRequireDefault(require("../../controllers/user/history"));
var _validators = require("../../validators");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/histories', _history.default);
router.get('/', _middleware.default.verifyAuth, _validators.validatorCheckPages, _get.default);
router.put('/update', _middleware.default.verifyAuth, _validators.validatorMongoId, _update.default);
router.delete('/destroy', _middleware.default.verifyAuth, _validators.validatorMongoId, _destroy.default);
var _default = exports.default = router;