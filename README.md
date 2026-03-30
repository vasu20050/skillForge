# 🚀 SkillForge  
### Open Source Campus Skill Economy  

> "Every student has a skill. Nobody gives them a chance to prove it — until now."

---

## 📌 Overview  

SkillForge is an **open-source, campus-exclusive skill marketplace** that enables students to gain real-world experience by working on projects within their own college ecosystem.

It solves the *"no experience, no work"* problem by creating a **trust-driven micro-economy**, where students exchange services using a structured credit system instead of money.

Unlike traditional platforms, SkillForge focuses on **verified proof of work, reputation, and fairness**, not just task completion.

---

## 🎯 Vision  

SkillForge aims to build a **high-trust campus economy** where students can:

- Work on real projects within their community  
- Build a **verifiable portfolio**  
- Earn a **reputation score based on actual performance**  
- Exchange services without payment friction  

---

## ⚙️ Core System  

### 🔁 Project Lifecycle  

```
Post → Accept → Credit Lock (Escrow)
→ Work Submission
→ Review Window (48 hrs)
   → Approve → Credits Released
   → Request Revision → Loop
   → Raise Dispute → Escalation
```

---

## ⚖️ Dispute Resolution System  

### Trigger Conditions  
- Unfair rejection  
- Low-quality submission  
- Missed deadlines  

### Resolution Flow  

- **Level 1: Automated Checks**  
  Deadline + submission validation  

- **Level 2: Community Jury**  
  3–5 high-reputation users decide outcome  

- **Level 3: Admin (Fallback only)**  
  Edge case handling  

---

## ⭐ Reputation System  

```
Reputation Score =
(Avg Rating × 0.5)
+ (Completion Rate × 0.3)
+ (On-Time Delivery × 0.1)
+ (Project Value × 0.1)
```

### Key Rules  
- High-value work → higher impact  
- Lost disputes → heavy penalty  
- Suspicious activity → score freeze  

---

## 💰 Credit Economy  

### Earn Credits  
- Completing projects  
- High ratings  
- Winning disputes  

### Spend Credits  
- Boost project visibility  
- Feature profile  
- Priority matching  

### Anti-Fraud Measures  
- Repeated user loops flagged  
- Suspicious patterns detected  
- Credit abuse leads to penalties  

---

## 🔍 Unique Feature: Verified Portfolio  

Every completed project becomes a **proof-of-work entry**:

- Deliverables  
- Client feedback  
- Credits earned  
- Timestamp  

### Verified Badge Criteria  
- No disputes  
- High rating  
- On-time delivery  

---

## 🧪 Skill Verification System  

Users must complete **practical tasks** to validate skills:

- Category-based tests  
- Evaluation (auto/manual)  
- Earn **Verified Skill Badge**  

---

## 🚫 Admin Bottleneck Removed  

- Open project posting  
- Automated spam filters  
- Community reporting system  
- Admin only for disputes  

---

## 🛠 Tech Stack  

### Frontend  
- React.js  
- Tailwind CSS  

### Backend  
- Node.js  
- Express.js  

### Database  
- MongoDB (Mongoose)  

### Authentication  
- JWT + College Email Validation  

### Storage  
- Cloudinary  

---

## 📂 Project Structure  

```
SkillForge/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── App.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/   # dispute, credits, reputation logic
│   └── index.js
│
├── config/
├── docs/
└── README.md
```

---

## 📦 MVP Features  

- Campus-only authentication (Pilot: Delhi Technical Campus)
- Dual role system (Worker / Client)  
- Escrow-based credit system  
- Dispute resolution system  
- Reputation scoring  
- Verified portfolio  
- Skill verification tasks  
- **Sahara AI Mentorship** (Premium AI assistant)
- Community moderation  

---

## 📈 Future Scope  

- Cross-campus collaboration  
- Real money credit system  
- Advanced matching algorithms
- Leaderboards & streak system  

---

## 🤝 Open Source Contribution  

SkillForge is open-source and welcomes contributions.

### Steps  
1. Fork the repository  
2. Create a feature branch  
3. Commit changes  
4. Submit a pull request  

---

## 📜 License  

MIT License  
