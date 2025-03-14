const axios = require("axios");
const moment = require("moment-timezone");

const botName = "Mesbah Saxx";

module.exports = {
  config: {
    name: "ramadan",
    version: "1.0",
    author: "Mesbah Saxx",
    credit: "Mesbah Saxx",
    countDown: 5,
    cooldown: 5,
    role: 0,
    description: { 
      en: "Get detailed Iftar and Sehri times for a specific city.",
    },
    category: "Islamic",
    commandCategory: "Islamic",
    guide: { 
      en: "{pn} <zilla name>",
    },
  },

  onStart: async function ({ api, args, event }) {
    let zilla = args.join(" ") || "Jhenaidah";

    try {
      const { data } = await axios.get(`https://www.mesbah-saxx.is-best.net/api/islamic/ramadan?zilla=${zilla}&image=true&botName=${botName}`);

      if (!data?.message?.data?.Today || !data.message.data.Tomorrow)
        return api.sendMessage("Iftar time not found or invalid response.", event.threadID, event.messageID);

      const { Today: today, Tomorrow: tomorrow, title } = data.message.data;
      const now = moment().tz("Asia/Dhaka");

      const formatTime = (time) =>
        moment.tz(`${now.format("YYYY-MM-DD")} ${time}`, "YYYY-MM-DD hh:mm A", "Asia/Dhaka");

      let [iftarTime, sehriTime] = [formatTime(today.maghrib_and_iftar_time), formatTime(today.sehri_last_time_as_warning)];
      if (iftarTime.isBefore(now)) iftarTime.add(1, "day");
      if (sehriTime.isBefore(now)) sehriTime.add(1, "day");

      const remainingTime = (time) => `${Math.floor(time.diff(now, "minutes") / 60)}h ${time.diff(now, "minutes") % 60}m`;

      const msg = `
🌙🕌 -  𝙸𝙵𝚃𝙰𝚁 & 𝚂𝙴𝙷𝚁𝙸 𝚃𝙸𝙼𝙴  - 🕋🌙
----------------------------------------------------
  - 𝙵𝚘𝚛: ${title}
  - 𝙳𝚊𝚝𝚎: ${today.date}
----------------------------------------------------
  - 𝙸𝚏𝚝𝚊𝚛: ${today.iftar_time}  |  ⏳ ${remainingTime(iftarTime)}
  - 𝚂𝚎𝚑𝚛𝚒: ${today.sehri_last_time_as_warning}  |  ⏳ ${remainingTime(sehriTime)}
----------------------------------------------------
  ℹ️ 𝚃𝚘𝚖𝚘𝚛𝚛𝚘𝚠'𝚜 𝚂𝚎𝚑𝚛𝚒: ${tomorrow.sehri_last_time_as_warning}
  ℹ️ 𝚃𝚘𝚖𝚘𝚛𝚛𝚘𝚠'𝚜 𝙸𝚏𝚝𝚊𝚛: ${tomorrow.iftar_time}
----------------------------------------------------`;

      await api.sendMessage({ 
        body: msg,
        attachment: data.message.image ? await global.utils.getStreamFromURL(data.message.image) : null
      }, event.threadID, event.messageID);
    } catch {
      api.sendMessage("An error occurred while processing the request.", event.threadID, event.messageID);
    }
  },
  run: this.onStart,
};
