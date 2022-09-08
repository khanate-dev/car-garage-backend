import fs from 'fs';
import { Express, RequestHandler } from 'express';

import { getErrorResponseAndCode } from './helpers/error';
import logger from '~/helpers/logger';
import { assertRoutes, isDetailedResponse } from './helpers/type';

import { validateRequest, validateAuth } from '~/middlewares';

import {
	Route,
	Status,
	_PrivateHandler,
	_PublicHandler,
} from './types';

const asyncHandler = (
	handler: _PublicHandler | _PrivateHandler
): RequestHandler<any, any, any, any, any> => (
	async (
		request,
		response,
		next
	) => {
		try {
			const handlerResponse = await handler(
				request,
				response,
				next
			);
			const isDetailed = isDetailedResponse(handlerResponse);
			const status = isDetailed ? handlerResponse.status : Status.OK;
			const json = isDetailed ? handlerResponse.json : handlerResponse;
			response.status(status).json(json);
		}
		catch (error: any) {
			logger.error(error);
			const { status, json } = getErrorResponseAndCode(error);
			response.status(status).json(json);
		}
	}
);

const setupRoute = (
	app: Express,
	route: Route
) => {

	const { method,
		path,
		schema,
		middleware,
		handler,
		isPrivate,
	} = route;

	const routePath = `/api/${path}`;

	const middlewares = (
		middleware
			? Array.isArray(middleware)
				? middleware
				: [middleware]
			: []
	);
	if (isPrivate) {
		middlewares.unshift(validateAuth);
	}

	app[method](
		routePath,
		validateRequest(schema),
		...middlewares,
		asyncHandler(handler)
	);

	logger.info(`Registered Route:\t${route.method.toUpperCase()}\t${routePath}`);

};

const registerRoutes = async (app: Express) => {

	const folders = fs.readdirSync(
		'./src/routes',
		{ encoding: 'utf-8' }
	);

	const routes: Route[] = (await Promise.all(
		folders.map(async (name) => {
			try {
				const routes = (await import(`~/routes/${name}`))?.default;
				assertRoutes(routes);
				const prefix = (
					name === 'general' ? '' : name
				);
				return routes.map(route => ({
					...route,
					path: `${prefix}${route.path}`.replace(/^\/|\/$/, ''),
				}));
			}
			catch (error: any) {
				logger.error(`Invalid ${name} routes: ${error.message}`);
				return [];
			}
		})
	)).flat();

	for (const route of routes) {
		setupRoute(app, route);
	}

	app.use((_request, response) => {
		const { json } = getErrorResponseAndCode(new Error('Path not found'));
		response.status(Status.NOT_FOUND).json(json);
	});

};

export default registerRoutes;