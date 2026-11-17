import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from './Auth/Auth';

export default function Callback() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent React 18+ strict mode from running parseHash twice
    if (hasProcessed.current) return;

    if (/access_token|id_token|error/.test(hash)) {
      hasProcessed.current = true;
      auth.handleAuthentication(navigate);
    } else {
      throw new Error('Invalid callback URL.');
    }
  }, [hash, navigate]);

  return <h1>Loading...</h1>;
}
