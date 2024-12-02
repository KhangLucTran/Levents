const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticateToken = require("../middleware/authMiddleware");
// Tạo giỏ hàng mới
router.post("/", authenticateToken, cartController.createCartController);
// Lấy cart theo userID
router.get(
  "/user-cart",
  authenticateToken,
  cartController.getCartByIdUserController
);
// Lấy giỏ hàng theo ID
router.get("/:id", authenticateToken, cartController.getCartController);

router.delete(
  "/cart/:cartId/line-item/:lineItemId",
  authenticateToken,
  cartController.removeLineItemFromCartController
);

module.exports = router;