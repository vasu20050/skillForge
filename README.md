🔥 SkillForge
Forging Student Skills into Real-World Impact
📖 Overview

SkillForge is an open-source web platform that connects verified college students with local businesses for structured, skill-based micro projects.

Unlike traditional freelance marketplaces, SkillForge operates on a managed workflow model — ensuring clarity, accountability, and quality delivery without chaotic bidding systems.

The platform empowers students to gain real-world experience while helping small businesses access affordable and reliable talent.

🎯 Problem Statement
Students struggle to:

Get their first client

Build a professional portfolio

Gain real-world project exposure

Earn flexible income

Local businesses struggle to:

Afford professional agencies

Find reliable freelancers

Manage inconsistent project delivery

Execute small digital tasks efficiently

Large freelance platforms such as:

Fiverr

Upwork

are global, competitive, and often overwhelming for beginners and small local businesses.

SkillForge bridges this gap through a curated, structured system designed specifically for student talent.

💡 Solution

SkillForge removes open bidding and introduces a controlled project lifecycle:

Business submits structured project request

Admin reviews and defines deliverables

Verified student is assigned

Student submits work

Admin reviews and marks completion

This approach ensures:

Defined scope

Reduced project disputes

Better quality control

Improved accountability

🛠️ Core Features
🔐 Role-Based Authentication

Student

Business

Admin

Secure JWT-based authentication system.

🎨 Service Categories

SkillForge supports the following skill-based micro services:

Graphic Design (posters, thumbnails, creatives)

Small Website Development

Video Editing

CAD Drafting

Content Writing

AI Data Cleaning

Social Media Management

📦 Structured Project Workflow

Clear project scope definition

Fixed timeline

Status tracking (Pending → Assigned → Submitted → Completed)

Internal quality review

⭐ Performance & Feedback System

Business feedback stored

Student performance tracking

Admin monitoring dashboard

📊 Admin Dashboard

Manage users

Assign projects

Track project lifecycle

Monitor platform activity

🏗️ Tech Stack
Frontend

React.js

Tailwind CSS

Backend

Node.js

Express.js

Database

MongoDB

Authentication

JWT (JSON Web Tokens)

bcrypt for password hashing

All technologies used are fully open-source.
No paid APIs or third-party SaaS services are integrated.

🧠 System Architecture

SkillForge follows a standard client-server architecture:

Frontend (React)
⬇
Backend API (Express)
⬇
MongoDB Database

The system is modular, scalable, and designed for future expansion.

📂 Project Structure
SkillForge/
│
├── client/             # React frontend
├── server/             # Express backend
├── models/             # Database schemas
├── routes/             # API endpoints
├── controllers/        # Business logic
├── middleware/         # Authentication & validation
└── README.md
⚙️ Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/your-username/skillforge.git
cd skillforge
2️⃣ Install Dependencies
Backend
cd server
npm install
Frontend
cd client
npm install
3️⃣ Configure Environment Variables

Create a .env file inside the /server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4️⃣ Run the Application
Start Backend
npm run dev
Start Frontend
npm start
🎯 Hackathon Goals

Provide a structured alternative to chaotic freelance marketplaces

Promote skill monetization among students

Enable real-world exposure without academic misconduct

Build a scalable, open-source solution

📈 Future Scope

Escrow-based payment integration

AI-based skill matching system

Student portfolio auto-generation

Multi-city expansion model

Performance-based ranking system

🤝 Contribution Guidelines

Fork the repository

Create a feature branch

Commit changes

Submit a pull request

Please follow clean coding standards and modular architecture principles.

📜 License

This project is licensed under the MIT License.

🌍 Vision

To build a trusted ecosystem where student skills are forged into real-world impact — bridging education and industry through structured collaboration.
