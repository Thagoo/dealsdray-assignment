import { SearchIcon } from "lucide-react";
import React from "react";

export default function TableSearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative flex bg-background ">
      <input
        className="w-full bg-background whitespace-nowrap focus:outline-none rounded-md border border-input py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search records"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 " />
    </div>
  );
}
