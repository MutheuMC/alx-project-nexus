import React from 'react'

const Filter = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[350px]">
      {/* Specialties */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Categories</h2>
        <div className="flex flex-col gap-2">
          {[
            'Animation',
            'Brand / Graphic Design',
            'Illustration',
            'Leadership',
            'Mobile Design',
            'UI / Visual Design',
            'Product Design',
            'UX Design / Research',
            'Web Design'
          ].map((specialty) => (
            <label key={specialty} className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">Location</h2>
        <input
          type="text"
          placeholder="Enter Location..."
          className="w-full p-2 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" />
          Open to remote
        </label>
      </div>

      {/* Job Type */}
      <div className="mt-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Full-Time
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" />
          Freelance/Contract
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-2">
        <button className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500">
          Filter
        </button>
        <button className="text-purple-600 text-sm hover:underline">
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default Filter
