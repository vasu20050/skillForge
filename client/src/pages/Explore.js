import React from 'react';
import { Sparkles, Compass, TrendingUp, Zap, Clock, Bookmark } from 'lucide-react';

export default function Explore() {
  const trending = [
    { title: 'Generative AI for Designers', type: 'Course', users: '1.2k', rating: '4.9', color: 'bg-indigo-600' },
    { title: 'DeFi Dashboard Architecture', type: 'Project', users: '840', rating: '4.8', color: 'bg-emerald-600' },
    { title: 'System Design Interview Prep', type: 'Event', users: '2.5k', rating: '5.0', color: 'bg-rose-600' }
  ];

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>Discover New Horizons</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Explore the <br /><span className="text-indigo-600">Frontier</span> of Craft.</h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">Find your next obsession among thousands of curated projects and skill paths tailored for the modern workforce.</p>
        </div>
        <div className="w-64 h-64 bg-slate-900 rounded-[3rem] p-8 relative overflow-hidden group">
           <Compass className="w-full h-full text-indigo-500/20 group-hover:rotate-45 transition-transform duration-1000" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-white text-center">
               <div className="text-3xl font-black mb-1">942+</div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Added Today</div>
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-3 text-rose-500" />
          Hot This Week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trending.map((item, i) => (
            <div key={i} className="glass-card p-6 rounded-[2rem] border-2 border-transparent hover:border-indigo-100 transition-all group overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-[0.03] rounded-bl-[4rem]`}></div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 text-slate-500 rounded-md border border-slate-100`}>
                  {item.type}
                </span>
                <button className="text-slate-300 hover:text-rose-500 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">{item.title}</h3>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <div className="flex items-center">
                  <Zap className="w-3 h-3 mr-1 text-amber-500" />
                  {item.users} active
                </div>
                <div className="flex items-center">
                   ⭐ {item.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-6 overflow-hidden relative">
           <div className="relative z-10 space-y-4">
             <h3 className="text-2xl font-bold">Curated for You</h3>
             <p className="text-slate-400 text-sm leading-relaxed">Based on your interests in React, UI Design, and Product Management.</p>
             <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-indigo-500/20 transition-all">
                View Your Mix
             </button>
           </div>
           <Clock className="absolute bottom-0 right-0 -mr-12 -mb-12 w-48 h-48 text-white/5" />
        </div>
        <div className="glass-card p-10 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 space-y-6 overflow-hidden relative">
           <div className="relative z-10 space-y-4">
             <h3 className="text-2xl font-bold text-slate-900">Weekly Challenge</h3>
             <p className="text-indigo-700/60 text-sm leading-relaxed">Build a Dark Mode toggle using Framer Motion and win 50 credits.</p>
             <button className="premium-btn text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200">
                Accept Challenge
             </button>
           </div>
           <Sparkles className="absolute bottom-0 right-0 -mr-8 -mb-8 w-40 h-40 text-indigo-200/50" />
        </div>
      </div>
    </div>
  );
}
