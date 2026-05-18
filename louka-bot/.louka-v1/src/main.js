require('dotenv').config();
const client = require('./client');
const connectDB = require('./database/mongoose');

// Komutları merkezi index.js'den al
const commands = require('./commands');
client.commands = commands;

const fs = require('fs');
const path = require('path');

// MongoDB bağlantısı
connectDB();

// Eventleri yükle
const eventFiles = fs.readdirSync(path.join(__dirname, 'events'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Discord botu başlat
client.login(process.env.TOKEN);

// ✨ Admin panelini başlat
require('./web/server');
