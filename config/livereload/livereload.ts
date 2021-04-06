import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import { Express } from 'express';

interface IConfig {
	exts: string[];
	dirs: string[];
}

export default class LiveReloadServerInst {
	app: Express;
	devCheck: string | undefined;
	config: IConfig;
	liveReloadServer: any;

	constructor(app: Express, devCheck: string | undefined, config: IConfig) {
		this.app = app;
		this.devCheck = devCheck;
		this.config = config;
	}

	init(): any {
		if (this.devCheck === 'development') {
			// open livereload high port and start to watch public directory for changes
			this.liveReloadServer = livereload.createServer({
				exts: this.config.exts,
			});
			this.liveReloadServer.watch(this.config.dirs);
			this.app.use(connectLivereload());
		}
	}

	watch(timeout: number): void {
		this.liveReloadServer.server.once('connection', () => {
			console.log('Live Reload Server watching changes.');
			setTimeout(() => {
				this.liveReloadServer.refresh('/');
			}, timeout);
		});
	}
}
