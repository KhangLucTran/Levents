const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    // Giá trị của role {R1, R2, R3}
    code: {
      type: String,
      required: true,
      enum: ["R1", "R2", "R3"], // Chỉ cho phép ba giá trị này
    },
    // Tương đương với {R1, R2, R3} là {Admin, Staff, User}
    value: {
      type: String,
      required: true,
      enum: ["Admin", "Staff", "User"], // Các giá trị tương ứng với code
    },
  },
  {
    timestamps: true,
  }
);

// Xuất model Role
module.exports = mongoose.model("Role", roleSchema);
