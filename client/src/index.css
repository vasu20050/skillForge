import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Bell, Compass, 
  BookOpen, Users, Trophy, Settings, LogOut,
  LayoutDashboard, Wallet, ShieldAlert, TrendingUp, Sun, Moon, Globe, Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, theme, toggleTheme, language, setLanguage } = useAppContext();

  const navLinks = [
    { name: t('dashboard'), path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: t('learn'), path: '/learn', icon: <BookOpen className="w-4 h-4" /> },
    { name: t('marketplace'), path: '/marketplace', icon: <TrendingUp className="w-4 h-4" /> },
    { name: t('wallet'), path: '/wallet', icon: <Wallet className="w-4 h-4" /> },
  ];

  if (user?.roles?.includes('admin')) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: <ShieldAlert className="w-4 h-4" /> });
  }

  return (
    <header className="sticky top-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto bg-[#0f1219]/80 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-[2rem] px-8 py-4 flex justify-between items-center transition-all duration-500">
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center space-x-2 mr-4 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase font-heading">
              Skill<span className="text-emerald-500 italic">Forge</span>
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-2">
            {user && navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                  location.pathname === link.path 
                    ? 'text-emerald-400 bg-emerald-500/5 shadow-sm' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`${location.pathname === link.path ? 'text-emerald-400' : 'text-slate-600 group-hover:text-emerald-400'} transition-colors`}>
                  {link.icon}
                </span>
                <span>{link.name}</span>
                {location.pathname === link.path && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-500 rounded-full blur-[2px]"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Controls */}
          <div className="hidden md:flex items-center bg-black/40 rounded-2xl p-1 border border-white/5">
            <button 
              onClick={toggleTheme}
              className="p-3 text-slate-500 hover:text-emerald-400 transition-colors"
              title="Switch Protocol"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="w-px h-5 bg-white/5 mx-1"></div>
            <div className="relative group px-4">
              <Globe className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-600 w-3.5 h-3.5" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-[9px] font-black uppercase tracking-widest text-slate-500 outline-none cursor-pointer pl-2 appearance-none"
              >
                <option value="en" className="bg-[#0f1219]">EN</option>
                <option value="hi" className="bg-[#0f1219]">HI</option>
                <option value="es" className="bg-[#0f1219]">ES</option>
              </select>
            </div>
          </div>

          {!user ? (
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-emerald-400 transition-colors">{t('login')}</Link>
              <Link to="/register" className="bg-emerald-500 text-black px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">
                {t('joinNow')}
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-black text-white uppercase tracking-tight">{user.name}</span>
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-0.5 italic">
                      {user.mode_status === 'learner' ? 'Protocol: Apprentice' : 'Protocol: Verified'}
                  </span>
              </div>
              <Link to="/profile" className="relative group p-1 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <img 
                    src={user.profile?.photoUrl || `https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff&bold=true`} 
                    className="w-10 h-10 rounded-xl group-hover:scale-105 transition-all object-cover shadow-2xl bg-black" 
                    alt="User" 
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f1219] animate-pulse"></div>
              </Link>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 text-slate-400 hover:bg-white/5 rounded-xl transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && user && (
        <div className="absolute top-28 left-6 right-6 bg-[#0f1219] border border-white/5 rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 lg:hidden text-center z-[101]">
            <div className="mb-10 text-center">
               <div className="w-20 h-20 mx-auto rounded-[2rem] p-1 bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <img src={user.profile?.photoUrl || `https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff&bold=true`} className="w-full h-full object-cover rounded-[1.5rem]" alt="User" />
               </div>
               <h4 className="text-white font-black uppercase tracking-tight">{user.name}</h4>
               <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mt-1 italic">Verified Legend</p>
            </div>

            <nav className="flex flex-col space-y-4">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-4 p-5 rounded-3xl bg-white/5 hover:bg-emerald-500 hover:text-black text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                      {link.icon}
                      <span>{link.name}</span>
                  </Link>
                ))}
                <div className="h-px bg-white/5 my-4"></div>
                <button onClick={logout} className="flex items-center justify-center space-x-4 p-5 rounded-3xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all w-full">
                  <LogOut className="w-5 h-5" />
                  <span>Terminate Session</span>
               </button>
            </nav>
        </div>
      )}
    </header>
  );
}

