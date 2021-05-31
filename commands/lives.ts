import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Lives implements Command {
	name = 'lives';
	aliases = ['l'];
	description = 'Mostro as próximas Lives do CLL.';
	usage = 'lives';

	async exec(message: Message, args: string[]) {
		let guild = message.guild!;
		let config = await ConfigService.getConfig(guild.id);

		// Regex for matching newlines
		let newLineRegex = /(\\n)|(\n)/g;

		/**
		 * If we have an argument and the author has admin permissions we can go in to admin commands
		 * else we just print the current lives
		 */
		if (args[0] && message.member?.hasPermission(8)) {
			if (args[0] === 'set') {
				// Sets the current lives on config to a new value

				// Remove the 'set' from the args
				args.shift();

				// Set the config's lives string to the rest of the arguments concacted
				config.lives = args.join(' ');
				await config.save();

				// Send the confirmation message and auto delete it
				(await message.channel.send(`Comando atualziado para:\n${config.lives.replace(newLineRegex, '\n')}`)).delete({
					timeout: 3500,
				});
			} else if (args[0] === 'list') {
				// Returns an unparsed version of the lives value (??)
				message.channel.send(config.lives.replace(newLineRegex, '\\n'));
			}
		} else {
			message.channel.send(`As próximas Lives serão:\n${config.lives.replace(newLineRegex, '\n')}`);
		}
	}
}
