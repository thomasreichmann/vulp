import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Config extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', { default: ',' })
	prefix: string;

	@Column('varchar', { default: '87148C' })
	color: string;

	@Column()
	helpChannelId: string;

	@Column('simple-array')
	helperIds: string[];

	@Column('simple-array')
	welcomeMessageTemplate: string[];

	@Column()
	welcomeRoleId: string;

	@Column('simple-array')
	classes: string[];
}
