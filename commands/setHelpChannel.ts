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
		throw `TESTE DE ERRO123`;
		// /**
		//  * Even through we are deleting the message, the object still holds all of it's info
		//  * it seems idiotic and that its going to generate errors but I assure you,
		//  * its fine.
		//  *  */
		// await message.delete();
		// let role = message.mentions.roles.first();

		// try {
		// 	// Get the config from the config service
		// 	let config = await ConfigService.getConfig(message.guild!.id);

		// 	// If there is no role in the message, simply return the current role in the configuration and stop exec
		// 	let currRole = message.guild!.roles.cache.find(a => a.id === config.helperRoleId);
		// 	if (!role) return (await message.reply(`Role atual de helper: ${currRole?.name}`)).delete({ timeout: 3500 });

		// 	// Alter the helper role to the one we just got and save the config
		// 	config.helperRoleId = role.id;
		// 	await config.save();

		// 	// Send confirmation message that gets self-destructed
		// 	(await message.channel.send(`Role \`${role.name}\` definida para ajuda`)).delete({ timeout: 2500 });
		// } catch (err) {
		// 	throw err;
		// }
	}
}
