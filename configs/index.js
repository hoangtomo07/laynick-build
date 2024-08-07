"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlApiKeyLogin = exports.postCard = exports.isValidMongoId = exports.generateRequestId = exports.formatMongoDate = exports.convertCurrency = exports.addDaysToCurrentDate = void 0;
var _md = _interopRequireDefault(require("md5"));
var _axios = _interopRequireDefault(require("axios"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isValidMongoId = id => {
  return _mongoose.default.Types.ObjectId.isValid(id);
};
exports.isValidMongoId = isValidMongoId;
const convertCurrency = number => {
  let check = typeof number === 'number' ? true : false;
  return check ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0đ';
};
exports.convertCurrency = convertCurrency;
const addDaysToCurrentDate = (currentDate, days) => {
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate.toISOString();
};
exports.addDaysToCurrentDate = addDaysToCurrentDate;
const formatMongoDate = date => {
  if (!date) return '';
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
exports.formatMongoDate = formatMongoDate;
const generateRequestId = () => {
  const number = Math.floor(Math.random() * 999999999) + 1;
  return number.toString();
};
exports.generateRequestId = generateRequestId;
const postCard = async (telco, code, serial, amount, partner_id, partner_key, partner_url) => {
  const data = {
    telco,
    code,
    serial,
    amount,
    request_id: generateRequestId(),
    partner_id,
    sign: (0, _md.default)(partner_key + code + serial),
    command: 'charging'
  };
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: partner_url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  };
  const result = await (0, _axios.default)(config);
  return result.data;
};
exports.postCard = postCard;
const urlApiKeyLogin = exports.urlApiKeyLogin = 'https://thegioicode.vn/api/v2';