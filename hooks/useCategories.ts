import { useEffect, useState } from "react";
import { getApiUrl, CSRF_TOKEN } from '@/config';
import { ApiResponse } from '@/interfaces';

interface CategoryResult {
  categories: any[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): CategoryResult {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(getApiUrl(`categories`), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-CSRFTOKEN': CSRF_TOKEN,
          },
        });
        
        const data: ApiResponse = await response.json();
        console.log(data);
        setCategories(data.results);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []); // Added dependency array

  return { categories, loading, error };
}