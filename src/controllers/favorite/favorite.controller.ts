import { ApiError } from '~/errors';

import {
	CreateFavoriteSchema,
	DeleteFavoriteSchema,
	GetFavoritesSchema,
	GetFavoriteSchema,
} from '~/schemas/favorite';

import {
	createFavorite,
	deleteFavorite,
	findFavorites,
	findFavorite,
} from '~/services/favorite';

import { AuthenticatedHandler, Status } from '~/types';

export const createFavoriteHandler: AuthenticatedHandler<CreateFavoriteSchema> = async (
	request,
	response
) => {
	const favorite = await createFavorite({
		...request.body,
		userId: response.locals.user._id,
	});
	return {
		status: Status.CREATED,
		json: favorite,
	};
};

export const getFavoritesHandler: AuthenticatedHandler<GetFavoritesSchema> = async (
	_request,
	response
) => {

	const user = response.locals.user;
	const options = user.role === 'admin' ? {} : { userId: user._id };
	const favorites = await findFavorites(options);

	if (!favorites) throw new ApiError(Status.NOT_FOUND);
	return favorites;

};

export const getFavoriteHandler: AuthenticatedHandler<GetFavoriteSchema> = async (
	request,
	response
) => {

	const _id = request.params._id;
	const user = response.locals.user;
	const options = user.role === 'admin' ? { _id } : { _id, userId: user._id };
	const favorite = await findFavorite(options);

	if (!favorite) throw new ApiError(Status.NOT_FOUND);

	return favorite;

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
