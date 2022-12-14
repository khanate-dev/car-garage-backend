import express from 'express';
// // import pinoMiddleWare from 'express-pino-logger';
import helmet from 'helmet';
import cors from 'cors';
import { tmpdir } from 'os';
import formData from 'express-form-data';

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

// parse data with connect-multiparty.
app.use(formData.parse({
	autoClean: true,
	uploadDir: tmpdir(),
}));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// union the body and the files
app.use(formData.union());

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
