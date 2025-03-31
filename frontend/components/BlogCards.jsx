import Image from "next/image";
import Link from "next/link";
import React from "react";

const BaseApi = process.env.NEXT_PUBLIC_API;

const BlogCards = async () => {
  let blogs = [];
  let news = [];

  try {
    const response = await fetch(`${BaseApi}/blogs?category=news`, {
      cache: "no-store",
    });
    news = await response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
  }
  try {
    const response = await fetch(`${BaseApi}/blogs`, { cache: "no-store" });
    blogs = await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  if (blogs.length === 0)
    return <p className="text-center text-white">No blogs found.</p>;

  const [firstBlog, ...restBlogs] = blogs;

  const groupedBlogs = blogs.reduce((acc, blog) => {
    if (!acc[blog.category]) {
      acc[blog.category] = [];
    }
    acc[blog.category].push(blog);
    return acc;
  }, {});

  return (
    <div className="font-montserrat font-[700] space-y-10 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href={`/${firstBlog.category}/${firstBlog.slug}`}
          key={firstBlog._id}
          className="col-span-1 md:col-span-2 bg-[#232128] shadow-lg overflow-hidden text-white hover:text-[#ff3131] text-2xl"
        >
          <div className="w-full" style={{ aspectRatio: "5 / 3" }}>
            <Image
              src={firstBlog.featuredImage}
              alt={firstBlog.title}
              height={1000}
              width={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="capitalize">{firstBlog.title}</h2>
          </div>
        </Link>

        <div className="col-span-1 p-4 text-white shadow-lg">
          <h2 className="text-xl font-bold text-[#333] bg-white border-b pb-2 mb-4">
            Latest News
          </h2>
          <div className="flex flex-col text-[#333] divide-y divide-gray-400">
            {news.slice(0, 3).map((blog) => (
              <div key={blog._id} className="py-3">
                <Link
                  href={`/${blog.category}/${blog.slug}`}
                  className="block hover:text-[#ff3131] line-clamp-3 overflow-hidden text-ellipsis"
                >
                  {blog.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restBlogs.map((blog) => (
          <Link
            href={`/${blog.category}/${blog.slug}`}
            key={blog._id}
            className="col-span-1 bg-[#232128] shadow-lg overflow-hidden text-white hover:text-[#ff3131] text-[18px]"
          >
            <div className="w-full" style={{ aspectRatio: "5 / 3.5" }}>
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                height={1000}
                width={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="capitalize">{blog.title}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="space-y-10">
        {Object.entries(groupedBlogs).map(([category, categoryBlogs]) => (
          <div key={category} className="text-white">
            <h2 className="text-2xl text-black font-bold border-b pb-2 mb-4 capitalize">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryBlogs.slice(0, 6).map((blog) => (
                <Link
                  href={`/${blog.category}/${blog.slug}`}
                  key={blog._id}
                  className="col-span-1 bg-[#232128] shadow-lg overflow-hidden text-white hover:text-[#ff3131] text-[18px]"
                >
                  <div className="w-full" style={{ aspectRatio: "5 / 3.5" }}>
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      height={1000}
                      width={1000}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="capitalize">{blog.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCards;
