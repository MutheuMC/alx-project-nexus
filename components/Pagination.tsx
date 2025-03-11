"use client";

import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`p-4 rounded-full bg-gray-400 text-white transition-all ${
          page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
      >
        ←
      </button>

      

      <button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className={`p-4 rounded-full bg-gray-400 text-white transition-all ${
          page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
