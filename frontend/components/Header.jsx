"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import Link from "next/link";
import categories from "@/constants/Categories";

const BaseApi = process.env.NEXT_PUBLIC_API;

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

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

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowMobileMenu(false);
  };

  return (
    <>
      {/* Main Header */}
      <header className="flex flex-col z-50 font-montserrat justify-between bg-[#232128] w-full px-4 py-3 md:px-16 lg:px-24 xl:px-40 relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              className="h-8 w-fit"
              width={200}
              height={200}
              alt="NextGenDevices"
              priority
            />
            <h2 className="text-white italic text-sm font-[200] mt-auto hidden md:inline ml-2">
              The Games Movies and more...
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Search Button */}
            <button
              className="text-white text-2xl hidden md:block hover:text-[#ff3131] transition-colors"
              onClick={toggleSearch}
              aria-label="Search"
            >
              {showSearch ? <IoIosClose size={24} /> : <IoSearch />}
            </button>

            {/* Mobile Buttons */}
            <div className="flex md:hidden gap-4">
              <button
                className="text-white text-2xl hover:text-[#ff3131] transition-colors"
                onClick={toggleSearch}
                aria-label="Search"
              >
                {showSearch ? <IoIosClose size={24} /> : <IoSearch />}
              </button>
              <button
                className="text-white text-2xl hover:text-[#ff3131] transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Menu"
              >
                {showMobileMenu ? <IoIosClose size={24} /> : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Search */}
        {showSearch && (
          <div className="hidden md:block relative mt-3">
            <form className="w-full">
              <input
                type="text"
                placeholder="Search articles, news, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-fit p-3 border border-gray-300 rounded-md text-white bg-[#232128] focus:outline-none focus:ring-2 focus:ring-[#ff3131] placeholder-gray-400"
                autoFocus
              />
            </form>

            {searchResults.length > 0 && (
              <div className="absolute w-full max-h-80 overflow-y-auto z-50 top-14 bg-white border border-gray-200 shadow-lg rounded-b-md">
                <ul className="divide-y divide-gray-100">
                  {searchResults.map((blog) => (
                    <li
                      key={blog._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <Link
                        href={`/${blog.category}/${blog.slug}`}
                        className="flex gap-3 p-3"
                        onClick={() => setShowSearch(false)}
                      >
                        <div className="h-16 w-16 flex-shrink-0 relative">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
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

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden w-full mt-3">
            <form className="w-full relative">
              <input
                type="text"
                placeholder="Search articles, news, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-fit p-3 border border-gray-300 rounded-md text-white bg-[#232128] focus:outline-none focus:ring-2 focus:ring-[#ff3131] placeholder-gray-400"
                autoFocus
              />
            </form>

            {searchResults.length > 0 && (
              <div className="w-full max-h-[60vh] overflow-y-auto z-50 mt-2 bg-white border border-gray-200 shadow-lg rounded-b-md">
                <ul className="divide-y divide-gray-100">
                  {searchResults.map((blog) => (
                    <li
                      key={blog._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <Link
                        href={`/${blog.category}/${blog.slug}`}
                        className="flex gap-3 p-3"
                        onClick={() => setShowSearch(false)}
                      >
                        <div className="h-16 w-16 flex-shrink-0 relative">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
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
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex sticky z-40 bg-white items-center font-montserrat top-0 shadow-md border-t-4 border-t-[#ff3131] px-4 md:px-16 lg:px-24 xl:px-40">
        <Link
          href="/"
          className="text-xl py-3 px-4 hover:bg-[#ff3131] hover:text-white transition-colors flex items-center"
        >
          <FaHome className="mr-1" />
        </Link>
        {categories.slice(0, 3).map((category) => (
          <Link
            href={`/${category}`}
            className="text-md py-3 px-4 capitalize hover:bg-[#ff3131] hover:text-white transition-colors"
            key={category}
          >
            {category}
          </Link>
        ))}
        <div className="relative group">
          <button className="flex items-center text-md py-3 px-4 hover:bg-[#ff3131] hover:text-white transition-colors">
            More <IoIosArrowDown className="ml-1 transition-transform group-hover:rotate-180" />
          </button>
          <div className="absolute right-0 hidden w-48 bg-white shadow-lg group-hover:block border border-gray-100 rounded-b-md overflow-hidden">
            <ul>
              {categories.slice(3, 8).map((category) => ( // Only show 5 items in More dropdown
                <li
                  key={category}
                  className="text-md capitalize whitespace-nowrap hover:bg-[#ff3131] hover:text-white transition-colors"
                >
                  <Link href={`/${category}`} className="block w-full h-full py-2 px-4">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
          <nav className="md:hidden fixed z-50 w-4/5 max-w-xs h-full bg-white shadow-lg overflow-y-auto top-0 right-0 animate-slideIn">
            <div className="px-4 py-2 border-t-4 border-t-[#ff3131]">
              <div className="flex justify-between items-center py-4 border-b">
                <h3 className="text-xl font-bold">Menu</h3>
                <button 
                  onClick={toggleMobileMenu}
                  className="text-2xl text-gray-500 hover:text-[#ff3131] transition-colors"
                  aria-label="Close menu"
                >
                  <IoIosClose />
                </button>
              </div>
              
              <Link
                href="/"
                className="flex items-center text-lg py-4 px-4 hover:bg-[#ff3131] hover:text-white border-b transition-colors"
                onClick={toggleMobileMenu}
              >
                <FaHome className="mr-3" /> Home
              </Link>
              
              {categories.slice(0, 5).map((category) => (
                <Link
                  href={`/${category}`}
                  className="block py-4 px-4 capitalize hover:bg-[#ff3131] hover:text-white border-b transition-colors"
                  key={category}
                  onClick={toggleMobileMenu}
                >
                  {category}
                </Link>
              ))}
              
              <div className="border-b">
                <button 
                  className="flex items-center justify-between w-full text-lg py-4 px-4 hover:bg-[#ff3131] hover:text-white transition-colors"
                  onClick={() => setShowMoreCategories(!showMoreCategories)}
                >
                  <span>More Categories</span>
                  <IoIosArrowDown className={`ml-2 transition-transform ${showMoreCategories ? 'rotate-180' : ''}`} />
                </button>
                
                {showMoreCategories && (
                  <div className="bg-gray-50">
                    {categories.slice(5).map((category) => (
                      <Link
                        href={`/${category}`}
                        className="block py-3 px-6 capitalize hover:bg-[#ff3131] hover:text-white text-sm transition-colors"
                        key={category}
                        onClick={toggleMobileMenu}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;