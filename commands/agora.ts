import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Agora implements Command {
	name = 'agora';
	aliases = ['now'];
	description = 'Mostro se está acontecendo algum evento no CLL (Agora).';
	usage = 'agora';

	async exec(message: Message, args: string[]) {
		let guild = message.guild!;
		let config = await ConfigService.getConfig(guild.id);

		/**
		 * If there is anything after the command, we assume that its an admin trying to set a new event
		 * so if the message author has the correct permission we take the arguments and add them as the new event.
		 * Otherwise we just send the current ongoing event
		 */
		if (args[0] && message.member?.hasPermission(8)) {
			// We delete the original message (no need to await here)
			message.delete();

			console.log(message.cleanContent);

			// Define and save the new event to the config
			let newEvent = args.join(' ');
			config.currentEvent = newEvent;
			await config.save();

			(await message.channel.send(`Novo evento definido como: \`${config.currentEvent}\``)).delete({ timeout: 3500 });
		} else {
			await message.channel.send(config.currentEvent);
		}
	}
}
