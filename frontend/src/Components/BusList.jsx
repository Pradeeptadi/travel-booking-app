import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BusList.css";
const BusList = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/buses/")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error("Error fetching bus data", err));
  }, []);

  if (!Array.isArray(buses)) return <p>No bus data found.</p>;

  return (
    <div className="bus-container">
      <h2 className="title">Available Buses</h2>
      {buses.map((bus) => (
        <div key={bus.id} className="bus-card">
          <h3>{bus.name} ({bus.number})</h3>
          <p><strong>From:</strong> {bus.place} <strong>To:</strong> {bus.destination}</p>
          <p><strong>Departure:</strong> {new Date(bus.start).toLocaleString()}</p>
          <p><strong>Arrival:</strong> {new Date(bus.end).toLocaleString()}</p>
          <p><strong>Seats:</strong> {bus.no_of_seat} | <strong>Price:</strong> ₹{bus.price}</p>
          <button onClick={() => navigate(`/seats/${bus.id}`)}>View Seats</button>
        </div>
      ))}
    </div>
  );
};

export default BusList;
