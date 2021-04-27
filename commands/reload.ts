import { Message } from 'discord.js';
import CommandController, { chatCommand, Command } from '../controllers/CommandController';

import fs from 'fs/promises';

@chatCommand()
class Reload implements Command {
	name = 'reload';
	aliases = ['r'];
	description = 'Recarrega os comandos do bot';
	usage = 'reload';
	hideHelp = true;

	async exec(message: Message, args: string[]) {
		message.delete();

		let files = await fs.readdir('./commands/');

		// Clear the commands from the controller
		CommandController.commands = [];

		let i = 0;
		for (let file of files) {
			if (file.endsWith('.ts')) {
				delete require.cache[require.resolve(`./${file}`)];
				i++;
			}
		}

		files = await fs.readdir('./commands');
		for (let file of files) {
			if (file.endsWith('.ts')) {
				require(`./${file}`);
			}
		}

		let reloadMessage = await message.channel.send(`${i} comandos foram recarregados`);
		setTimeout(() => reloadMessage.delete(), 1500);
	}
}
