const mongoose = require("mongoose");
const { Schema } = mongoose;

// Định nghĩa schema cho Comment
const commentSchema = new Schema(
  {
    // Tin nhắn
    message: {
      type: String,
      required: true,
      maxlength: 1000, // Giới hạn độ dài tin nhắn
    },

    // Hình ảnh (có thể là mảng URL hình ảnh từ Cloudinary)
    images: {
      type: [String], // Mảng URL ảnh
      default: [],
    },

    // Đánh giá sao (từ 1 đến 5)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Tham chiếu đến User
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Liên kết với User
      required: true,
    },

    // Tham chiếu đến Product
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Liên kết với Product
      required: true,
    },
  },
  {
    // Tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);
commentSchema.index({ productId: 1, userId: 1 });

// Xuất model Comment
module.exports = mongoose.model("Comment", commentSchema);
