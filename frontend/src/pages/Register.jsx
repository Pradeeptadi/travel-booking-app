import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'https://travel-booking-app-ijyw.onrender.com/api/';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}register/`, { username, email, password });
      setMessage('✅ Registration successful. You can now log in.');
    } catch (err) {
      if (err.response?.data) {
        const { username, email, password, non_field_errors } = err.response.data;
        setMessage(
          username?.[0] ||
          email?.[0] ||
          password?.[0] ||
          non_field_errors?.[0] ||
          '❌ Registration failed.'
        );
      } else {
        setMessage('❌ Server error. Try again later.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
