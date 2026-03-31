require('dotenv').config(); // Server startup: 2026
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// Security Middleware
app.use(helmet());
app.use(morgan('dev'));

// CORS Configuration — supports localhost + deployed Vercel URL
const allowedOrigins = [
  'http://localhost:3000',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(o => o.trim()) : [])
];

const corsOptions = {
  origin: true, // Echo origin back to bypass blocks completely
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
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
