"use client";

import { HiSearch } from "react-icons/hi";

export default function SearchBar({ onSearch }) {
  const handleSearch = (event) => {
    onSearch(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="relative h-[2.5rem] bg-transparent items-center max-w-md">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <HiSearch className="h-5 w-5 text-gray-700" />
      </div>
      <input
        className="h-[2.5rem] text-[14px] bg-transparent placeholder-gray-400 outline-none focus:ring-0 focus:border-gray-400 border-1 border-gray-300 rounded-md pl-10 pr-3 py-2 w-full"
        type="search"
        name="search2"
        id="search2"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
}
