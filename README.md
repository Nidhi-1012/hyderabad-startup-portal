# 🚀 Hyderabad Startup Portal

<div align="center">

![Hyderabad Startup Portal](https://img.shields.io/badge/Hyderabad-Startup%20Portal-6C63FF?style=for-the-badge&logo=rocket&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**A modern, feature-rich web platform to discover, explore, and connect with Hyderabad's thriving startup ecosystem.**

[🌐 Live Demo](#) · [📖 Documentation](#️-installation--setup) · [🐛 Report Bug](https://github.com/Nidhi-1012/hyderabad-startup-portal/issues) · [✨ Request Feature](https://github.com/Nidhi-1012/hyderabad-startup-portal/issues)

</div>

---

## 📌 Overview

The **Hyderabad Startup Portal** is a full-stack web application that serves as the digital gateway to Hyderabad's startup ecosystem. It empowers entrepreneurs, investors, and enthusiasts to:

- 🔍 **Discover** startups across multiple industries and categories
- 📋 **List** their own startup with a rich submission form
- 🔐 **Authenticate** securely via OTP-based email verification (Supabase Auth)
- 📚 **Explore** the comprehensive **Hyderabad 2026 Ultimate Guide** — a curated resource covering the city's innovation landscape
- 📱 **Experience** a fully responsive, premium dark-themed UI

---

## ✨ Features

### 🔐 Authentication
- Email-based OTP authentication powered by **Supabase**
- Secure session management with JWT tokens
- Protected routes for authenticated users only

### 🏢 Startup Directory
- Browse startups with beautiful card layouts
- Filter by **category**, **stage**, **industry**
- Detailed startup modal with full information
- Add new startups via a guided multi-step modal form

### 📖 Hyderabad 2026 Ultimate Guide
- 34 interactive sections covering Hyderabad's startup landscape
- Scroll-spy sidebar navigation
- Data tables, source citations, and quote cards
- Category grid with smooth transitions

### 🎨 UI / UX
- Premium dark-theme with glassmorphism effects
- Cinematic hero overlay with animations
- Fully responsive across all screen sizes
- Smooth page transitions and micro-animations

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | Latest | Build Tool |
| React Router DOM | 6.x | Client-Side Routing |
| Supabase JS | 2.x | Auth & Database Client |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | 4.x | Web Framework |
| TypeScript | 5.x | Type Safety |
| Mongoose | 8.x | MongoDB ODM |
| MongoDB Memory Server | 11.x | In-Memory DB (Dev) |
| Nodemailer | 8.x | Email (OTP) |
| Helmet | 7.x | Security Headers |
| Zod | 3.x | Schema Validation |
| bcrypt | 6.x | Password Hashing |
| JSON Web Token | 9.x | Auth Tokens |

---

## 📂 Project Structure

```
hyderabad-startup-portal/
│
├── 📁 backend/                    # TypeScript Express backend
│   ├── 📁 src/
│   │   ├── 📁 config/             # DB and environment config
│   │   ├── 📁 controllers/        # Route controllers (startups, auth, OTP)
│   │   ├── 📁 middleware/         # Auth middleware
│   │   ├── 📁 models/             # Mongoose models (Startup, OTP, User)
│   │   ├── 📁 routes/             # Express route definitions
│   │   └── 📄 server.ts           # Main server entry point
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 frontend/                   # React + TypeScript frontend
│   └── 📁 src/
│       ├── 📁 components/         # Reusable UI components
│       │   ├── Navbar.tsx
│       │   ├── Hero.tsx
│       │   ├── Footer.tsx
│       │   ├── StartupCard.tsx
│       │   ├── StartupDetailModal.tsx
│       │   ├── AddStartupModal.tsx
│       │   ├── Sidebar.tsx
│       │   ├── DataTable.tsx
│       │   └── ...
│       ├── 📁 pages/              # Page-level components
│       │   ├── Home.tsx           # Hyderabad Ultimate Guide
│       │   ├── Startups.tsx       # Startup Directory
│       │   ├── Login.tsx          # OTP Authentication
│       │   └── GuideDetail.tsx
│       ├── 📁 context/            # React Context (Auth, etc.)
│       ├── 📁 hooks/              # Custom React hooks
│       ├── 📁 lib/                # Supabase client config
│       ├── 📁 types/              # TypeScript type definitions
│       ├── 📁 data/               # Static data and constants
│       └── 📄 router.tsx          # App routing
│
├── 📁 config/                     # Root-level DB config (legacy)
├── 📁 controllers/                # Root-level controllers (legacy)
├── 📁 middleware/                  # Root-level middleware (legacy)
├── 📁 models/                     # Root-level Mongoose models (legacy)
├── 📁 routes/                     # Root-level routes (legacy)
├── 📁 public/                     # Static HTML pages
├── 📄 server.js                   # Root Express server (legacy entry)
├── 📄 seed.js                     # Database seed script
├── 📄 .gitignore
└── 📄 README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [MongoDB](https://www.mongodb.com/) (or use the built-in in-memory server for dev)
- A [Supabase](https://supabase.com/) account (for Auth)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nidhi-1012/hyderabad-startup-portal.git
cd hyderabad-startup-portal
```

---

### 2️⃣ Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hydportal
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Start the backend dev server:

```bash
npm run dev
```

> The backend will run on `http://localhost:5000`

---

### 3️⃣ Setup the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

> The frontend will run on `http://localhost:5173`

---

### 4️⃣ Seed the Database (Optional)

To populate the database with sample startup data:

```bash
# From project root
npm run seed
```

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description | Required |
|---|---|---|
| `PORT` | Server port (default: 5000) | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `EMAIL_USER` | Gmail address for OTP emails | ✅ |
| `EMAIL_PASS` | Gmail App Password | ✅ |

### Frontend (`frontend/.env`)

| Variable | Description | Required |
|---|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | ✅ |
| `VITE_API_URL` | Backend API base URL | ✅ |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/send-otp` | Send OTP to email |
| `POST` | `/api/auth/verify-otp` | Verify OTP & get token |

### Startups
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/startups` | Get all startups |
| `GET` | `/api/startups/:id` | Get startup by ID |
| `POST` | `/api/startups` | Add a new startup |
| `PUT` | `/api/startups/:id` | Update a startup |
| `DELETE` | `/api/startups/:id` | Delete a startup |

---

## 📸 Screenshots

> *Screenshots coming soon — run the app locally to see the full experience!*

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please make sure your code follows the existing code style and includes relevant tests where applicable.

---

## 🐛 Known Issues / Roadmap

- [ ] Add search functionality in the startup directory
- [ ] Implement startup upvoting / bookmarking
- [ ] Add user profile pages
- [ ] Integrate real-time notifications
- [ ] Add admin dashboard for managing listings
- [ ] Deploy backend to Railway / Render
- [ ] Deploy frontend to Vercel / Netlify

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Nidhi** — Developer & Maintainer

- GitHub: [@Nidhi-1012](https://github.com/Nidhi-1012)
- Repository: [hyderabad-startup-portal](https://github.com/Nidhi-1012/hyderabad-startup-portal)

---

<div align="center">

Made with ❤️ for Hyderabad's startup ecosystem

⭐ **Star this repo** if you find it helpful!

</div>
