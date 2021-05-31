import { Message, MessageEmbed } from 'discord.js';
import ClientController from '../controllers/ClientController';
import { chatCommand, Command } from '../controllers/CommandController';
import Discord from 'discord.js';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Join implements Command {
	name = 'join';
	aliases = ['j'];
	description = 'Modifica os parametros das mensagens de membros novos e da auto role';
	usage = 'j';
	hideHelp = true;
	permission = 8;

	async exec(message: Message, args: string[]) {
		let config = await ConfigService.getConfig(message.guild!.id);

		if (args[0] === 'set') {
			// Sets the role to be added to members that join
			let newRoleId = args[1];

			config.welcomeRoleId = newRoleId;
			await config.save();

			message.channel.send('RoleId atualizado com sucesso');
		} else if (args[0] === 'add') {
			// Add a random message to be sent when members join

			// Remove the command arg
			args.shift();

			// The message template uses {0} as the place to place the members mention to
			config.welcomeMessageTemplate.push(args.join(' '));
			await config.save();

			let amt = config.welcomeMessageTemplate.length;

			message.channel.send(
				`Mensagem adicionada com sucesso, temos ${amt} ${amt === 1 ? 'mensagem' : 'mensagens'} no sistema`
			);
		} else if (args[0] === 'list') {
			// List all random messages we currently have
			// TODO: The indexof is returning -1 for all entries fix this <--
			let response = 'Aqui esta uma lista de todas as mensagens que estao no meu sistema:\n';

			for (let template of config.welcomeMessageTemplate) {
				response += `${config.classes.indexOf(template)}. ${template}\n`;
			}

			let embed = new MessageEmbed()
				.setTitle('Lista de mensagens')
				.setDescription(response)
				.setFooter(
					`Para remover uma das mensagens utilize o '${config.prefix}join remove <i>' onde i é o numero da mensagem`
				)
				.setColor(config.color);

			message.channel.send(embed);
		} else if (args[0] === 'remove') {
			// Remove a random message
			let index = parseInt(args[1]);

			let removed = config.welcomeMessageTemplate.splice(index, 1);
			await config.save();
			message.channel.send(`Mensagem removida:\n${removed}`);
		}
	}
}
