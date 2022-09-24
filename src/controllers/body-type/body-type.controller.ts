import { ApiError } from '~/errors';

import {
	CreateBodyTypeSchema,
	DeleteBodyTypeSchema,
	GetBodyTypeSchema,
	GetBodyTypesSchema,
	UpdateBodyTypeSchema,
} from '~/schemas/body-type';

import {
	createBodyType,
	deleteBodyType,
	findAndUpdateBodyType,
	findBodyType,
	findBodyTypes,
} from '~/services/body-type';

import { AuthenticatedHandler, Status } from '~/types';

export const createBodyTypeHandler: AuthenticatedHandler<CreateBodyTypeSchema> = async (
	request
) => {
	const bodyType = await createBodyType({
		...request.body,
	});
	return {
		status: Status.CREATED,
		json: bodyType,
	};
};

export const getBodyTypesHandler: AuthenticatedHandler<GetBodyTypesSchema> = async () => {

	const bodyTypes = await findBodyTypes();

	if (!bodyTypes) throw new ApiError(Status.NOT_FOUND);
	return bodyTypes;

};

export const getBodyTypeHandler: AuthenticatedHandler<GetBodyTypeSchema> = async (
	request
) => {

	const _id = request.params._id;
	const bodyType = await findBodyType({
		_id,
	});

	if (!bodyType) throw new ApiError(Status.NOT_FOUND);

	return bodyType;

};

export const updateBodyTypeHandler: AuthenticatedHandler<UpdateBodyTypeSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;
	const bodyType = await findBodyType({
		user: userId,
		_id,
	});

	if (!bodyType) throw new ApiError(Status.NOT_FOUND);

	const updatedBodyType = await findAndUpdateBodyType(
		{ _id },
		request.body,
		{ new: true }
	);

	if (!updatedBodyType) throw new ApiError(Status.NOT_FOUND);

	return updatedBodyType;

};

export const deleteBodyTypeHandler: AuthenticatedHandler<DeleteBodyTypeSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;

	const bodyType = await findBodyType({
		user: userId,
		_id,
	});

	if (!bodyType) throw new ApiError(Status.NOT_FOUND);

	const deletedBodyType = await deleteBodyType({ _id });

	if (!deletedBodyType) throw new ApiError(Status.NOT_FOUND);

	return deletedBodyType;

};
