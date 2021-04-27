import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class AjudaVulp implements Command {
	name = 'ajudavulp';
	aliases = ['setupajuda'];
	description = 'Setup da ajuda';
	usage = 'ajudavulp';
	hideHelp = true;
	permission = 8;

	async exec(message: Message, args: string[]) {
		let reply = `
:blue_heart:    Nosso Site: https://www.clliberdade.com/
:orange_heart:   Nosso Instagram: https://www.instagram.com/clliberdade/?hl=pt-br
:blue_heart:   Nosso Telegram: https://t.me/joinchat/NIlwjRlMfLMi8Hi3HDqp6A
:fox: Oi! Sou a Vulp, Guardiã oficial do CLL!
Bem-vindo(a) á nossa central de ajuda!

Se precisar de ajuda ou tiver alguma dúvida, você pode mandar " !ajuda " em qualquer canal de texto, e eu chamarei a equipe para te atender :orange_hear`;

		let channel = message.channel;
		await message.delete();

		channel.send(`:blue_heart:    Nosso Site: https://www.clliberdade.com/`);
		channel.send(
			`:orange_heart:   Nosso Instagram: https://www.instagram.com/clliberdade/?hl=pt-br\n:blue_heart:   Nosso Telegram: https://t.me/joinchat/NIlwjRlMfLMi8Hi3HDqp6A`
		);
		channel.send(`
:fox: Oi! Sou a Vulp, Guardiã oficial do CLL!
Bem-vindo(a) á nossa central de ajuda!
			
Se precisar de ajuda ou tiver alguma dúvida, você pode mandar " !ajuda " em qualquer canal de texto, e eu chamarei a equipe para te atender :orange_heart:`);
	}
}
