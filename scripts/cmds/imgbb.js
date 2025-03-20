const { getStreamFromURL } = global.utils;
const FormData = require('form-data');
const axios = require('axios');
const regCheckURL = /^(http|https):\/\/[^ "]+$/;

async function uploadImgbb(file) {
  let type = "file";
  try {
    if (!file) {
      throw new Error("The first argument (file) must be a stream or an image URL");
    }
    if (regCheckURL.test(file) === true) {
      type = "url";
    }
    if (
      (type !== "url" && !(typeof file._read === "function" && typeof file._readableState === "object")) ||
      (type === "url" && !regCheckURL.test(file))
    ) {
      throw new Error("The first argument (file) must be a stream or an image URL");
    }

    const res_ = await axios({
      method: "GET",
      url: "https://imgbb.com",
    });

    const auth_token = res_.data.match(/auth_token="([^"]+)"/)[1];
    const timestamp = Date.now();

    const formData = new FormData();
    formData.append("source", file);
    formData.append("type", type);
    formData.append("action", "upload");
    formData.append("timestamp", timestamp);
    formData.append("auth_token", auth_token);

    const res = await axios.post("https://imgbb.com/json", formData, {
      headers: formData.getHeaders(),
    });

    return res.data.image.url;
  } catch (err) {
    throw new Error(err.response ? err.response.data : err);
  }
}


  async function uploadAllLinks(links, message) {
  
  const results = [];
  
  for (const link of links) {
    const result = await uploadImgbb(link);
    results.push(result);
  }

    
  message.reply(`${results.join('\n\n')}`);
    
}





module.exports = {
  config: {
    name: "رابط",
    aliases: ["imgbb", "upload", "انشر", "أنشر"],
    version: "1.0",
    author: "لوفي",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "test"
  },

  onStart: async function({ event, args, message }) {
    let TID = event.senderID;
    if (!global[TID]) global[TID] = {}; 
    global[TID] = {
      statue: true,
    };
    message.reply('𝗦𝗘𝗡𝗗 𝗔𝗟𝗟 𝗧𝗛𝗘 𝗣𝗛𝗢𝗧𝗢𝗦 𝗬𝗢𝗨 𝗪𝗘𝗡𝗧 𝗧𝗢 𝗣𝗢𝗦𝗧 𝗧𝗢𝗚𝗘𝗧𝗛𝗘𝗥 🌝 🌝');
    message.reaction('⬇️', event.messageID);
  },

   onChat: async function({ message, event }) {
    
    let TID = event.senderID;
     try { 
      if (global[TID] && global[TID].statue == true) {
      if (event.attachments[0]) {
       // message.reaction('⏳', event.messageID);
        const attachments = event.attachments;
        const links = attachments.map(attachment => attachment.url);
      
        uploadAllLinks(links, message);
       // message.reaction('⌛', event.messageID);
        message.reaction('✅', event.messageID);
        global[TID] = null;
      }
    }
  } catch(error) {}
}
};
