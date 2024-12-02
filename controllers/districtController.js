const {
  importDistricts,
  getDistrictById,
  getDistrictsByProvinceId,
} = require("../services/districtService");

// 1. Controller để thêm tất cả huyện
const importDistrictsController = async (req, res) => {
  try {
    const message = await importDistricts();
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Controller để lấy thông tin huyện theo mã huyện
const getDistrictByIdController = async (req, res) => {
  try {
    const districtId = parseInt(req.params.districtId, 10);
    const district = await getDistrictById(districtId);
    res.json(district);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 3. Controller để lấy danh sách huyện theo mã tỉnh
const getDistrictsByProvinceIdController = async (req, res) => {
  try {
    // Lấy provinceId từ params và chuyển đổi thành số
    const provinceId = req.params.provinceId;

    // Gọi service để lấy các huyện theo provinceId
    const districts = await getDistrictsByProvinceId(provinceId);

    // Kiểm tra nếu không có huyện nào
    if (!districts || districts.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy huyện nào cho tỉnh này." });
    }

    // Trả về danh sách các huyện
    res.status(200).json(districts);
  } catch (error) {
    // Lỗi server
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  importDistrictsController,
  getDistrictByIdController,
  getDistrictsByProvinceIdController,
};
