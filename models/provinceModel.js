const mongoose = require("mongoose");
const { Schema } = mongoose;

const provinceSchema = new Schema(
  {
    provinceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  {
    // Tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Province", provinceSchema);
