const { SlashCommandBuilder } = require('discord.js');
const User = require('../model/user.model');
const UserCharacter = require('../model/user-characters.model');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('karakter-kusan')
        .setDescription('Sahip olduğun bir karakteri kuşanır.')
        .addStringOption(option =>
            option.setName('karakter_id')
                .setDescription('Kuşanmak istediğin karakterin benzersiz ID\'si (Örn: 0010427)')
                .setRequired(true)
                .setMinLength(7)
                .setMaxLength(7)
        ),

    async execute(interaction) {
        const userCharacterIdToEquip = interaction.options.getString('karakter_id');
        const discordUserId = interaction.user.id;

        await interaction.deferReply({ ephemeral: true });

        try {
            const characterInstance = await UserCharacter.findOne({
                userId: discordUserId,
                userCharacterId: userCharacterIdToEquip
            });

            if (!characterInstance) {
                return interaction.editReply(`⚠️ **${userCharacterIdToEquip}** ID'li karakter bulunamadı veya bu karakter size ait değil.`);
            }

            const updatedUser = await User.findOneAndUpdate(
                { userId: discordUserId },
                { equippedCharacter: userCharacterIdToEquip },
                { new: true, upsert: false }
            );

            if (!updatedUser) {
                return interaction.editReply('❌ Sistemde bir hata oluştu, kullanıcı profiliniz bulunamadı. Lütfen kayıtlı olduğunuzdan emin olun.');
            }

            return interaction.editReply(`✅ Başarıyla **${userCharacterIdToEquip}** ID'li karakteri kuşandınız!`);

        } catch (err) {
            console.error('Karakter kuşanma hatası:', err);
            return interaction.editReply('⚠️ Karakter kuşanırken beklenmedik bir sunucu hatası oluştu.');
        }
    }
};