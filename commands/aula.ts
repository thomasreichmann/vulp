import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Aula implements Command {
	name = 'aula';
	aliases = ['class'];
	description = 'Te recomendo uma aula do CLL (Especial pra você)';
	usage = 'aula';

	async exec(message: Message, args: string[]) {
		let reply = 'Essa é uma das minhas favoritas! :sweat_smile:\nhttps://www.clliberdade.com/introducao-a-lideranca';

		message.channel.send(reply);
	}
}
