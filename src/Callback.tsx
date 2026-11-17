import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import auth from './Auth/Auth';

export default function Callback() {
  const { hash } = useLocation();

  useEffect(() => {
    if (/access_token|id_token|error/.test(hash)) {
      auth.client.parseHash((err, authResult) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(authResult);
      });
    } else {
      throw new Error('Invalid callback URL.');
    }
  }, [hash]);

  return <h1>Loading...</h1>;
}
