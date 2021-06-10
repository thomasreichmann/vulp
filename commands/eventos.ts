import Discord, { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Eventos implements Command {
	name = 'eventos';
	aliases = ['e'];
	description = 'Mostra a programacao de eventos do cll.';
	usage = 'eventos';

	async exec(message: Message, args: string[]) {
		let config = await ConfigService.getConfig(message.guild!.id);

		if (args[0] && message.member?.hasPermission(8)) {
			if (args[0] === 'set') {
				// Remove the first element (argument)
				args.shift();

				config.eventsUrl = args.join(' ');
				await config.save();

				message.channel.send('Imagem do comando "eventos" atualizada com sucesso');
			}
		} else {
			let url = config.eventsUrl;

			let embed = new Discord.MessageEmbed()
				.setDescription(`Essa é a programação de Abril! :blue_heart::orange_heart:`)
				.setImage(url);

			message.channel.send(embed);
		}
	}
}
