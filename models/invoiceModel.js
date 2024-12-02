const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
    default: "Completed",
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
  },
  lineItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "LineItem",
    },
  ],
});

module.exports = mongoose.model("Invoice", invoiceSchema);