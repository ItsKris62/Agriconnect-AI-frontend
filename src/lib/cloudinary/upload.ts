import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (file: File, folder: string = 'sokoyetu-ai'): Promise<string> => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Upload failed'));
          }
        }
      );
      uploadStream.end(bytes);
    });
  } catch (error) {
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export const deleteFile = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Failed to delete file from Cloudinary');
  }
};