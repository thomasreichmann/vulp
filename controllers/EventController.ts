export default class EventController {
	static events: DiscordEvent[] = [];
}

export interface DiscordEvent {
	exec(...args: any[]): void;

	/** The exact discord event name */
	name: string;
}

interface EventConstructor {
	new (): DiscordEvent;
}

export function discordEvent() {
	return function (target: EventConstructor) {
		let event = new target();
		console.log(`Evento registrado: ${event.name}`);
		EventController.events.push(event);
	};
}
