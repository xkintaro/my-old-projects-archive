const fs = require('fs');
const path = require('path');
const { isUserRegistered } = require('../database/services/user.service');

const commands = new Map();

const commandsPath = __dirname;
const commandFolders = fs.readdirSync(commandsPath).filter(f => fs.statSync(path.join(commandsPath, f)).isDirectory());

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(folderPath, file));

        if (command.data && command.execute) {
            const wrappedCommand = {
                ...command,
                async execute(interaction) {
                    if (!command.skipCheck) {
                        const userId = interaction.user.id;
                        const registered = await isUserRegistered(userId);
                        if (!registered) {
                            return interaction.reply({
                                content: '❌ Bu komutu kullanabilmek için önce kayıt olmalısın. `/register` komutunu kullan.',
                                ephemeral: true
                            });
                        }
                    }

                    return command.execute(interaction);
                }
            };

            commands.set(command.data.name, wrappedCommand);
        }
    }
}

module.exports = commands;
