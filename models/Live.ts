import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from 'typeorm';

@Entity()
export class Live extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	// Date as a format I haven't desided on yet? or is it date? TODO! ?
	@Column('datetime')
	date: Date;

	@Column()
	title: string;

	@Column()
	author: string;
}
