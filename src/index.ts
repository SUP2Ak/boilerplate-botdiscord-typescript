import { config } from 'dotenv'; config();
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


const handlers = join(__dirname, "handlers");

readdirSync(handlers).forEach(file => {
    if (!file.endsWith(".js") && !file.endsWith(".ts")) return;
    let handler = require(`${handlers}/${file}`);
    handler(client);
    console.log(`Successfully loaded handler ${file}`);
});

client.login(process.env.TOKEN)