import { v2 as cloudinary } from 'cloudinary';
import { uuidv7 } from 'uuidv7';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME || 'dpg067npo',
  api_key: process.env.CLOUDINARY_API_KEY || '585643216458523',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || 'tE1ba1ROCOFeF0_ZF6Q6AJHfXxg',
});

export const uploadImage = async (
  imageBase64: string,
  folder: string,
  name?: string,
) => {
  const fileName = name || uuidv7();
  const folderName = `stikom/${folder}`;

  try {
    const result = await cloudinary.uploader.upload(imageBase64, {
      folder: folderName,
      filename_override: fileName,
      overwrite: true,
    });

    return result.secure_url;
  } catch {
    return null;
  }
};
