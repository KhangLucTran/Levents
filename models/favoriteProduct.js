const mongoose = require("mongoose");
const { Schema } = mongoose;

// Định nghĩa schema cho FavoriteProduct
const favoriteProductSchema = new Schema(
  {
    // Tham chiếu đến User
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến model User
      required: true,
    },

    // Tham chiếu đến Product
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Tham chiếu đến model Product
      required: true,
    },
  },
  {
    // Tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Tạo chỉ mục để đảm bảo mỗi user chỉ lưu một sản phẩm yêu thích duy nhất
favoriteProductSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Xuất model FavoriteProduct
module.exports = mongoose.model("FavoriteProduct", favoriteProductSchema);
