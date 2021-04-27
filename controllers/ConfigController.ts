export default class Config {
	static prefix: string = process.env.NODE_ENV != 'production' ? ',' : '!';
	static color: string = '87148C';
}
