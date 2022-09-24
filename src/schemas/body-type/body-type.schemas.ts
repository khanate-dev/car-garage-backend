import { isValidObjectId } from 'mongoose';
import z from 'zod';

import { createRouteSchema } from '~/helpers/schema';

import { bodyTypeModelSchema, bodyTypeSansMetaModelSchema } from '~/models';


const params = z.strictObject({
	_id: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
});

const body = bodyTypeSansMetaModelSchema.extend({
	modelId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
});

const response = bodyTypeModelSchema;

export const createBodyTypeSchema = createRouteSchema({
	body,
	response,
});

export type CreateBodyTypeSchema = z.infer<typeof createBodyTypeSchema>;

export const updateBodyTypeSchema = createRouteSchema({
	body,
	params,
	response,
});

export type UpdateBodyTypeSchema = z.infer<typeof updateBodyTypeSchema>;

export const getBodyTypesSchema = createRouteSchema({
	response: z.array(response),
});

export type GetBodyTypesSchema = z.infer<typeof getBodyTypesSchema>;

export const getBodyTypeSchema = createRouteSchema({
	params,
	response,
});

export type GetBodyTypeSchema = z.infer<typeof getBodyTypeSchema>;

export const deleteBodyTypeSchema = createRouteSchema({
	params,
	response,
});

export type DeleteBodyTypeSchema = z.infer<typeof deleteBodyTypeSchema>;
