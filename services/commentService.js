const Comment = require("../models/commentModel");
const Profile = require("../models/profileModel");

const addComment = async (userId, productId, data) => {
  const { message, images, rating } = data;
  const comment = new Comment({
    userId,
    productId,
    message,
    images,
    rating,
  });

  return await comment.save();
};

const getCommentsByProduct = async (productId) => {
  // Lấy các bình luận từ sản phẩm và populate userId.profileId (username, avatar)
  const comments = await Comment.find({ productId })
    .populate("userId", "email") // Lấy email từ User
    .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới
  return comments;
};

const deleteCommentById = async (commentId) => {
  return await Comment.findByIdAndDelete(commentId);
};

module.exports = {
  addComment,
  getCommentsByProduct,
  deleteCommentById,
};
