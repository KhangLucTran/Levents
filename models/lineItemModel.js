const mongoose = require("mongoose");
const { Schema } = mongoose;

// Định nghĩa schema cho LineItem
const lineItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
});

// Tính tổng giá tự động trước khi lưu
lineItemSchema.pre("save", function (next) {
  this.total = this.quantity * this.price;
  next();
});

// Nếu quantity hoặc price thay đổi, cần tính lại total
lineItemSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.quantity || update.price) {
    update.total =
      (update.quantity || this.quantity) * (update.price || this.price);
  }
  next();
});

// Xuất model LineItem
module.exports = mongoose.model("LineItem", lineItemSchema);
