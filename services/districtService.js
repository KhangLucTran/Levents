const District = require("../models/districtModel");

const districts = [
  { districtId: "457", provinceId: "51", name: "Thành phố Tân An" },
  { districtId: "458", provinceId: "51", name: "Huyện Bến Lức" },
  { districtId: "459", provinceId: "51", name: "Huyện Cần Giuộc" },
  { districtId: "460", provinceId: "51", name: "Huyện Cần Đước" },
  { districtId: "461", provinceId: "51", name: "Huyện Đức Hòa" },
  { districtId: "462", provinceId: "51", name: "Huyện Đức Huệ" },
  { districtId: "463", provinceId: "51", name: "Huyện Mộc Hóa" },
  { districtId: "464", provinceId: "51", name: "Huyện Thủ Thừa" },
  { districtId: "465", provinceId: "51", name: "Huyện Tân Trụ" },
  { districtId: "466", provinceId: "51", name: "Huyện Vĩnh Hưng" },
  { districtId: "467", provinceId: "52", name: "Thành phố Mỹ Tho" },
  { districtId: "468", provinceId: "52", name: "Thành phố Gò Công" },
  { districtId: "469", provinceId: "52", name: "Huyện Châu Thành" },
  { districtId: "470", provinceId: "52", name: "Huyện Cái Bè" },
  { districtId: "471", provinceId: "52", name: "Huyện Cai Lậy" },
  { districtId: "472", provinceId: "52", name: "Huyện Tân Phú Đông" },
  { districtId: "473", provinceId: "52", name: "Huyện Chợ Gạo" },
  { districtId: "474", provinceId: "52", name: "Huyện Tân Hiệp" },
  { districtId: "475", provinceId: "53", name: "Thành phố Bến Tre" },
  { districtId: "476", provinceId: "53", name: "Huyện Ba Tri" },
  { districtId: "477", provinceId: "53", name: "Huyện Bình Đại" },
  { districtId: "478", provinceId: "53", name: "Huyện Châu Thành" },
  { districtId: "479", provinceId: "53", name: "Huyện Chợ Lách" },
  { districtId: "480", provinceId: "53", name: "Huyện Mỏ Cày Bắc" },
  { districtId: "481", provinceId: "53", name: "Huyện Mỏ Cày Nam" },
  { districtId: "482", provinceId: "53", name: "Huyện Thạnh Phú" },
  { districtId: "483", provinceId: "54", name: "Thành phố Trà Vinh" },
  { districtId: "484", provinceId: "54", name: "Huyện Cầu Kè" },
  { districtId: "485", provinceId: "54", name: "Huyện Cầu Ngang" },
  { districtId: "486", provinceId: "54", name: "Huyện Châu Thành" },
  { districtId: "487", provinceId: "54", name: "Huyện Duyên Hải" },
  { districtId: "488", provinceId: "54", name: "Huyện Tiểu Cần" },
  { districtId: "489", provinceId: "54", name: "Huyện Trà Cú" },
  { districtId: "490", provinceId: "54", name: "Huyện Càng Long" },
  { districtId: "491", provinceId: "55", name: "Thành phố Vĩnh Long" },
  { districtId: "492", provinceId: "55", name: "Huyện Long Hồ" },
  { districtId: "493", provinceId: "55", name: "Huyện Mang Thít" },
  { districtId: "494", provinceId: "55", name: "Huyện Tam Bình" },
  { districtId: "495", provinceId: "55", name: "Huyện Trà Ôn" },
  { districtId: "496", provinceId: "55", name: "Huyện Vũng Liêm" },
  { districtId: "497", provinceId: "55", name: "Huyện Bình Minh" },
  { districtId: "498", provinceId: "56", name: "Thành phố Cao Lãnh" },
  { districtId: "499", provinceId: "56", name: "Thành phố Sa Đéc" },
  { districtId: "500", provinceId: "56", name: "Huyện Cao Lãnh" },
  { districtId: "501", provinceId: "56", name: "Huyện Hồng Ngự" },
  { districtId: "502", provinceId: "56", name: "Huyện Lai Vung" },
  { districtId: "503", provinceId: "56", name: "Huyện Lấp Vò" },
  { districtId: "504", provinceId: "56", name: "Huyện Tam Nông" },
  { districtId: "505", provinceId: "56", name: "Huyện Tân Hồng" },
  { districtId: "506", provinceId: "56", name: "Huyện Thanh Bình" },
  { districtId: "507", provinceId: "56", name: "Huyện Châu Thành" },
  { districtId: "508", provinceId: "57", name: "Thành phố Long Xuyên" },
  { districtId: "509", provinceId: "57", name: "Thành phố Châu Đốc" },
  { districtId: "510", provinceId: "57", name: "Huyện An Phú" },
  { districtId: "511", provinceId: "57", name: "Huyện Châu Phú" },
  { districtId: "512", provinceId: "57", name: "Huyện Chợ Mới" },
  { districtId: "513", provinceId: "57", name: "Huyện Phú Tân" },
  { districtId: "514", provinceId: "57", name: "Huyện Tân Châu" },
  { districtId: "515", provinceId: "57", name: "Huyện Thoại Sơn" },
  { districtId: "516", provinceId: "57", name: "Huyện Tri Tôn" },
  { districtId: "517", provinceId: "57", name: "Huyện Tịnh Biên" },
  { districtId: "518", provinceId: "58", name: "Thành phố Rạch Giá" },
  { districtId: "519", provinceId: "58", name: "Thành phố Hà Tiên" },
  { districtId: "520", provinceId: "58", name: "Huyện An Biên" },
  { districtId: "521", provinceId: "58", name: "Huyện An Minh" },
  { districtId: "522", provinceId: "58", name: "Huyện Châu Thành" },
  { districtId: "523", provinceId: "58", name: "Huyện Giồng Riềng" },
  { districtId: "524", provinceId: "58", name: "Huyện Gò Quao" },
  { districtId: "525", provinceId: "58", name: "Huyện Hòn Đất" },
  { districtId: "526", provinceId: "58", name: "Huyện Kiên Hải" },
  { districtId: "527", provinceId: "58", name: "Huyện Kiên Lương" },
  { districtId: "528", provinceId: "58", name: "Huyện Phú Quốc" },
  { districtId: "529", provinceId: "58", name: "Huyện U Minh Thượng" },
  { districtId: "530", provinceId: "58", name: "Huyện Vĩnh Thuận" },
  { districtId: "531", provinceId: "59", name: "Quận Ninh Kiều" },
  { districtId: "532", provinceId: "59", name: "Quận Cái Răng" },
  { districtId: "533", provinceId: "59", name: "Quận Bình Thủy" },
  { districtId: "534", provinceId: "59", name: "Quận Ô Môn" },
  { districtId: "535", provinceId: "59", name: "Quận Thốt Nốt" },
  { districtId: "536", provinceId: "59", name: "Huyện Vĩnh Thạnh" },
  { districtId: "537", provinceId: "59", name: "Huyện Cờ Đỏ" },
  { districtId: "538", provinceId: "59", name: "Huyện Phong Điền" },
  { districtId: "539", provinceId: "59", name: "Huyện Thới Lai" },
  { districtId: "540", provinceId: "60", name: "Thành phố Vị Thanh" },
  { districtId: "541", provinceId: "60", name: "Huyện Châu Thành A" },
  { districtId: "542", provinceId: "60", name: "Huyện Châu Thành" },
  { districtId: "543", provinceId: "60", name: "Huyện Long Mỹ" },
  { districtId: "544", provinceId: "60", name: "Huyện Phụng Hiệp" },
  { districtId: "545", provinceId: "60", name: "Huyện Vị Thủy" },
  { districtId: "546", provinceId: "60", name: "Huyện Ngã Bảy" },
  { districtId: "547", provinceId: "60", name: "Huyện Kiên Thủy" },
  { districtId: "548", provinceId: "61", name: "Thành phố Sóc Trăng" },
  { districtId: "549", provinceId: "61", name: "Huyện Châu Thành" },
  { districtId: "550", provinceId: "61", name: "Huyện Kế Sách" },
  { districtId: "551", provinceId: "61", name: "Huyện Mỹ Tú" },
  { districtId: "552", provinceId: "61", name: "Huyện Mỹ Xuyên" },
  { districtId: "553", provinceId: "61", name: "Huyện Ngã Năm" },
  { districtId: "554", provinceId: "61", name: "Huyện Thạnh Trị" },
  { districtId: "555", provinceId: "61", name: "Huyện Trần Đề" },
  { districtId: "556", provinceId: "62", name: "Thành phố Bạc Liêu" },
  { districtId: "557", provinceId: "62", name: "Huyện Đông Hải" },
  { districtId: "558", provinceId: "62", name: "Huyện Hòa Bình" },
  { districtId: "559", provinceId: "62", name: "Huyện Phước Long" },
  { districtId: "560", provinceId: "62", name: "Huyện Vĩnh Lợi" },
  { districtId: "561", provinceId: "62", name: "Huyện Hồng Dân" },
  { districtId: "562", provinceId: "62", name: "Huyện Giá Rai" },

  { districtId: "563", provinceId: "63", name: "Thành phố Cà Mau" },
  { districtId: "564", provinceId: "63", name: "Huyện U Minh" },
  { districtId: "565", provinceId: "63", name: "Huyện Thới Bình" },
  { districtId: "566", provinceId: "63", name: "Huyện Trần Văn Thời" },
  { districtId: "567", provinceId: "63", name: "Huyện Cái Nước" },
  { districtId: "568", provinceId: "63", name: "Huyện Phú Tân" },
  { districtId: "569", provinceId: "63", name: "Huyện Năm Căn" },
  { districtId: "570", provinceId: "63", name: "Huyện Đầm Dơi" },
  { districtId: "571", provinceId: "63", name: "Huyện Ngọc Hiển" },
];

// Thêm tất cả huyện vào cơ sở dữ liệu
const importDistricts = async () => {
  await District.insertMany(districts);
  return "Thêm tất cả huyện thành công!";
};

// Lấy thông tin huyện theo mã huyện
const getDistrictById = async (districtId) => {
  const district = await District.findOne({ districtId });
  if (!district) {
    throw new Error("Huyện không tồn tại!");
  }
  return district;
};

// Lấy danh sách huyện theo mã tỉnh
const getDistrictsByProvinceId = async (provinceId) => {
  try {
    // Sử dụng số cho việc truy vấn
    const districts = await District.find({ provinceId: provinceId });

    return districts;
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi lấy danh sách huyện");
  }
};

module.exports = { importDistricts, getDistrictById, getDistrictsByProvinceId };
