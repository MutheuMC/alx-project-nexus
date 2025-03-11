import React from 'react';
import JobCard from '@/components/JobCard';
import { useJobs } from '@/hooks/useJobs';


const JobList: React.FC = () => {
  const { jobs, loading, error } = useJobs();
 

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid gap-4">
  

      {jobs.length > 0 ? (
        jobs.map((job, index) => <JobCard key={index} {...job} />)
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobList;
