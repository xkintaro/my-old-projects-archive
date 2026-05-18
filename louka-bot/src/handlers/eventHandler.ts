import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import type { BotClient } from '../core/BotClient.js';
import type { BotEvent } from '../types/event.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const loadEvents = async (client: BotClient): Promise<void> => {
    const eventsPath = join(__dirname, '../events');

    try {
        const eventFiles = (await readdir(eventsPath)).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of eventFiles) {
            const filePath = join(eventsPath, file);
            const module = await import(pathToFileURL(filePath).href);
            const event: BotEvent<any> = module.default;

            if (event.name && event.execute) {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
            } else {
                console.warn(`[Warning] Missing Structure: The event in ${filePath} does not conform to the 'BotEvent' interface.`);
            }
        }

        console.log(`[Success] The sensory neural network (Events) has been activated.`);

    } catch (error) {
        console.error("[Error] Event loader crashed:", error);
    }
};