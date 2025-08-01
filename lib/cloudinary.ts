import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export async function uploadToCloudinary(
  file: Buffer | string,
  options: {
    folder?: string;
    public_id?: string;
    transformation?: Record<string, unknown>;
    resource_type?: "image";
  } = {}
): Promise<CloudinaryUploadResult> {
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder: "reciverse",
      public_id: options.public_id,
      transformation: options.transformation,
      resource_type: options.resource_type || "auto",
      quality: "auto",
      fetch_format: "auto"
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type
    };
  } catch (error) {
    console.error("Upload failed : ", error);
    throw new Error("Failed to upload image to cloudinary");
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error : ", error);
    throw new Error("Failed to delete image from cloudinary");
  }
}

export function getCloudinaryUrl(
  publicId: string,
  transformation?: Record<string, unknown>
): string {
  return cloudinary.url(publicId, {
    ...transformation,
    secure: true
  });
}

export default cloudinary;
