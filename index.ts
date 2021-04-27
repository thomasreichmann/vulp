if (process.env.NODE_ENV != 'production') {
	require('dotenv').config();
	console.log('Dev mode');
}

import Discord from 'discord.js';
import EventController from './controllers/EventController';

import fs from 'fs/promises';
import ClientController from './controllers/ClientController';

ClientController.client = new Discord.Client();

let client = ClientController.client;

(async () => {
	// Loading all command and effect files so that decorators get executed
	await loadSideEffects();

	// Adding the events to the discord client
	for (let event of EventController.events) {
		client.on(event.name, event.exec);
	}
})();

async function loadSideEffects() {
	let files = await fs.readdir('./events');
	for (let file of files) {
		require(`./events/${file}`);
	}

	files = await fs.readdir('./commands');
	for (let file of files) {
		require(`./commands/${file}`);
	}
}

client.on('error', e => console.error(e));
client.on('warn', e => console.warn(e));

client.login(process.env.TOKEN);
