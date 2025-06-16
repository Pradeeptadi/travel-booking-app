import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onlogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', form);
     console.log("Response data:", res.data); // Add this line for debugging

localStorage.setItem('token', res.data.token);         // Use correct key
localStorage.setItem('userId', res.data.user_id);      // Update as needed

if (onlogin) {
  onlogin(res.data.token, res.data.user_id);
}

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
