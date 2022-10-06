import z from 'zod';

import { getErrorResponse } from '~/helpers/error';
import logger from '~/helpers/logger';

import { createRouteSchema } from '~/helpers/schema';

import { Middleware, Status } from '~/types';

const validateRequest = (
	schema: z.AnyZodObject = createRouteSchema({})
): Middleware => (
	(request, response, next) => {
		try {

			schema.omit({ response: true }).parse({
				body: request.body,
				query: request.query,
				params: request.params,
			});
			logger.info(`Successfully validated incoming request ${request.url}`);

			return next();
		}
		catch (error: any) {
			logger.error(`Validation failed for incoming request ${request.url}`);

			const json = getErrorResponse(error);
			return response.status(Status.NOT_FOUND).send(json);
		}
	}
);

export default validateRequest;
