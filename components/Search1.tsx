import React from 'react'
import { Search } from 'lucide-react'

const Search1 = () => {
  return (
    <div className="flex items-center w-full max-w-[600px] border-2 border-gray-200 hover:border-pink-300 rounded-lg px-4 py-2 gap-2  hover:shadow-lg transition-all focus-within:border-pink-500">
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search by Categories, Experience, Location..."
        className="outline-none w-full bg-transparent text-gray-600 p-1 placeholder:text-gray-400"
      />
    </div>
  )
}

export default Search1
