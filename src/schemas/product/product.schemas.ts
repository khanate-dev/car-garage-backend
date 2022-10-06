import { isValidObjectId } from 'mongoose';
import z from 'zod';

import { createRouteSchema } from '~/helpers/schema';

import { productModelSchema, productSansMetaModelSchema } from '~/models';

const params = z.strictObject({
	_id: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
});

const body = productSansMetaModelSchema.extend({
	minPrice: z.preprocess(
		value => parseInt(z.string().parse(value), 10),
		z.number().positive()
	),
	maxPrice: z.preprocess(
		value => parseInt(z.string().parse(value), 10),
		z.number().positive()
	),
	isFeatured: z.preprocess(
		value => value === 'true',
		z.boolean()
	),
	makeTypeId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	modelId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	).optional(),
	image: z.object({
		fieldName: z.string(),
		originalFilename: z.string(),
		path: z.string(),
		headers: z.object({
			'content-disposition': z.string(),
			'content-type': z.string(),
		}),
		size: z.number(),
		name: z.string(),
		type: z.string(),
	}),
	bodyTypeId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	).optional(),
	sellerId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	).optional(), // TODO figure out what to do here instead of making sellerId optional
});
const response = productModelSchema;

export const createProductSchema = createRouteSchema({
	body,
	response,
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = createRouteSchema({
	body,
	params,
	response,
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export const getProductsSchema = createRouteSchema({
	response: z.array(response),
});

export type GetProductsSchema = z.infer<typeof getProductsSchema>;

export const getProductSchema = createRouteSchema({
	params,
	response,
});

export type GetProductSchema = z.infer<typeof getProductSchema>;

export const deleteProductSchema = createRouteSchema({
	params,
	response,
});

export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
