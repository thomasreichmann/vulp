import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Lives implements Command {
	name = 'lives';
	aliases = ['l'];
	description = 'Mostro as próximas Lives do CLL.';
	usage = 'lives';

	exec(message: Message, args: string[]) {
		let reply =
			'As próximas Lives serão:\n:fire: Segunda 19:30 - Liderança Jovem - Com Fênix da Justiça\n:fire: Quarta 19h- Empreendedorismo Feminino - Com Caroline Silva\n:fire: Quinta 19:30 - Como ter a atitude de um líder - Com Flávio Lettieri';

		message.channel.send(reply);
	}
}
