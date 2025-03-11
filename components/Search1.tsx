"use client";

import { Search } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchProps {
  placeholder: string;
}

const Search1: React.FC<SearchProps> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      if (filterType === "categories") {
        params.set("category", e.target.value);
      } else if (filterType === "location") {
        params.set("location", e.target.value);
      } else if (filterType === "experience") {
        params.set("experience", e.target.value);
      } else {
        params.set("q", e.target.value);
      }
    } else {
      params.delete("q");
      params.delete("category");
      params.delete("location");
      params.delete("experience");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);

    const params = new URLSearchParams(searchParams.toString());

    // Remove old filters
    params.delete("q");
    params.delete("category");
    params.delete("location");
    params.delete("experience");

    if (query) {
      if (e.target.value === "categories") {
        params.set("category", query);
      } else if (e.target.value === "location") {
        params.set("location", query);
      } else if (e.target.value === "experience") {
        params.set("experience", query);
      } else {
        params.set("q", query);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center w-full  border-2 border-gray-200 hover:border-pink-300 rounded-lg px-4 py-2 gap-2 hover:shadow-lg transition-all focus-within:border-pink-500">
      <select
        value={filterType}
        onChange={handleFilterChange}
        className="outline-none bg-transparent text-gray-600 p-1 border-r border-gray-300 mr-2"
      >
        <option value="all">Search Filter</option>
        <option value="categories">Categories</option>
        <option value="location">Location</option>
        <option value="experience">Experience</option>
      </select>
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="outline-none w-full bg-transparent text-gray-600 p-1 placeholder:text-gray-400"
      />
    </div>
  );
};

export default Search1;
