import mongo from 'mongoose';

export const mongoose = {
	init: (uri: string): void => {
		mongo
			.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
			.then(() => console.log('Mongoose connected'))
			.catch((err) => console.log(`Mongoose could not connect. Error: ${err}`));
	},
};
