import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import auth from './Auth/Auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredScopes?: string[];
}

export default function ProtectedRoute({
  children,
  requiredScopes = [],
}: ProtectedRouteProps) {
  const isAuthorized =
    auth.isAuthenticated() && auth.userHasScopes(requiredScopes);

  return isAuthorized ? children : <Navigate to="/" replace />;
}
