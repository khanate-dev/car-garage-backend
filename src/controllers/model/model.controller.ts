import { ApiError } from '~/errors';

import {
	CreateModelSchema,
	DeleteModelSchema,
	GetModelSchema,
	GetModelsSchema,
	UpdateModelSchema,
} from '~/schemas/model';

import {
	createModel,
	deleteModel,
	findAndUpdateModel,
	findModel,
	findModels,
} from '~/services/model';

import { AuthenticatedHandler, Status } from '~/types';

export const createModelHandler: AuthenticatedHandler<CreateModelSchema> = async (
	request
) => {
	const model = await createModel({
		...request.body,
	});
	return {
		status: Status.CREATED,
		json: model,
	};
};

export const getModelsHandler: AuthenticatedHandler<GetModelsSchema> = async () => {

	const models = await findModels();

	if (!models) throw new ApiError(Status.NOT_FOUND);
	return models;

};

export const getModelHandler: AuthenticatedHandler<GetModelSchema> = async (
	request
) => {

	const _id = request.params._id;
	const model = await findModel({
		_id,
	});

	if (!model) throw new ApiError(Status.NOT_FOUND);

	return model;

};

export const updateModelHandler: AuthenticatedHandler<UpdateModelSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;
	const model = await findModel({
		user: userId,
		_id,
	});

	if (!model) throw new ApiError(Status.NOT_FOUND);

	const updatedModel = await findAndUpdateModel(
		{ _id },
		request.body,
		{ new: true }
	);

	if (!updatedModel) throw new ApiError(Status.NOT_FOUND);

	return updatedModel;

};

export const deleteModelHandler: AuthenticatedHandler<DeleteModelSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;

	const model = await findModel({
		user: userId,
		_id,
	});

	if (!model) throw new ApiError(Status.NOT_FOUND);

	const deletedModel = await deleteModel({ _id });

	if (!deletedModel) throw new ApiError(Status.NOT_FOUND);

	return deletedModel;

};
