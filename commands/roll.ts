import { Message } from 'discord.js';
import ClientController from '../controllers/ClientController';
import { chatCommand, Command } from '../controllers/CommandController';
import Discord from 'discord.js';

@chatCommand()
class Roll implements Command {
	name = 'roll';
	aliases = [];
	description = 'Roda um numero de 1 a 100';
	usage = 'roll [max]';

	exec(message: Message, args: string[]) {
		let max = parseInt(args[0] ?? 100);

		message.reply(`${Math.floor(Math.random() * max)}!`);
	}
}
