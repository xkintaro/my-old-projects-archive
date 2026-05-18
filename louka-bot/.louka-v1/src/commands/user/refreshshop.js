const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

const {
    refreshItemShop,
    refreshWeaponShop,
    refreshCharacterShop,
} = require(path.resolve(__dirname, '../../database/services/shop.service'));

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hour}:${minute}`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refreshshop')
        .setDescription('Shopları hemen yeniler.'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            await refreshItemShop(true);
            await refreshWeaponShop(true);
            await refreshCharacterShop(true);

            const nowStr = formatDate(new Date());

            const embed = new EmbedBuilder()
                .setTitle('🛒 Shop Yenileme')
                .setDescription(`Shoplar başarıyla yenilendi! \nTarih: ${nowStr}`)
                .setColor('#00ff00')
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Shop yenileme hatası:', error);
            await interaction.editReply('Shop yenilenirken bir hata oluştu.');
        }
    },
};
