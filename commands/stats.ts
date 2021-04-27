import { Message } from 'discord.js';
import ClientController from '../controllers/ClientController';
import { chatCommand, Command } from '../controllers/CommandController';
import Discord from 'discord.js';

@chatCommand()
class Stats implements Command {
	name = 'stats';
	aliases = ['s'];
	description = 'Mostra a quantidade de guildas presentes no bot';
	usage = 'stats';

	exec(message: Message, args: string[]) {
		let client = ClientController.client;

		let users = 0;
		let guilds = 0;

		client.guilds.cache.forEach(guild => {
			users += guild.memberCount;
			guilds++;
		});

		let embed = new Discord.MessageEmbed().addFields([
			{ name: 'Guilds :file_cabinet:', value: guilds },
			{ name: 'Users :busts_in_silhouette:', value: users },
		]);

		message.channel.send(embed);
	}
}
