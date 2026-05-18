const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const { registerUser } = require(path.resolve(__dirname, '../../database/services/user.service'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Bot sistemine kayıt ol.'),

    skipCheck: true,

    async execute(interaction) {
        const userId = interaction.user.id;
        const username = interaction.user.username;
        const user = await registerUser(userId, username);

        if (!user) {
            return await interaction.reply({ content: '❌ Zaten kayıtlısın.', ephemeral: true });
        }

        await interaction.reply({ content: `✅ Başarıyla kayıt oldun, ${username}!`, ephemeral: true });
    }
};