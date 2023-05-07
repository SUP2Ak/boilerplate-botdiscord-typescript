import { Client, GatewayIntentBits, Collection, PermissionFlagsBits, } from "discord.js";
//import { Command, SlashCommand } from './types'
import { readdirSync } from "fs";
import { join } from 'path'
import { config } from 'dotenv'

config();

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, MessageContent, GuildMessages, GuildMembers] });

const handlers = join(__dirname, 'handlers');
readdirSync(handlers).forEach((file) => {require(`${handlers}/${file}`)(client)});

client.login(process.env.TOKEN);