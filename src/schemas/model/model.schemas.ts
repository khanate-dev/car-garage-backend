import { isValidObjectId, Types } from 'mongoose';
import z from 'zod';

import { createRouteSchema } from '~/helpers/schema';

import { modelModelSchema, modelSansMetaModelSchema } from '~/models';

const params = z.strictObject({
	_id: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	makeTypeId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
});

const response = modelModelSchema;

export const createModelSchema = createRouteSchema({
	body: modelSansMetaModelSchema,
	response,
});

export type CreateModelSchema = z.infer<typeof createModelSchema>;

export const updateModelSchema = createRouteSchema({
	body: modelSansMetaModelSchema,
	params,
	response,
});

export type UpdateModelSchema = z.infer<typeof updateModelSchema>;

export const getModelsSchema = createRouteSchema({
	response: z.array(response),
});

export type GetModelsSchema = z.infer<typeof getModelsSchema>;

export const getModelSchema = createRouteSchema({
	params,
	response,
});

export type GetModelSchema = z.infer<typeof getModelSchema>;

export const deleteModelSchema = createRouteSchema({
	params,
	response,
});

export type DeleteModelSchema = z.infer<typeof deleteModelSchema>;
