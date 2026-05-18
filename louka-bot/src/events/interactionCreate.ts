import { Events, type Interaction } from 'discord.js';
import type { BotEvent } from '../types/event.js';
import type { BotClient } from '../core/BotClient.js';

const event: BotEvent<Events.InteractionCreate> = {
    name: Events.InteractionCreate,
    execute: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const client = interaction.client as BotClient;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`[Warning] User tried ${interaction.commandName} but it's not in the memory.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`[Error] ${interaction.commandName} crashed while running:`, error);

            const errorMsg = { content: '[Error] This command could not be executed. The architect has been notified.', ephemeral: true };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMsg);
            } else {
                await interaction.reply(errorMsg);
            }
        }
    }
};

export default event;