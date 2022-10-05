import express from 'express';
// // import pinoMiddleWare from 'express-pino-logger';
import helmet from 'helmet';
import cors from 'cors';

import { config } from '~/config';

import connectDb from '~/helpers/connect-db';
import logger from '~/helpers/logger';

import registerRoutes from '~/register-routes';

const app = express();

app.use(cors({
	allowedHeaders: [
		'x-refresh',
		'Content-Type',
		'Authorization',
	],
	exposedHeaders: [
		'x-access-token',
	],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// ! Typescript Weird Error
// if (config.env === 'production') {
// 	app.use(pinoMiddleWare({ logger }));
// }

const server = app.listen(config.port, async () => {
	logger.info(`App is running at http://localhost:${config.port}`);
	connectDb();
	registerRoutes(app);
});

server.on('error', (error) => {
	logger.fatal(error);
});

export default app;
