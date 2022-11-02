import { Client, ClientOptions } from "discord.js";
import dotenv from 'dotenv';

import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

dotenv.config();

const token: string | undefined = process.env.token;

const client = new Client({
    intents: []
});

ready(client);
interactionCreate(client);

client.login(token);
console.log(client);