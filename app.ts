import dotenv from 'dotenv';
import LiveReloadServer from './config/livereload/livereload';
import { mongoose } from './config/mongoose/mongoose';
import express, { Request, Response } from 'express';
import path from 'path';

dotenv.config();
const app = express();

const liveReloadServer = new LiveReloadServer(app, process.env.NODE_ENV, {
	exts: ['ejs', 'js', 'ts', 'css', 'scss'],
	dirs: [__dirname + '/public', __dirname + '/views'],
}).init();

const mongoUri = `mongodb+srv://qcaodigital:${process.env.MONGO_PW}@qcaodigital.vys9n.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.init(mongoUri);

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/test', (req: Request, res: Response): void => {
	res.render('app');
});

const port: string | number = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);

	if (liveReloadServer) liveReloadServer.watch(1000);
});
