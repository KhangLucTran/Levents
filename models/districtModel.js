const mongoose = require("mongoose");

// Định nghĩa schema cho huyện
const districtSchema = new mongoose.Schema(
  {
    districtId: { type: String, required: true, unique: true }, // Chuyển districtId sang kiểu String
    provinceId: { type: String, required: true }, // Chuyển provinceId sang kiểu String
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "districts", // Đảm bảo tên collection chính xác
  }
);

module.exports = mongoose.model("District", districtSchema);
