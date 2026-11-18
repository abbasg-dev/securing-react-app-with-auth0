import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';
import Callback from './Callback';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
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
