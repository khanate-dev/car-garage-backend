import {
	createModelSchema,
	deleteModelSchema,
	getModelSchema,
	updateModelSchema,
	getModelsSchema,
} from '~/schemas/model';


import {
	createModelHandler,
	deleteModelHandler,
	getModelHandler,
	updateModelHandler,
	getModelsHandler,
} from '~/controllers/model';

import { Route } from '~/types';

const modelRoutes: Route[] = [
	{
		method: 'post',
		path: '/',
		schema: createModelSchema,
		handler: createModelHandler,
		isAuthenticated: true,
	},
	{
		method: 'get',
		path: '/',
		schema: getModelsSchema,
		handler: getModelsHandler,
		isAuthenticated: true,
	},
	{
		method: 'get',
		path: '/:_id',
		schema: getModelSchema,
		handler: getModelHandler,
		isAuthenticated: true,
	},
	{
		method: 'put',
		path: '/:_id',
		schema: updateModelSchema,
		handler: updateModelHandler,
		isAuthenticated: true,
	},
	{
		method: 'delete',
		path: '/:_id',
		schema: deleteModelSchema,
		handler: deleteModelHandler,
		isAuthenticated: true,
	},
];

export default modelRoutes;
