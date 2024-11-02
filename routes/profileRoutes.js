const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authenticateToken = require("../middleware/authMiddleware");

// Route lấy tất cả hồ sơ (Cần Token)
router.get("/", authenticateToken, profileController.getAllProfiles);
// Route lấy hồ sơ theo ID (Cần Token)
router.get("/:id", authenticateToken, profileController.getProfileById);
// Route tạo hồ sơ mới (Cần Token)
router.post("/", authenticateToken, profileController.createProfile);
// Route cập nhật hồ sơ (Cần Token)
router.put("/", authenticateToken, profileController.updateProfile);
// Route xóa hồ sơ (Cần Token)
router.delete("/:id", authenticateToken, profileController.deleteProfile);

module.exports = router;
