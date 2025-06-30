import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SeatPage.css";

const API_BASE = process.env.REACT_APP_API_BASE || "https://travel-booking-app-ijyw.onrender.com/api/";

const SeatPage = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}buses/${busId}/`)
      .then(res => {
        setBus(res.data);
        setSeats(res.data.seats || []);
      })
      .catch(err => console.error("Error fetching seat data", err));
  }, [busId]);

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = () => {
    navigate('/payment', {
      state: {
        bus,
        selectedSeats,
        totalPrice: selectedSeats.length * parseFloat(bus.price),
      }
    });
  };

  if (!bus) return <p>Loading...</p>;

  return (
    <div className="seat-page">
      <div className="bus-details">
        <h2>{bus.name} ({bus.number})</h2>
        <p><strong>From:</strong> {bus.place} → <strong>To:</strong> {bus.destination}</p>
        <p><strong>Departure:</strong> {new Date(bus.start).toLocaleString()}</p>
        <p><strong>Price per seat:</strong> ₹{bus.price}</p>
      </div>

      <div className="seats-grid">
        {seats.slice(0, 2).map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.booked ? "booked" : selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat.seat_number}
          </div>
        ))}
        <div className="seat" style={{ visibility: 'hidden' }}></div>
        <div className="seat" style={{ visibility: 'hidden' }}></div>

        {seats.slice(2).map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.booked ? "booked" : selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat.seat_number}
          </div>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="booking-bar">
          <p><strong>{selectedSeats.length}</strong> seat(s) selected</p>
          <p>Total: ₹{selectedSeats.length * parseFloat(bus.price)}</p>
          <button onClick={handleBooking}>Start Booking</button>
        </div>
      )}
    </div>
  );
};

export default SeatPage;
