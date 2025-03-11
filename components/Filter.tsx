"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { useJobs } from "@/hooks/useJobs";

// Define the prop types
interface FilterProps {
  userId?: string;
  activeTab: string;
  onFilterChange: (filters: Record<string, string | string[]>) => void;
}

const Filter: React.FC<FilterProps>= ({ userId, activeTab, onFilterChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categories } = useCategories();
  const { locations } = useJobs();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const [isSenior, setIsSenior] = useState(false);
  const [isMid, setIsMid] = useState(false);
  const [isEntry, setIsEntry] = useState(false);

  useEffect(() => {
    updateFilters();
  }, [selectedCategories, location, isSenior, isMid, isEntry, activeTab]);

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("location");
    params.delete("experience_level");
    params.delete("created_by");

    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
    if (location) params.set("location", location);
    if (isSenior) params.append("experience_level", "senior");
    if (isMid) params.append("experience_level", "mid");
    if (isEntry) params.append("experience_level", "entry");

    // If in "Posted Jobs" tab, filter by `created_by`
    if (activeTab === "postedJobs" && userId) {
      params.set("created_by", userId);
    }

    router.push(`?${params.toString()}`);
    onFilterChange(Object.fromEntries(params.entries())); // Pass updated filters
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setLocation("");
    setIsEntry(false);
    setIsMid(false);
    setIsSenior(false);
    router.push("/");
    onFilterChange({});
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 w-[350px]">
      {/* Categories */}
      <div>
        <h2 className="text-base mb-3">Categories</h2>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center text-sm text-gray-700 gap-2">
              <input
                type="checkbox"
                className="accent-purple-600"
                checked={selectedCategories.includes(category.name)}
                onChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(category.name) ? prev.filter((c) => c !== category.name) : [...prev, category.name]
                  )
                }
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 my-4"></div>

      {/* Location Dropdown */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">Location</h2>
        <select
          className="w-full p-2 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-300 my-4"></div>

      {/* Experience Level */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">Experience Level</h2>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isSenior} onChange={() => setIsSenior(!isSenior)} />
          Senior
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={isMid} onChange={() => setIsMid(!isMid)} />
          Mid Level
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={isEntry} onChange={() => setIsEntry(!isEntry)} />
          Entry Level
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-2">
        <button className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500" onClick={updateFilters}>
          Apply Filters
        </button>
        <button className="text-purple-600 text-sm hover:underline" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
