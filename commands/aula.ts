import { Message, MessageEmbed } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Aula implements Command {
	name = 'aula';
	aliases = ['class'];
	description = 'Te recomendo uma aula do CLL (Especial pra você)';
	usage = 'aula';

	async exec(message: Message, args: string[]) {
		let guild = message.guild!;
		let config = await ConfigService.getConfig(guild.id);

		// Administrator options (see lives command for a better explanation its the same system)
		if (args[0] && message.member?.hasPermission(8)) {
			if (args[0] === 'add') {
				// Add the second argument to the link list of classes
				config.classes.push(args[1]);
				await config.save();

				let amt = config.classes.length;
				message.channel.send(`Aula adicionada com sucesso, agora tem ${amt} ${amt === 1 ? 'aula' : 'aulas'} no sistema`);
			} else if (args[0] === 'list') {
				let response = 'Aqui esta uma lista de todas as aulas que estao no meu sistema:\n';

				for (let aula of config.classes) {
					response += `${config.classes.indexOf(aula)}. ${aula}\n`;
				}

				let embed = new MessageEmbed()
					.setTitle('Lista de aulas')
					.setDescription(response)
					.setFooter(`Para remover uma das aulas utilize o '${config.prefix}aula remove <i>' onde i é o numero da aula`)
					.setColor(config.color);

				message.channel.send(embed);
			} else if (args[0] === 'remove') {
				let index = parseInt(args[1]);

				let removed = config.classes.splice(index, 1);
				await config.save();
				message.channel.send(`Aula removida:\n${removed}`);
			}
		} else {
			let aula = config.classes[Math.floor(Math.random() * config.classes.length)];
			let messages = [
				'Essa é minha favorita! :orange_heart:',
				'Escolhi essa só pra você!:blue_heart:',
				'Deveriam dar mais valor pra essa! :expressionless:',
				'Fiquei tão empolgada a primeira vez que vi essa! :smiling_face_with_3_hearts:',
			];

			let m = messages[Math.floor(Math.random() * messages.length)];
			message.channel.send(`${m}\n${aula}`);
		}
	}
}
