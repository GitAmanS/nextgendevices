const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true }, // Store HTML content, images embedded as URLs
    excerpt: { type: String, required: true }, // Short preview for homepage & SEO
    featuredImage: { type: String }, // Store image URL for thumbnail
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }], // SEO optimization
    category: { type: String, required: true }, // Example: "Tech, Gaming, Smartphones"
    metaDescription: { type: String }, // For better SEO
    metaKeywords: [{ type: String }], // SEO optimization
    views: { type: Number, default: 0 }, // View counter
    published: { type: Boolean, default: false }, // Draft or Published
  },
  { timestamps: true }
);

// Generate a unique slug before saving
BlogSchema.pre("save", async function (next) {
  if (!this.slug) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let existingSlug = await mongoose.model("Blog").findOne({ slug });

    if (existingSlug) {
      slug = `${slug}-${Date.now()}`; // Append timestamp if slug exists
    }

    this.slug = slug;
  }
  next();
});

// Virtual field for estimated reading time (200 words per min)
BlogSchema.virtual("readTime").get(function () {
  const words = this.content ? this.content.split(" ").length : 0;
  return Math.ceil(words / 200);
});

module.exports = mongoose.model("Blog", BlogSchema);
