const Profile = require("../models/profileModel");
const Address = require("../models/addressModel");
const User = require("../models/userModel");

// 1. Lấy tất cả hồ sơ
const getAllProfiles = async () => {
  return await Profile.find().populate("address");
};

// 2. Lấy hồ sơ theo ID
const getProfileById = async (id) => {
  return await Profile.findById(id).populate("address");
};

// 3. Tạo hồ sơ mới
const createProfile = async (profileData) => {
  return await Profile.create(profileData);
};

// 4. Cập nhật hồ sơ - tìm theo userId
const updateProfile = async (userId, profileData) => {
  // Tìm người dùng theo userId
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Lấy profileId từ người dùng
  const profileId = user.profileId;

  // Tìm hồ sơ theo profileId
  const profile = await Profile.findById(profileId);
  if (!profile) {
    throw new Error("Profile not found");
  }

  // Cập nhật dữ liệu mới cho hồ sơ
  const updatedProfile = await Profile.findByIdAndUpdate(
    profileId,
    profileData,
    {
      new: true,
    }
  ).populate("address");

  // Tạo địa chỉ mới và liên kết với hồ sơ từ profileData
  const newAddress = await Address.create({
    addressLine: profileData.addressLine,
    city: profileData.city,
    region: profileData.region,
  });
  // Cập nhật địa chỉ trong hồ sơ
  updatedProfile.address = newAddress._id; // Liên kết địa chỉ mới với hồ sơ

  // Lưu hồ sơ đã cập nhật với địa chỉ mới
  await updatedProfile.save();

  return updatedProfile.populate("address");
};

// 5. Xóa hồ sơ
const deleteProfile = async (id) => {
  return await Profile.findByIdAndDelete(id);
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
