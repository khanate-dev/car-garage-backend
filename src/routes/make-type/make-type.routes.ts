import {
	createMakeTypeSchema,
	deleteMakeTypeSchema,
	getMakeTypeSchema,
	updateMakeTypeSchema,
	getMakeTypesSchema,
} from '~/schemas/make-type';


import {
	createMakeTypeHandler,
	deleteMakeTypeHandler,
	getMakeTypeHandler,
	updateMakeTypeHandler,
	getMakeTypesHandler,
} from '~/controllers/make-type';

import { Route } from '~/types';

const makeTypeRoutes: Route[] = [
	{
		method: 'post',
		path: '/',
		schema: createMakeTypeSchema,
		handler: createMakeTypeHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
	{
		method: 'get',
		path: '/',
		schema: getMakeTypesSchema,
		handler: getMakeTypesHandler,
	},
	{
		method: 'get',
		path: '/:_id',
		schema: getMakeTypeSchema,
		handler: getMakeTypeHandler,
	},
	{
		method: 'put',
		path: '/:_id',
		schema: updateMakeTypeSchema,
		handler: updateMakeTypeHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
	{
		method: 'delete',
		path: '/:_id',
		schema: deleteMakeTypeSchema,
		handler: deleteMakeTypeHandler,
		isAuthenticated: true,
		availableTo: 'admin',
	},
];

export default makeTypeRoutes;
