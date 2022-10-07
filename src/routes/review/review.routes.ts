import {
	createReviewSchema,
	deleteReviewSchema,
	getReviewSchema,
	updateReviewSchema,
	getReviewsSchema,
} from '~/schemas/review';

import {
	createReviewHandler,
	deleteReviewHandler,
	getReviewHandler,
	updateReviewHandler,
	getReviewsHandler,
} from '~/controllers/review';

import { Route } from '~/types';

const reviewRoutes: Route[] = [
	{
		method: 'post',
		path: '/',
		schema: createReviewSchema,
		handler: createReviewHandler,
		isAuthenticated: true,
	},
	{
		method: 'get',
		path: '/',
		schema: getReviewsSchema,
		handler: getReviewsHandler,
		isAuthenticated: true,
	},
	{
		method: 'get',
		path: '/:_id',
		schema: getReviewSchema,
		handler: getReviewHandler,
		isAuthenticated: true,
	},
	{
		method: 'put',
		path: '/:_id',
		schema: updateReviewSchema,
		handler: updateReviewHandler,
		isAuthenticated: true,
	},
	{
		method: 'delete',
		path: '/:_id',
		schema: deleteReviewSchema,
		handler: deleteReviewHandler,
		isAuthenticated: true,
	},
];

export default reviewRoutes;
