import auth from './Auth/Auth';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={auth.login}>Login</button>
    </div>
  );
}
