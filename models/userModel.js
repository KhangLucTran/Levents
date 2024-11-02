const mongoose = require("mongoose");
const { Schema } = mongoose;

// Định nghĩa schema cho User
const userSchema = new Schema(
  {
    // Email người dùng (duy nhất và bắt buộc)
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Mật khẩu người dùng (bắt buộc)
    password: {
      type: String,
      required: true,
    },

    // Nhà cung cấp dịch vụ (VD: Google, Facebook, hoặc "system" cho đăng ký thủ công)
    provider: {
      type: String,
      default: "system",
    },

    // Trạng thái xác minh (true/false)
    verifyState: {
      type: String,
      default: "false",
    },

    // Tham chiếu đến model Profile (liên kết với hồ sơ của người dùng)
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile", // Tham chiếu đến model Profile
      required: true, // Đảm bảo mỗi người dùng đều có một profile
    },

    // Role của người dùng (tham chiếu đến model Role)
    role_code: {
      type: Schema.Types.ObjectId,
      ref: "Role", // Tham chiếu đến model Role
      default: null,
    },

    // Refresh token để xác thực lại khi token hết hạn
    refresh_token: {
      type: String,
    },

    // Thời gian hết hạn của refresh token
    refresh_token_expiry: {
      type: Date,
    },
    otp: { type: String }, // Lưu mã OTP
    otpExpiry: { type: Date }, // Lưu thời gian hết hạn của OTP
  },
  {
    // Tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Xuất model User
module.exports = mongoose.model("User", userSchema);
