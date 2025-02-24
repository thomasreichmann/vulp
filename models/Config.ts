import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Config extends BaseEntity {
	@PrimaryColumn()
	guildId: string;

	@Column('varchar', { default: ',' })
	prefix: string;

	@Column('varchar', { default: '87148C' })
	color: string;

	@Column('simple-array')
	events: string[];

	@Column()
	helpChannelId: string;

	@Column()
	helperRoleId: string;

	@Column('simple-array')
	welcomeMessageTemplate: string[];

	@Column()
	welcomeRoleId: string;

	@Column('simple-array')
	classes: string[];

	@Column()
	eventsUrl: string;

	@Column()
	lives: string;
}

export interface CurrentEvent {
	content: string;
	dayOfWeek: number;
	time: string;
}
