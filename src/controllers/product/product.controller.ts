import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';
import { ApiError } from '~/errors';
import { uploadToB2 } from '~/helpers/backblaze';
import { sharpifyImage } from '~/helpers/image';

import {
	CreateProductSchema,
	DeleteProductSchema,
	GetProductSchema,
	GetProductsSchema,
	UpdateProductSchema,
} from '~/schemas/product';

import {
	createProduct,
	deleteProduct,
	findAndUpdateProduct,
	findProduct,
	findProducts,
} from '~/services/product';

import { AuthenticatedHandler, Status } from '~/types';

export const createProductHandler: AuthenticatedHandler<CreateProductSchema> = async (
	request,
	response
) => {

	const image = (
		(request.body.image instanceof Object) ?
			await uploadToB2(
				`${randomUUID()}.png`,
				(await sharpifyImage(readFileSync(request.body.image.path)))
			)
			:
			request.body.image
	);

	const product = await createProduct({
		...request.body,
		image,
		sellerId: response.locals.user._id,
	});
	return {
		status: Status.CREATED,
		json: product,
	};
};

export const getProductsHandler: AuthenticatedHandler<GetProductsSchema> = async (
	_request,
	response
) => {

	const user = response.locals.user;
	const options = user.role === 'admin' ? {} : { userId: user._id };
	const products = await findProducts(options);

	if (!products) throw new ApiError(Status.NOT_FOUND);
	return products;

};

export const getProductHandler: AuthenticatedHandler<GetProductSchema> = async (
	request,
	response
) => {

	const _id = request.params._id;
	const user = response.locals.user;
	const options = user.role === 'admin' ? { _id } : { _id, userId: user._id };
	const product = await findProduct(options);

	if (!product) throw new ApiError(Status.NOT_FOUND);

	return product;

};

export const updateProductHandler: AuthenticatedHandler<UpdateProductSchema> = async (
	request,
	response
) => {

	const image = (
		(request.body.image instanceof Object) ?
			await uploadToB2(
				`${randomUUID()}.png`,
				(await sharpifyImage(readFileSync(request.body.image.path)))
			)
			:
			request.body.image
	);

	const userId = response.locals.user._id;
	const _id = request.params._id;
	const product = await findProduct({
		user: userId,
		_id,
	});

	if (!product) throw new ApiError(Status.NOT_FOUND);
	if (product.sellerId.toJSON() !== userId) throw new ApiError(Status.FORBIDDEN);

	const updatedProduct = await findAndUpdateProduct(
		{ _id },
		{
			...request.body,
			image,
		},
		{ new: true }
	);

	if (!updatedProduct) throw new ApiError(Status.NOT_FOUND);

	return updatedProduct;

};

export const deleteProductHandler: AuthenticatedHandler<DeleteProductSchema> = async (
	request,
	response
) => {

	const userId = response.locals.user._id;
	const _id = request.params._id;

	const product = await findProduct({
		user: userId,
		_id,
	});

	if (!product) throw new ApiError(Status.NOT_FOUND);
	if (product.sellerId.toJSON() !== userId) throw new ApiError(Status.FORBIDDEN);

	const deletedProduct = await deleteProduct({ _id });

	if (!deletedProduct) throw new ApiError(Status.NOT_FOUND);

	return deletedProduct;

};
