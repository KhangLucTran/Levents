const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const authenticateToken = require("../middleware/authMiddleware");

// Route lấy tất cả địa chỉ (Cần Token)
router.get("/", authenticateToken, addressController.getAllAddresses);

// Route lấy địa chỉ theo ID (Cần Token)
router.get("/:id", authenticateToken, addressController.getAddressById);

// Route tạo địa chỉ mới (Cần Token)
router.post("/", authenticateToken, addressController.createAddress);

// Route cập nhật địa chỉ (Cần Token)
router.put("/:id", authenticateToken, addressController.updateAddress);

// Route xóa địa chỉ (Cần Token)
router.delete("/:id", authenticateToken, addressController.deleteAddress);

module.exports = router;
