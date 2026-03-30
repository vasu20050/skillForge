import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NewProject from './pages/NewProject';
import About from './pages/About';
import Contact from './pages/Contact';
import Explore from './pages/Explore';
import LearnMode from './pages/LearnMode';
import Marketplace from './pages/Marketplace';
import ProjectDetails from './pages/ProjectDetails';
import WalletPage from './pages/WalletPage';
import AdminPanel from './pages/AdminPanel';
import SaharaBot from './components/SaharaBot';
import { AuthProvider, useAuth } from './hooks/useAuth';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading SkillForge...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/explore" element={<Explore />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/learn" element={<PrivateRoute><LearnMode /></PrivateRoute>} />
            <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
            <Route path="/projects/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
            <Route path="/projects/new" element={<PrivateRoute><NewProject /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/wallet" element={<PrivateRoute><WalletPage /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="glass-card rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" className="w-8 h-8 rounded-lg grayscale opacity-50" alt="Logo" />
              <span className="text-sm font-black text-slate-300 uppercase tracking-widest">SkillForge</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Guidelines</a>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2024 Built for the Campus Economy</p>
          </div>
        </footer>
        <SaharaBot />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
