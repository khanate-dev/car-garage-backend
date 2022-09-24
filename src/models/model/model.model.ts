import { Schema, model, Types } from 'mongoose';
import z from 'zod';

import { getModelSchema } from '~/helpers/schema';

export const {
	sansMetaModelSchema: modelSansMetaModelSchema,
	modelSchema: modelModelSchema,
} = getModelSchema({
	name: z.string(),
	year: z.number(),
	makeTypeId: z.instanceof(Types.ObjectId),
});

export type ModelSansMeta = z.infer<typeof modelSansMetaModelSchema>;

export type Model = z.infer<typeof modelModelSchema>;

const modelSchema = new Schema<Model>(
	{
		name: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		makeTypeId: {
			type: Schema.Types.ObjectId,
			ref: 'BodyType',
		},
	},
	{
		timestamps: true,
	}
);

export const ModelModel = model('Model', modelSchema);
