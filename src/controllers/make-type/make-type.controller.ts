import { ApiError } from '~/errors';

import {
	CreateMakeTypeSchema,
	DeleteMakeTypeSchema,
	GetMakeTypeSchema,
	GetMakeTypesSchema,
	UpdateMakeTypeSchema,
} from '~/schemas/make-type';

import {
	createMakeType,
	deleteMakeType,
	findAndUpdateMakeType,
	findMakeType,
	findMakeTypes,
} from '~/services/make-type';

import { AuthenticatedHandler, Status } from '~/types';

export const createMakeTypeHandler: AuthenticatedHandler<CreateMakeTypeSchema> = async (
	request
) => {
	const makeType = await createMakeType({
		...request.body,
	});
	return {
		status: Status.CREATED,
		json: makeType,
	};
};

export const getMakeTypesHandler: AuthenticatedHandler<GetMakeTypesSchema> = async () => {

	const makeTypes = await findMakeTypes();

	if (!makeTypes) throw new ApiError(Status.NOT_FOUND);
	return makeTypes;

};

export const getMakeTypeHandler: AuthenticatedHandler<GetMakeTypeSchema> = async (
	request
) => {

	const _id = request.params._id;
	const makeType = await findMakeType({
		_id,
	});

	if (!makeType) throw new ApiError(Status.NOT_FOUND);

	return makeType;

};

export const updateMakeTypeHandler: AuthenticatedHandler<UpdateMakeTypeSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;
	const makeType = await findMakeType({
		user: userId,
		_id,
	});

	if (!makeType) throw new ApiError(Status.NOT_FOUND);

	const updatedMakeType = await findAndUpdateMakeType(
		{ _id },
		request.body,
		{ new: true }
	);

	if (!updatedMakeType) throw new ApiError(Status.NOT_FOUND);

	return updatedMakeType;

};

export const deleteMakeTypeHandler: AuthenticatedHandler<DeleteMakeTypeSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;

	const makeType = await findMakeType({
		user: userId,
		_id,
	});

	if (!makeType) throw new ApiError(Status.NOT_FOUND);

	const deletedMakeType = await deleteMakeType({ _id });

	if (!deletedMakeType) throw new ApiError(Status.NOT_FOUND);

	return deletedMakeType;

};
