"use client";

import React,  { useState } from 'react';
import JobCard from '@/components/JobCard';
import { useJobs } from '@/hooks/useJobs';




const JobList: React.FC  = () => {

  const { jobs, loading, error, totalPages, page, setPage } = useJobs();
  

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid gap-4">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <JobCard
            key={index}
            id={job.id}
            title={job.title}
            location={job.location}
            company_name={job.company_name || "Unknown Company"}
            posted_at={job.posted_at || ""}
            experience_level={job.experience_level || "Not specified"}
            description={job.description || "No description available"}
          />
        ))
      ) : (
        <p>No jobs available</p>
      )}
       {/* ✅ Pagination Buttons */}
       <div className="flex justify-center mt-4 space-x-2">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className={`px-4 py-2 rounded bg-gray-600 text-white transition-all ${
      page === 1
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-purple-500 hover:text-white"
    }`}
  >
    ← 
  </button>

  {/* <span className="px-4 py-2 bg-gray-700 text-white rounded">{`Page ${page} of ${totalPages}`}</span> */}

  <button
    disabled={page >= totalPages}
    onClick={() => setPage(page + 1)}
    className={`px-4 py-2 rounded bg-gray-600 text-white transition-all ${
      page >= totalPages
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-purple-500 hover:text-white"
    }`}
  >
   →
  </button>
</div>

    </div>
  );
};

export default JobList;



