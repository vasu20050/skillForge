# 📘 Product Requirements Document (PRD): SkillForge

**Project Name:** SkillForge  
**Version:** 1.0.0 (MVP)  
**Status:** In Development / Feature Complete  
**Last Updated:** March 2026

---

## 1. Executive Summary
SkillForge is a closed-campus, peer-to-peer (P2P) skill marketplace built exclusively for college students. It enables a "Campus Economy" where students can offer their technical and creative skills (Freelancers/Workers) to peers who need help with projects or tasks (Employers/Clients). The platform uses an internal **Credit Economy** to facilitate trust and ensure "no experience, no problem."

### 1.1 Problem Statement
1. **The Catch-22 of Experience**: Students cannot get work without experience, and they cannot get experience without work.
2. **Payment Friction**: Traditional freelancing involves complex payment setups (Upwork, Fiverr) which aren't student-friendly.
3. **Trust & Safety**: Hiring anonymous people online for sensitive college projects is risky.

### 1.2 The Solution
SkillForge solves this by restricting access to verified college email domains and using a credit-based system that builds a verifiable campus reputation for every student.

---

## 2. Target Audience
*   **Student Freelancers (Workers)**: Looking to build a portfolio, earn credits, and gain real-world experience.
*   **Student Employers (Clients)**: Looking for affordable, high-quality help from campus peers for assignments, startups, or personal projects.
*   **Campus Admins**: Project moderators who ensure quality and community safety.

---

## 3. Core Features (MVP)

### 3.1 Advanced Authentication
*   **College Domain Validation**: Only emails ending in `.edu`, `.ac.in`, etc., are permitted to register.
*   **JWT Security**: Secure, stateless authentication for all project actions.
*   **Dual Role System**: Seamless toggle between 'Worker' (Freelancer) and 'Client' (Employer) view.

### 3.2 Credit Economy
*   **Starter Credits**: Every new user receives 100 credits upon registration.
*   **Escrow Logic**: Credits are held in escrow when a project starts and only transferred upon successful completion.
*   **Credit Persistence**: Credits act as the primary currency within the campus ecosystem.

### 3.3 Skill & Learning Catalog
*   **Curated Tracks**: Artificial Intelligence, Cyber Security, Web Development, Mobile Dev, Content Strategy.
*   **Interactive Learning**: Each skill has a deep curriculum path with detailed modules and lesson duration.

### 3.4 Community Feed (Contributor Hub)
*   **Real-time Collaboration**: A social feed where contributors can post milestones, ask for project partners, and share learning achievements.
*   **Live Engagement**: Like and comment system to foster a supportive campus community.

### 3.5 Premium Profile System
*   **Avatar System**: High-quality 3D avatar placeholders based on user personas.
*   **Mastery Tracking**: Visual representation of skills, ranks, and project history.
*   **Automatic Portfolio**: Completed projects are automatically listed on the profile, creating a ready-to-use professional resume.

---

## 4. Functional Requirements

| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| FR1 | Registration | User must sign up with a valid college domain email. | P0 |
| FR2 | Project Posting | Clients must be able to post tasks with title, budget (credits), and category. | P0 |
| FR3 | Project Acceptance | Workers must be able to browse and "Accept" open projects. | P0 |
| FR4 | Profile View | Users must see their credits, level, and active skill tracks. | P1 |
| FR5 | Milestone Sharing | Users can share updates to the global community feed. | P1 |
| FR6 | Notifications | Alerts for project status changes (Accepted, Completed). | P2 |

---

## 5. Non-Functional Requirements

### 5.1 UI/UX Aesthetics (Premium)
*   **Glassmorphism**: Use translucent surfaces with background blurs (3XL blur).
*   **Responsive Design**: Mobile-first approach for students on the go.
*   **Aura-Core Style**: Premium dark/indigo palettes with 3D elements and smooth micro-animations.

### 5.2 Security
*   **Role-Based Access Control (RBAC)**: Ensuring only clients can post and only workers can accept (configurable per user).
*   **Data Integrity**: Protecting user credit balances via server-side validation.

---

## 6. Future Roadmap (Phase 2)
1.  **Reputation Scoring**: A weighted algorithm based on review ratings and completion speed.
2.  **Stripe/Payment Gateway**: Option to "Top-up" credits using real currency.
3.  **Real-time Messaging**: Socket.io integration for instant worker-client chat.
4.  **Skill Endorsements**: Peer-to-peer verification of technical competence.
5.  **Multi-Campus Bridge**: Allowing collaboration across verified sister colleges.

---

## 7. Tech Stack Overview
*   **Frontend**: React.js, Tailwind CSS, Lucide Icons.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose ODM).
*   **Storage**: Cloudinary (Recommended for future portfolio uploads).
