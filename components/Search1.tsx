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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    params.set("filter", filterType);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center w-full max-w-[600px] border-2 border-gray-200 hover:border-pink-300 rounded-lg px-4 py-2 gap-2 hover:shadow-lg transition-all focus-within:border-pink-500">
      <select
        value={filterType}
        onChange={handleFilterChange}
        className="outline-none bg-transparent text-gray-600 p-1 border-r border-gray-300 mr-2"
      >
        <option value="all">Search Filter</option>
        <option value="categories">Categories</option>
        <option value="experience">Experience</option>
        <option value="location">Location</option>
      </select>
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        className="outline-none w-full bg-transparent text-gray-600 p-1 placeholder:text-gray-400"
      />
    </div>
  );
};

export default Search1;
