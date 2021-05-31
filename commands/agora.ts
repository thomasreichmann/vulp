import { Message, MessageEmbed } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';
import ConfigService from '../services/ConfigService';

@chatCommand()
class Agora implements Command {
	name = 'agora';
	aliases = ['now'];
	description = 'Mostro se está acontecendo algum evento no CLL (Agora).';
	usage = 'agora';

	async exec(message: Message, args: string[]) {
		let guild = message.guild!;
		let config = await ConfigService.getConfig(guild.id);

		/**
		 * If there is anything after the command, we assume that its an admin trying to set a new event
		 * so if the message author has the correct permission we take the arguments and add them as the new event.
		 * Otherwise we just send the current ongoing event
		 */
		if (args[0] && message.member?.hasPermission(8)) {
			if (args[0] === 'list') {
				// If the first argument is `list` we return all of the events registered
				let response = '';
				for (let event of config.events) {
					// We extract all of the info from the template, verifying that it is formated correctly
					let dayOfWeek = parseInt(event[0]);
					let time = event[1];
					let content = event.slice(2, event.length);

					response += `${dayOfWeek}. ${time} \`${content}\`\n`;
				}

				let embed = new MessageEmbed()
					.setTitle('Lista de Eventos da semana')
					.setDescription(response)
					.setColor(config.color);

				message.channel.send(embed);
			} else if (args[0] === 'set') {
				/**
				 * Here we take the event formated as '{day of the week} {time as HH:MM-HH:MM} {content...}'
				 */

				// remove the 'set' option from the arguments
				args.shift();

				// verify the parameters
				let err = verifyFields(args);
				if (err) return message.channel.send(`Erro ao processar o evento:\n\`${err}\``);

				// Create a string from the arguments, and save as an event
				config.events.push(args.join(' '));
				// Sort the events by the first character as a number
				config.events.sort((a, b) => parseInt(a.charAt(0)) - parseInt(b.charAt(0)));
				await config.save();
				message.channel.send(`Evento ${args[0]} adicionado com sucesso:\n\`${args.join(' ')}\``);
			} else if (args[0] === 'remove') {
				let dayOfWeek = args[1];

				for (let event of config.events) {
					if (event.charAt(0) === dayOfWeek) {
						config.events.splice(parseInt(event.charAt(0)), 1);
						config.save();
						return message.channel.send(`Evento: \`${event}\`\nFoi removido do sistema`);
					}
				}

				message.channel.send(`Evento nao encontrado, use o subcomando 'list' para encontrar os eventos atuais`);
			}
		} else {
			let event = config.events.find(e => {
				let eArr = e.split(' ');

				let dayOfWeek = parseInt(eArr[0]);
				// let time = eArr[1];
				// let content = eArr.slice(2, eArr.length - 1);

				let now = new Date();

				if (now.getDay() === dayOfWeek) return true;
			});

			if (!event) return message.channel.send(`Nao temos nenhum evento para hoje!`);

			let eArr = event.split(' ');

			let time = eArr[1];
			let content = eArr.slice(2, eArr.length).join(' ');

			message.channel.send(`| ${time} | ${content}`);
		}
	}
}

/**
 * Verifies the message and will return a error message if there was an error
 * @param args
 * @param message
 * @returns
 */
function verifyFields(args: string[]) {
	// day of the week needs to be >= 0 && < 7
	let dayOfWeek = parseInt(args[0]);
	if (dayOfWeek < 0 || dayOfWeek > 6) return 'Dia da semana nao esta entre 0 e 6';

	// time must be valid
	let times = args[1].split('-');

	// there should be 2 values in times
	if (times.length != 2) return 'O tempo do evento nao foi indentificado';
	for (let time of times) {
		let [hours, minutes] = time.split(':').map(a => parseInt(a));
		// Hours and minutes should be within this range
		if (hours < 0 || hours > 24) return 'Hora nao esta entre 00 e 24';
		if (minutes < 0 || minutes > 60) return 'Minutos nao estao entre 00 e 60';
	}
}
