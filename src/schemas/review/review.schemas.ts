import { isValidObjectId } from 'mongoose';
import z from 'zod';

import { createRouteSchema } from '~/helpers/schema';

import { reviewModelSchema, reviewSansMetaModelSchema } from '~/models';

const params = z.strictObject({
	_id: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
});

const body = reviewSansMetaModelSchema.extend({
	bodyTypeId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
}).omit({
	userId: true,
});

const response = reviewModelSchema;

export const createReviewSchema = createRouteSchema({
	body,
	response,
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;

export const updateReviewSchema = createRouteSchema({
	body,
	params,
	response,
});

export type UpdateReviewSchema = z.infer<typeof updateReviewSchema>;

export const getReviewsSchema = createRouteSchema({
	response: z.array(response),
});

export type GetReviewsSchema = z.infer<typeof getReviewsSchema>;

export const getReviewSchema = createRouteSchema({
	params,
	response,
});

export type GetReviewSchema = z.infer<typeof getReviewSchema>;

export const deleteReviewSchema = createRouteSchema({
	params,
	response,
});

export type DeleteReviewSchema = z.infer<typeof deleteReviewSchema>;
