import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { REST, Routes } from 'discord.js';
import { env } from '../config/env.js';
import type { BotClient } from '../core/BotClient.js';
import type { SlashCommand } from '../types/command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const loadCommands = async (client: BotClient): Promise<void> => {
    const commandsData: any[] = [];

    const commandsPath = join(__dirname, '../commands');

    try {
        const commandFolders = await readdir(commandsPath);

        for (const folder of commandFolders) {
            const folderPath = join(commandsPath, folder);
            const commandFiles = (await readdir(folderPath)).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

            for (const file of commandFiles) {
                const filePath = join(folderPath, file);

                const module = await import(pathToFileURL(filePath).href);
                const command: SlashCommand = module.default;

                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    commandsData.push(command.data.toJSON());
                } else {
                    console.warn(`[Warning] Missing Structure: The command in ${filePath} does not conform to the 'SlashCommand' interface.`);
                }
            }
        }

        const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);

        console.log(`[System] ${commandsData.length} commands are loading to Discord...`);

        await rest.put(
            Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
            { body: commandsData }
        );

        console.log(`[Success] Commands have been automatically synchronized to the test server.`);

    } catch (error) {
        console.error("[Error] Command loader crashed:", error);
    }
};