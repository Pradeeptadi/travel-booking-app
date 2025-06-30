import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE || 'https://travel-booking-app-ijyw.onrender.com/api/';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) return;

    fetch(`${API_BASE}user/${userId}/booking/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Profile;
