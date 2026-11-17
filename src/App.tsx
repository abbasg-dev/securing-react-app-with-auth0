import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index={true} element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
