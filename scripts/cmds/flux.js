const axios = require('axios');
const { getStreamFromURL } = global.utils;

module.exports = {
    config: {
        name: 'flux',
        version: '1.1',
        author: 'Redwan',
        countDown: 0,
        longDescription: { en: 'Generate AI images based on your prompt.' },
        category: 'image',
        role: 0,
        guide: { en: '{pn} <prompt>' }
    },

    onStart: async function ({ api, event, args, message }) {
        if (!this.checkAuthor()) {
            return message.reply('Author verification failed. Command cannot be executed.');
        }

        const prompt = args.join(' ').trim();
        if (!prompt) {
            return message.reply('Please provide a prompt to generate an image.');
        }

        message.reply('Creating......!', async (err, info) => {
            if (err) return console.error(err);
            try {
                const apiURL = `https://global-redwans-apis.onrender.com/api/flux?p=${encodeURIComponent(prompt)}&mode=flux`;
                const response = await axios.get(apiURL);
                const { html } = response.data.data;
                const match = html.match(/https:\/\/aicdn\.picsart\.com\/[a-zA-Z0-9-]+\.jpg/);

                if (!match) {
                    return message.reply('Failed to generate the image. Please try again.');
                }

                const imageStream = await getStreamFromURL(match[0], 'generated_image.png');
                message.reply({ body: '✅ Image generated successfully!', attachment: imageStream });

            } catch (error) {
                console.error(error);
                message.reply('An error occurred while generating the image. Please try again.');
            }
        });
    },

    checkAuthor: function () {
        return this.config.author === 'Redwan';
    }
};
