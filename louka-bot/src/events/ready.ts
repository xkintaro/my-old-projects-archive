import { Events, ActivityType, type Client } from 'discord.js';
import type { BotEvent } from '../types/event.js';

const event: BotEvent<Events.ClientReady> = {
    name: Events.ClientReady,
    once: true,
    execute: (client: Client<true>) => {
        console.log(`[Success] Network connection established. Identity: ${client.user.tag}`);

        client.user.setActivity({
            name: 'It evolves day by day.',
            type: ActivityType.Watching,
        });
    }
};

export default event;