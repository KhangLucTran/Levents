const Province = require("../models/provinceModel");

const provinces = [
  { provinceId: "1", name: "Hà Nội" },
  { provinceId: "2", name: "Hà Giang" },
  { provinceId: "3", name: "Cao Bằng" },
  { provinceId: "4", name: "Bắc Kạn" },
  { provinceId: "5", name: "Tuyên Quang" },
  { provinceId: "6", name: "Lào Cai" },
  { provinceId: "7", name: "Điện Biên" },
  { provinceId: "8", name: "Lai Châu" },
  { provinceId: "9", name: "Sơn La" },
  { provinceId: "10", name: "Yên Bái" },
  { provinceId: "11", name: "Hòa Bình" },
  { provinceId: "12", name: "Thái Nguyên" },
  { provinceId: "13", name: "Lạng Sơn" },
  { provinceId: "14", name: "Quảng Ninh" },
  { provinceId: "15", name: "Bắc Giang" },
  { provinceId: "16", name: "Phú Thọ" },
  { provinceId: "17", name: "Vĩnh Phúc" },
  { provinceId: "18", name: "Bắc Ninh" },
  { provinceId: "19", name: "Hải Dương" },
  { provinceId: "20", name: "Hải Phòng" },
  { provinceId: "21", name: "Hưng Yên" },
  { provinceId: "22", name: "Thái Bình" },
  { provinceId: "23", name: "Hà Nam" },
  { provinceId: "24", name: "Nam Định" },
  { provinceId: "25", name: "Ninh Bình" },
  { provinceId: "26", name: "Thanh Hóa" },
  { provinceId: "27", name: "Nghệ An" },
  { provinceId: "28", name: "Hà Tĩnh" },
  { provinceId: "29", name: "Quảng Bình" },
  { provinceId: "30", name: "Quảng Trị" },
  { provinceId: "31", name: "Thừa Thiên Huế" },
  { provinceId: "32", name: "Đà Nẵng" },
  { provinceId: "33", name: "Quảng Nam" },
  { provinceId: "34", name: "Quảng Ngãi" },
  { provinceId: "35", name: "Bình Định" },
  { provinceId: "36", name: "Phú Yên" },
  { provinceId: "37", name: "Khánh Hòa" },
  { provinceId: "38", name: "Ninh Thuận" },
  { provinceId: "39", name: "Bình Thuận" },
  { provinceId: "40", name: "Kon Tum" },
  { provinceId: "41", name: "Gia Lai" },
  { provinceId: "42", name: "Đắk Lắk" },
  { provinceId: "43", name: "Đắk Nông" },
  { provinceId: "44", name: "Lâm Đồng" },
  { provinceId: "45", name: "Bình Phước" },
  { provinceId: "46", name: "Tây Ninh" },
  { provinceId: "47", name: "Bình Dương" },
  { provinceId: "48", name: "Đồng Nai" },
  { provinceId: "49", name: "Bà Rịa - Vũng Tàu" },
  { provinceId: "50", name: "Hồ Chí Minh" },
  { provinceId: "51", name: "Long An" },
  { provinceId: "52", name: "Tiền Giang" },
  { provinceId: "53", name: "Bến Tre" },
  { provinceId: "54", name: "Trà Vinh" },
  { provinceId: "55", name: "Vĩnh Long" },
  { provinceId: "56", name: "Đồng Tháp" },
  { provinceId: "57", name: "An Giang" },
  { provinceId: "58", name: "Kiên Giang" },
  { provinceId: "59", name: "Cần Thơ" },
  { provinceId: "60", name: "Hậu Giang" },
  { provinceId: "61", name: "Sóc Trăng" },
  { provinceId: "62", name: "Bạc Liêu" },
  { provinceId: "63", name: "Cà Mau" },
];

const importProvinces = async () => {
  const existingCount = await Province.countDocuments();
  if (existingCount > 0) {
    throw new Error("Dữ liệu tỉnh thành đã tồn tại.");
  }
  await Province.insertMany(provinces);
  return "Thêm tất cả tỉnh thành thành công!";
};

// Hàm lấy tất cả tỉnh thành
const getAllProvinces = async () => {
  const provinces = await Province.find();
  return provinces;
};

// Hàm lấy thông tin tỉnh thành theo `provinceId`
const getProvinceById = async (provinceId) => {
  try {
    const province = await Province.findOne({ provinceId })
      .select("-__v")
      .lean(); // Trả về dữ liệu đơn giản
    if (!province) {
      throw new Error("Tỉnh thành không tồn tại!");
    }
    return province;
  } catch (error) {
    console.error("Lỗi khi tìm tỉnh thành:", error);
    throw new Error(`Lỗi khi tìm tỉnh thành: ${error.message}`);
  }
};

module.exports = { importProvinces, getProvinceById, getAllProvinces };
