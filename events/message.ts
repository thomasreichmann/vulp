import { Message } from 'discord.js';
import CommandController from '../controllers/CommandController';
import EventController, { discordEvent, DiscordEvent } from '../controllers/EventController';
import ConfigService from '../services/ConfigService';

@discordEvent()
class MessageEvent implements DiscordEvent {
	name = 'message';

	async exec(message: Message) {
		// TODO: if the bot is mentioned with @ it should handle the message as a command
		if (message.guild == null) return;
		if (message.author.bot) return;

		let config = await ConfigService.getConfig(message.guild.id);

		if (!message.content.startsWith(config.prefix) || message.author.bot) return;

		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift()?.toLowerCase();

		const cmd = CommandController.get(command);
		if (!cmd) return;

		// Check de permissoes
		if (cmd.ids && !cmd.ids.find(id => id === message.author.id)) return;

		// The default permission integer for @everyone is 0
		if (!message.member?.hasPermission(cmd.permission ?? 0)) return;

		if (cmd.guilds && cmd.guilds.find(id => id === message.guild?.id)) return;

		try {
			await cmd.exec(message, args);
		} catch (err) {
			let info = `**${message.member.displayName}:${message.member.id} | ${cmd.name}**\n\`${err.stack}\``;
			await message.channel.send(`Erro ao executar o comando contate um administrador, extra info:\n${info}`);
		}
	}
}
