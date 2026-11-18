import auth from './Auth/Auth';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Nav() {
  const { isAuthenticated, login, logout } = auth;

  // Re-renders on route change
  useLocation();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/public">Public</Link>
          </li>
          <li>{isAuthenticated() && <Link to="/private">Private</Link>}</li>
          <li>
            {isAuthenticated() ? (
              <button onClick={logout}>Log Out</button>
            ) : (
              <button onClick={login}>Login</button>
            )}
          </li>
        </ul>
      </nav>

      <div className="body">
        <Outlet />
      </div>
    </>
  );
}
