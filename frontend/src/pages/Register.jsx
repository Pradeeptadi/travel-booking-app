import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', { username, email, password });
      setMessage('Registration successful. You can now log in.');
    } catch (err) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
