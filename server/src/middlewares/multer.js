import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// 1. Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Define the remote storage target constraints
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "destinations", // The naming scheme inside your Cloudinary dashboard
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// 3. Define local filter criteria (Ensures only images are handled)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed!"), false);
  }
};

// 4. Initialize the completed configuration instance
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Optional limit: 5MB
});

export default upload;