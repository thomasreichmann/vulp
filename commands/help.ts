import { Message } from 'discord.js';
import ClientController from '../controllers/ClientController';
import CommandController, { chatCommand, Command } from '../controllers/CommandController';
import ConfigController from '../controllers/ConfigController';
import Discord from 'discord.js';

@chatCommand()
class Help implements Command {
	name = 'help';
	aliases = ['h', 'ajuda'];
	description = 'Lista todos os comandos do bot.';
	usage = 'help';

	async exec(message: Message, args: string[]) {
		let prefix = ConfigController.prefix;
		let commands = CommandController.commands;

		if (!args.length) {
			// Caso o comando tenha hideHelp, nao mostramos ele no help
			let c = commands
				.filter(command => !command.hideHelp)
				.map(command => `\`${command.name}\``)
				.join(', ');
			let embed = new Discord.MessageEmbed()
				.addField('Aqui esta uma lista dos meus comandos:', c)
				.setFooter(`Mande '${prefix}help [comando]' para ver um comando especifico`);

			return message.channel.send(embed);
		}

		let name = args[0].toLowerCase();
		let command = CommandController.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Isso nao e um comando valido');
		}

		let embed = new Discord.MessageEmbed();
		let data = [''];

		if (command.aliases) data.push(`**Apelidos:** \`${command.aliases.join(', ')}\``);
		if (command.description) data.push(`**Descricao:** \`${command.description}\``);
		if (command.usage) data.push(`**Uso:** \`${prefix}${command.usage}\``);

		data.push(`**Cooldown:** \`${command.cooldown || 3} segundo(s)\``);

		embed.addField(`**Nome:** \`${command.name}\`\n`, data);
		message.channel.send(embed);
	}
}
