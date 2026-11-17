import { Link, Outlet } from 'react-router-dom';

const Nav = () => {
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
        </ul>
      </nav>

      <div className="body">
        <Outlet />
      </div>
    </>
  );
};

export default Nav;
