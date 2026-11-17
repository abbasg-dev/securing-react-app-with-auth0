import { Navigate, useLocation } from 'react-router-dom';

export default function Callback() {
  const { hash } = useLocation();

  return <Navigate to={`/${hash}`} replace />;
}
