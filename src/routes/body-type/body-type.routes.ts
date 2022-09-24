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
	},
	{
		method: 'get',
		path: '/',
		schema: getBodyTypesSchema,
		handler: getBodyTypesHandler,
		isAuthenticated: true,
	},
	{
		method: 'get',
		path: '/:_id',
		schema: getBodyTypeSchema,
		handler: getBodyTypeHandler,
		isAuthenticated: true,
	},
	{
		method: 'put',
		path: '/:_id',
		schema: updateBodyTypeSchema,
		handler: updateBodyTypeHandler,
		isAuthenticated: true,
	},
	{
		method: 'delete',
		path: '/:_id',
		schema: deleteBodyTypeSchema,
		handler: deleteBodyTypeHandler,
		isAuthenticated: true,
	},
];

export default bodyTypeRoutes;
