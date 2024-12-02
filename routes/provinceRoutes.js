const express = require("express");
const {
  importProvincesController,
  getProvinceByIdController,
  getAllProvincesController,
} = require("../controllers/provinceController");

const router = express.Router();

// Định nghĩa các route
router.post("/import", importProvincesController);

// Route lấy thông tin 1 tỉnh theo ID
// Đảm bảo route này được định nghĩa rõ ràng để chỉ tìm tỉnh theo provinceId
router.get("/province/:provinceId", getProvinceByIdController);

// Route lấy tất cả tỉnh thành
// Đảm bảo route này chỉ dùng để lấy tất cả tỉnh thành
router.get("/provinces", getAllProvincesController);

module.exports = router;
