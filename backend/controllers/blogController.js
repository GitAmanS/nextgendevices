const Blog = require("../models/Blog");

// ✅ Create a new blog post (Admin Only)
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all blogs (Public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single blog by slug & increase view counter
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update blog post (Admin Only)
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a blog post (Admin Only)
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch blogs by category
exports.getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({
      category: req.params.category,
      published: true,
    }).sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Search blogs by title or tags
exports.searchBlogs = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { tags: { $in: [searchTerm] } },
      ],
      published: true,
    });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Increment view count manually (Frontend can call this API)
exports.incrementViewCount = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.views += 1;
    await blog.save();

    res.json({ message: "View count updated", views: blog.views });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
