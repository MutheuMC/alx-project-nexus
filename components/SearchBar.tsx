import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full w-[400px] px-4 py-2 gap-2">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="bg-transparent outline-none w-full text-sm text-gray-700"
      />
      <button className="bg-pink-500 p-2 rounded-full">
        <Search size={16} color="white" />
      </button>
    </div>
  );
};

export default SearchBar;
