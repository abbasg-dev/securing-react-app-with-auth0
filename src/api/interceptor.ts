export const api = async <T>(url: string): Promise<T> => {
  const token = localStorage.getItem('access_token');

  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `HTTP ${response.status}: ${errorBody || response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
};
