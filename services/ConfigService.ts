import { createConnection } from 'typeorm';
import { Config } from '../models/Config';
import DatabaseConfig from './DatabaseService';

export default class ConfigService {
	static async getConfig() {
		try {
			let connection = DatabaseConfig.connection;

			/** TODO:
			 * ok, entao seguinte, provavelmente o typeorm ta funcionando e ta conectado com a database
			 * Ela ta hosteada no heroku, as info de conexao tao no .env e sao parsados pelo DatabaseService.config,
			 * aparentemente quando a gente tenta pegar o configs[0] aqui em baixo ele vai retornar undefined caso nao existir,
			 * faz sentido! Agora, precisamos checar se ele existe e se nao existir, precisamos criar a config padrao do bot,
			 * acho que com isso feito, a gente pode comecar a pensar em substituir os Controllers,
			 * especialmente o ConfigController
			 * boa sorte.
			 */

			let config = (await connection.manager.find(Config))[0];
			console.log(config);
		} catch (err) {
			// TODO: change this error handling
			console.log(err);
		}
	}
}
