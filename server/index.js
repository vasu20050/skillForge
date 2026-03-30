require('dotenv').config(); // Server startup: 2026
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors());
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
