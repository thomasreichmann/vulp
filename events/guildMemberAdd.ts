import { GuildMember, TextChannel } from 'discord.js';
import { send } from 'node:process';
import ClientController from '../controllers/ClientController';
import { discordEvent, DiscordEvent } from '../controllers/EventController';
import ConfigService from '../services/ConfigService';

@discordEvent()
class GuildMemberAddEvent implements DiscordEvent {
	name = 'guildMemberAdd';

	async exec(member: GuildMember) {
		let config = await ConfigService.getConfig(member.guild!.id);

		let welcomeRole = member.guild.roles.cache.find(role => role.id === config.welcomeRoleId);
		if (welcomeRole) member.roles.add(welcomeRole!);

		let welcomeChannel = member.guild.channels.cache.find(
			channel => channel.id === '814547237338087454' || channel.id === '834927350050455552'
		) as TextChannel;

		let messageTemplate = config.welcomeMessageTemplate[Math.floor(Math.random() * config.welcomeMessageTemplate.length)];

		welcomeChannel.send(messageTemplate.replace(/\{0\}/, `<@${member.id}>`));
	}
}
