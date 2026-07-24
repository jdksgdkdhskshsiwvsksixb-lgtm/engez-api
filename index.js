import { Client } from 'whatsapp';
import { group, access } from '../system/control.js';
import UltraDB from '../system/UltraDB.js';
import sub from '../sub.js';

/* ================= Client ================= */
const client = new Client({
    phoneNumber: "2126147998810", // Bot number - 12 رقم
    prefix: ["!", ".", "/"],
    fromMe: false,
    owners: [
        {
            "name": "Nagoro",
            "jid": "212772382018@s.whatsapp.net",
            "lid": "212614727360481@lid"
        }
    ],
    settings: { noWelcome: false },
    commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* ================= Database ================= */
if (!global.db) {
    global.db = new UltraDB();
}

/* ================= Config ================= */
const { config } = client;
config.info = {
    nameBot: "JINGLIU",
    nameChannel: "●❯━━━━ 𝕋𝕠𝕦𝕔𝕙𝕖 𝔽𝕒𝕞𝕖 ━━━━❮●",
    idChannel: "12036300256767646@newsletter",
    urls: {
        repo: "https://github.com/DovannU/Power-AI",
        api: "https://aman-api.web.id/",
