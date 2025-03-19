import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Footer from "@/components/Footer";

const BaseApi = process.env.NEXT_PUBLIC_API;

async function fetchBlogs(category) {
  try {
    const res = await fetch(`${BaseApi}/blogs?category=${category}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function BlogScroll({ params }) {
  const { category } = params;
  const blogs = await fetchBlogs(category);

  return (
    <>
      <Header />
      <div className="min-h-screen font-montserrat py-8 px-4 md:px-40">
        <h1 className="capitalize text-3xl font-[800]">{category}</h1>
        <h2 className="text-2xl font-[500] mt-8 mb-2">
          Latest about <span className="capitalize">{category}</span>
        </h2>
        <div className="overflow-x-auto whitespace-nowrap py-4">
          <div className="flex space-x-4">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="flex-shrink-0 w-84 bg-white group"
              >
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  width={256}
                  height={160}
                  className="w-full h-52 object-cover"
                />
                <h3 className="text-xl font-[700] group-hover:text-[#ff3131] py-4 truncate">
                  {blog.title}
                </h3>
                <p className="text-xs">
                  <span className="capitalize">By {blog.author.username}</span>
                  <span className="font-[700] px-1">•</span>
                  <span>
                    Published{" "}
                    {formatDistanceToNow(new Date(blog.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}
