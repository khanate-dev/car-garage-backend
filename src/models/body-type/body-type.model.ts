import { Schema, model, Types } from 'mongoose';
import z from 'zod';

import { getModelSchema } from '~/helpers/schema';

export const {
	sansMetaModelSchema: bodyTypeSansMetaModelSchema,
	modelSchema: bodyTypeModelSchema,
} = getModelSchema({
	name: z.string(),
	modelId: z.instanceof(Types.ObjectId),
});

export type BodyTypeSansMeta = z.infer<typeof bodyTypeSansMetaModelSchema>;

export type BodyType = z.infer<typeof bodyTypeModelSchema>;

const bodyTypeSchema = new Schema<BodyType>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		modelId: {
			type: Schema.Types.ObjectId,
			ref: 'Model',
		},
	},
	{
		timestamps: true,
	}
);

export const BodyTypeModel = model('BodyType', bodyTypeSchema);
