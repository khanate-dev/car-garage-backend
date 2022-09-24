import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';

import { MakeTypeModel, MakeTypeSansMeta, MakeType } from '~/models/make-type';

export const createMakeType = async (
	input: DocumentDefinition<MakeTypeSansMeta>
): Promise<MakeType> => {
	const makeType = (await MakeTypeModel.create(input)).toJSON();
	return makeType;
};

export const findMakeTypes = async (
	query: FilterQuery<MakeType>,
	options?: QueryOptions
): Promise<null | MakeType[]> => {
	const makeTypes = await MakeTypeModel.find(
		query,
		{},
		options
	).lean();
	return makeTypes;
};

export const findMakeType = async (
	query: FilterQuery<MakeType>,
	options?: QueryOptions
): Promise<null | MakeType> => {
	const makeType = await MakeTypeModel.findOne(
		query,
		{},
		options
	).lean();
	return makeType;
};

export const findAndUpdateMakeType = async (
	query: FilterQuery<MakeType>,
	update: UpdateQuery<MakeTypeSansMeta>,
	options?: QueryOptions
): Promise<null | MakeType> => {
	const updatedMakeType = await MakeTypeModel.findOneAndUpdate(
		query,
		update,
		options
	).lean();
	return updatedMakeType;
};

export const deleteMakeType = async (
	query: FilterQuery<MakeType>
): Promise<null | MakeType> => {
	const deletedMakeType = await MakeTypeModel.findOneAndRemove(query).lean();
	return deletedMakeType;
};
