const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.token);