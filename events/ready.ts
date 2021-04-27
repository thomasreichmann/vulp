import ClientController from '../controllers/ClientController';
import { discordEvent, DiscordEvent } from '../controllers/EventController';

@discordEvent()
class ReadyEvent implements DiscordEvent {
	name = 'ready';

	exec() {
		console.log(`Inicializacao concluida perfil: ${ClientController.client.user?.tag}`);
	}
}
