import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';

import { ReviewModel, ReviewSansMeta, Review } from '~/models/review';

export const createReview = async (
	input: DocumentDefinition<ReviewSansMeta>
): Promise<Review> => {
	const review = (await ReviewModel.create(input)).toJSON();
	return review;
};

export const findReviews = async (
	query?: FilterQuery<Review>,
	options?: QueryOptions
): Promise<null | Review[]> => {
	const reviews = await ReviewModel.find(
		query ?? {},
		{},
		options
	).lean();
	return reviews;
};

export const findReview = async (
	query?: FilterQuery<Review>,
	options?: QueryOptions
): Promise<null | Review> => {
	const review = await ReviewModel.findOne(
		query ?? {},
		{},
		options
	).lean();
	return review;
};

export const findAndUpdateReview = async (
	query: FilterQuery<Review>,
	update: UpdateQuery<ReviewSansMeta>,
	options?: QueryOptions
): Promise<null | Review> => {
	const updatedReview = await ReviewModel.findOneAndUpdate(
		query,
		update,
		options
	).lean();
	return updatedReview;
};

export const deleteReview = async (
	query: FilterQuery<Review>
): Promise<null | Review> => {
	const deletedReview = await ReviewModel.findOneAndRemove(query).lean();
	return deletedReview;
};
