import mongoose from 'mongoose';
import util from 'util';

import config from '~/config';

import logger from '~/helpers/logger';

const messageMapper = (message: string) => {
	return util
		.inspect(message, false, 10, true)
		.replace(/\n/g, '').replace(/\s{2,}/g, ' ');
};

const mongooseLogger = (
	collectionName: string,
	methodName: string,
	...methodArgs: any[]
) => {
	logger.info(`\x1B[0;36mMongoose:\x1B[0m ${collectionName}.${methodName}` + `(${methodArgs.map(messageMapper).join(', ')})`);
};

const connectDb = async () => {
	try {
		await mongoose.connect(config.dbUri);

		if (config.env === 'development') {
			mongoose.set('debug', mongooseLogger);
		}

		logger.info('Connected to DB');
	}
	catch (error: any) {
		throw new Error(`Error Connecting to DB: ${error.message}`);
	}
};

export default connectDb;