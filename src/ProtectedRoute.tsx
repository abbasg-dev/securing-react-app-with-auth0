import type { ReactNode } from 'react';
import auth from './Auth/Auth';

interface ProtectedRouteProps {
  readonly children: ReactNode;
  readonly requiredScopes?: string[];
}

export default function ProtectedRoute({
  children,
  requiredScopes = [],
}: ProtectedRouteProps) {
  // 1. Redirect to login if not logged in
  if (!auth.isAuthenticated()) {
    auth.login();
    return null;
  }

  // 2. Display message if user lacks required scope(s)
  if (requiredScopes.length > 0 && !auth.userHasScopes(requiredScopes)) {
    return (
      <h1>
        Unauthorized - You need the following scope(s) to view this page:{' '}
        {requiredScopes.join(',')}.
      </h1>
    );
  }

  // 3. Render protected children
  return <>{children}</>;
}
