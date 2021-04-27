import { Message } from 'discord.js';
import CommandController from '../controllers/CommandController';
import Config from '../controllers/ConfigController';
import EventController, { discordEvent, DiscordEvent } from '../controllers/EventController';

@discordEvent()
class MessageEvent implements DiscordEvent {
	name = 'message';

	exec(message: Message) {
		if (message.guild == null) return;
		if (message.author.bot) return;

		let prefix = Config.prefix;

		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift()?.toLowerCase();

		const cmd = CommandController.get(command);
		if (!cmd) return;

		// Check de permissoes
		if (cmd.ids && !cmd.ids.find(id => id === message.author.id)) return;

		// The default permission integer for @everyone is 0
		if (!message.member?.hasPermission(cmd.permission ?? 0)) return;

		if (cmd.guilds && cmd.guilds.find(id => id === message.guild?.id)) return;

		cmd.exec(message, args);
	}
}
