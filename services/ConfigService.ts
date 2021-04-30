import { createConnection } from 'typeorm';
import { Config } from '../models/Config';
import DatabaseConfig from './DatabaseService';

export default class ConfigService {
	static async getConfig(guildId: string): Promise<Config> {
		let connection = await DatabaseConfig.getConnection();

		/**
		 * We attempt to get the config for this guild id, if its not found,
		 * we create a new config with the guild id.
		 */
		let config = await connection.manager.findOne(Config, guildId);
		if (!config) {
			config = new Config();
			config.guildId = guildId;
			return await connection.manager.save(config);
		} else {
			return config;
		}
	}
}
