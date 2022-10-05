import { ApiError } from '~/errors';

import {
	CreateReviewSchema,
	DeleteReviewSchema,
	GetReviewSchema,
	GetReviewsSchema,
	UpdateReviewSchema,
} from '~/schemas/review';

import {
	createReview,
	deleteReview,
	findAndUpdateReview,
	findReview,
	findReviews,
} from '~/services/review';

import { AuthenticatedHandler, Status } from '~/types';

export const createReviewHandler: AuthenticatedHandler<CreateReviewSchema> = async (
	request,
	response
) => {
	const user = response.locals.user;

	if (user.role !== 'user') throw new ApiError(Status.FORBIDDEN);

	const review = await createReview({
		...request.body,
		userId: user._id,
	});
	return {
		status: Status.CREATED,
		json: review,
	};
};

export const getReviewsHandler: AuthenticatedHandler<GetReviewsSchema> = async (
	_request,
	response
) => {
	const user = response.locals.user;
	const options = user.role === 'admin' ? {} : { userId: user._id };
	const reviews = await findReviews(options);

	if (!reviews) throw new ApiError(Status.NOT_FOUND);
	return reviews;

};

export const getReviewHandler: AuthenticatedHandler<GetReviewSchema> = async (
	request
) => {

	const _id = request.params._id;
	const review = await findReview({
		_id,
	});

	if (!review) throw new ApiError(Status.NOT_FOUND);

	return review;

};

export const updateReviewHandler: AuthenticatedHandler<UpdateReviewSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;
	const review = await findReview({
		user: userId,
		_id,
	});

	if (!review) throw new ApiError(Status.NOT_FOUND);

	const updatedReview = await findAndUpdateReview(
		{ _id },
		request.body,
		{ new: true }
	);

	if (!updatedReview) throw new ApiError(Status.NOT_FOUND);

	return updatedReview;

};

export const deleteReviewHandler: AuthenticatedHandler<DeleteReviewSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;

	const review = await findReview({
		user: userId,
		_id,
	});

	if (!review) throw new ApiError(Status.NOT_FOUND);

	const deletedReview = await deleteReview({ _id });

	if (!deletedReview) throw new ApiError(Status.NOT_FOUND);

	return deletedReview;

};
