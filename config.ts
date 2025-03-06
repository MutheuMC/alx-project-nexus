export const BASE_URL = 'https://139.84.227.102/api';
export const CSRF_TOKEN = 'UR2QTaTaWRjyDXAJHyqquYE4BIqCH3qwdSaFZeNMsxm5wVgXEosbRegyT5t2mOJm';

export function getApiUrl(endpoint: string): string {
  return `${BASE_URL}/${endpoint}`;
}