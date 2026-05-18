import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../types/command.js';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Measures system and Discord API latency in milliseconds.'),

    execute: async (interaction: ChatInputCommandInteraction) => {
        const sent = await interaction.reply({ content: 'Measuring...', fetchReply: true });

        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = interaction.client.ws.ping;

        await interaction.editReply(`Execution Latency: ${latency}ms | API Latency: ${apiLatency}ms`);
    }
};

export default command;