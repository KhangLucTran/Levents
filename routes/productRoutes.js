const express = require("express");
const router = express.Router();
const {
  addProductController,
  deleteProductByIdController,
  deleteProductByTitleController,
  getProductByIdController,
  getAllProducts,
} = require("../controllers/productController");
const uploadCloud = require("../middleware/cloudinary"); // Đảm bảo đã sử dụng uploadCloud từ bước 1
const authenticateToken = require("../middleware/authMiddleware");

// Route thêm sản phẩm với nhiều ảnh (chỉ có admin)
router.post(
  "/add-product",
  authenticateToken,
  uploadCloud.array("images", 10),
  addProductController
);
// Route xóa sản phẩm theo id (chỉ có admin)
router.delete(
  "/delete-product/:id",
  authenticateToken,
  deleteProductByIdController
);
// Route xóa sản phẩm theo title
router.delete("/delete-product-title/:title", deleteProductByTitleController);
// Route lấy sản phẩm theo  (PULIC)
router.get("/get-product/:id", getProductByIdController);
// Route lấy tất cả sản phẩm (PULIC)
router.get("/getall-product", getAllProducts);

module.exports = router;
