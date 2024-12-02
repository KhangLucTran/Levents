const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Cấu hình CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars", // Thư mục lưu ảnh trên Cloudinary
    format: async (req, file) => {
      // Kiểm tra loại file và trả về định dạng phù hợp
      const allowedFormats = ["jpg", "jpeg", "png", "gif", "webp"];
      const fileFormat = file.mimetype.split("/")[1];
      return allowedFormats.includes(fileFormat) ? fileFormat : "png"; // Mặc định là 'png' nếu không hợp lệ
    },
    public_id: (req, file) => file.originalname.split(".")[0], // Tên file (không có đuôi)
  },
});

// Cấu hình multer để sử dụng CloudinaryStorage
const uploadCloud = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file: 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Chấp nhận file ảnh
    } else {
      cb(new Error("Chỉ cho phép upload file ảnh!"), false);
    }
  },
});

module.exports = uploadCloud;
