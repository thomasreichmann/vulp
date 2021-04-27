import { Message } from 'discord.js';
import ClientController from '../controllers/ClientController';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigController from '../controllers/ConfigController';
import Discord from 'discord.js';

@chatCommand()
class Invite implements Command {
	name = 'invite';
	aliases = ['i'];
	description = 'Mostra o link de invite do bot';
	usage = 'invite';

	async exec(message: Message, args: string[]) {
		let client = ClientController.client;
		let link = await client.generateInvite();

		let embed = new Discord.MessageEmbed()
			.setColor(ConfigController.color)
			.setDescription(`Voce pode me adicionar ao seu server por **[aqui](${link})!**`);
		try {
			message.channel.send(embed);
		} catch (err) {
			console.error(`Erro ao mandar invite embed:\n${err}`);
		}
	}
}
