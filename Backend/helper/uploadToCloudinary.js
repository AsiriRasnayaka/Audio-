import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath, options = {}) => {
    try{
        //Get file Extension
        const ext = path.extname(filePath).toLowerCase();

        //Decide resource type
        if(!options.resource_type) {
            if ([".mp3", ".wav", ".aac", ".m4a", ".ogg"].includes(ext)) {
                options.resource_type = "video";
            } else {
                options.resource_type = "image";
            }
        }
        const result = await cloudinary.uploader.upload(filePath, options);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    } finally {
        try {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (e) {
            console.warn(`Failed to remove temp file ${filePath}:`, e.message);
        }
    }
};

export default uploadToCloudinary;