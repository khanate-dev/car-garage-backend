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

const response = productModelSchema;

export const createProductSchema = createRouteSchema({
	body: productSansMetaModelSchema.extend({}),
	response,
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = createRouteSchema({
	body: productSansMetaModelSchema,
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
