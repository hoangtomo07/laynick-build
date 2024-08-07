"use strict";

var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _morgan = _interopRequireDefault(require("morgan"));
var _express = _interopRequireDefault(require("express"));
var _mongoose = require("mongoose");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _view = _interopRequireDefault(require("./configs/view"));
var _user = _interopRequireDefault(require("./routes/user"));
var _auth = _interopRequireDefault(require("./routes/auth"));
var _image = _interopRequireDefault(require("./routes/image"));
var _setting = _interopRequireDefault(require("./routes/setting"));
var _partner = _interopRequireDefault(require("./routes/partner"));
var _website = _interopRequireDefault(require("./routes/website"));
var _product = _interopRequireDefault(require("./routes/product"));
var _charging = _interopRequireDefault(require("./routes/charging"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r &&
            (o = o.filter(function (r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                  _defineProperty(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
              });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
const port = 4040;
const app = (0, _express.default)();
const whitelist = ["https://laynick.com", "https://admin.laynick.com"];
app.use(
    (0, _cors.default)({
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Only secure connections (HTTPS) are allowed"));
            }
        },
        credentials: true,
    })
);
app.use(
    (0, _helmet.default)({
        crossOriginResourcePolicy: false,
        contentSecurityPolicy: {
            directives: _objectSpread(
                _objectSpread({}, _helmet.default.contentSecurityPolicy.getDefaultDirectives()),
                {},
                {
                    "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
                }
            ),
        },
    })
);
app.use(_express.default.json());
app.use((0, _cookieParser.default)());
app.use((0, _morgan.default)("common"));
(0, _view.default)(app);
(0, _mongoose.connect)("mongodb://localhost:27017/laynick")
    .then(() => {
        console.log("Connecting to database successfully");
    })
    .catch((err) => {
        console.log("Connecting to database error: " + err.message);
    });
app.use("/", _website.default);
app.use("/api/auth", _auth.default);
app.use("/api/users", _user.default);
app.use("/api/images", _image.default);
app.use("/api/settings", _setting.default);
app.use("/api/partners", _partner.default);
app.use("/api/products", _product.default);
app.use("/api/chargings", _charging.default);
app.use("/images", _express.default.static("assets"));
app.use("/", (req, res) => {
    res.render("index");
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
