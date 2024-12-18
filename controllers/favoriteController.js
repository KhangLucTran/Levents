const favoriteService = require("../services/favoriteService");

// 1. Hàm thêm sản phẩm vào danh sách yêu thích
const addFavoriteController = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  console.log("userId:", userId);
  console.log("productId:", productId);

  try {
    const favorite = await favoriteService.addFavorite(userId, productId);
    res.status(201).json({
      message: "Đã thêm sản phẩm vào danh sách yêu thích.",
      data: favorite,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Hàm xóa sản phẩm ra khỏi danh sách yêu thích
const removeFavoriteController = async (req, res) => {
  const { favoriteId } = req.params; // Lấy ID của Favorite từ params

  try {
    // Tìm và xóa Favorite theo ID
    const favorite = await favoriteService.removeFavoriteById(favoriteId);

    if (!favorite) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy mục yêu thích để xóa." });
    }

    res.status(200).json({
      message: "Đã xóa sản phẩm khỏi danh sách yêu thích.",
      data: favorite,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Hàm lấy tất cả sản phẩm yêu thích
const getAllFavoritesController = async (req, res) => {
  const userId = req.user._id;

  try {
    const favorites = await favoriteService.getAllFavorites(userId);
    res.status(200).json({ data: favorites });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách yêu thích." });
  }
};

// 4. Hàm kiểm tra trạng thái yêu thích
const getFavoriteStatusController = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id; // Lấy userId từ token

    const isFavorite = await favoriteService.checkFavoriteStatus(
      userId,
      productId
    );

    res.status(200).json({ isFavorite });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 5. Hàm xóa sản phẩm ra khỏi danh sách yêu thích theo userId, productId
const removeFavoriteByProUserController = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  try {
    // Tìm và xóa Favorite theo ID
    const favorite = await favoriteService.removeFavoriteByUserAndProduct(
      userId,
      productId
    );

    if (!favorite) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy mục yêu thích để xóa." });
    }

    res.status(200).json({
      message: "Đã xóa sản phẩm khỏi danh sách yêu thích.",
      data: favorite,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  addFavoriteController,
  removeFavoriteController,
  getAllFavoritesController,
  getFavoriteStatusController,
  removeFavoriteByProUserController,
};
