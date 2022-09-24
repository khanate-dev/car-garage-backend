import { Schema, model, Types } from 'mongoose';
import z from 'zod';

import { getModelSchema } from '~/helpers/schema';

export const categories = [
	'car',
	'bike',
	'auto-parts',
] as const;

export const {
	sansMetaModelSchema: productSansMetaModelSchema,
	modelSchema: productModelSchema,
} = getModelSchema({
	title: z.string(),
	description: z.string().optional(),
	minPrice: z.number().positive(),
	maxPrice: z.number().positive(),
	image: z.string().url().optional(),
	isFeatured: z.boolean().optional(),
	category: z.enum(categories),
	buyerId: z.instanceof(Types.ObjectId).optional(),
	sellerId: z.instanceof(Types.ObjectId),
	makeTypeId: z.instanceof(Types.ObjectId),
	modelId: z.instanceof(Types.ObjectId).optional(),
	bodyTypeId: z.instanceof(Types.ObjectId).optional(),
});

export type ProductSansMeta = z.infer<typeof productSansMetaModelSchema>;

export type Product = z.infer<typeof productModelSchema>;

const productSchema = new Schema<Product>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		minPrice: {
			type: Number,
			required: true,
		},
		maxPrice: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		isFeatured: {
			type: Boolean,
			required: false,
			default: false,
		},
		category: {
			type: String,
			enum: categories,
			required: true,
		},
		buyerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
		sellerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		makeTypeId: {
			type: Schema.Types.ObjectId,
			ref: 'MakeType',
			required: true,
		},
		modelId: {
			type: Schema.Types.ObjectId,
			ref: 'Model',
			required: false,
		},
		bodyTypeId: {
			type: Schema.Types.ObjectId,
			ref: 'BodyType',
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

export const ProductModel = model('Product', productSchema);
