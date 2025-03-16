"use client";

import { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import useSearchStore from "../../stores/useSearchStore";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar() {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const [inputValue, setInputValue] = useState(""); // State untuk menangkap input langsung

  const debouncedSearch = useDebounce(inputValue, 500); // Delay 500ms

  useEffect(() => {
    setSearchQuery(debouncedSearch); // Update store hanya setelah delay selesai
  }, [debouncedSearch, setSearchQuery]);

  return (
    <div className="relative h-[2.5rem] bg-transparent items-center max-w-md">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <HiSearch className="h-5 w-5 text-gray-700" />
      </div>
      <input
        className="h-[2.5rem] text-[11px] md:text-[14px] bg-transparent placeholder-gray-400 outline-none focus:ring-0 focus:border-gray-400 border-1 border-gray-300 rounded-md pl-10 pr-2 py-2 w-full"
        type="search"
        placeholder="Search Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Set state lokal dulu
      />
    </div>
  );
}
