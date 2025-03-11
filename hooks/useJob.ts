import { useEffect, useState } from 'react';
import { getApiUrl, CSRF_TOKEN } from '@/config';
import { Job } from '@/interfaces';

export function useJob(id: string | number) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getJob() {
      try {
        const response = await fetch(getApiUrl(`jobs/${id}`), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-CSRFTOKEN': CSRF_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch job: ${response.status}`);
        }

        const data = await response.json();
        setJob(data); // Ensure we return a single job, not an array
      } catch (err) {
        setError('Failed to fetch job');
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
