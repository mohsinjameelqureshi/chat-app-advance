# 💬 Real-Time Chat App

A **modern real-time chat application** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and **Socket.IO**.  
This app allows users to send **text and image messages**, see **who’s online**, and enjoy a **smooth, responsive chat experience** — just like modern messaging platforms.

---

## 🚀 Features

✅ **User Authentication**

- Secure login and signup using JWT.
- Profile picture upload via Cloudinary.
- Persistent sessions with refresh tokens.

✅ **Real-Time Messaging**

- Instant messaging powered by Socket.IO.
- Supports **both text and image** messages.
- Online/offline status updates in real-time.

✅ **Modern UI**

- Built with React and TailwindCSS for a beautiful, responsive interface.
- Includes image previews, upload indicators, and smooth animations.

✅ **Media Uploads**

- Upload profile pictures and chat images using **Cloudinary**.
- Local previews before upload.

✅ **Optimistic UI**

- Messages appear instantly while sending.
- Updates automatically when confirmed by the server.

✅ **API Rate Limiting**

- Implemented using **Arcjet** to protect the backend from abuse and excessive requests.
- Ensures stable and secure API performance under heavy traffic.

✅ **Welcome Email System**

- Sends a **welcome email** to new users using **Resend API**.
- Email feature is fully implemented but currently inactive for external users because the app uses the developer’s Resend account without a connected sending domain or server.
- Once a verified sender domain is added to Resend, emails will send automatically to all registered users.

---

## 🧠 Tech Stack

**Frontend:**

- React.js + Vite
- Zustand (for state management)
- TailwindCSS
- Socket.IO Client

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO (for real-time communication)
- Cloudinary (for image storage)
- Multer (for handling image uploads)
- JWT (for authentication)
- Arcjet (for rate limiting)
- Resend (for transactional emails)

---

## 🧑‍💻 Author

**Mohsin Jameel**  
Real-time web app developer | MERN Stack enthusiast

---
