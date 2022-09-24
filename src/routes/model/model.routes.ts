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
		availableTo: 'admin',
	},
	{
		method: 'get',
		path: '/',
		schema: getModelsSchema,
		handler: getModelsHandler,
	},
	{
		method: 'get',
		path: '/:_id',
		schema: getModelSchema,
		handler: getModelHandler,
	},
	{
		method: 'put',
		path: '/:_id',
		schema: updateModelSchema,
		handler: updateModelHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
	{
		method: 'delete',
		path: '/:_id',
		schema: deleteModelSchema,
		handler: deleteModelHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
];

export default modelRoutes;
