const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authenticateToken = require("../middleware/authMiddleware");

// Thêm bình luận
router.post("/", authenticateToken, commentController.addCommentController);

// Lấy tất cả bình luận của sản phẩm
router.get("/:productId", commentController.getCommentsByProductController);

// Xóa bình luận theo ID
router.delete(
  "/:commentId",
  authenticateToken,
  commentController.deleteCommentController
);

module.exports = router;
