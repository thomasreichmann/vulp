import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export default class DatabaseService {
	static config: ConnectionOptions = {
		type: 'mysql',
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT ?? '3306'),
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_BASE,
		entities: [__dirname + '\\..\\models\\*{.ts,.js}'],
		charset: 'utf8mb4',
		synchronize: true,
		logging: false,
	};

	// Declared in index.ts, we can assume it exists. I think?
	// TODO: consider doing this is a way that is more relaiable, maybe with the getter!
	static connection: Connection;

	static async getConnection(): Promise<Connection> {
		console.log(__dirname + '\\..\\models\\*{.ts,.js}');
		return DatabaseService.connection ?? (await createConnection(DatabaseService.config));
	}
}
