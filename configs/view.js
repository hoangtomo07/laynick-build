"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
const viewEngine = (app) => {
    app.use(_express.default.static("./public"));
    app.set("view engine", "ejs");
    app.set("views", "./views");
};
var _default = (exports.default = viewEngine);
