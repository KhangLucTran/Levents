const profileService = require("../services/profileService");

// Lấy tất cả hồ sơ
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy hồ sơ theo ID
const getProfileById = async (req, res) => {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo hồ sơ mới
const createProfile = async (req, res) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật hồ sơ
const updateProfile = async (req, res) => {
  console.log("In controller updateProfile: ", req.body);
  try {
    // Chuyển việc xử lý chỉ trả về dữ liệu từ service, controller chịu trách nhiệm trả lời
    const updatedProfile = await profileService.updateUserProfile(
      req.user.profileId,
      req.body
    );

    // Gửi phản hồi chỉ một lần ở đây
    res.status(200).json({
      error: 0,
      message: "Cập nhật thông tin thành công",
      data: updatedProfile,
    });
  } catch (err) {
    console.error("Cập nhật hồ sơ thất bại:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const file = req.file; // Lấy file từ request (nếu có)

    // Gọi service để cập nhật avatar
    const avatarUrl = await profileService.updateAvatar(req, res, file);

    return res.status(200).send({
      message: "Avatar updated successfully",
      avatar: avatarUrl,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error updating avatar: " + error.message });
  }
};

// Xóa hồ sơ
const deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await profileService.deleteProfile(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  updateAvatar,
};
