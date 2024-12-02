const {
  importProvinces,
  getProvinceById,
  getAllProvinces,
} = require("../services/provinceService");

// 1. Controller "thêm các tỉnh".
const importProvincesController = async (req, res) => {
  try {
    const message = await importProvinces();
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Controller "Lấy tất cả các tỉnh"
const getAllProvincesController = async (req, res) => {
  try {
    const provinces = await getAllProvinces();

    res.status(200).json({ provinces });
  } catch (error) {
    console.error("Lỗi trong controller:", error);
    res.status(500).json({ message: error.message });
  }
};

// 3. Controller "Lấy tỉnh theo id"
const getProvinceByIdController = async (req, res) => {
  try {
    // Lấy id từ tham số URL và chuyển đổi nó thành một số nguyên
    const provinceId = req.params.provinceId;
    // Gọi hàm service để lấy thông tin province
    const province = await getProvinceById(provinceId);
    // Kiểm tra nếu province không tìm thấy
    if (!province) {
      return res.status(404).json({ message: "Province không tồn tại" });
    }
    res.json(province);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  importProvincesController,
  getProvinceByIdController,
  getAllProvincesController,
};
