# 🎧 Audio + – MERN Stack Music Player App

Audio + is a **full-stack music player web application** built from scratch using the **MERN stack**. This project is designed as a **beginner-friendly but production-style tutorial**, covering both **frontend and backend** development in one complete system.

The app allows users to upload, manage, and stream music with a modern UI inspired by Spotify-like platforms.

---

## 🚀 Tech Stack

### Frontend

* ⚛️ **React.js**
* 🧠 **Redux Toolkit (RTK)** – State Management
* 🎨 **Tailwind CSS** – Modern UI Styling
* 🔄 **Axios** – API Communication
* 🎵 **HTML5 Audio API**

### Backend

* 🟢 **Node.js**
* 🚂 **Express.js**
* 🍃 **MongoDB** with **Mongoose**
* 🔐 **JWT Authentication**
* 📁 **Multer** – Audio & Image Uploads

---

## ✨ Features

### 🔑 Authentication

* User Registration & Login
* JWT-based Secure Authentication

### 🎶 Music Management

* Upload Songs (Audio + Thumbnail)
* Create Albums & Playlists
* Fetch Songs by Artist / Album

### ▶️ Music Player

* Play / Pause
* Next / Previous Track
* Seek & Volume Control
* Global Player State with Redux

### 🎨 UI/UX

* Responsive Design
* Tailwind-based Clean Layout
* Spotify-inspired Music Player

---

## 📂 Project Structure

```
Audio+
│
├── frontend/        # React + Redux Toolkit
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend/         # Node + Express API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/audio-plus.git
cd audio-plus
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### Environment Variables (`.env`)

```
PORT=5004
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Backend Server

```bash
npm run dev
```

Server will run on: `http://localhost:5004`

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔗 API Endpoints (Sample)

| Method | Endpoint           | Description    |
| ------ | ------------------ | -------------- |
| POST   | /api/auth/register | Register User  |
| POST   | /api/auth/login    | Login User     |
| POST   | /api/songs         | Upload Song    |
| GET    | /api/songs         | Get All Songs  |
| GET    | /api/songs/:id     | Get Song by ID |

---

## 📸 Screenshots

> Add screenshots or GIFs of the app here (Home, Player, Upload Page)

---

## 🎓 Learning Outcomes

* Full MERN stack workflow
* Redux Toolkit best practices
* Audio streaming with React
* File uploads using Multer
* Clean folder architecture
* Real-world project structure

---

## 🧪 Future Enhancements

* ❤️ Like & Favorite Songs
* 📊 Recently Played
* 🔍 Search & Filter
* 🎼 Queue Management
* ☁️ Cloud Storage (AWS / Cloudinary)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project helpful:

* ⭐ Star the repository
* 🍴 Fork it
* 📢 Share with others

Happy Coding! 🎧🔥