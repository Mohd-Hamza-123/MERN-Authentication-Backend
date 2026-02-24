# 🔐 Session-Based Authentication System (Redis)

A secure authentication system built with **Node.js**, **Express**, **TypeScript**, and **Redis**.  
This project implements a complete authentication flow using **server-side sessions stored in Redis**.

---

## 🚀 Features

- User Registration
- User Login
- Email Verification
- Forgot Password (Token-based Reset)
- Session-Based Authentication
- Redis Session Store
- Rate Limiting (Brute-force Protection)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- Redis
- express-session
- Zod (Validation)
- Nodemailer (Email Service)

---

## 🔐 Authentication Flow

### Register
- User registers with email and password
- Password is securely hashed
- Verification email is sent

### Verify Email
- User clicks verification link
- Account is activated

### Login
- Credentials are validated
- Session is created using `express-session`
- Session is stored in Redis
- `connect.sid` cookie is sent to the client

### Session Persistence
- Browser automatically sends `connect.sid`
- Server retrieves session from Redis
- If `req.session.userId` exists → user is authenticated

### Forgot Password
- Reset token is generated
- Email is sent with reset link
- Token is verified before allowing password update

---

## 🧠 Why Redis for Sessions?

- Default memory store is not production-safe
- Redis enables scalability
- Sessions persist across server restarts
- Suitable for distributed systems

---

## 🛡 Security Measures

- Password hashing
- HTTP-only cookies
- Session expiration
- Reset token expiration
- Rate limiting on authentication routes
- Email validation using Zod

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=8000
SESSION_SECRET=your_session_secret
REDIS_URL=redis://localhost:6379
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## ▶️ Running the Project

Install dependencies:

```
npm install
```

Start Redis:

```
redis-server
```

Run development server:

```
npm run dev
```

---

## 📌 Future Improvements

- Role-based authorization
- CSRF protection
- Account lock after multiple failed attempts
- Refresh token rotation

---

## 📄 License

This project is for educational and backend practice purposes.

---

