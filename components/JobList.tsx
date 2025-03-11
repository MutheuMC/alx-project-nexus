"use client";

import React from "react";
import JobCard from "@/components/JobCard";
import { useJobs } from "@/hooks/useJobs";
import Pagination from "@/components/Pagination"; 

interface JobListProps {
  filter: Record<string, string | string[]>; // Define filter prop type
}

const JobList: React.FC<JobListProps>= () => {
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

      {/* ✅ Pagination Component */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default JobList;
