import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
} from 'mongoose';

import { FavoriteModel, FavoriteSansMeta, Favorite } from '~/models/favorite';

export const createFavorite = async (
	input: DocumentDefinition<FavoriteSansMeta>
): Promise<Favorite> => {
	const favorite = (await FavoriteModel.create(input)).toJSON();
	return favorite;
};

export const findFavorites = async (
	query?: FilterQuery<Favorite>,
	options?: QueryOptions
): Promise<null | Favorite[]> => {
	const favorites = await FavoriteModel.find(
		query ?? {},
		{},
		options
	).lean();
	return favorites;
};

export const findFavorite = async (
	query: FilterQuery<Favorite>,
	options?: QueryOptions
): Promise<null | Favorite> => {
	const favorite = await FavoriteModel.findOne(
		query,
		{},
		options
	).lean();
	return favorite;
};

export const deleteFavorite = async (
	query: FilterQuery<Favorite>
): Promise<null | Favorite> => {
	const deletedFavorite = await FavoriteModel.findOneAndRemove(query).lean();
	return deletedFavorite;
};
