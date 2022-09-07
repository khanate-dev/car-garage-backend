import { Request, Response, NextFunction, RequestHandler } from 'express';
import z from 'zod';

import { Jwt } from '~/types/general';
import { Status } from '~/types/http';

export type ZodRouteParams = (
	z.ZodObject<Record<string, any>, 'strict'>
	| z.ZodEffects<z.ZodObject<Record<string, any>, 'strict'>>
);

export type ZodRouteQuery = (
	z.ZodObject<Record<string, any>, 'strict'>
	| z.ZodEffects<z.ZodObject<Record<string, any>, 'strict'>>
);

export type ZodRouteBody = (
	z.ZodObject<Record<string, any>, 'strict'>
	| z.ZodEffects<z.ZodObject<Record<string, any>, 'strict'>>
	| z.ZodArray<
		z.ZodObject<Record<string, any>, 'strict'>
		| z.ZodEffects<z.ZodObject<Record<string, any>, 'strict'>>
	>
);

export type ZodRouteResponse = (
	z.ZodObject<Record<string, any>, 'strict'>
	| z.ZodEffects<z.ZodObject<Record<string, any>, 'strict'>>
	| z.ZodArray<
		z.ZodObject<Record<string, any>, 'strict'>
		| z.ZodEffects<z.ZodObject<Record<string, any>, 'strict'>>
	>
	| z.ZodVoid
);

export interface RouteSchemaInput<
	Body extends ZodRouteBody,
	Params extends ZodRouteParams,
	Query extends ZodRouteQuery,
	Response extends ZodRouteResponse,
> {
	body?: Body,
	params?: Params,
	query?: Query,
	response?: Response,
}

export type ErrorResponse = {
	type: string,
	message: string,
};

export type ZodRouteSchema<
	Body extends ZodRouteBody = ZodRouteBody,
	Params extends ZodRouteParams = ZodRouteParams,
	Query extends ZodRouteQuery = ZodRouteQuery,
	Response extends ZodRouteResponse = ZodRouteResponse,
> = z.ZodObject<
	{
		body: Body,
		params: Params,
		query: Query,
		response: Response,
	}
	, 'strict'
>;

type RouteSchema = z.infer<ZodRouteSchema>;

export interface DefaultRouteSchema {
	body: Record<never, never>,
	params: Record<never, never>,
	query: Record<never, never>,
	response: void,
}

type PublicLocals = Record<never, never>;
type PrivateLocals = Record<'user', Jwt>;

export interface DetailedResponse<Json extends RouteSchema['response']> {
	status: Status,
	json: Json,
}

export type CustomHandler<
	Locals extends PublicLocals | PrivateLocals,
	Schema extends RouteSchema,
> = (
	request: Request<
		Schema['params'],
		Schema['response'],
		Schema['body'],
		Schema['query'],
		Locals
	>,
	response: Response<
		Schema['response'],
		Locals
	>,
	next: NextFunction
) => Promise<Schema['response'] | DetailedResponse<Schema['response']>>;

export type PublicHandler<
	Schema extends RouteSchema
> = CustomHandler<
	PublicLocals,
	Schema
>;
export type PrivateHandler<
	Schema extends RouteSchema,
> = CustomHandler<
	PrivateLocals,
	Schema
>;

export type Middleware = RequestHandler<
	never,
	ErrorResponse,
	never,
	never,
	never
>;

export type PrivateMiddleware = RequestHandler<
	never,
	ErrorResponse,
	never,
	never,
	Partial<PrivateLocals>
>;

export type _PublicHandler = PublicHandler<any>;
export type _PrivateHandler = PrivateHandler<any>;

export type RouteMethod = (
	| 'get'
	| 'post'
	| 'put'
	| 'patch'
	| 'delete'
);

interface BaseRoute {
	method: RouteMethod,
	path: string,
	schema: ZodRouteSchema,
	middleware?: Middleware | Middleware[],
	handler: _PublicHandler | _PrivateHandler,
	isPrivate?: boolean,
}

export interface PublicRoute extends BaseRoute {
	handler: _PublicHandler,
	isPrivate?: undefined,
}

export interface PrivateRoute extends BaseRoute {
	handler: _PrivateHandler,
	isPrivate: true,
}

export type Route = PublicRoute | PrivateRoute;