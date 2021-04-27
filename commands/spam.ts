import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Spam implements Command {
	name = 'spam';
	aliases = [];
	description = 'Sai e entra repetidamente de um canal de voz.';
	usage = 'spam [n]';

	async exec(message: Message, args: string[]) {
		let limit = 50;
		let d = 10;

		let amt = Number(args[0] ?? d);

		if (isNaN(amt)) return message.reply('O Argumento precisa ser um numero');
		if (d > 50) return message.reply(`Limite de tentativas: ${limit}`);

		let voice = message.member?.voice;

		if (!voice) return message.reply('Voce nao esta em um canal de voz');

		let i = 0;
		join();

		function join() {
			voice?.channel
				?.join()
				.then(() => {
					voice?.channel?.leave();
					setTimeout(() => {
						i++;
						if (i >= amt) return console.log(`Fim do spam: ${amt}`);
						join();
					}, 300);
				})
				.catch(err => console.error(err));
		}
	}
}
