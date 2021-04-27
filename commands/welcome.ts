import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Welcome implements Command {
	name = 'welcome';
	aliases = [];
	description = 'Manda a mensagem padrao de welcome';
	usage = 'welcome';
	hideHelp = true;
	permission = 8;

	async exec(message: Message, args: string[]) {
		let reply = `
:fox: Oi! Sou a Vulp, Guardiã oficial do CLL!
Bem-vindo(a) ao nosso servidor!
O CLL é uma comunidade para ajudar você a desenvolver seus projetos e a si mesmo.

Liberdade, na nossa comunidade, é entendida como autonomia. Aqui, você é livre para se expressar quando falamos de desenvolvimento pessoal e profissional.

Nós, do CLL, soltamos disparadores temáticos para que os nossos membros construam os materiais, mandem livros e artigos sobre o tema proposto. Com isso, montamos em conjunto nosso conhecimento - em um formato final de ebook colaborativo - sobre as habilidades técnicas e práticas que a escola não ensina aos jovem  tais como liderança, hábitos, inteligência emocional.

Por isso, sinta-se à vontade em mostrar seus projetos pessoais, suas dúvidas quanto às temáticas ou mesmo compartilhar barreiras e desafios pessoais frente às questões da vida. O CLL é um ambiente dinâmico e seguro para o seu crescimento!
`;

		let channel = message.channel;
		await message.delete();

		channel.send(reply);
	}
}
