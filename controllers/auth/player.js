"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.controlPlayerGetInfo = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _user = require("../../models/user");
var _setting = require("../../models/setting");
var _configs = require("../../configs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const controlPlayerLogin = async (req, res) => {
  try {
    const {
      id
    } = req.user;
    const {
      account_id
    } = req.body;
    if (!account_id || account_id.length < 8 || account_id.length > 11) {
      return res.status(400).json({
        error: "ID người chơi không hợp lệ"
      });
    }
    let account = null;
    const user = await _user.User.findById(id).select("history_hacks");
    let isAccount = false;
    for (let i = 0; i < user.history_hacks.length; i++) {
      if (user.history_hacks[i].account_id === account_id) {
        account = user.history_hacks[i];
        isAccount = true;
        break;
      }
    }
    if (isAccount) {
      return res.status(200).json({
        status: 200,
        message: `Lấy thông tin nick ${account.nickname} thành công`,
        data: {
          account_id: account.account_id,
          nickname: account.nickname
        }
      });
    }
    const {
      apikey_login
    } = await _setting.Setting.findOne({}).select("apikey_login");
    if (!apikey_login) {
      return res.status(400).json({
        error: "Máy chủ Garena quá tải"
      });
    }
    const result = await _axios.default.post(`${_configs.urlApiKeyLogin}/player_id_login`, {
      account_id
    }, {
      headers: {
        Authorization: "Apikey " + apikey_login
      }
    });
    const {
      data
    } = result.data;
    if (data.error) {
      return res.status(400).json({
        error: data.error
      });
    }
    if (result.data.status !== 200) {
      return res.status(404).json({
        error: "Lỗi máy chủ vui lòng thử lại"
      });
    }
    const {
      nickname
    } = data;
    const history_hacks = {
      nickname,
      account_id,
      status: "pending",
      info: null,
      created_at: new Date()
    };
    await _user.User.findByIdAndUpdate(id, {
      $push: {
        history_hacks
      }
    });
    res.status(200).json({
      status: 200,
      message: `Lấy thông tin nick ${nickname} thành công`,
      data: {
        account_id,
        nickname
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Máy chủ lấy thông tin đang quá tải"
    });
  }
};
const controlPlayerGetInfo = async (req, res) => {
  try {
    const {
      id,
      membership
    } = req.user;
    const {
      account_id
    } = req.body;
    if (membership !== "vip") {
      return res.status(200).json({
        status: 400,
        message: "Vui lòng nâng cấp VIP để lấy thông tin"
      });
    }
    const user = await _user.User.findById(id).select("history_hacks");
    let account = null;
    let isAccount = false;
    let indexAccount = null;
    for (let i = 0; i < user.history_hacks.length; i++) {
      if (user.history_hacks[i].account_id === account_id) {
        account = user.history_hacks[i];
        isAccount = true;
        indexAccount = i;
        break;
      }
    }
    if (!isAccount) {
      return res.status(400).json({
        error: "Thông tin nick không tồn tại vui lòng lấy lại"
      });
    }
    const genrateRadomUsername = () => {
      const prefixers = ["03", "05", "07", "08", "09"]; // Đầu sđt

      const prefix = prefixers[Math.floor(Math.random() * prefixers.length)];
      let username = prefix;
      for (let i = 0; i < 8; i++) {
        username += Math.floor(Math.random() * 10);
      }
      return username;
    };
    const passwordRadom = ["Toan@2009", "Hahahihi736", "vuanh19cm", "nguyentuanle", "thuhuong@123", "Lehang1999", "dongoclinhcute", "Haidangpro", "Vulinh", "linh@2476", "Dtuan294", "19928nick1", "laynickcom3918", "vudinhluong2006", "huyoanvv13", "tuantrinh", "ff32hjewrhq", "qfqehwc", "bbgnhwgsss", "mjk1223ok", "siunhanheo399", "siunhanheo1856", "siunhanheo525", "siunhanheo5125", "siunhanheo14134", "siunhanheo43534", "siunhanheo6423", "lethanhcong1999", "THANHCONG@73ghr", "nhaookw", "viptuandat@", "baoanh838", "thaihoa11@", "ngoctrinh134g", "buqeufh", "nnaohaaaa", "laynick8820", "dangngoc81", "lehuong", "binhanh13r9", "phuongthinh333", "minhdangj91", "fananhjack"];
    const generateRadomPassword = () => {
      const index = Math.floor(Math.random() * passwordRadom.length);
      const password = passwordRadom[index];
      return password;
    };
    let info = account.info;
    if (!info) {
      const username = genrateRadomUsername();
      const password = generateRadomPassword();
      info = {
        type: "",
        username,
        password
      };
    }
    const history_hacks = {
      nickname: account.nickname,
      account_id,
      status: "success",
      info,
      created_at: account.created_at
    };
    user.history_hacks[indexAccount] = history_hacks;
    await user.save();
    res.status(200).json({
      status: 200,
      message: `Lấy thông tin nick thành công`
    });
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({
      error: "Lỗi hệ thống vui lòng thử lại sau"
    });
  }
};
exports.controlPlayerGetInfo = controlPlayerGetInfo;
var _default = exports.default = controlPlayerLogin;