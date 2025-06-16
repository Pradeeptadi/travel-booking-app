import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import BusList from './BusList';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="logo">TravelNow</h1>
        <div className="nav-links">
          <button onClick={() => navigate('/history')}>History</button>
          <button onClick={() => navigate('/chat')}>Chat</button>

          {token ? (
            <>
              <button onClick={() => navigate('/profile')}>Profile</button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for buses, places..." />
      </div>

      {/* Bus List */}
      <BusList />
    </div>
  );
};

export default Home;
