import { GatewayIntentBits } from 'discord.js';
import { BotClient } from './core/BotClient.js';
import { env } from './config/env.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';

const client = new BotClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

const startSystem = async () => {
    await loadEvents(client);
    await loadCommands(client);

    await client.login(env.DISCORD_TOKEN);
};

startSystem();