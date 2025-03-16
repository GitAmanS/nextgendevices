"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const BaseApi = process.env.NEXT_PUBLIC_API;

export default function EditBlog() {
  const router = useRouter();
  const { blogId } = useParams();

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

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${BaseApi}/blogs/getBlogById/${blogId}`).then(res => res.json());
      setTitle(response.title || "");
      setContent(response.content || "");
      setExcerpt(response.excerpt || "");
      setFeaturedImage(response.featuredImage || "");
      setTags(response.tags ? response.tags.join(", ") : "");
      setCategory(response.category || "");
      setMetaDescription(response.metaDescription || "");
      setMetaKeywords(response.metaKeywords ? response.metaKeywords.join(", ") : "");
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    } else {
      console.log("Blog ID is null");
    }
  }, [blogId]);

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
    try {
      await axios.put(
        `${BaseApi}/blogs/${blogId}`,
        {
          title,
          content,
          excerpt,
          featuredImage,
          tags: tags.split(",").map((tag) => tag.trim()),
          category,
          metaDescription,
          metaKeywords: metaKeywords.split(",").map((keyword) => keyword.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6">
      <Label>Title</Label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <Label>Excerpt</Label>
      <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />

      <Label>Content</Label>
      <RichTextEditor value={content} onChange={setContent} />

      <Label>Category</Label>
      <Input value={category} onChange={(e) => setCategory(e.target.value)} required />

      <Label>Tags (comma-separated)</Label>
      <Input value={tags} onChange={(e) => setTags(e.target.value)} />

      <Label>Meta Description</Label>
      <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />

      <Label>Meta Keywords (comma-separated)</Label>
      <Input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} />

      <Label>Featured Image</Label>
      <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />
      {featuredImage && <img src={featuredImage} alt="Preview" className="w-32 h-32 mt-2" />}

      {uploadError && <p className="text-red-500">{uploadError}</p>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Update Blog"}
      </Button>
    </form>
  );
}
