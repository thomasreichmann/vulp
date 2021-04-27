import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Ajuda implements Command {
	name = 'ajuda';
	aliases = [];
	description = 'Chamo alguém da equipe pra te ajudar! (Use com sabedoria)';
	usage = 'ajuda';

	exec(message: Message, args: string[]) {
		let reply =
			':cold_sweat:   Já estou chamando a equipe pra te ajudar! se possível, fique online na nossa sala "Ajuda / Suporte"';

		message.channel.send(reply);
	}
}
