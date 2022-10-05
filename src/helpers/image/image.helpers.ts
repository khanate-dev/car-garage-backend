import { Blob } from 'node:buffer';
import sharp from 'sharp';

export const sharpifyImage = async (
	file: Blob
): Promise<Buffer> => {
	const buffer = Buffer.from(await file.arrayBuffer());
	return await sharp(buffer)
		.resize(300)
		.png()
		.toBuffer();
};