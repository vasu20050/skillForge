import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import NewProject from './pages/NewProject';
import Skills from './pages/Skills';
import Mentors from './pages/Mentors';
import Community from './pages/Community';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Leaderboard from './pages/Leaderboard';
import Messages from './pages/Messages';
import About from './pages/About';
import Contact from './pages/Contact';
import Explore from './pages/Explore';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/community" element={<Community />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
