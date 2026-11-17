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
  login(): void {
    auth0Client.authorize();
  },

  handleAuthentication(navigate: (path: string) => void): void {
    auth0Client.parseHash((err, authResult) => {
      if (authResult?.accessToken && authResult?.idToken) {
        this.setSession(authResult);
        navigate('/');
      } else if (err) {
        navigate('/');
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  },

  setSession(authResult: Auth0DecodedHash): void {
    console.log(authResult);
    const expiresAt = JSON.stringify(
      (authResult.expiresIn ?? 0) * 1000 + new Date().getTime(),
    );

    localStorage.setItem('access_token', authResult.accessToken!);
    localStorage.setItem('id_token', authResult.idToken!);
    localStorage.setItem('expires_at', expiresAt);
  },

  client: auth0Client,
};

export default auth;
