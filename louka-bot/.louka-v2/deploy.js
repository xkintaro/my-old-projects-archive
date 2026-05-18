require('dotenv').config();
const { REST, Routes } = require('discord.js');
const commands = require('./src/commands');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        const commandsArray = Array.from(commands.values()).map(cmd => cmd.data.toJSON());

        // Guild
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commandsArray }
        );

        // Global
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commandsArray }
        );

        console.log('success!');
    } catch (error) {
        console.error(error);
    }
})();