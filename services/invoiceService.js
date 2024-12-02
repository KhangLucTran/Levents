const Invoice = require("../models/invoiceModel");

// Hàm tạo Invoice
const createInvoice = async (data) => {
  const invoice = new Invoice(data);
  return await invoice.save();
};

// Hàm lấy Invoice theo id
const getInvoiceById = async (id) => {
  return await Invoice.findById(id);
};

// Hàm update trạng thái Invoice
const updateInvoiceStatus = async (id, status) => {
  return await Invoice.findByIdAndUpdate(id, { status }, { new: true });
};

// Hàm xác nhận hóa đơn (admin xác nhận, khi hóa đơn có trạng thái "Pending" thì sẽ cập nhật thành "Completed")
const confirmInvoice = async (objectId) => {
  // Chuyển đổi invoiceId thành ObjectId hợp lệ
  console.log(objectId);
  const invoice = await Invoice.findById(objectId);
  if (!invoice) throw new Error("Invoice not found");

  // Kiểm tra nếu trạng thái là "Pending", cập nhật thành "Completed"
  if (invoice.status === "Pending") {
    return await updateInvoiceStatus(invoiceId, "Completed");
  } else {
    throw new Error("Invoice is already processed or not in 'Pending' status");
  }
};

// Hàm lấy tất cả invoices
const getAllInvoices = async () => {
  return await Invoice.find();
};

module.exports = {
  createInvoice,
  getInvoiceById,
  updateInvoiceStatus,
  confirmInvoice,
  getAllInvoices,
};
