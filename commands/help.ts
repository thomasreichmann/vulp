import { Message } from 'discord.js';
import CommandController, { chatCommand, Command } from '../controllers/CommandController';
import Discord from 'discord.js';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Help implements Command {
	name = 'help';
	aliases = ['h', 'ajuda'];
	description = 'Lista todos os comandos do bot.';
	usage = 'help';

	async exec(message: Message, args: string[]) {
		let config = await ConfigService.getConfig(message.guild!.id);
		let commands = CommandController.commands;

		if (!args.length) {
			// Caso o comando tenha hideHelp, nao mostramos ele no help
			let c = commands
				.filter(command => message.member?.hasPermission(8) || !command.hideHelp)
				.map(command => `\`${command.name}\``)
				.join(', ');
			let embed = new Discord.MessageEmbed()
				.addField('Aqui esta uma lista dos meus comandos:', c)
				.setFooter(`Mande '${config.prefix}help [comando]' para ver um comando especifico`);

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
		if (command.usage) data.push(`**Uso:** \`${config.prefix}${command.usage}\``);

		data.push(`**Cooldown:** \`${command.cooldown || 3} segundo(s)\``);

		embed.addField(`**Nome:** \`${command.name}\`\n`, data);
		message.channel.send(embed);
	}
}
