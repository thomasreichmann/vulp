import { Message, TextChannel } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';
import Discord from 'discord.js';

@chatCommand()
class Ajuda implements Command {
	name = 'ajuda';
	aliases = [];
	description = 'Chamo alguém da equipe pra te ajudar! (Use com sabedoria)';
	usage = 'ajuda';

	async exec(message: Message, args: string[]) {
		// Send the help response to the user
		let reply =
			':cold_sweat:   Já estou chamando a equipe pra te ajudar! se possível, fique online na nossa sala "Ajuda / Suporte"';
		await message.channel.send(reply);

		let guild = message.guild!;

		// Get the config for this guild
		let config = await ConfigService.getConfig(guild.id);

		// Get the helpChannel, cast it to TextChannel.
		let helpChannel = guild.channels.cache.get(config.helpChannelId) as TextChannel;

		helpChannel.send(`Ajuda solicitada por: <@${message.member?.id}> <@&${config.helperRoleId}>\nMensagem: ${message.url}`);
	}
}
