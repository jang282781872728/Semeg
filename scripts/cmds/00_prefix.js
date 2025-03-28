const fs = require("fs-extra");const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "1.3",
    author: "VEX_ADNAN",
    countDown: 5,
    role: 0,
    shortDescription: "Thay đổi prefix của bot",
    longDescription: "Thay đổi dấu lệnh của bot trong box chat của bạn hoặc cả hệ thống bot (chỉ admin bot)",
    category: "config",
    guide: {
      vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"
        + "\n   Ví dụ:"
        + "\n    {pn} #"
        + "\n\n   {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
        + "\n   Ví dụ:"
        + "\n    {pn} # -g"
        + "\n\n   {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",
      en: "   {pn} <new prefix>: change new prefix in your box chat"
        + "\n   Example:"
        + "\n    {pn} #"
        + "\n\n   {pn} <new prefix> -g: change new prefix in system bot (only admin bot)"
        + "\n   Example:"
        + "\n    {pn} # -g"
        + "\n\n   {pn} reset: change prefix in your box chat to default"
    }
  },

  langs: {
    vi: {
      reset: "Đã reset prefix của bạn về mặc định: %1",
      onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",
      confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",
      confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",
      successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",
      successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",
      myPrefix: "🌐 Prefix của hệ thống: %1\n🛸 Prefix của nhóm bạn: %2"
    },
    en: {
      reset: " ▬▬▬▬▬▬▬▬▬▬▬▬▬     𝐘𝐎𝐔𝐑 𝐏𝐑𝐄𝐅𝐈𝐗 𝐇𝐀𝐒 𝐁𝐄𝐄𝐍 𝐑𝐄𝐒𝐄𝐓 𝐓𝐎 𝐃𝐄𝐅𝐀𝐔𝐋𝐓: %1    ▬▬▬▬▬▬▬▬▬▬▬▬▬ ",
      onlyAdmin: " ▬▬▬▬▬▬▬▬▬▬▬▬▬     𝐎𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧 𝐜𝐚𝐧 𝐜𝐡𝐚𝐧𝐠𝐞 𝐩𝐫𝐞𝐟𝐢𝐱 𝐨𝐟 𝐬𝐲𝐬𝐭𝐞𝐦 𝐛𝐨𝐭 🔰       ▬▬▬▬▬▬▬▬▬▬▬▬▬ ",
      confirmGlobal: " ▬▬▬▬▬▬▬▬▬▬▬▬▬     𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐚𝐜𝐭 𝐭𝐨 𝐭𝐡𝐢𝐬 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐭𝐨 𝐜𝐨𝐧𝐟𝐢𝐫𝐦 𝐜𝐡𝐚𝐧𝐠𝐞 𝐩𝐫𝐞𝐟𝐢𝐱 𝐨𝐟 𝐬𝐲𝐬𝐭𝐞𝐦 𝐛𝐨𝐭 🔃    ▬▬▬▬▬▬▬▬▬▬▬▬▬ ",
      confirmThisThread: " ▬▬▬▬▬▬▬▬▬▬▬▬▬     𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐚𝐜𝐭 𝐭𝐨 𝐭𝐡𝐢𝐬 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐭𝐨 𝐜𝐨𝐧𝐟𝐢𝐫𝐦 𝐜𝐡𝐚𝐧𝐠𝐞 𝐩𝐫𝐞𝐟𝐢𝐱 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐛𝐨𝐱 𝐜𝐡𝐚𝐭 🔃    ▬▬▬▬▬▬▬▬▬▬▬▬▬ ",
      successGlobal: " ▬▬▬▬▬▬▬▬▬▬▬▬▬     𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐩𝐫𝐞𝐟𝐢𝐱 𝐨𝐟 𝐬𝐲𝐬𝐭𝐞𝐦 𝐛𝐨𝐭 𝐭𝐨: %1✅     ▬▬▬▬▬▬▬▬▬▬▬▬▬ ",
      successThisThread: " ▬▬▬▬▬▬▬▬▬▬▬▬▬     𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐩𝐫𝐞𝐟𝐢𝐱 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐛𝐨𝐱 𝐜𝐡𝐚𝐭 𝐭𝐨: %1✅     ▬▬▬▬▬▬▬▬▬▬▬▬▬ ",
      myPrefix: "\n\n❊⊰⊰✰→ ᴊᴜʙᴀʏᴇʀ ʙᴏᴛ ←✰...𝟭𝟬𝟬%⊱⊱❊\n⫸ 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝 𝐒𝐮𝐜𝐜𝐞𝐬𝐟𝐮𝐥𝐥 ⫷\n\n❐ 🄱🄾🅃 𝐏𝐫𝐞𝐟𝐢𝐱: [❊⊰ ! ⊱❊]\n❐𝐄𝐱𝐚𝐦𝐩𝐥𝐞: !𝐡𝐞𝐥𝐩\n───────────\n│👤𝐎𝐰𝐧𝐞𝐫:【 JUBAYER 】\n│⚠️𝐃𝐨𝐧'𝐭 𝐊𝐢𝐜𝐤 𝐓𝐡𝐢𝐬 𝐁𝐨𝐭!\n│✅𝐔𝐬𝐞 !𝐡𝐞𝐥𝐩 𝐓𝐨 𝐒𝐞𝐞 𝐂𝐌𝐃?\n│💟𝐓𝐡𝐚𝐧𝐤𝐬 𝐆𝐂 𝐀𝐝𝐦𝐢𝐧 𝐅𝐨𝐫 𝐀𝐝𝐝!\n│❄️𝐈 𝐇𝐚𝐯𝐞 𝐍𝐨 𝐒𝐩𝐚𝐦!"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0])
      return message.SyntaxError();

    if (args[0] == 'reset') {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix
    };

    if (args[1] === "-g")
      if (role < 2)
        return message.reply(getLang("onlyAdmin"));
      else
        formSet.setGlobal = true;
    else
      formSet.setGlobal = false;

    return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
      formSet.messageID = info.messageID;
      global.GoatBot.onReaction.set(info.messageID, formSet);
    });
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author)
      return;
    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    }
    else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

  onChat: async function ({ event, message, usersData, getLang }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const xyrene = {
      body: `🈷\x20\x20\x20\x20\x20\x20\x20\x20\x20${name}\x20\x20\x20\x20\x20\x20\x20\x20\x20🈷` + getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)),
      attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/gcHYYM6H/1741533158388.jpg")
        };
    if (event.body && event.body.toLowerCase() === "prefix")
      return () => {
        return message.reply(xyrene);
      };
  }
};
