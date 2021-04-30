import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import Config from '../controllers/ConfigController';
import { Live } from '../models/Live';

export default class DatabaseService {
	static config: ConnectionOptions = {
		type: 'mysql',
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT ?? '3306'),
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_BASE,
		entities: [__dirname + '\\..\\models\\*.ts'],
		synchronize: true,
		logging: false,
	};

	// Declared in index.ts, we can assume it exists. I think?
	// TODO: consider doing this is a way that is more relaiable, maybe with the getter!
	static connection: Connection;
}
