// src/api/jobs.ts
import { getApiUrl, CSRF_TOKEN } from '@/config';

import { ApiResponse } from '@/interfaces';


export async function fetchJobs(): Promise<ApiResponse> {
  try {
    const response = await fetch(getApiUrl('jobs'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-CSRFTOKEN': CSRF_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}
