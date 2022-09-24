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
	request
) => {
	const review = await createReview({
		...request.body,
	});
	return {
		status: Status.CREATED,
		json: review,
	};
};

export const getReviewsHandler: AuthenticatedHandler<GetReviewsSchema> = async () => {

	const reviews = await findReviews();

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
