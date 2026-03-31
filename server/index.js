require('dotenv').config(); // Server startup: 2026
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// ── CORS: Manual headers FIRST — before every other middleware ──────────────
// This ensures cross-origin requests from Vercel always get the right headers
// even if Render's proxy strips the cors() package headers.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Short-circuit OPTIONS preflight immediately — no further processing needed
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(morgan('dev'));

// Rate Limiting — skip for health & auth to avoid blocking logins
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  skip: (req) => req.path.startsWith('/api/auth') || req.path === '/api/health',
});
app.use('/api', limiter);

app.use(express.json());

// connect database
connectDB();

// basic routes
app.get('/', (req, res) => res.send('SkillForge API Server is Running'));
app.get('/api', (req, res) => res.json({ 
  message: 'Welcome to SkillForge API', 
  endpoints: {
    health: '/api/health',
    auth: '/api/auth',
    projects: '/api/projects'
  }
}));
app.get('/api/health', (req, res) => res.json({ status: 'SkillForge API is Live', version: '1.0.0' }));

// routers
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const adminRoutes = require('./routes/adminRoutes');
const walletRoutes = require('./routes/walletRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
