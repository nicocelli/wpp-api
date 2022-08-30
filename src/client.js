const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const client = new Client({
    puppeteer: {
        executablePath: getPath(),
        args: ['--no-sandbox'],
    },
    authStrategy: new LocalAuth({ clientId: "client-one" })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Client is ready!');
});


function getPath() {
    switch (process.env.SO) {
        case "MAC":
            return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        case "WIN":
            return "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
        default:
            return "/usr/bin/google-chrome-stable";
    }
}

module.exports = client;