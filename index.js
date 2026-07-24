import { Client } from 'whatsapp';
import { group_access } from '../system/control.js';
import UltraDB from '../system/UltraDB.js';
import sub from '../sub.js';

/* ----------------- Client ----------------- */
const client = new Client({
    phoneNumber: "212614799881", // Bot number
    prefix: "!", "!.",
    fromMe: false,
    owners: [{
        "name": "Nagoro",
        "jid": "212772382018@s.whatsapp.net",
        "lid": "212614727360481610@lid"
    }
    ],
    settings: { autoRead: false },
    commandPath: "./plugins"
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* ----------------- Database ----------------- */
if (global.db) {
    global.db = new UltraDB();
}

/* ----------------- Config ----------------- */
const { config } = client;
config.info = {
    nameBot: "JINGLIU",
    nameChannel: "●❯━━━━ 𝕋𝕠𝕦𝕔𝕙𝕖 𝔽𝕒𝕞𝕖 ━━━━❮●",
    idChannel: "12036300256767646@newsletter",
    urls: {
        repo: "https://github.com/DovannU/Power-AI",
        api: "https://aman-api.web.id/",
        channel: "https://whatsapp.com/channel/0029VaoB2nZA1gAN5PNvoD6r"
    },
    copyright: {
        pack: "Sine",
        author: "3"
    },
    images: [
        "https://files.catbox.moe/4qGhqo.jpg",
        "https://files.catbox.moe/4qGhqo.jpg",
        "https://files.catbox.moe/4qGhqo.jpg"
    ]
};

/* ----------------- Start ----------------- */
client.start();

setTimeout(() => {
    if (client.commandSystem) {
        sub(client)
    }
}, 2000);

/* ----------------- Catch Errors ----------------- */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err)
});

/* ----------------- Memory Monitor ----------------- */
setInterval(() => {
    const used = process.memoryUsage().rss / 1024 / 1024
    if (used > 800) {
        console.log(`⚠️ Bot memory full (${used.toFixed(1)}MB), restarting...`)
        process.exit(1)
    }
}, 300000)

/* */
