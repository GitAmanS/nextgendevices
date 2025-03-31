"use client";
import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

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
const Header = () => {
  return (
    <>
      <div className="flex font-montserrat justify-between bg-[#232128] w-full px-4 py-4 md:px-60">
        <div className="flex">
          <Image
            src="/logo.png"
            className="h-8 w-fit"
            width={200}
            height={200}
            alt="NextGenDevices"
          />
          <h2 className="text-white italic text-sm font-[200]  mt-auto">
            The Games Movies and more...
          </h2>
        </div>
        <button className="text-white text-xl ml-auto">
          <IoSearch />
        </button>
        <div></div>
      </div>
      <nav className="sticky flex items-center font-montserrat top-0 shadow-md border-t-4 border-t-[#ff3131] px-4 md:px-56">
        <button className="text-xl py-2.5 px-4 hover:bg-black/70 hover:text-white hover:underline">
          <FaHome />
        </button>
        {categories.slice(0, 4).map((category) => (
          <button
            className="text-md py-2 px-4 capitalize hover:bg-black/70 hover:text-white hover:underline"
            key={category}
          >
            {category}
          </button>
        ))}
        <div className="relative group">
          <button className="flex items-center text-md py-2 px-4 hover:bg-black/70 hover:text-white hover:underline">
            More <IoIosArrowDown className="ml-2"/>
          </button>
          <div className="absolute right-0 hidden w-40 bg-white shadow-lg group-hover:block">
            <ul className="">
              {categories.slice(5, 11).map((category) => (
                <li className="text-md capitalize whitespace-nowrap py-2 px-3 hover:bg-black/70 hover:text-white hover:underline">
                  {category}
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
