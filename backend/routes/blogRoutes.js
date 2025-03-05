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
const authMiddleware  = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.get("/category/:category", getBlogsByCategory);
router.get("/search", searchBlogs);
router.patch("/:id/views", incrementViewCount);

router.post("/",  createBlog);
router.put("/:id",  updateBlog);
router.delete("/:id",  deleteBlog);

module.exports = router;
