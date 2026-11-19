import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import auth from './Auth/Auth';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';
import Callback from './Callback';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    auth.renewToken(() => {
      setIsInitializing(true);
    });
  }, []);

  if (!isInitializing) {
    return <div>Loading session...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="public" element={<Public />} />
        <Route
          path="private"
          element={
            <ProtectedRoute>
              <Private />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses"
          element={
            <ProtectedRoute requiredScopes={['read:courses']}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route path="callback" element={<Callback />} />
      </Route>
    </Routes>
  );
}
