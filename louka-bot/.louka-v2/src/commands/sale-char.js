const { SlashCommandBuilder } = require('discord.js');
const User = require('../model/user.model');
const UserCharacter = require('../model/user-characters.model');
const Market = require('../model/market.model');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sale')
        .setDescription('Sahip olduğun bir karakteri markete satışa çıkarır.')
        .addStringOption(option =>
            option.setName('usercharacterid')
                .setDescription('Satışa çıkarmak istediğin karakterin benzersiz ID\'si (ör. 0010427)')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('price')
                .setDescription('Karakterin satış fiyatı (coin)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const discordUserId = interaction.user.id;
        const userCharacterId = interaction.options.getString('usercharacterid');
        const price = interaction.options.getNumber('price');

        await interaction.deferReply({ ephemeral: true });

        try {
            const character = await UserCharacter.findOne({
                userId: discordUserId,
                userCharacterId: userCharacterId
            });

            if (!character) {
                return interaction.editReply(`❌ Bu karakter size ait değil veya böyle bir karakter bulunamadı.`);
            }

            const existingMarket = await Market.findOne({
                userCharacterId: userCharacterId
            });

            if (existingMarket) {
                return interaction.editReply(`⚠️ Bu karakter zaten markette satışta.`);
            }

            const marketItem = new Market({
                userId: discordUserId,
                characterId: character.characterId,
                userCharacterId: character.userCharacterId,
                price: price
            });

            await marketItem.save();

            return interaction.editReply(`✅ **${userCharacterId}** ID'li karakter başarıyla markete **${price} coin** fiyatla eklendi!`);

        } catch (err) {
            console.error('⚠️ /sale hata:', err);
            return interaction.editReply('⚠️ Karakter markete eklenirken bir hata oluştu.');
        }
    }
};
