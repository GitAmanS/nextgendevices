const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  searchBlogs,
  incrementViewCount,
  uploadImages,
  getBlogById
} = require("../controllers/blogController");
const authMiddleware  = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/category/:category", getBlogsByCategory);
router.get("/search", searchBlogs);
router.get("/getBlogById/:blogId", getBlogById)
router.get("/:slug", getBlogBySlug);
router.patch("/:id/views", incrementViewCount);

router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

router.post("/uploadImage",authMiddleware, uploadImages);

module.exports = router;
