import { Message } from 'discord.js';

export default class CommandController {
	static commands: Command[] = [];

	static get(commandName: string | undefined): Command | undefined {
		return CommandController.commands.find(a => a.name === commandName);
	}
}

export interface Command {
	exec(message: Message, args: string[]): void;

	name: string;
	description: string;
	aliases: string[];
	usage: string;

	/** Command cooldown per user, defaults to 0 */
	cooldown?: number;

	/** Should the command be hidden from help */
	hideHelp?: boolean;

	/** List of user ids that can user this command */
	ids?: string[];

	/** List of guild ids that this command can be used in */
	guilds?: string[];

	/** The permission integer that is required to use this command */
	permission?: number;
}

interface CommandConstructor {
	new (): Command;
}

export function chatCommand() {
	return function (target: CommandConstructor) {
		let command = new target();
		console.log(`Comando registrado: ${command.name}`);
		CommandController.commands.push(command);
	};
}
