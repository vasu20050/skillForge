import React from 'react';
import { Trophy, Medal, Flame, TrendingUp, Search } from 'lucide-react';

const RANKINGS = [
  { id: 1, name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=1', points: 12450, streak: 45, level: 24, trend: 'up' },
  { id: 2, name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=2', points: 11200, streak: 32, level: 22, trend: 'neutral' },
  { id: 3, name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?u=3', points: 10850, streak: 12, level: 21, trend: 'down' },
  { id: 4, name: 'Marcus Wong', avatar: 'https://i.pravatar.cc/150?u=4', points: 9400, streak: 8, level: 19, trend: 'up' },
  { id: 5, name: 'Leila Smith', avatar: 'https://i.pravatar.cc/150?u=5', points: 8900, streak: 21, level: 18, trend: 'up' },
];

export default function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="relative text-center rounded-[3rem] p-12 overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-2xl mb-6">
            <Trophy className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Rankings & Awards</h1>
          <p className="text-slate-400 max-w-lg mx-auto text-lg font-medium">Top contributors and fastest learners in the SkillForge community this month.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RANKINGS.slice(0, 3).map((rank, index) => (
          <div key={rank.id} className={`glass-card p-8 rounded-[2.5rem] text-center relative border-2 ${index === 0 ? 'border-amber-400 ring-4 ring-amber-400/10 scale-105 z-10' : 'border-transparent'}`}>
            <div className={`absolute top-0 right-8 -translate-y-1/2 w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${
              index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-300' : 'bg-orange-400'
            }`}>
              {index + 1}
            </div>
            <img src={rank.avatar} className="w-20 h-20 rounded-3xl mx-auto mb-4 border-4 border-white shadow-xl" alt={rank.name} />
            <h3 className="font-bold text-slate-900 mb-1">{rank.name}</h3>
            <div className="flex items-center justify-center space-x-2 mb-4">
               <span className="text-xs font-black uppercase tracking-widest text-slate-400">Level {rank.level}</span>
               <span className="h-1 w-1 rounded-full bg-slate-300"></span>
               <span className="flex items-center text-rose-500 text-xs font-bold">
                 <Flame className="w-3 h-3 mr-0.5" />
                 {rank.streak} Day Streak
               </span>
            </div>
            <div className="text-2xl font-black text-indigo-600 tabular-nums">
              {rank.points.toLocaleString()}
              <span className="text-[10px] uppercase ml-1 opacity-60">pts</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Global Standings</h2>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input type="text" placeholder="Find yourself..." className="bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {RANKINGS.map((rank, index) => (
            <div key={rank.id} className="p-4 px-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center space-x-6">
                <span className="w-4 text-sm font-black text-slate-400 italic">#{index + 1}</span>
                <img src={rank.avatar} className="w-10 h-10 rounded-xl" alt={rank.name} />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{rank.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Master Craftsman</p>
                </div>
              </div>
              <div className="flex items-center space-x-12">
                <div className="hidden sm:block text-right">
                  <span className="block text-xs font-bold text-slate-800">{rank.streak}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black">Streak</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="block font-black text-indigo-600 tabular-nums">{rank.points.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-black">Total Score</span>
                  </div>
                  <div className={`p-1.5 rounded-lg ${rank.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : rank.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                    <TrendingUp className={`w-4 h-4 ${rank.trend === 'down' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
