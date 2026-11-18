import auth0, { WebAuth } from 'auth0-js';
import type { Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';

const requestedScopes = 'openid profile email read:courses';

const auth0Client: WebAuth = new auth0.WebAuth({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  responseType: 'token id_token',
  scope: requestedScopes,
});

let userProfile: Auth0UserProfile | null = null;

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
    const scopes = res.scope || requestedScopes || '';
    localStorage.setItem('access_token', res.accessToken!);
    localStorage.setItem('id_token', res.idToken!);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    userProfile = null;
    auth0Client.logout({
      clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:5173/',
    });
  },

  isAuthenticated: (): boolean =>
    Date.now() < JSON.parse(localStorage.getItem('expires_at') || '0'),

  getAccessToken(): string {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token found.');
    return token;
  },

  getProfile(
    cb: (
      profile: Auth0UserProfile | null,
      err?: auth0.Auth0Error | null,
    ) => void,
  ): void {
    if (userProfile) return cb(userProfile);

    auth0Client.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) userProfile = profile;
      cb(profile ?? null, err);
    });
  },

  userHasScopes(scopes: string[]): boolean {
    const grantedScopes = localStorage.getItem('scopes')?.split(' ') ?? [];
    return scopes.every((scope) => grantedScopes.includes(scope));
  },

  client: auth0Client,
};

export default auth;
