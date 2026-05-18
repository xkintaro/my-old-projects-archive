const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../model/user.model');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-users')
        .setDescription('Sisteme kayıtlı kullanıcıları gösterir!'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const users = await User.find({});

            if (users.length === 0) {
                return interaction.editReply('📭 Henüz kayıtlı kullanıcı bulunmuyor.');
            }

            let userList = [];

            for (const dbUser of users) {
                try {
                    const discordUser = await interaction.client.users.fetch(dbUser.userId);
                    userList.push(`• **${discordUser.tag}** (${discordUser.id})`);
                } catch {
                    userList.push(`• ❌ Bilinmeyen kullanıcı (ID: ${dbUser.userId})`);
                }
            }

            const embed = new EmbedBuilder()
                .setTitle('📋 Kayıtlı Kullanıcılar')
                .setColor(0x2b2d31)
                .setDescription(userList.join('\n'))
                .setFooter({ text: `Toplam: ${users.length} kullanıcı` });

            await interaction.editReply({ embeds: [embed] });

        } catch (err) {
            console.error(err);
            await interaction.editReply('⚠️ Kullanıcı listesi alınırken bir hata oluştu.');
        }
    },
};
