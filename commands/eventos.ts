import Discord, { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Eventos implements Command {
	name = 'eventos';
	aliases = ['e'];
	description = 'Mostra a programacao de eventos do cll.';
	usage = 'eventos';

	async exec(message: Message, args: string[]) {
		let embed = new Discord.MessageEmbed()
			.setDescription(`Essa é a programação de Abril! :blue_heart::orange_heart:`)
			.setImage(
				`https://static.wixstatic.com/media/52cb94_2dbb9a6dcc784c3f89665909f4c598e2~mv2.png/v1/fill/w_1091,h_683,al_c,q_95/Calendario%20CLL%20Abril_Social%20Media%20Art%201-.webp`
			);

		message.channel.send(embed);
	}
}
