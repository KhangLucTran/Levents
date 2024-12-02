const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "LineItem",
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

cartSchema.pre("save", async function (next) {
  try {
    const LineItem = mongoose.model("LineItem");
    const items = await LineItem.find({ _id: { $in: this.items } });

    // Tính tổng lại nếu có thay đổi
    this.totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    next();
  } catch (err) {
    next(err);
  }
});

// Tính lại tổng nếu có sự thay đổi sau khi update
cartSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (update.items) {
      const LineItem = mongoose.model("LineItem");
      const items = await LineItem.find({ _id: { $in: update.items } });

      update.totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    }
    next();
  } catch (err) {
    next(err);
  }
});
// Xuất model Cart
module.exports = mongoose.model("Cart", cartSchema);
