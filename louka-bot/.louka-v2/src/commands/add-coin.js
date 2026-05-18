const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../model/user.model');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-coin')
        .setDescription('Etiketlenen kullanıcıya belirtilen miktarda coin ekler (test).')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Coin verilecek kullanıcıyı etiketle')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('miktar')
                .setDescription('Eklenecek coin miktarı (pozitif tam sayı)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('kullanıcı');
        const amount = interaction.options.getInteger('miktar');

        if (!Number.isInteger(amount)) {
            return interaction.reply({ content: '❌ Miktar tam sayı olmalı.', ephemeral: true });
        }
        if (amount === 0) {
            return interaction.reply({ content: '❌ Miktar 0 olamaz.', ephemeral: true });
        }

        try {
            const updated = await User.findOneAndUpdate(
                { userId: target.id },
                { $inc: { coin: amount } },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );

            const embed = new EmbedBuilder()
                .setTitle('💰 Coin Eklendi')
                .setDescription(`${target.tag} kullanıcısına **${amount}** coin eklendi.`)
                .addFields(
                    { name: 'Yeni Bakiye', value: `${updated.coin}`, inline: true },
                    { name: 'Kullanıcı', value: `${target.tag} (${target.id})`, inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (err) {
            console.error('add-coin hata:', err);
            await interaction.reply({ content: '⚠️ Coin eklenirken hata oldu.', ephemeral: true });
        }
    },
};
