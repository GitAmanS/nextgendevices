"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import categories from "@/constants/Categories";

const BaseApi = process.env.NEXT_PUBLIC_API;

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`${BaseApi}/blogs/search?q=${searchQuery}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.length === 0) setSearchResults([]);
    handleSearch();
  }, [searchQuery]);

  return (
    <>
      <div className="flex z-50 font-montserrat justify-between bg-[#232128] w-full px-4 py-4 md:px-40 relative">
        <div className="flex">
          <Image
            src="/logo.png"
            className="h-8 w-fit"
            width={200}
            height={200}
            alt="NextGenDevices"
          />
          <h2 className="text-white italic text-sm font-[200] mt-auto">
            The Games Movies and more...
          </h2>
        </div>

        <div className="flex gap-2">
          {showSearch && (
            <div className="relative h-full text-white flex items-center w-fit ml-auto shadow-md">
              <form className="flex items-center w-80">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 ml-auto h-fit p-1 border border-gray-300 rounded-md"
                />
              </form>

              {searchResults.length > 0 && (
                <div className="absolute w-96 max-h-80 overflow-y-auto z-50 top-12 bg-white border border-gray-200 shadow-md">
                  <ul className="divide-y divide-gray-100">
                    {searchResults.map((blog) => (
                      <li
                        key={blog._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <Link
                          href={`/${blog.category}/${blog.slug}`}
                          className="flex  gap-3 p-2"
                        >
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            width={64}
                            height={64}
                            className="h-16 w-16 object-cover flex-shrink-0"
                          />
                          <div className="flex-1 flex flex-col min-w-0 pr-2">
                            <p className="text-base font-semibold truncate text-gray-900">
                              {blog.title}
                            </p>
                            <p className="text-xs font-normal uppercase text-gray-500 mt-1">
                              {blog.category}
                            </p>
                            <p className="text-sm text-gray-600 font-light truncate mt-1">
                              {blog.excerpt}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <button
            className="text-white text-2xl ml-auto"
            onClick={() => setShowSearch(!showSearch)}
          >
            <IoSearch />
          </button>
        </div>
      </div>

      <nav className="sticky z-40 flex bg-white items-center font-montserrat top-0 shadow-md border-t-4 border-t-[#ff3131] px-4 md:px-36">
        <Link
          href="/"
          className="text-xl py-2.5 px-4 hover:bg-black/70 hover:text-white hover:underline"
        >
          <FaHome />
        </Link>
        {categories.slice(0, 4).map((category) => (
          <Link
            href={`/${category}`}
            className="text-md py-2 px-4 capitalize hover:bg-black/70 hover:text-white hover:underline"
            key={category}
          >
            {category}
          </Link>
        ))}
        <div className="relative group">
          <button className="flex items-center text-md py-2 px-4 hover:bg-black/70 hover:text-white hover:underline">
            More <IoIosArrowDown className="ml-2" />
          </button>
          <div className="absolute right-0 hidden w-40 bg-white shadow-lg group-hover:block">
            <ul>
              {categories.slice(5, 11).map((category) => (
                <li
                  key={category}
                  className="text-md capitalize whitespace-nowrap py-2 px-3 hover:bg-black/70 hover:text-white hover:underline"
                >
                  <Link href={`/${category}`} className="block w-full h-full">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
