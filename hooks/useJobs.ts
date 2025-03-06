import { useEffect, useState } from 'react';
import { fetchJobs } from '@/pages/api/jobs'

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getJobs() {
      try {
        const data = await fetchJobs();
        console.log(data)
  
        setJobs(data.results );
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, []);

  return { jobs, loading, error };
}