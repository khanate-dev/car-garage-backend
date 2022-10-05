import { Environment } from '~/schemas/type';

declare namespace NodeJS {
	type ProcessEnv = Environment;
}
