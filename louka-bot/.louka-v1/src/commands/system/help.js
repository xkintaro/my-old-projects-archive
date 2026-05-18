const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Botun komutlarını listeler.'),

    skipCheck: true,

    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📖 Yardım Menüsü')
            .setDescription('Aşağıda kullanabileceğiniz komutlar listelenmiştir:')
            .addFields(
                { name: '/ping', value: 'Botun tepki süresini gösterir.' },
                { name: '/register', value: 'Bot sistemine kayıt olmanızı sağlar.' },
                { name: '/help', value: 'Bu yardım mesajını gösterir.' }
            )
            .setFooter({ text: `${interaction.client.user.username} • Herhangi bir sorunuz varsa bize ulaşın!`, iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.deferReply();

        await interaction.followUp({ embeds: [helpEmbed], ephemeral: false });
    }
};