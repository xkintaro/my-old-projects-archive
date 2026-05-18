require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = require('./commands');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('🟢 MongoDB bağlantısı başarılı.');
    } catch (err) {
        console.error('🔴 MongoDB bağlantı hatası:', err);
    }
})();

function loadEvents(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            loadEvents(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            const event = require(fullPath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

loadEvents(path.join(__dirname, 'events'));

client.login(process.env.TOKEN)
    .then(() => console.log('🤖 Bot başarıyla giriş yaptı!'))
    .catch(err => console.error('🔴 Bot giriş hatası:', err));
