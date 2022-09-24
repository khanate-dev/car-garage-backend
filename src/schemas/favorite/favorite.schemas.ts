import { isValidObjectId, Types } from 'mongoose';
import z from 'zod';

import { createRouteSchema } from '~/helpers/schema';

import { favoriteModelSchema } from '~/models';

const body = z.strictObject({
	userId: z.instanceof(Types.ObjectId).optional(),
	bodyTypeId: z.instanceof(Types.ObjectId).optional(),
});

const params = z.strictObject({
	_id: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	userId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	bodyTypeId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
});

const response = favoriteModelSchema;

export const createFavoriteSchema = createRouteSchema({
	body,
	response,
});

export type CreateFavoriteSchema = z.infer<typeof createFavoriteSchema>;

export const updateFavoriteSchema = createRouteSchema({
	body,
	params,
	response,
});

export type UpdateFavoriteSchema = z.infer<typeof updateFavoriteSchema>;

export const getFavoritesSchema = createRouteSchema({
	response: z.array(response),
});

export type GetFavoritesSchema = z.infer<typeof getFavoritesSchema>;

export const getFavoriteSchema = createRouteSchema({
	params,
	response,
});

export type GetFavoriteSchema = z.infer<typeof getFavoriteSchema>;

export const deleteFavoriteSchema = createRouteSchema({
	params,
	response,
});

export type DeleteFavoriteSchema = z.infer<typeof deleteFavoriteSchema>;
