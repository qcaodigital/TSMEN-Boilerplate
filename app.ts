//To start the back-end server, the script command is "npm run start";
//To start the sass-watcher, the script command is "npm run watch:sass"
//The script command "npm run dev" will run both of the above simultaneously but in new windows
import dotenv from 'dotenv';
import LiveReloadServer from './config/livereload/livereload';
import { mongoose } from './config/mongoose/mongoose';
import express, { Request, Response } from 'express';
import path from 'path';

dotenv.config();
const app = express();

//Watcher server will watch all files in root dir
//Only runs if second argument returns true, if it does not return true, the code below will do nothing
const liveReloadServer = new LiveReloadServer(app, process.env.NODE_ENV === 'development', {
	exts: ['ejs', 'js', 'ts', 'css', 'scss'],
	dirs: [__dirname + '/public', __dirname + '/views'],
}).init();

//Remove this if you won't be using MongoDB
//If using, make sure to change the uri/uri data
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

	//If the server initiated above, the watcher server will start watching one back-end server connects
	//If the server was not initiated, this function will do nothing
	if (liveReloadServer) liveReloadServer.watch(100);
});
