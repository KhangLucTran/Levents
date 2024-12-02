const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");
const authenticateToken = require("../middleware/authMiddleware");

// Tạo hóa đơn mới
router.post("/", authenticateToken, invoiceController.createInvoice);

// Xác nhận hóa đơn (admin xác nhận)
router.post("/confirm", authenticateToken, invoiceController.confirmInvoice);

// Lấy hóa đơn theo ID
router.get(
  "/get-invoice/:id",
  authenticateToken,
  invoiceController.getInvoiceById
);

// Lấy tất cả invoices
router.get("/", authenticateToken, invoiceController.getAllInvoices);

module.exports = router;
