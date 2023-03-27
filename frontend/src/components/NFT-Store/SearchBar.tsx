import { useState, useEffect } from "react";
import Image from "next/image";
//import { useTheme } from 'next-themes';

import images from "../../../assets";

const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
} : any) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  //const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <div className="flex justify-center w-full items-center ">
      <div className="flex-1 flex justify-center flexCenter bg-[#1B1A21] border border-[#1B1A21] py-3 px-4 rounded-md">
        <Image
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          ///className={theme === 'light' ? 'filter invert' : undefined}
        />
        <input
          type="text"
          placeholder="Search item here"
          className="bg-[#1B1A21] mx-4 w-full font-poppins text-white font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="relative flexBetween ml-4 flex  min-w-190 cursor-pointer bg-[#1B1A21] border border-[#1B1A21]  py-3 px-4 rounded-md"
      >
        <p className="font-poppins text-white mr-4 font-normal text-xs">
          {activeSelect}
        </p>
        <Image
          src={images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          //className={theme === 'light' ? 'filter invert' : undefined}
        />

        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 bg-[#1B1A21] border border-[#1B1A21] py-3 px-4 rounded-md">
            {[
              "Recently added",
              "Price (low to high)",
              "Price (high to low)",
            ].map((item) => (
              <p
                className="font-poppins text-white  font-normal text-xs my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)}
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
