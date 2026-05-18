import type { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface SlashCommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}