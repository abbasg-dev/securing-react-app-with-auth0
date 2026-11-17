import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';
import Callback from './Callback';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/callback" element={<Callback />} />
      </Route>
    </Routes>
  );
}
