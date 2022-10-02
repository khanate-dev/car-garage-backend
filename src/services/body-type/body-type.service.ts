import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';

import { BodyTypeModel, BodyTypeSansMeta, BodyType } from '~/models/body-type';

const populateOptions = {
	path: 'model',
	select: '-_id -createdAt -updatedAt -__v',
	populate: {
		path: 'makeType',
		select: '-_id -createdAt -updatedAt -__v',
	},
};

export const createBodyType = async (
	input: DocumentDefinition<BodyTypeSansMeta>
): Promise<BodyType> => {
	const bodyType = (await BodyTypeModel.create(input)).toJSON();
	return bodyType;
};

export const findBodyTypes = async (
	query?: FilterQuery<BodyType>,
	options?: QueryOptions
): Promise<null | BodyType[]> => {
	const bodyTypes = await BodyTypeModel.find(
		query ?? {},
		{},
		options
	)
		.populate(populateOptions)
		.lean();
	return bodyTypes;
};

export const findBodyType = async (
	query: FilterQuery<BodyType>,
	options?: QueryOptions
): Promise<null | BodyType> => {
	const bodyType = await BodyTypeModel.findOne(
		query,
		{},
		options
	)
		.populate(populateOptions)
		.lean();
	return bodyType;
};

export const findAndUpdateBodyType = async (
	query: FilterQuery<BodyType>,
	update: UpdateQuery<BodyTypeSansMeta>,
	options?: QueryOptions
): Promise<null | BodyType> => {
	const updatedBodyType = await BodyTypeModel.findOneAndUpdate(
		query,
		update,
		options
	)
		.populate(populateOptions)
		.lean();
	return updatedBodyType;
};

export const deleteBodyType = async (
	query: FilterQuery<BodyType>
): Promise<null | BodyType> => {
	const deletedBodyType = await BodyTypeModel.findOneAndRemove(query).lean();
	return deletedBodyType;
};
