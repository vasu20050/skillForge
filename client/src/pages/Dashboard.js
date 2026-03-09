import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return <div className="p-8 text-center text-slate-500 font-medium">✨ Preparing your workspace...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bonjour, {user.name.split(' ')[0]} 👋</h1>
          <p className="mt-2 text-lg text-slate-500 font-medium">Ready to showcase your skills or hire top campus talent?</p>
        </div>
        <div className="flex items-center space-x-3 bg-white/60 p-2 rounded-2xl border border-slate-200 shadow-sm px-4">
           <div className="bg-amber-100 p-2 rounded-xl text-amber-700">
             <span className="font-bold">🟡 {user.credits}</span>
           </div>
           <span className="text-sm font-semibold text-slate-600">Premium Credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl group transition-all hover:scale-[1.01] hover:shadow-xl">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-snug">Hire Talent</h3>
          <p className="text-slate-500 mb-8 leading-relaxed font-medium">Need something professionally done? Post a task and hire verified campus peers instantly.</p>
          <Link 
            to="/projects/new" 
            className="premium-btn text-white w-full py-4 rounded-2xl font-bold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-indigo-500/40 transition-shadow"
          >
            Post New Project
          </Link>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl group transition-all hover:scale-[1.01] hover:shadow-xl">
          <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 font-bold text-xl group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
             $
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-snug">Earn Credits</h3>
          <p className="text-slate-400 mb-8 leading-relaxed font-medium">Put your unique skills to work. Browse hundreds of student-posted tasks and get paid.</p>
          <Link 
            to="/projects" 
            className="bg-emerald-500 text-black w-full py-4 rounded-2xl font-bold text-lg inline-flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-lg hover:shadow-emerald-500/40"
          >
            Browse Projects
          </Link>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-bold text-slate-800">Your Activity</h3>
           <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800">View History</button>
        </div>
        <div className="space-y-4">
           {/* Placeholder for real data */}
           <div className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-slate-100 text-slate-400 font-medium italic">
             No recent activity. Start by browsing or posting a project!
           </div>
        </div>
      </div>
    </div>
  );
}
