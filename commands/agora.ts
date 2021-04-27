import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Agora implements Command {
	name = 'agora';
	aliases = ['now'];
	description = 'Mostro se está acontecendo algum evento no CLL (Agora).';
	usage = 'agora';

	exec(message: Message, args: string[]) {
		let reply = 'Agora estamos na inauguração do servidor  :heart_eyes:';

		message.channel.send(reply);
	}
}
