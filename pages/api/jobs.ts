import { getApiUrl, CSRF_TOKEN } from '@/config';
import { ApiResponse } from '@/interfaces';

export async function fetchJobs(query: Record<string, string> = {}): Promise<ApiResponse> {
  try {
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

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}
