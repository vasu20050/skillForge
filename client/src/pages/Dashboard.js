import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, BookOpen, Trophy, Clock, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (!storedUser || !storedToken) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return <div className="p-8 text-center text-slate-500 font-medium animate-pulse">✨ Preparing your workspace...</div>;

  const activeLessons = [
    { title: 'React.js Architecture', category: 'Web Dev', progress: 65, icon: <BookOpen className="w-4 h-4" /> },
    { title: 'Figma Auto-Layout', category: 'UI/UX', progress: 30, icon: <Play className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
            <Trophy className="w-3 h-3" />
            <span>Top 10% on Campus</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
            Welcome back, <br /><span className="text-indigo-600">{user.name.split(' ')[0]}!</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
            You have 3 active projects and 2 courses in progress. Keep the momentum going!
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm min-w-[140px] flex flex-col items-center">
             <span className="text-2xl font-black text-slate-900 leading-none mb-2">🟡 {user.credits}</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Premium Credits</span>
          </div>
          <div className="bg-indigo-600 p-4 rounded-3xl text-white shadow-xl shadow-indigo-600/20 min-w-[140px] flex flex-col items-center">
             <span className="text-2xl font-black leading-none mb-2">Level 12</span>
             <span className="text-[10px] font-bold text-indigo-100/60 uppercase tracking-widest text-center">Skill Ranking</span>
          </div>
        </div>
      </div>

      {/* Continue Learning - NEW FEATURE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold text-slate-800 flex items-center">
             <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
             Continue Learning
           </h2>
           <Link to="/skills" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center group">
             View Catalog
             <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeLessons.map((lesson, i) => (
            <div key={i} className="glass-card p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 group hover:border-indigo-100 transition-all border border-transparent">
               <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-indigo-500/5">
                 {lesson.icon}
               </div>
               <div className="flex-1 space-y-2 w-full">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-400">{lesson.category}</span>
                    <span className="text-indigo-600">{lesson.progress}% done</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{lesson.title}</h4>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-1000 rounded-full shadow-lg shadow-indigo-600/40" 
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
               </div>
               <Link to="/skills" className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                 <Play className="w-5 h-5 fill-current" />
               </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="glass-card p-10 rounded-[3rem] group transition-all hover:scale-[1.01] hover:shadow-2xl border border-transparent hover:border-indigo-100/50">
          <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-indigo-500/10">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-snug">Hire Talent</h3>
          <p className="text-slate-500 mb-10 leading-relaxed font-medium">Need something professionally done? Post a project and hire verified campus peers instantly.</p>
          <Link 
            to="/projects/new" 
            className="premium-btn text-white w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center justify-center shadow-2xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-shadow transition-all"
          >
            Post New Project
          </Link>
        </div>

        <div className="bg-slate-950 p-10 rounded-[3rem] group transition-all hover:scale-[1.01] hover:shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-400 mb-8 font-black text-2xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-lg shadow-emerald-500/10">
               $
            </div>
            <h3 className="text-2xl font-black text-white mb-3 tracking-snug">Earn Credits</h3>
            <p className="text-slate-400 mb-10 leading-relaxed font-medium">Put your unique skills to work. Browse hundreds of student-posted tasks and get paid today.</p>
            <Link 
              to="/projects" 
              className="bg-emerald-500 text-black w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-2xl shadow-emerald-500/20"
            >
              Browse Projects
            </Link>
          </div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="glass-card p-10 rounded-[3rem] border border-transparent hover:border-slate-200 transition-colors">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-2xl font-bold text-slate-800 flex items-center">
             <Clock className="w-6 h-6 mr-3 text-slate-400" />
             Recent Activity
           </h3>
           <button className="text-sm font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">History</button>
        </div>
        <div className="space-y-4">
           <div className="flex items-center space-x-4 p-5 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-slate-400 font-bold italic justify-center text-sm py-10">
             <CheckCircle2 className="w-5 h-5 mr-2 opacity-50" />
             No recent activity detected. Welcome to your fresh start!
           </div>
        </div>
      </div>
    </div>
  );
}
