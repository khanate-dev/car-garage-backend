import {
	createBodyTypeSchema,
	deleteBodyTypeSchema,
	getBodyTypeSchema,
	updateBodyTypeSchema,
	getBodyTypesSchema,
} from '~/schemas/body-type';

import {
	createBodyTypeHandler,
	deleteBodyTypeHandler,
	getBodyTypeHandler,
	updateBodyTypeHandler,
	getBodyTypesHandler,
} from '~/controllers/body-type';

import { Route } from '~/types';

const bodyTypeRoutes: Route[] = [
	{
		method: 'post',
		path: '/',
		schema: createBodyTypeSchema,
		handler: createBodyTypeHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
	{
		method: 'get',
		path: '/',
		schema: getBodyTypesSchema,
		handler: getBodyTypesHandler,
	},
	{
		method: 'get',
		path: '/:_id',
		schema: getBodyTypeSchema,
		handler: getBodyTypeHandler,
	},
	{
		method: 'put',
		path: '/:_id',
		schema: updateBodyTypeSchema,
		handler: updateBodyTypeHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
	{
		method: 'delete',
		path: '/:_id',
		schema: deleteBodyTypeSchema,
		handler: deleteBodyTypeHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
];

export default bodyTypeRoutes;
