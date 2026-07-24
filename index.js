const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({ auth: state, printQRInTerminal: true })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, qr } = update
        if(qr) {
            console.log('امسح الكيو ار ده:')
            qrcode.generate(qr, {small: true})
        }
        if(connection === 'close') startBot()
        else if(connection === 'open') console.log('البوت اشتغل ✅')
    })

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.key.fromMe && msg.message) {
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text
            if (text === 'بوت') {
                await sock.sendMessage(msg.key.remoteJid, { text: 'ايوا انا موجود 👋' })
            }
        }
    })
}
startBot()
