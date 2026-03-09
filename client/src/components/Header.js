import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Bell, MessageSquare, Compass, 
  BookOpen, Users, Trophy, Settings, LogOut,
  LayoutDashboard, FolderKanban, Info, Mail
} from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  }

  const navLinks = [
    { name: 'Explore', path: '/explore', icon: <Compass className="w-4 h-4" /> },
    { name: 'Skills', path: '/skills', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <FolderKanban className="w-4 h-4" /> },
    { name: 'Mentors', path: '/mentors', icon: <Users className="w-4 h-4" /> },
  ];

  const secondaryLinks = [
    { name: 'Community', path: '/community', icon: <Users className="w-4 h-4" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="w-4 h-4" /> },
  ];

  const footerLinks = [
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto glass-card rounded-2xl px-6 py-3 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 mr-4">
            <div className="w-8 h-8 rounded-lg premium-btn flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">SkillForge</span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  location.pathname === link.path 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
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
              <Link to="/login" className="nav-link text-slate-600 text-sm font-bold hover:text-indigo-600">Login</Link>
              <Link to="/register" className="premium-btn text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-100">
                Join Now
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-2 mr-2">
                <Link to="/notifications" className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all relative">
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </Link>
                <Link to="/messages" className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all">
                   <MessageSquare className="w-5 h-5" />
                </Link>
              </div>

              <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex flex-col items-end mr-2">
                   <span className="text-xs font-black text-slate-800 leading-none">{user.name || 'User'}</span>
                   <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Level 12</span>
                </div>
                <Link to="/dashboard" className="relative group">
                   <img 
                    src={`https://i.pravatar.cc/150?u=${user.id || 'me'}`} 
                    className="w-10 h-10 rounded-xl ring-2 ring-indigo-100 group-hover:ring-indigo-500 transition-all object-cover" 
                    alt="User" 
                   />
                </Link>
                
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile & Extended Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 glass-card rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 lg:hidden">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Main Menu</h3>
                <nav className="flex flex-col space-y-1">
                   {[...navLinks, ...secondaryLinks].map(link => (
                     <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold text-sm">
                        <span className="text-indigo-500">{link.icon}</span>
                        <span>{link.name}</span>
                     </Link>
                   ))}
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Account</h3>
                <nav className="flex flex-col space-y-1">
                   <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold text-sm">
                      <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                      <span>Dashboard</span>
                   </Link>
                   <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold text-sm">
                      <Settings className="w-4 h-4 text-indigo-500" />
                      <span>Settings</span>
                   </Link>
                   <button onClick={logout} className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-rose-50 text-rose-600 font-bold text-sm w-full text-left">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                   </button>
                </nav>
              </div>
           </div>
           <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center px-2">
             <div className="flex space-x-4">
               {footerLinks.map(link => (
                 <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold text-slate-400 hover:text-indigo-600">
                   {link.name}
                 </Link>
               ))}
             </div>
             <p className="text-[10px] font-bold text-slate-300">© 2024 SkillForge</p>
           </div>
        </div>
      )}
      
      {/* Desktop Quick Navigation Sub-bar */}
      <div className="max-w-7xl mx-auto px-10 mt-2 hidden lg:flex items-center justify-between">
         <div className="flex space-x-8">
            {secondaryLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors flex items-center space-x-2"
              >
                {link.name}
              </Link>
            ))}
         </div>
         <div className="flex space-x-6">
            {footerLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">
                {link.name}
              </Link>
            ))}
         </div>
      </div>
    </header>
  );
}
