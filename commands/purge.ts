import { Message } from 'discord.js';
import ClientController from '../controllers/ClientController';
import { chatCommand, Command } from '../controllers/CommandController';
import Discord from 'discord.js';

@chatCommand()
class Purge implements Command {
	name = 'purge';
	aliases = ['p'];
	description = 'Deleta mensagens';
	usage = 'purge [n]';

	exec(message: Message, args: string[]) {
		let n = Number(args[0]);
		if (!n) return message.channel.send('Defina um numero de mensagens para serem deletadas');

		let channel = message.channel as Discord.TextChannel;
		channel.bulkDelete(n);
	}
}
