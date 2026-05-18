import { Client, Collection, type ClientOptions } from 'discord.js';
import type { SlashCommand } from '../types/command.js';

export class BotClient extends Client {
    public commands: Collection<string, SlashCommand>;

    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }
}