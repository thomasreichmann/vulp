import { Message } from 'discord.js';
import ClientController from '../controllers/ClientController';
import { chatCommand, Command } from '../controllers/CommandController';
import Discord from 'discord.js';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Invite implements Command {
	name = 'invite';
	aliases = ['i'];
	description = 'Mostra o link de invite do bot';
	usage = 'invite';
	hideHelp = true;
	permission = 8;

	async exec(message: Message, args: string[]) {
		let config = await ConfigService.getConfig(message.guild!.id);

		let client = ClientController.client;
		let link = await client.generateInvite();

		let embed = new Discord.MessageEmbed()
			.setColor(config.color)
			.setDescription(`Voce pode me adicionar ao seu server por **[aqui](${link})!**`);
		try {
			message.channel.send(embed);
		} catch (err) {
			console.error(`Erro ao mandar invite embed:\n${err}`);
		}
	}
}
