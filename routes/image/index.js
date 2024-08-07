"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = _interopRequireDefault(require("../../middleware"));
var _upload = _interopRequireDefault(require("../../controllers/image/upload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/upload', _middleware.default.verifyAuth, _upload.default);
var _default = exports.default = router;