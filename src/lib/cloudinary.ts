import { v2 as cloudinary } from "cloudinary";

// The SDK configures itself from the CLOUDINARY_URL environment variable.
export async function uploadImage(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: "image" }, (error, result) => {
        if (error || !result) return reject(error ?? new Error("Image upload failed"));
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}
