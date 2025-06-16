import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/Home';
import BusList from './Components/BusList';
import SeatPage from './Components/SeatPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);
  };

  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bus" element={<BusList />} />
        <Route path="/seats/:busId" element={<SeatPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    
  );
};

export default App;
