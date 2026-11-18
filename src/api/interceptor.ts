export const api = async <T>(url: string): Promise<T> => {
  const token = localStorage.getItem('access_token');

  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
};
