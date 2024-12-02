const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const Address = require("../models/addressModel");
const { rotateRefreshToken } = require("../config/tokenUtils");

/**
 * Middleware xác thực token JWT và xoay vòng RefreshToken nếu AccessToken hết hạn
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];
  const refreshToken = req.cookies?.refresh_token; // Lấy refreshToken từ cookie

  // Kiểm tra accessToken có được cung cấp hay không
  if (!accessToken) {
    return res
      .status(401)
      .json({ error: 1, message: "Access token is missing" });
  }

  try {
    // Kiểm tra và xác thực accessToken
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "defaultsecretkey"
    );

    // Tìm User và populate profileId và role_code
    const user = await User.findById(decoded.id)
      .populate("profileId")
      .populate("role_code");

    if (!user) {
      return res.status(404).json({ error: 1, message: "User not found" });
    }

    // Lấy thông tin chi tiết địa chỉ từ Address nếu tồn tại
    let addressDetails = null;
    if (user.profileId?.address) {
      addressDetails = await Address.findById(user.profileId.address);
    }

    // Gắn thông tin người dùng vào req.user, bao gồm cả địa chỉ
    req.user = {
      ...user.toObject(),
      address: addressDetails || null, // Địa chỉ đầy đủ, hoặc null nếu không có
    };
    next(); // Cho phép tiếp tục xử lý API nếu accessToken hợp lệ
  } catch (error) {
    console.error(error);

    // Nếu access token hết hạn và có refresh token
    if (error.name === "TokenExpiredError") {
      if (refreshToken) {
        try {
          // Xoay vòng RefreshToken và gửi AccessToken mới
          const newTokens = await rotateRefreshToken(refreshToken);

          // Cài đặt cookie mới với refresh token mới
          res.cookie("refresh_token", newTokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Chỉ dùng secure trên môi trường production
            sameSite: "Strict", // Chỉ gửi cookie trong cùng một site
          });

          // Cập nhật accessToken mới cho request hiện tại
          accessToken = newTokens.accessToken;
          res.setHeader("Authorization", `Bearer ${newTokens.accessToken}`);

          // Trả lại accessToken mới trong JSON để client có thể cập nhật
          return res.status(200).json({
            error: 0,
            message: "Access token refreshed",
            accessToken: newTokens.accessToken,
          });
        } catch (refreshError) {
          console.log(refreshError);
          return res
            .status(403)
            .json({ error: 1, message: "Refresh token is invalid or expired" });
        }
      } else {
        return res
          .status(401)
          .json({ error: 1, message: "Refresh token is missing" });
      }
    } else {
      return res
        .status(403)
        .json({ error: 1, message: "Access token is invalid" });
    }
  }
};

module.exports = authenticateToken;
