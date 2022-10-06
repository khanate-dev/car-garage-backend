import B2 from 'b2-js';
import { config } from '~/config';


// Takes a buffer uploads it to
export const uploadToB2 = async (name: string, buffer: Buffer): Promise<string> => {
	const b2 = await B2.authorize({
		applicationKey: config.backBlaze.applicationKey,
		applicationKeyId: config.backBlaze.keyId,
	});

	const bucket = await b2.bucket(config.backBlaze.bucketName);

	await bucket.upload(name, buffer);

	return `${config.backBlaze.endpoint}/${name}`;
};
