import React, { useState } from 'react'
import { useCategories } from '@/hooks/useCategories'

const Filter = () => {
  const { categories, loading, error } = useCategories()
  const [selectedCategories, setSelectedCategories] = useState<(number | string)[]>([])
  const [location, setLocation] = useState('')
  const [isRemote, setIsRemote] = useState(false)
  const [isFullTime, setIsFullTime] = useState(false)
  const [isFreelance, setIsFreelance] = useState(false)

  console.log(categories)

  const handleCategoryChange = (categoryId: number | string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const handleFilter = () => {
    // Implement your filter logic here
    console.log({
      categories: selectedCategories,
      location,
      isRemote,
      isFullTime,
      isFreelance
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setLocation('')
    setIsRemote(false)
    setIsFullTime(false)
    setIsFreelance(false)
  }

  if (loading) return <p>Loading categories...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 w-[350px]">
      {/* Categories */}
      <div>
        <h2 className="font text-base mb-3">Categories</h2>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center text-sm text-gray-700 gap-2">
              <input 
                type="checkbox" 
                className="accent-purple-600"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      {/* Location */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">Location</h2>
        <input
          type="text"
          placeholder="Enter Location..."
          className="w-full p-2 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label className="flex items-center gap-2 mt-2">
          <input 
            type="checkbox"
            checked={isRemote}
            onChange={() => setIsRemote(!isRemote)}
          />
          Open to remote
        </label>
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      {/* Job Type */}
      <div className="mt-6">
        <label className="flex items-center gap-2">
          <input 
            type="checkbox"
            checked={isFullTime}
            onChange={() => setIsFullTime(!isFullTime)}
          />
          Full-Time
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input 
            type="checkbox"
            checked={isFreelance}
            onChange={() => setIsFreelance(!isFreelance)}
          />
          Freelance/Contract
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-2">
        <button 
          className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
          onClick={handleFilter}
        >
          Filter
        </button>
        <button 
          className="text-purple-600 text-sm hover:underline"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default Filter