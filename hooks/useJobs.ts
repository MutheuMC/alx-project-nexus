import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getApiUrl, CSRF_TOKEN } from '@/config';

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getJobs() {
      try {
        const query = Object.fromEntries(searchParams.entries()); // Convert search params to object
        const params = new URLSearchParams(query).toString();
        const url = getApiUrl(`jobs/?${params}`);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-CSRFTOKEN': CSRF_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }

        const data = await response.json();
        setJobs(data.results);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, [searchParams]); // Re-fetch when search params change

  return { jobs, loading, error };
}
