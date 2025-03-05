import React from 'react'
import { Search } from 'lucide-react'

const Search1 = () => {
  return (
    <div className="flex items-center w-full max-w-[600px] border-2 border-pink-300 rounded-lg px-4 py-2 gap-2 shadow-md hover:shadow-lg transition-all focus-within:border-pink-500">
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search by company, skill, tag..."
        className="outline-none w-full bg-transparent text-gray-600 placeholder:text-gray-400"
      />
    </div>
  )
}

export default Search1
