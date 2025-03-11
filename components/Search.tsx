"use client";

import { Search } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch: (filters: Record<string, string>) => void;
}

const Search1: React.FC<SearchProps> = ({ placeholder, onSearch }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    updateFilters({ q: e.target.value, category, location });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    updateFilters({ q: query, category: e.target.value, location });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    updateFilters({ q: query, category, location: e.target.value });
  };

  const updateFilters = (filters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    replace(`${pathname}?${params.toString()}`);
    onSearch(filters);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[600px] border-2 border-gray-200 hover:border-pink-300 rounded-lg p-4 hover:shadow-lg transition-all">
      <div className="flex items-center gap-2">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
          className="outline-none w-full bg-transparent text-gray-600 p-1 placeholder:text-gray-400"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="outline-none bg-transparent text-gray-600 p-1 border border-gray-300 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={location}
          onChange={handleLocationChange}
          className="outline-none bg-transparent text-gray-600 p-1 border border-gray-300 rounded-lg"
        >
          <option value="">All Locations</option>
          <option value="Boston">Boston</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
        </select>
      </div>
    </div>
  );
};

export default Search1;
