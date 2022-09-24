import { isValidObjectId, Types } from 'mongoose';
import z from 'zod';

import { createRouteSchema } from '~/helpers/schema';

import { categories, productModelSchema } from '~/models';

const body = z.strictObject({
	title: z.string({
		required_error: 'title is required',
	}),
	category: z.enum(categories, {
		required_error: 'category is required',
	}),
	description: z.string({
		required_error: 'description is required',
	}).optional(),
	price: z.number({
		required_error: 'price is required',
	}).positive(),
	image: z.string().url().optional(),
	isFeatured: z.boolean().optional(),
	buyerId: z.instanceof(Types.ObjectId).optional(),
	sellerId: z.instanceof(Types.ObjectId).optional(),
	makeTypeId: z.instanceof(Types.ObjectId).optional(),
	modelId: z.instanceof(Types.ObjectId).optional(),
	bodyTypeId: z.instanceof(Types.ObjectId).optional(),
});

const params = z.strictObject({
	_id: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	buyerId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	sellerId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	makeTypeId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	modelId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
	bodyTypeId: z.string().refine(
		isValidObjectId,
		'parameter must be a valid mongo ObjectID'
	),
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
