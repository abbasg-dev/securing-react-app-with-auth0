import { Navigate } from 'react-router-dom';
import auth from './Auth/Auth';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return auth.isAuthenticated() ? children : <Navigate to="/" replace />;
}
