import { Schema, model, Types } from 'mongoose';
import z from 'zod';

import { getModelSchema } from '~/helpers/schema';

export enum Rating {
	One = 1,
	Two = 2,
	Three = 3,
	Four = 4,
	Five = 5,
}

export const ratings = Object.values(Rating) as Rating[];

export const {
	sansMetaModelSchema: reviewSansMetaModelSchema,
	modelSchema: reviewModelSchema,
} = getModelSchema({
	rating: z.nativeEnum(Rating),
	description: z.string().optional(),
	userId: z.instanceof(Types.ObjectId),
	bodyTypeId: z.instanceof(Types.ObjectId),
});

export type ReviewSansMeta = z.infer<typeof reviewSansMetaModelSchema>;

export type Review = z.infer<typeof reviewModelSchema>;

const reviewSchema = new Schema<Review>(
	{
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		description: {
			type: String,
			required: false,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		bodyTypeId: {
			type: Schema.Types.ObjectId,
			ref: 'BodyType',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);


reviewSchema.virtual('bodyType', {
	ref: 'BodyType',
	localField: 'bodyTypeId',
	foreignField: '_id',
	justOne: true,
});

reviewSchema.index({ userId: 1, bodyTypeId: 1 }, { unique: true });

export const ReviewModel = model('Review', reviewSchema);
