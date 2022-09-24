import { ApiError } from '~/errors';

import {
	CreateFavoriteSchema,
	DeleteFavoriteSchema,
	GetFavoriteSchema,
	GetFavoritesSchema,
	UpdateFavoriteSchema,
} from '~/schemas/favorite';

import {
	createFavorite,
	deleteFavorite,
	findAndUpdateFavorite,
	findFavorite,
	findFavorites,
} from '~/services/favorite';

import { AuthenticatedHandler, Status } from '~/types';

export const createFavoriteHandler: AuthenticatedHandler<CreateFavoriteSchema> = async (
	request
) => {
	const favorite = await createFavorite({
		...request.body,
	});
	return {
		status: Status.CREATED,
		json: favorite,
	};
};

export const getFavoritesHandler: AuthenticatedHandler<GetFavoritesSchema> = async () => {

	const favorites = await findFavorites();

	if (!favorites) throw new ApiError(Status.NOT_FOUND);
	return favorites;

};

export const getFavoriteHandler: AuthenticatedHandler<GetFavoriteSchema> = async (
	request
) => {

	const _id = request.params._id;
	const favorite = await findFavorite({
		_id,
	});

	if (!favorite) throw new ApiError(Status.NOT_FOUND);

	return favorite;

};

export const updateFavoriteHandler: AuthenticatedHandler<UpdateFavoriteSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;
	const favorite = await findFavorite({
		user: userId,
		_id,
	});

	if (!favorite) throw new ApiError(Status.NOT_FOUND);

	const updatedFavorite = await findAndUpdateFavorite(
		{ _id },
		request.body,
		{ new: true }
	);

	if (!updatedFavorite) throw new ApiError(Status.NOT_FOUND);

	return updatedFavorite;

};

export const deleteFavoriteHandler: AuthenticatedHandler<DeleteFavoriteSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;

	const favorite = await findFavorite({
		user: userId,
		_id,
	});

	if (!favorite) throw new ApiError(Status.NOT_FOUND);

	const deletedFavorite = await deleteFavorite({ _id });

	if (!deletedFavorite) throw new ApiError(Status.NOT_FOUND);

	return deletedFavorite;

};
