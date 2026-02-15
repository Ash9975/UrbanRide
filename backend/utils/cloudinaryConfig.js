import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary, uploader, config } from "cloudinary";


export const cloudinaryConfig = (req, res, next) => {
  config({
    secure: true,
  });

  next();
};

export { uploader, cloudinary };
