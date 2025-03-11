import React from 'react';
import JobCard from '@/components/JobCard';
import { useJobs } from '@/hooks/useJobs';


interface JobListProps {
  filter: Record<string, string | string[]>;
}

const JobList: React.FC<JobListProps>  = () => {
  const { jobs, loading, error } = useJobs();

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid gap-4 w-full ml-0">
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
    </div>
  );
};

export default JobList;
