const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    // Tên người dùng
    username: { type: String, required: true },
    // Thông tin hồ sơ khác
    bio: { type: String },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    numberphone: { type: String, default: "" },
    avatar: { type: String },
  },
  {
    // Tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
