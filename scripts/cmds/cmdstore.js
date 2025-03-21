const axios = require("axios");
module.exports.config = {
  'name': 'cmdstore',
  'aliases': ['cs', 'cmds'],
  'author': 'ArYAN',
  'role': 0x0,
  'version': "0.0.1",
  'description': {
    'en': "use the cmdstore for goatbot"
  },
  'countDown': 0x3,
  'category': 'public',
  'guide': {
    'en': "{pn} [command name | single character | page number]"
  }
};
module.exports.onStart = async function ({
  api: _0x49cb15,
  event: _0x3eb533,
  args: _0x8389e2
}) {
  const _0x5729e5 = _0x8389e2.join(" ").trim().toLowerCase();
  try {
    const _0x52898a = await axios.get("https://raw.githubusercontent.com/erenyeagerisgay2/apis/refs/heads/main/availableCmds.json");
    let _0x3a7ef0 = _0x52898a.data.cmdName;
    let _0x2d516a = _0x3a7ef0;
    let _0x15f6bf = 0x1;
    if (_0x5729e5) {
      if (!isNaN(_0x5729e5)) {
        _0x15f6bf = parseInt(_0x5729e5);
      } else {
        if (_0x5729e5.length === 0x1) {
          _0x2d516a = _0x3a7ef0.filter(_0x4ee08e => _0x4ee08e.cmd.startsWith(_0x5729e5));
          if (_0x2d516a.length === 0x0) {
            return _0x49cb15.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️ No commands found starting with \"" + _0x5729e5 + "\".", _0x3eb533.threadID, _0x3eb533.messageID);
          }
        } else {
          _0x2d516a = _0x3a7ef0.filter(_0x1d3c99 => _0x1d3c99.cmd.includes(_0x5729e5));
          if (_0x2d516a.length === 0x0) {
            return _0x49cb15.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️You cannot find this command \"" + _0x5729e5 + "\" not found.", _0x3eb533.threadID, _0x3eb533.messageID);
          }
        }
      }
    }
    const _0x1d76da = Math.ceil(_0x2d516a.length / 0x6);
    if (_0x15f6bf < 0x1 || _0x15f6bf > _0x1d76da) {
      return _0x49cb15.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️ Invalid page number. Please enter a number between 1 and " + _0x1d76da + '.', _0x3eb533.threadID, _0x3eb533.messageID);
    }
    const _0x187bc3 = (_0x15f6bf - 0x1) * 0x6;
    const _0xcddc90 = _0x187bc3 + 0x6;
    const _0x6bb38e = _0x2d516a.slice(_0x187bc3, _0xcddc90);
    let _0x36bfe4 = "〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n🛒 Items Page (" + _0x15f6bf + '/' + _0x1d76da + ")\n\n";
    _0x6bb38e.forEach((_0x33279d, _0x483115) => {
      _0x36bfe4 += "👑 𝗜𝘁𝗲𝗺 𝗡𝗮𝗺𝗲: " + _0x33279d.cmd + "\n🆔 𝗜𝗗: " + (_0x187bc3 + _0x483115 + 0x1) + "\n⚙️ 𝗧𝘆𝗽𝗲: cmdstore\n📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: NO\n💻 𝗔𝘂𝘁𝗵𝗼𝗿: " + _0x33279d.author + "\n⏰ 𝗗𝗮𝘁𝗲:" + (_0x33279d.update || null) + "\n━━━━━━━━━━━━━━━\n";
    });
    _0x49cb15.sendMessage(_0x36bfe4, _0x3eb533.threadID, (_0x2be2be, _0x4438b4) => {
      global.GoatBot.onReply.set(_0x4438b4.messageID, {
        'commandName': this.config.name,
        'type': "reply",
        'messageID': _0x4438b4.messageID,
        'author': _0x3eb533.senderID,
        'cmdName': _0x2d516a,
        'page': _0x15f6bf
      });
    }, _0x3eb533.messageID);
    console.log(_0x2d516a);
  } catch (_0x3748fc) {
    _0x49cb15.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️Failed to retrieve commands.", _0x3eb533.threadID, _0x3eb533.messageID);
  }
};
module.exports.onReply = async function ({
  api: _0x35d8e1,
  event: _0xe27cc8,
  Reply: _0x1b8c02
}) {
  if (_0x1b8c02.author != _0xe27cc8.senderID) {
    return _0x35d8e1.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️ I write you by writing", _0xe27cc8.threadID, _0xe27cc8.messageID);
  }
  const _0x39c0df = parseInt(_0xe27cc8.body);
  const _0x53fb33 = (_0x1b8c02.page - 0x1) * 0x6;
  const _0x25d9b5 = _0x53fb33 + 0x6;
  if (isNaN(_0x39c0df) || _0x39c0df < _0x53fb33 + 0x1 || _0x39c0df > _0x25d9b5) {
    return _0x35d8e1.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️Please reply with a number between " + (_0x53fb33 + 0x1) + " and " + Math.min(_0x25d9b5, _0x1b8c02.cmdName.length) + '.', _0xe27cc8.threadID, _0xe27cc8.messageID);
  }
  try {
    const _0x4deb41 = _0x1b8c02.cmdName[_0x39c0df - 0x1].cmd;
    const _0x200bb4 = await axios.get("https://raw.githubusercontent.com/erenyeagerisgay2/apis/refs/heads/main/cmdUrls.json");
    const _0x10d546 = _0x200bb4.data[_0x4deb41];
    if (!_0x10d546) {
      return _0x35d8e1.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️Command URL not found.", _0xe27cc8.threadID, _0xe27cc8.messageID);
    }
    _0x35d8e1.unsendMessage(_0x1b8c02.messageID);
    const _0xf6aadc = "〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n📎 𝗖𝗠𝗗 𝗟𝗶𝗻𝗸: " + _0x10d546;
    _0x35d8e1.sendMessage(_0xf6aadc, _0xe27cc8.threadID, _0xe27cc8.messageID);
  } catch (_0x3469fe) {
    _0x35d8e1.sendMessage("〖 𝗖𝗠𝗗 𝗦𝗧𝗢𝗥𝗘 〗\n━━━━━━━━━━━━━━━\n⚠️ Failed to retrieve the command URL.", _0xe27cc8.threadID, _0xe27cc8.messageID);
  }
};
