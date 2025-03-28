module.exports = {
    config: {
        name: "i love you",
        version: "1.0",
        author: "Jaychris Garcia",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "i love you") return message.reply("Hmm... বস জুবায়েরও তোমাকে ভালোবাসে😇😻");
}
}
