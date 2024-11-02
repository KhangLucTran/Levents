const Role = require("../models/roleModel");

// Hàm khởi tạo giá trị mặc định cho Role
const initializeRoles = async () => {
  try {
    const roles = [
      { code: "R1", value: "Admin" },
      { code: "R2", value: "Staff" },
      { code: "R3", value: "User" },
    ];

    // Kiểm tra và chỉ thêm nếu chưa tồn tại các role
    for (const roleData of roles) {
      const existingRole = await Role.findOne({ code: roleData.code });
      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Role ${roleData.value} created successfully`);
      } else {
        console.log(`Role ${roleData.value} already exists`);
      }
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};
