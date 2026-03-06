# SkillForge

**A Campus-First Peer Skill Marketplace**

> "Every student has a skill. Nobody gives them a chance to prove it — until now."

SkillForge is a closed-campus, peer-to-peer (P2P) skill exchange platform built exclusively for college students. It breaks the "no experience, no work" cycle by creating a high-trust, credit-based environment where a student's college identity acts as their primary credential.

---

# 🚀 Vision

Traditional freelance platforms require experience before getting work. SkillForge flips that model by creating a safe campus ecosystem where students can:

* Work on **real projects inside their campus community**
* Build a **verifiable portfolio**
* Earn a **campus reputation score**
* Exchange services through an **internal credit economy**

This removes payment friction and focuses on **learning, collaboration, and real experience.**

---

# 🛠 Tech Stack

**Frontend**

* React.js
* Tailwind CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB (Mongoose)

**Authentication**

* JWT Authentication
* College Email Domain Validation

**Storage**

* Cloudinary (portfolio files and project deliverables)

---

# 📦 Core Features (MVP)

### 1. Campus-Only Authentication

Only students with approved college email domains can register.

### 2. Dual User Roles

Users can switch between:

* **Worker** → Offers skills and completes projects
* **Client** → Posts tasks and hires other students

### 3. Credit Economy

* Each user receives **100 credits on signup**
* Credits transfer **only after project approval**
* Prevents payment issues while encouraging fair exchange

### 4. Skill Categories

Platform supports multiple student skill categories including:

* Graphic Design
* Web Development
* Content Writing
* AI Data Tasks
* Video Editing
* Presentation Design
* Research Assistance

### 5. Managed Project Workflow

Projects go through **admin approval** to maintain quality and prevent spam.

### 6. Auto Portfolio System

Every completed project automatically appears in the student's **public portfolio profile**.

---

# 🧩 Project Architecture

```
SkillForge/
│
├── client/                 # React Frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
│
└── server/                 # Node Backend
    ├── controllers/        # Business logic
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── middleware/         # Auth and validation
    └── index.js            # Server entry point
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```
git clone https://github.com/your-username/SkillForge.git
cd SkillForge
```

---

## 2️⃣ Backend Setup

```
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
```

Run backend:

```
npm start
```

---

## 3️⃣ Frontend Setup

```
cd client
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

Backend runs at:

```
http://localhost:5000
```

---

# 🔐 Authentication Flow

1. User signs up with **college email**
2. Email domain validation checks if domain is approved
3. JWT token issued after successful login
4. Protected routes verify token for API access

---

# 🧠 Credit Economy Logic

1. Client posts project with credit reward
2. Worker accepts project
3. Worker submits deliverables
4. Client approves project
5. Credits automatically transfer

---

# 📈 Future Improvements

Planned features beyond MVP:

* Reputation scoring algorithm
* Skill endorsements
* Campus leaderboards
* AI project matching
* Real internship pipeline
* Cross-campus collaboration

---

# 🤝 Contributing

SkillForge is open-source and welcomes contributions from student developers.

Steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

---

# 📜 License

This project is released under the **MIT License**.

---

# 👨‍💻 Developed For

**Campus Hackathon 2026**

SkillForge aims to empower students to gain **real
