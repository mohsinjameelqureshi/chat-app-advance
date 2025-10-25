import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { ENV } from "./env.js";

// Configuration
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

// Upload from buffer (memoryStorage)
const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });

    console.log("File uploaded on Cloudinary. File src:", result.secure_url);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

// Delete file from Cloudinary
const deleteFromCloudinary = async (publicId, resourceType = "auto") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log("Deleted from Cloudinary:", publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
