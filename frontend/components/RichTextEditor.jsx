"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Input } from "@mui/material";

const BaseApi = process.env.NEXT_PUBLIC_API;

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  forwardRef: true,
});

const RichTextEditor = ({ value, onChange }) => {
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const quillRef = useRef(null);

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
      return data.urls[0];
    } catch (error) {
      setUploadError(error.response?.data?.error || "Image upload failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      try {
        const url = await handleImageUpload(file);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", url);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
    input.click();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ align: [] }],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div className="space-y-2 ">
      <style jsx>{`
        :global(.ql-container) {
          min-height: 400px;
        }
        :global(.ql-editor) {
          min-height: 350px;
          max-height: 400px;
          overflow-y: auto;
        }
      `}</style>
      
      {isLoading && <CircularProgress />}
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        className="border rounded-b-lg h-fit"
      />
      {uploadError && (
        <div className="text-red-600 text-sm mt-2">{uploadError}</div>
      )}
    </div>
  );
};

export default RichTextEditor;
