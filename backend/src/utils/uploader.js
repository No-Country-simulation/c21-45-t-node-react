import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import config from "../config.js";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET,
});

// Función para determinar el almacenamiento en función del tipo de archivo
const getStorage = (folder, transformations = []) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `no-country/${folder}`, // Carpeta en Cloudinary
      allowed_formats: ["jpg", "png", "webp", "pdf"],
      transformation: transformations,
      public_id: (req, file) => `${Date.now()}-${Math.round(Math.random() * 1e6)}-${file.originalname.split(".")[0]}`,
    },
  });
};

// Middlewares para cargar archivos en diferentes carpetas
export const imageUploader = multer({
  storage: getStorage("images", [{ width: 500, height: 500, crop: "limit" }]),
});

export const profileUploader = multer({
  storage: getStorage("profiles"),
});
