import B2 from 'b2-js';
import { config } from '~/config';


// Takes a buffer uploads it to
export const uploadToB2 = async (name: string, buffer: Buffer): Promise<string> => {
	const b2 = await B2.authorize({
		applicationKey: config.backblazeApplicationKey,
		applicationKeyId: config.backblazeKeyId,
	});

	const bucket = await b2.bucket(config.backblazeBucketName);

	await bucket.upload(name, buffer);

	return `${config.backblazeEndpoint}/${name}`;
};
