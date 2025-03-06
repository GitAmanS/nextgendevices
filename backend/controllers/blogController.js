const Blog = require("../models/Blog");
const { bucket } = require("../config/firebase");
const upload = require("../middlewares/upload");

// Function to upload image to Firebase
const uploadImageToFirebase = async (file) => {
  if (!file) return null;

  const fileName = `blogImages/${Date.now()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  await new Promise((resolve, reject) => {
    fileUpload.createWriteStream()
      .on('error', reject)
      .on('finish', resolve)
      .end(file.buffer);
  });
  await fileUpload.makePublic();


  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

// Create Blog Post with Image Upload
exports.createBlog = [
  upload.single("featuredImage"), // Multer middleware
  async (req, res) => {
    try {
      const imageUrl = await uploadImageToFirebase(req.file);
      const blog = new Blog({
        ...req.body,
        author: req.user.id,
        featuredImage: imageUrl,
      });

      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

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
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
