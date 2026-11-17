import auth0, { WebAuth } from 'auth0-js';
import type { Auth0DecodedHash } from 'auth0-js';

const auth0Client: WebAuth = new auth0.WebAuth({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  responseType: 'token id_token',
  scope: 'openid profile email',
});

export const auth = {
  login: () => auth0Client.authorize(),

  handleAuthentication(navigate: (path: string) => void): void {
    auth0Client.parseHash((err, res) => {
      if (res?.accessToken && res?.idToken) {
        this.setSession(res);
      } else if (err) {
        alert(`Error: ${err.error}. Check console.`);
        console.error(err);
      }
      navigate('/');
    });
  },

  setSession(res: Auth0DecodedHash): void {
    const expiresAt = JSON.stringify((res.expiresIn ?? 0) * 1000 + Date.now());
    localStorage.setItem('access_token', res.accessToken!);
    localStorage.setItem('id_token', res.idToken!);
    localStorage.setItem('expires_at', expiresAt);
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    auth0Client.logout({
      clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:5173/',
    });
  },

  isAuthenticated: (): boolean =>
    Date.now() < JSON.parse(localStorage.getItem('expires_at') || '0'),

  client: auth0Client,
};

export default auth;
