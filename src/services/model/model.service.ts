import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';

import { ModelModel, ModelSansMeta, Model } from '~/models/model';

export const createModel = async (
	input: DocumentDefinition<ModelSansMeta>
): Promise<Model> => {
	const model = (await ModelModel.create(input)).toJSON();
	return model;
};

export const findModels = async (
	query?: FilterQuery<Model>,
	options?: QueryOptions
): Promise<null | Model[]> => {
	const models = await ModelModel.find(
		query ?? {},
		{},
		options
	).populate('makeType', '-_id -createdAt -updatedAt -__v').lean();
	return models;
};

export const findModel = async (
	query: FilterQuery<Model>,
	options?: QueryOptions
): Promise<null | Model> => {
	const model = await ModelModel.findOne(
		query,
		{},
		options
	).populate('makeType', '-_id -createdAt -updatedAt -__v').lean();
	return model;
};

export const findAndUpdateModel = async (
	query: FilterQuery<Model>,
	update: UpdateQuery<ModelSansMeta>,
	options?: QueryOptions
): Promise<null | Model> => {
	const updatedModel = await ModelModel.findOneAndUpdate(
		query,
		update,
		options
	).populate('makeType', '-_id -createdAt -updatedAt -__v').lean();
	return updatedModel;
};

export const deleteModel = async (
	query: FilterQuery<Model>
): Promise<null | Model> => {
	const deletedModel = await ModelModel.findOneAndRemove(query).lean();
	return deletedModel;
};
