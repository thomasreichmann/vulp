import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';

@chatCommand()
class SetHelpChannel implements Command {
	name = 'setHelpChannel';
	aliases = ['hpc'];
	description = 'Define o canal que vai ser utilizado para notificar o uso do comando ajuda';
	usage = 'setHelpChannel #[channel]';
	hideHelp = true;
	permission = 8;

	async exec(message: Message, args: string[]) {
		/**
		 * Even through we are deleting the message, the object still holds all of it's info
		 * it seems idiotic and that its going to generate errors but I assure you,
		 * its fine.
		 *  */
		await message.delete();
		let channel = message.mentions.channels.first();

		try {
			// Get the config from the config service
			let config = await ConfigService.getConfig(message.guild!.id);

			// If there is no channel in the message, simply return the current channel in the configuration and stop exec
			let currChannel = message.guild!.channels.cache.find(a => a.id === config.helpChannelId);
			if (!channel) return (await message.reply(`Canal de ajuda atual: <#${currChannel?.id}>`)).delete({ timeout: 3500 });

			// Alter the help channel to the one we just got and save the config
			config.helpChannelId = channel.id;
			await config.save();

			// Send confirmation message that gets self-destructed
			(await message.channel.send(`Canal <#${channel.id}> definido para ajuda`)).delete({ timeout: 2500 });
		} catch (err) {
			throw err;
		}
	}
}
