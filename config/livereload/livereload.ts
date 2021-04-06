import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import { Express } from 'express';

interface IConfig {
	exts: string[];
	dirs: string[];
}

export default class LiveReloadServerInst {
	app: Express;
	devCheck: boolean;
	config: IConfig;
	liveReloadServer: any;

	constructor(app: Express, devCheck: boolean, config: IConfig) {
		this.app = app;
		this.devCheck = devCheck;
		this.config = config;
	}

	init(): any {
		if (this.devCheck) {
			// open livereload high port and start to watch public directory for changes
			this.liveReloadServer = livereload.createServer({
				exts: this.config.exts,
			});
			this.liveReloadServer.watch(this.config.dirs);
			this.app.use(connectLivereload());
		}
	}

	watch(timeout: number): void {
		console.log('Live Reload Server watching changes.');
		this.liveReloadServer.server.once('connection', () => {
			setTimeout(() => {
				this.liveReloadServer.refresh('/');
			}, timeout);
		});
	}
}
