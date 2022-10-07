import sharp from 'sharp';

export const sharpifyImage = async (
	buffer: Buffer
): Promise<Buffer> => {
	return await sharp(buffer)
		.resize(300)
		.png()
		.toBuffer();
};
