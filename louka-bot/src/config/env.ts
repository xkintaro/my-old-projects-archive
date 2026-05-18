import { config } from 'dotenv';

config();

interface EnvConfig {
    DISCORD_TOKEN: string;
    CLIENT_ID: string;
    GUILD_ID: string;
}

const getEnvVariables = (): EnvConfig => {

    const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

    if (!DISCORD_TOKEN) {
        throw new Error("[Error]: DISCORD_TOKEN is missing in .env");
    }

    if (!CLIENT_ID) {
        throw new Error("[Error]: CLIENT_ID is missing in .env");
    }

    if (!GUILD_ID) {
        throw new Error("[Error]: GUILD_ID is missing in .env");
    }

    return {
        DISCORD_TOKEN,
        CLIENT_ID,
        GUILD_ID
    };
};

export const env = getEnvVariables();