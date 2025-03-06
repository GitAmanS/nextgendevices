const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true }, 
    excerpt: { type: String, required: true }, 
    featuredImage: { type: String }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }], 
    category: { type: String, required: true }, 
    metaDescription: { type: String }, 
    metaKeywords: [{ type: String }], 
    views: { type: Number, default: 0 }, 
    published: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

BlogSchema.pre("save", async function (next) {
  if (!this.slug) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let existingSlug = await mongoose.model("Blog").findOne({ slug });

    if (existingSlug) {
      slug = `${slug}-${Date.now()}`; 
    }

    this.slug = slug;
  }
  next();
});

BlogSchema.virtual("readTime").get(function () {
  const words = this.content ? this.content.split(" ").length : 0;
  return Math.ceil(words / 200);
});

module.exports = mongoose.model("Blog", BlogSchema);
