const Blog = require("../models/Blog");
const { bucket } = require("../config/firebase");
const upload = require("../middlewares/upload");

const uploadImagesToFirebase = async (files) => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map(async (file) => {
    const fileName = `blogImages/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await new Promise((resolve, reject) => {
      fileUpload
        .createWriteStream()
        .on("error", reject)
        .on("finish", resolve)
        .end(file.buffer);
    });

    await fileUpload.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  });

  return Promise.all(uploadPromises);
};

exports.uploadImages = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const imageUrls = await uploadImagesToFirebase(req.files);
      res.json({ urls: imageUrls });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      metaDescription,
      metaKeywords,
      featuredImage,
      tags,
      category,
    } = req.body;

    const blog = new Blog({
      title,
      excerpt,
      content,
      featuredImage,
      tags,
      category,
      metaDescription,
      metaKeywords,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

exports.getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId)
      .populate("author", "username id")
      .sort({ createdAt: -1 });

    if (!blog) {
      res.status(404).json({ message: "blog not found" });
    }

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    let blogs = await Blog.find({ published: true })
      .populate("author", "username id")
      .sort({ createdAt: -1 });

    if (category) {
      blogs = blogs.filter((blog) => blog.category === category);
    } else {
      blogs = blogs.filter((blog) => blog.category !== "news");
    }

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate("author", "username id")
      .sort({ createdAt: -1 });

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
    })
      .populate("author", "username id")
      .sort({ createdAt: -1 });

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
    }).select("title slug _id category featuredImage");

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
