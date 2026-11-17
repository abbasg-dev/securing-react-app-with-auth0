import auth from './Auth/Auth';
import { Link } from 'react-router-dom';

export default function Home() {
  const { isAuthenticated, login } = auth;

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated() ? (
        <Link to="/profile">View Profile</Link>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
