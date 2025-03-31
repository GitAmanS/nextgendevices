"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

const categories = [
  "games",
  "platforms",
  "entertainment",
  "comics",
  "hardware",
  "phones",
  "laptops",
  "news",
  "gaming-consoles",
  "pc-gaming",
  "mobile-gaming",
  "tech-reviews",
  "smartphones",
  "gadgets",
  "software",
  "ai-and-ml",
  "virtual-reality",
  "augmented-reality",
  "cybersecurity",
  "cloud-computing",
  "developer-tools",
  "wearable-tech",
  "automotive-tech",
  "smart-home",
  "future-tech",
];
("");
const BaseApi = process.env.NEXT_PUBLIC_API;

const enhanceImages = (htmlContent) => {
  return htmlContent.replace(
    /<img(?!.*\bloading=)[^>]*src="([^"]+)"([^>]*)>/g,
    (match, src, rest) => {
      let filename = src.split("/").pop().split("?")[0];
      filename = filename.replace(/\.[^/.]+$/, "");

      if (!/alt=/.test(match)) {
        rest = ` alt="${filename}"` + rest;
      }
      if (!/loading=/.test(match)) {
        rest = ` loading="lazy"` + rest;
      }

      return `<img src="${src}"${rest}>`;
    }
  );
};

export default function UploadPage() {
  const router = useRouter();
  // const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("images", file);

      const { data } = await axios.post(
        `${BaseApi}/blogs/uploadImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!data.urls || data.urls.length === 0) {
        throw new Error("Image upload failed");
      }
      setFeaturedImage(data.urls[0]);
    } catch (error) {
      setUploadError(error.response?.data?.error || "Image upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enhancedContent = enhanceImages(content);
    try {
      const response = await axios.post(
        `${BaseApi}/blogs`,
        {
          title,
          content: enhancedContent,
          excerpt,
          featuredImage,
          tags: tags.split(",").map((tag) => tag.trim()),
          category,
          metaDescription,
          metaKeywords: metaKeywords
            .split(",")
            .map((keyword) => keyword.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await axios.post('/api/revalidate', {
        tags: [`blog-${response.data.slug}`],
      });
      // toast({ description: "Blog created successfully!" });
      router.push("/dashboard");
    } catch (error) {
      // toast({ variant: "destructive", description: error.response?.data?.error || "Failed to create blog" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6">
      <Label>Title</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Label>Excerpt</Label>
      <Textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        required
      />
      <Label>Content</Label>
      <RichTextEditor value={content} onChange={setContent} />
      <Label>Category</Label>
      <Select onValueChange={setCategory} required>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.replace(/-/g, " ")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label>Tags (comma-separated)</Label>
      <Input value={tags} onChange={(e) => setTags(e.target.value)} />
      <Label>Meta Description</Label>
      <Textarea
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
      />
      <Label>Meta Keywords (comma-separated)</Label>
      <Input
        value={metaKeywords}
        onChange={(e) => setMetaKeywords(e.target.value)}
      />
      <Label>Featured Image</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />
      {featuredImage && (
        <img src={featuredImage} alt="Preview" className="w-32 h-32 mt-2" />
      )}
      {uploadError && <p className="text-red-500">{uploadError}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Create Blog"}
      </Button>
    </form>
  );
}
