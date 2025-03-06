const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  searchBlogs,
  incrementViewCount
} = require("../controllers/blogController");
const authMiddleware  = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.get("/category/:category", getBlogsByCategory);
router.get("/search", searchBlogs);
router.patch("/:id/views", incrementViewCount);

router.post("/",authMiddleware,  createBlog);
router.put("/:id",authMiddleware,  updateBlog);
router.delete("/:id",authMiddleware,   deleteBlog);

module.exports = router;
