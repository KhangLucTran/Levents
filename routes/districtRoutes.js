const express = require("express");
const {
  importDistrictsController,
  getDistrictByIdController,
  getDistrictsByProvinceIdController,
} = require("../controllers/districtController");

const router = express.Router();

// Định nghĩa các route
router.post("/import", importDistrictsController);
router.get("/:districtId", getDistrictByIdController);
router.get("/province/:provinceId", getDistrictsByProvinceIdController);

module.exports = router;
