import auth0, { WebAuth } from 'auth0-js';

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

  client: auth0Client,
};

export default auth;
