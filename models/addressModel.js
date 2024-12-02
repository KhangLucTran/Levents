const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new mongoose.Schema({
  province: {
    type: String, // Thay ObjectId bằng String
    required: [true, "Province is required"], // Vẫn yêu cầu nhập tỉnh
  },
  district: {
    type: String, // Thay ObjectId bằng String
    required: [true, "District is required"], // Vẫn yêu cầu nhập quận
  },
  detail: {
    type: String, // Chi tiết địa chỉ
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Tự động thêm thời gian tạo
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Tự động thêm thời gian cập nhật
  },
});

module.exports = mongoose.model("Address", addressSchema);
