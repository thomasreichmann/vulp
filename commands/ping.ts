import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Ping implements Command {
	name = 'ping';
	aliases = ['p'];
	description = 'Mostra a latencia entre o bot e o discord';
	usage = 'ping';

	exec(message: Message, args: string[]) {
		let delay = parseInt(args[0] ?? 0);
		let beforeTime = message.createdTimestamp;

		setTimeout(async () => {
			let m = await message.channel.send('Pong! Calculando delay...');
			let afterTime = m.createdTimestamp;

			m.edit(`Pong! ${afterTime - beforeTime}ms`);
		}, delay);
	}
}
