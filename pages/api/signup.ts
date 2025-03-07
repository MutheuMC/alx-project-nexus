// src/api/jobs.ts
import { getApiUrl, CSRF_TOKEN } from '@/config';


export async function fetchCategories() {
  try {
    const response = await fetch(getApiUrl(`categories`), {
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
    return data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}
