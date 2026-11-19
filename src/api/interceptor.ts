import auth from '../Auth/Auth';

export const api = async <T>(url: string): Promise<T> => {
  const token = auth.isAuthenticated() ? auth.getAccessToken() : null;

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status}: ${(await res.text()) || res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
};
