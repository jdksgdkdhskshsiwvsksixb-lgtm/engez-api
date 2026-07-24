const { default: makeWASocket, useMultiFileAuthState, delay } = require('@whiskeysockets/baileys');

const BOT_NAME = '𝙹𝙸𝙽𝙶𝙻𝙸𝚄_𝙱𝙾𝚃'
const DEV_NAME = '𝙰𝙺𝙸 𝙷𝙰𝚈𝙰𝙺𝙰𝚆𝙰'
const DEV_NUMBER = '212772382018'
const BOT_NUMBER = '212614799881'

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({ 
        auth: state,
        browser: [BOT_NAME, 'Chrome', '1.0.0']
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection } = update
        if(connection === 'close') startBot()
        else if(connection === 'open') console.log(`${BOT_NAME} اشتغل ✅`)
    })

    if (!sock.authState.creds.registered) {
        await delay(3000);
        const phoneNumber = BOT_NUMBER
        const code = await sock.requestPairingCode(phoneNumber)
        console.log(`كود الاقتران بتاع ${BOT_NAME}: ${code}`)
        console.log('روح واتساب > الاجهزة المرتبطة > ربط جهاز > ادخل الكود')
    }

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.key.fromMe && msg.message) {
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text
            const sender = msg.key.remoteJid
            
            if (text === 'بوت') {
                await sock.sendMessage(sender, { text: `ايوا انا ${BOT_NAME} موجود 👋\nالمطور: ${DEV_NAME}` })
            }
            
            if (text === 'المطور') {
                await sock.sendMessage(sender, { text: `المطور: ${DEV_NAME}\nالرقم: +${DEV_NUMBER}` })
            }
        }
    })
}
startBot()
