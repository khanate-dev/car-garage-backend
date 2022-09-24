import { isValidObjectId } from 'mongoose';
import z from 'zod';

import { createRouteSchema } from '~/helpers/schema';

import { makeTypeModelSchema } from '~/models';

const body = z.strictObject({
	name: z.string({
		required_error: 'name is required',
	}),
});

const params = z.strictObject({
	_id: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
});

const response = makeTypeModelSchema;

export const createMakeTypeSchema = createRouteSchema({
	body,
	response,
});

export type CreateMakeTypeSchema = z.infer<typeof createMakeTypeSchema>;

export const updateMakeTypeSchema = createRouteSchema({
	body,
	params,
	response,
});

export type UpdateMakeTypeSchema = z.infer<typeof updateMakeTypeSchema>;

export const getMakeTypesSchema = createRouteSchema({
	response: z.array(response),
});

export type GetMakeTypesSchema = z.infer<typeof getMakeTypesSchema>;

export const getMakeTypeSchema = createRouteSchema({
	params,
	response,
});

export type GetMakeTypeSchema = z.infer<typeof getMakeTypeSchema>;

export const deleteMakeTypeSchema = createRouteSchema({
	params,
	response,
});

export type DeleteMakeTypeSchema = z.infer<typeof deleteMakeTypeSchema>;
