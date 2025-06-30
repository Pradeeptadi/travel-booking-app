// src/api.js
import axios from "axios";

// Use env variable or fallback to Render API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "https://travel-booking-app-ijyw.onrender.com/api/",
});

// Automatically attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
