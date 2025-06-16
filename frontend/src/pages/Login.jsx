import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
    } catch (err) {
      setMessage('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
