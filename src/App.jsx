import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { useMediaQuery } from 'react-responsive';
import { setAuthToken } from './utils/auth';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const prefersDarkMode = useMediaQuery({ query: '(prefers-color-scheme: dark)' });
  const storedMode = localStorage.getItem('mode');
  
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode || storedMode === 'dark');

  const toggleMode = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(newMode === 'dark');
    localStorage.setItem('mode', newMode);
  };
  
  document.documentElement.className = isDarkMode ? 'dark' : 'light';

  return (
    <BrowserRouter>
      <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage setAuthToken={setAuthToken} />} />
        <Route element={<PrivateRoute />}>
          <Route element={<UserProfile />} path="/profile" />
        </Route>
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;