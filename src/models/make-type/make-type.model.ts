import { Schema, model } from 'mongoose';
import z from 'zod';

import { getModelSchema } from '~/helpers/schema';

export const {
	sansMetaModelSchema: makeTypeSansMetaModelSchema,
	modelSchema: makeTypeModelSchema,
} = getModelSchema({
	name: z.string(),
});

export type MakeTypeSansMeta = z.infer<typeof makeTypeSansMetaModelSchema>;

export type MakeType = z.infer<typeof makeTypeModelSchema>;

const makeTypeSchema = new Schema<MakeType>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

export const MakeTypeModel = model('MakeType', makeTypeSchema);
