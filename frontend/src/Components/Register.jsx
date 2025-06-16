import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      alert('Registration successful');
      console.log(res.data);
    } catch (err) {
      alert('Registration failed');
      console.error(err.response.data.username || error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
