import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

module.exports = (client: Client) => {
    let events = join(__dirname, "../events");
    readdirSync(events).forEach(file => {
        if (!file.endsWith(".js") && !file.endsWith(".ts")) return;
        let event = require(`${events}/${file}`).default;
        event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
        console.log(`Successfully loaded event ${event.name}`);
    });
};