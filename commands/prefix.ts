import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Prefix implements Command {
	name = 'prefix';
	aliases = [];
	description = 'Muda o prefixo do bot';
	usage = 'prefix [new]';
	hideHelp = true;
	permission = 8;

	async exec(message: Message, args: string[]) {
		let config = await ConfigService.getConfig(message.guild!.id);

		let prefix = args[0];
		if (prefix) {
			config.prefix = prefix;
			await config.save();

			// TODO: create a better confirmation and error message
			message.channel.send(`Prefixo modificado com sucesso para: \`${prefix}\``);
		} else {
			message.channel.send(`Nao foi encontrado um prefixo no comando, ele continua sendo: \`${config.prefix}\``);
		}
	}
}
