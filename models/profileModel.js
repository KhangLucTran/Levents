const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    bio: { type: String },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    numberphone: { type: String, default: "" },
    avatar: { type: String, default: "" }, // Trường lưu URL ảnh từ Cloudinary
    dob: { type: Date }, // Ngày sinh
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    }, // Giới tính
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
