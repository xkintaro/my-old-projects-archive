const { SlashCommandBuilder } = require('discord.js');
const { giveCharacterToUser } = require('../service/user.service');
const User = require('../model/user.model');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give-character')
        .setDescription('Belirtilen kullanıcıya karakter ekler.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Karakter eklenecek kullanıcı')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('karakter_id')
                .setDescription('Eklenecek karakterin ID\'si')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı');
        const characterId = interaction.options.getString('karakter_id');

        try {
            const userData = await User.findOne({ userId: user.id });
            if (!userData) {
                return await interaction.reply('❌ Bu kullanıcı sistemde kayıtlı değil.');
            }

            const result = await giveCharacterToUser(user.id, characterId);

            await interaction.reply(`✅ Karakter başarıyla eklendi! `);

        } catch (err) {
            console.error(err);
            await interaction.reply('⚠️ Karakter eklenirken bir hata oluştu.');
        }
    }
};
