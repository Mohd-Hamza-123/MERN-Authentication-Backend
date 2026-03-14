# MERN Authentication App

A full-stack authentication system built with the **MERN stack** that implements secure user authentication, OAuth login, session management, and rate limiting. This project demonstrates modern authentication patterns used in real production systems.

---

## 🚀 Overview

This application provides a complete authentication flow including traditional email/password login and OAuth authentication using **Google** and **GitHub**. It also includes security features such as **rate limiting**, **session-based authentication**, and **email verification**.

The goal of this project is to implement a **secure, scalable authentication backend** with a clean frontend interface.

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Redis**
* **Passport.js**
* **Express Session**

### Frontend

* **React**

### Authentication

* **JWT (for verification/reset links)**
* **Session-based authentication**
* **OAuth (Google & GitHub)**

---

## ✨ Features

### Authentication

* User registration
* User login
* Session-based authentication
* Secure logout

### Email Features

* Email verification after signup
* Password reset via email

### OAuth Login

* Google authentication
* GitHub authentication

### Security

* Rate limiting using **Redis**
* Secure session storage
* HTTP-only cookies
* Password hashing

---

## 🔐 Authentication Flow

1. **Register**

   * User signs up with email and password.
   * Verification email is sent.

2. **Email Verification**

   * User verifies account using email link.

3. **Login**

   * User logs in with credentials.
   * Session is created and stored in Redis.

4. **OAuth Login**

   * User can login using **Google** or **GitHub**.

5. **Password Reset**

   * User requests password reset.
   * Reset link is sent via email.

---

## 📂 Project Structure

```
client/
  src/
    components/
    pages/
    services/
    lib/
    hooks/
    types/
    assets/

server/
  src/
    controllers/
    routes/
    models/
    config/
    middleware/
    lib/
    services/
    types/
    validators/
    templates
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **server** folder.

```
PORT=8000
MONGO_URI=your_mongodb_connection

SESSION_SECRET=your_session_secret

REDIS_URL=your_redis_url

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🧑‍💻 Installation

### 1. Clone the repository

```
git clone https://github.com/yourusername/mern-auth-app.git
```

### 2. Install backend dependencies

```
cd server
npm install
```

### 3. Install frontend dependencies

```
cd client
npm install
```

---

## ▶️ Running the Application

### Start backend

```
cd server
npm run dev
```

### Start frontend

```
cd client
npm start
```

---

## 📌 Future Improvements

* Two-factor authentication (2FA)
* Account linking (Google + GitHub)
* Role-based authorization
* Login activity tracking
* Admin dashboard

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed by **Mohd Hamza**

---

## ⭐ Support

If you like this project, consider giving it a **star** on GitHub.
