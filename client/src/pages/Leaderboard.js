import React, { useState } from 'react';
import { Trophy, Medal, Flame, TrendingUp, Search, Calendar, Filter } from 'lucide-react';

const RANKINGS = [
  { id: 1, name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=1', points: 12450, streak: 45, level: 24, trend: 'up', category: 'Frontend' },
  { id: 2, name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=2', points: 11200, streak: 32, level: 22, trend: 'neutral', category: 'Backend' },
  { id: 3, name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?u=3', points: 10850, streak: 12, level: 21, trend: 'down', category: 'Design' },
  { id: 4, name: 'Marcus Wong', avatar: 'https://i.pravatar.cc/150?u=4', points: 9400, streak: 8, level: 19, trend: 'up', category: 'Writing' },
  { id: 5, name: 'Leila Smith', avatar: 'https://i.pravatar.cc/150?u=5', points: 8900, streak: 21, level: 18, trend: 'up', category: 'Frontend' },
];

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredRankings = RANKINGS.filter(rank => 
    categoryFilter === 'All' || rank.category === categoryFilter
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Hero Section */}
      <div className="relative text-center rounded-[3.5rem] p-16 overflow-hidden bg-[#0f1219] border border-white/5 shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-10 w-64 h-64 bg-emerald-400 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 mb-2">
            <Trophy className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white uppercase font-heading">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Legends</span>.
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            The hall of fame for the top contributors, fastest learners, and high earners in the campus economy.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
        <div className="flex bg-[#0f1219] p-1 rounded-2xl border border-white/5">
          {['Weekly', 'Monthly', 'All-Time'].map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                timeFilter === filter 
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Find legends..." 
              className="w-full bg-[#0f1219] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 bg-[#0f1219] border border-white/10 rounded-2xl px-4 py-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none cursor-pointer"
            >
              {['All', 'Frontend', 'Backend', 'Design', 'Writing'].map(cat => (
                <option key={cat} value={cat} className="bg-[#0f1219]">{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {filteredRankings.slice(0, 3).map((rank, index) => {
          // Reorder for podium feel: 2, 1, 3
          const order = index === 0 ? 'order-1 md:order-2' : index === 1 ? 'order-2 md:order-1' : 'order-3';
          const isWinner = index === 0;

          return (
            <div 
              key={rank.id} 
              className={`${order} bg-[#0f1219] p-8 rounded-[3rem] text-center relative border border-white/10 hover:border-emerald-500/30 transition-all group ${
                isWinner ? 'pb-16 border-emerald-500/50 shadow-2xl shadow-emerald-500/10' : 'pb-10 opacity-80 hover:opacity-100'
              }`}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-black shadow-2xl ${
                index === 0 ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-amber-900' : 
                index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900' : 
                'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-950'
              }`}>
                {index + 1}
              </div>
              
              <div className="relative inline-block mb-6">
                <img 
                  src={rank.avatar} 
                  className={`rounded-[2.5rem] mx-auto border-4 ${isWinner ? 'w-28 h-28 border-emerald-500/50' : 'w-20 h-20 border-white/5'}`} 
                  alt={rank.name} 
                />
                {isWinner && (
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-2 rounded-xl shadow-xl">
                    <Medal className="w-5 h-5" />
                  </div>
                )}
              </div>

              <h3 className={`font-black text-white mb-2 uppercase tracking-tight ${isWinner ? 'text-2xl' : 'text-lg'}`}>
                {rank.name}
              </h3>
              
              <div className="flex items-center justify-center space-x-3 mb-6">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded-lg">
                   LVL {rank.level}
                 </span>
                 <span className="flex items-center text-rose-500 text-[10px] font-black uppercase tracking-widest">
                   <Flame className="w-3 h-3 mr-1" />
                   {rank.streak} DAYS
                 </span>
              </div>
              
              <div className={`font-black tabular-nums ${isWinner ? 'text-4xl text-emerald-400' : 'text-2xl text-slate-300'}`}>
                {rank.points.toLocaleString()}
                <span className="text-[10px] uppercase ml-2 text-slate-500">Pts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Standings Table */}
      <div className="bg-[#0f1219] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-black/20">
          <h2 className="text-xl font-black text-white uppercase tracking-widest">Global Standings</h2>
        </div>
        <div className="divide-y divide-white/5">
          {filteredRankings.map((rank, index) => (
            <div 
              key={rank.id} 
              className="p-6 px-10 flex items-center justify-between hover:bg-white/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center space-x-8">
                <span className="w-6 text-sm font-black text-slate-600 italic group-hover:text-emerald-500 transition-colors">
                  #{index + 1}
                </span>
                <div className="relative">
                  <img src={rank.avatar} className="w-12 h-12 rounded-2xl border border-white/10" alt={rank.name} />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0f1219] ${rank.trend === 'up' ? 'bg-emerald-500' : rank.trend === 'down' ? 'bg-rose-500' : 'bg-slate-500'}`}></div>
                </div>
                <div>
                  <h4 className="font-black text-white text-base uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                    {rank.name}
                  </h4>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">
                    {rank.category} Specialist
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-16">
                <div className="hidden sm:block text-right">
                  <span className="block text-sm font-black text-white">{rank.streak}</span>
                  <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Streak</span>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <span className="block text-lg font-black text-emerald-400 tabular-nums">
                      {rank.points.toLocaleString()}
                    </span>
                    <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Total CR</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border transition-all ${
                    rank.trend === 'up' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                    rank.trend === 'down' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 
                    'bg-white/5 border-white/10 text-slate-500'
                  }`}>
                    <TrendingUp className={`w-5 h-5 ${rank.trend === 'down' ? 'rotate-180' : ''}`} />
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

