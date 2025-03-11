import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getApiUrl, CSRF_TOKEN } from "@/config";

interface Job {
  id: number;
  title: string;
  location: string;
  [key: string]: any;
}

interface JobsResponse {
  results: Job[];
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getJobs() {
      setLoading(true);
      setError(null);

      try {
        const params = searchParams.toString();
        const url = getApiUrl(`jobs/?${params}`);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-CSRFTOKEN": CSRF_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }

        const data: JobsResponse = await response.json();
        setJobs(data.results);

        const uniqueLocations = Array.from(new Set(data.results.map((job) => job.location)));
        setLocations(uniqueLocations);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, [searchParams]);

  return { jobs, locations, loading, error };
}
