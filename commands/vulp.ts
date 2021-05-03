import { Message } from 'discord.js';
import { chatCommand, Command } from '../controllers/CommandController';

@chatCommand()
class Vulp implements Command {
	name = 'vulp';
	aliases = ['ajuda'];
	description = 'Mostra a lista de comandos simplificada da Vulp';
	usage = 'vulp';

	async exec(message: Message, args: string[]) {
		let reply = `
:fox: Oi! Sou a Vulp, Guardiã oficial do CLL! Como posso te ajudar?
Essa é minha lista de comandos (Tenha paciência, ainda estou aprendendo :smiling_face_with_3_hearts:)

:orange_circle:   !vulp - Te mostro minha lista de comandos
:date:   !eventos - Te mostro os eventos programados essa semana
:movie_camera:   !lives - Te mostro as próximas Lives do CLL!
:bulb:   !agora - Te conto se está acontecendo algum evento no CLL (Agora).
:heavy_check_mark:   !aula - Te recomendo uma aula do CLL (Especial pra você)
:man_running:   !ajuda - Chamo alguém da equipe pra te ajudar! (Use com sabedoria)`;

		message.channel.send(reply);
	}
}
