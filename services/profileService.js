const Profile = require("../models/profileModel");
const Address = require("../models/addressModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

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

// 4. Hàm upload ảnh lên Cloudinary
const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "avatars", // Lưu ảnh trong thư mục 'avatars'
      use_filename: true, // Sử dụng tên file gốc
      unique_filename: false, // Không thêm chuỗi ngẫu nhiên vào tên file
    });
    return result.secure_url; // Trả về URL của ảnh
  } catch (error) {
    throw new Error("Lỗi khi upload ảnh lên Cloudinary: " + error.message);
  }
};
// 5. Hàm cập nhật ảnh đại diện
const updateAvatar = async (req, res, file) => {
  try {
    const profile = await Profile.findOne({ _id: req.user.profileId }); // Tìm Profile theo userId
    if (!profile) {
      throw new Error("Profile not found");
    }

    if (file) {
      const imageUrl = await uploadImageToCloudinary(file); // Upload ảnh lên Cloudinary
      profile.avatar = imageUrl; // Cập nhật avatar mới
      await profile.save(); // Lưu hồ sơ đã cập nhật
      return profile.avatar; // Trả về URL avatar mới
    }

    throw new Error("No file uploaded");
  } catch (error) {
    throw new Error("Error updating avatar: " + error.message);
  }
};

// 6. Xóa hồ sơ
const deleteProfile = async (id) => {
  return await Profile.findByIdAndDelete(id);
};

// 7. Hàm updateProfile
const updateUserProfile = async (profileId, body) => {
  try {
    const {
      username,
      mobilePhone,
      birthday,
      gender,
      province,
      district,
      addressDetail,
    } = body;

    // Tìm profile bằng profileId (đã có trong req.user từ token)
    const profile = await Profile.findOne({ _id: profileId });

    // Nếu không tìm thấy profile, ném lỗi
    if (!profile) {
      throw new Error("Profile không tìm thấy.");
    }

    // Tạo hoặc cập nhật địa chỉ nếu có thay đổi
    let updatedAddress = null;
    if (province || district || addressDetail) {
      if (profile.address) {
        // Nếu đã có địa chỉ, cập nhật
        updatedAddress = await Address.findOneAndUpdate(
          { _id: profile.address },
          { province, district, detail: addressDetail },
          { new: true }
        );
      } else {
        // Nếu chưa có địa chỉ, tạo mới
        updatedAddress = await Address.create({
          province,
          district,
          detail: addressDetail,
        });
      }
    }

    // Cập nhật các trường còn lại của profile
    profile.username = username || profile.username;
    profile.numberphone = mobilePhone || profile.numberphone;
    profile.dob = birthday || profile.dob;
    profile.gender = gender || profile.gender;
    if (updatedAddress) {
      profile.address = updatedAddress._id;
    }

    // Lưu profile đã cập nhật
    const updatedProfile = await profile.save();

    // Trả về profile đã được cập nhật
    return updatedProfile;
  } catch (error) {
    console.error("Lỗi khi cập nhật hồ sơ:", error);
    throw error; // Để lỗi được bắt ở controller
  }
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateUserProfile,
  updateAvatar,
  deleteProfile,
};
