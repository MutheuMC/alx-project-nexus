// src/hooks/useJobs.ts
import { useEffect, useState } from 'react';
import { fetchJob } from '@/pages/api/job';

export function useJob(id: string | number) {
  const [job, setJob] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getJob() {
      try {
        const data = await fetchJob(id);
        // console.log(data);
        setJob(data);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getJob();
    }
  }, [id]);

  return { job, loading, error };
}
