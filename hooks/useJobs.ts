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
  count: number; 
  next: string | null;
  previous: string | null;
  results: Job[];
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1); 
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getJobs() {
      setLoading(true);
      setError(null);

      try {
        const params = searchParams.toString();
        const url = getApiUrl(`jobs/?page=${page}&${params}`);

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
        console.log(data);

        setJobs(data.results);
        setCount(data.count);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setTotalPages(Math.ceil(data.count / 10));
        const uniqueLocations = Array.from(new Set(data.results.map((job) => job.location)));
        setLocations(uniqueLocations);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, [searchParams, page]);

  return { jobs, locations, totalPages, setPage, page, loading, error };
}