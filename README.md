# 🚌 Travel Booking App

A full-stack travel and bus booking web application built with **Django (REST API)** and **ReactJS**. Users can search available buses, select seats, and book tickets securely.

![MIT License](https://img.shields.io/badge/license-MIT-green)

---

## 🔍 Features

- 🔐 User authentication (JWT-based login/register)
- 📍 Bus search and filter by place/destination
- 🎟️ View real-time seat availability
- 🪑 Select and book one or more seats
- 💳 Payment flow simulation (can integrate Stripe/Razorpay)
- 📋 Booking history and user profile
- 📡 Fully integrated Django + React stack

---

## 🛠️ Tech Stack

| Technology     | Purpose                    |
|----------------|----------------------------|
| **React.js**   | Frontend UI                |
| **Django**     | Backend (REST API)         |
| **SQLite**     | Database (dev)             |
| **Axios**      | API communication          |
| **JWT Auth**   | Secure login/register      |
| **CSS** (or custom) | Styling      |

---

## 🚀 Getting Started

### Backend (Django API)
```bash
cd django
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py runserver


### frontend
cd frontend
npm install
npm run dev
