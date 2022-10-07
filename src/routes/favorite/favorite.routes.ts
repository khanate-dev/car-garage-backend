import {
	createFavoriteSchema,
	deleteFavoriteSchema,
	getFavoriteSchema,
	getFavoritesSchema,
} from '~/schemas/favorite';

import {
	createFavoriteHandler,
	deleteFavoriteHandler,
	getFavoriteHandler,
	getFavoritesHandler,
} from '~/controllers/favorite';

import { Route } from '~/types';

const favoriteRoutes: Route[] = [
	{
		method: 'post',
		path: '/',
		schema: createFavoriteSchema,
		handler: createFavoriteHandler,
		isAuthenticated: true,
	},
	{
		method: 'get',
		path: '/',
		schema: getFavoritesSchema,
		handler: getFavoritesHandler,
		isAuthenticated: true,
	},
	{
		method: 'get',
		path: '/:_id',
		schema: getFavoriteSchema,
		handler: getFavoriteHandler,
		isAuthenticated: true,
	},
	{
		method: 'delete',
		path: '/:_id',
		schema: deleteFavoriteSchema,
		handler: deleteFavoriteHandler,
		isAuthenticated: true,
	},
];

export default favoriteRoutes;
