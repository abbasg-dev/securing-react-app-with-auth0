import auth0, { WebAuth } from 'auth0-js';
import type { Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';

const requestedScopes = 'openid profile email read:courses';
const REDIRECT_ON_LOGIN = 'redirect_on_login';

// Stored in module scope as private state
let _idToken: string | null = null;
let _accessToken: string | null = null;
let _scopes: string | null = null;
let _expiresAt: number = 0;

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
        auth.setSession(res);
        const stored = localStorage.getItem(REDIRECT_ON_LOGIN);
        const redirectPath = stored
          ? (JSON.parse(stored).pathname ?? '/')
          : '/';
        localStorage.removeItem(REDIRECT_ON_LOGIN);
        navigate(redirectPath);
        return;
      }
      if (err) {
        alert(`Error: ${err.error}. Check console.`);
        console.error(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
      navigate('/');
    });
  },

  setSession(res: Auth0DecodedHash): void {
    _expiresAt = (res.expiresIn ?? 0) * 1000 + Date.now();
    _scopes = res.scope || requestedScopes || '';
    _accessToken = res.accessToken ?? null;
    _idToken = res.idToken ?? null;
    auth.scheduleTokenRenewal();
  },

  logout(): void {
    auth0Client.logout({
      clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:5173/',
    });
  },

  isAuthenticated: (): boolean => {
    return Date.now() < _expiresAt;
  },

  getAccessToken(): string {
    if (!_accessToken) throw new Error('No access token found.');
    return _accessToken;
  },

  getProfile(
    cb: (
      profile: Auth0UserProfile | null,
      err?: auth0.Auth0Error | null,
    ) => void,
  ): void {
    if (userProfile) return cb(userProfile);

    auth0Client.client.userInfo(auth.getAccessToken(), (err, profile) => {
      if (profile) userProfile = profile;
      cb(profile ?? null, err);
    });
  },

  userHasScopes(scopes: string[]): boolean {
    const grantedScopes = _scopes?.split(/\s+/) ?? [];
    return scopes.every((scope) => grantedScopes.includes(scope));
  },

  renewToken(
    cb?: (err: auth0.Auth0Error | null, result?: Auth0DecodedHash) => void,
  ): void {
    auth0Client.checkSession({}, (err, res) => {
      if (err) {
        console.error(
          `Silent renewal error: ${err.error} - ${err.error_description}`,
        );
      } else if (res) {
        auth.setSession(res);
      }
      cb?.(err, res);
    });
  },

  scheduleTokenRenewal(): void {
    const delay = _expiresAt - Date.now();
    if (delay > 0) {
      setTimeout(() => auth.renewToken(), delay);
    }
  },

  client: auth0Client,
};

export default auth;
