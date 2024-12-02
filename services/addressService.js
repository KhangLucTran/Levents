const Address = require("../models/addressModel");

// Lấy tất cả địa chỉ
const getAllAddresses = async () => {
  return await Address.find();
};

// Lấy địa chỉ theo ID
const getAddressById = async (id) => {
  return await Address.findById(id);
};

// Tạo địa chỉ mới
const createAddress = async (addressData) => {
  return await Address.create(addressData);
};

// Cập nhật địa chỉ
const updateAddress = async (id, addressData) => {
  return await Address.findByIdAndUpdate(id, addressData, { new: true });
};

// Xóa địa chỉ
const deleteAddress = async (id) => {
  return await Address.findByIdAndDelete(id);
};




module.exports = {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
