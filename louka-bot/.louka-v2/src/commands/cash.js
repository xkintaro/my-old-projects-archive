const { SlashCommandBuilder } = require('discord.js');
const User = require('../model/user.model');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cash')
        .setDescription('Kullanıcının coin miktarını gösterir.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Coin miktarını görmek istediğin kullanıcıyı etiketle (isteğe bağlı)')
                .setRequired(false)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('kullanıcı') || interaction.user;

        try {
            const userDoc = await User.findOne({ userId: target.id });
            const coinAmount = userDoc ? userDoc.coin ?? 0 : 0;

            const message = target.id === interaction.user.id
                ? `💰 **${interaction.user.displayName}**, you currently have **${coinAmount}** Coin!` : `💰 **${target.displayName}** has **${coinAmount}** Coin!`;

            await interaction.reply({
                content: message,
                ephemeral: false
            });
        } catch (err) {
            console.error('hata', err);
            await interaction.reply({
                content: 'hata',
                ephemeral: true
            });
        }
    }
};
