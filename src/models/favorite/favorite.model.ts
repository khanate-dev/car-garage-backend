import { Schema, model, Types } from 'mongoose';
import z from 'zod';

import { getModelSchema } from '~/helpers/schema';

export const {
	sansMetaModelSchema: favoriteSansMetaModelSchema,
	modelSchema: favoriteModelSchema,
} = getModelSchema({
	userId: z.instanceof(Types.ObjectId),
	bodyTypeId: z.instanceof(Types.ObjectId),
});

export type FavoriteSansMeta = z.infer<typeof favoriteSansMetaModelSchema>;

export type Favorite = z.infer<typeof favoriteModelSchema>;

const favoriteSchema = new Schema<Favorite>(
	{
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

favoriteSchema.index({ userId: 1, bodyTypeId: 1 }, { unique: true });

export const FavoriteModel = model('Favorite', favoriteSchema);
