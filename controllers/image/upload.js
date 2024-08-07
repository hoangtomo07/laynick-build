"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _multer = _interopRequireDefault(require("multer"));
var _fs = require("fs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = _path.default.join(process.cwd(), '/src/assets');
    if (!(0, _fs.existsSync)(destinationFolder)) {
      (0, _fs.mkdirSync)(destinationFolder, {
        recursive: true
      });
    }
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + _path.default.extname(file.originalname);
    cb(null, fileName);
  }
});
const upload = (0, _multer.default)({
  storage
});
const controlUploadImage = (req, res) => {
  try {
    upload.single('image')(req, res, err => {
      if (err) {
        return res.status(400).json({
          error: 'Lỗi lưu ảnh khi lấy đường dẫn'
        });
      }
      if (!req.file) {
        return res.status(400).json({
          error: 'Vui lòng gửi ảnh cần lấy đường dẫn lên'
        });
      }
      const data = `http://${req.headers.host}/images/${req.file.filename}`;
      res.status(200).json({
        status: 200,
        data
      });
    });
  } catch (error) {
    res.status(500).json({
      error: 'Lỗi hệ thống vui lòng thử lại sau'
    });
  }
};
var _default = exports.default = controlUploadImage;