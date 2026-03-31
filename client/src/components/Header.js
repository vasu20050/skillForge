import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Bell, Compass, 
  BookOpen, Users, Trophy, Settings, LogOut,
  LayoutDashboard, Wallet, ShieldAlert, TrendingUp
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Marketplace', path: '/marketplace', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Wallet', path: '/wallet', icon: <Wallet className="w-4 h-4" /> },
  ];

  // Defensive check for roles
  if (user?.roles?.includes('admin')) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: <ShieldAlert className="w-4 h-4" /> });
  }

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto bg-white border border-slate-100 shadow-sm rounded-2xl px-6 py-3 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 mr-4 group">
            <span className="text-xl font-black tracking-tight text-slate-900 uppercase">SkillForge</span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1">
            {user && navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  location.pathname === link.path 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          {!user ? (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-slate-600 text-xs font-bold uppercase tracking-widest hover:text-indigo-600">Login</Link>
              <Link to="/register" className="btn-primary px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                Join Now
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden sm:flex flex-col items-end mr-4">
                  <span className="text-xs font-black text-slate-800 leading-none">{user.name}</span>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                      {user.mode_status === 'learner' ? 'Learner' : 'Verified'}
                  </span>
              </div>
              <Link to="/profile" className="relative group">
                  <img 
                    src={user.profile?.photoUrl || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} 
                    className="w-10 h-10 rounded-xl ring-2 ring-indigo-50 group-hover:ring-indigo-500 transition-all object-cover shadow-sm bg-slate-100" 
                    alt="User" 
                  />
              </Link>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && user && (
        <div className="absolute top-24 left-4 right-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 lg:hidden text-center">
            <nav className="flex flex-col space-y-4">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-3 p-4 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-widest">
                      <span className="text-indigo-600">{link.icon}</span>
                      <span>{link.name}</span>
                  </Link>
                ))}
                <div className="h-px bg-slate-100 my-2"></div>
                <button onClick={logout} className="flex items-center justify-center space-x-3 p-4 rounded-2xl hover:bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-widest w-full">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
               </button>
            </nav>
        </div>
      )}
    </header>
  );
}
