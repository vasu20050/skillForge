import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, Search, Filter, Zap, Clock, Bookmark, X, Briefcase } from 'lucide-react';
export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBounty, setSelectedBounty] = useState(null);

  const categories = ['All', 'Frontend', 'Backend', 'Design', 'Writing'];

  const bounties = [
    { id: 1, title: 'Build a React Dashboard', category: 'Frontend', reward: '500 CR', deadline: '3 Days', color: 'bg-emerald-500', description: 'Create a responsive analytics dashboard using React, Tailwind CSS, and Recharts. Must be perfectly pixel-aligned with our Figma designs.' },
    { id: 2, title: 'Node.js Auth API', category: 'Backend', reward: '750 CR', deadline: '5 Days', color: 'bg-emerald-500', description: 'Implement a secure JWT authentication system with password reset and email verification functionalities.' },
    { id: 3, title: 'Design Landing Page', category: 'Design', reward: '300 CR', deadline: '2 Days', color: 'bg-emerald-500', description: 'Design a high-converting, modern, dark-themed landing page for a new Web3 SaaS product in Figma.' },
    { id: 4, title: 'Technical Documentation', category: 'Writing', reward: '200 CR', deadline: '1 Week', color: 'bg-emerald-500', description: 'Write comprehensive API documentation for our new RESTful service using Swagger or Markdown.' },
  ];

  const user = localStorage.getItem('user') || 'true'; // Temporarily mocking user login for preview

  const filteredBounties = bounties.filter(bounty => 
    (selectedCategory === 'All' || bounty.category === selectedCategory) &&
    bounty.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-1000 relative">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            <Sparkles className="w-3 h-3" />
            <span>Marketplace</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-none uppercase font-heading">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Bounties</span>.
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Find your next gig. Build your portfolio, earn CR, and level up your skills in the campus economy.
          </p>
        </div>
        <div className="w-64 h-64 bg-[#0f1219] border border-white/5 rounded-[3rem] p-8 relative overflow-hidden group shadow-2xl">
           <Compass className="w-full h-full text-emerald-500/10 group-hover:rotate-45 transition-transform duration-1000" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-white text-center">
               <div className="text-4xl font-black mb-1 text-emerald-400">142</div>
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Gigs</div>
             </div>
           </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search bounties..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0f1219] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedCategory === category 
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                  : 'bg-[#0f1219] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Bounties Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-white flex items-center uppercase tracking-widest">
          <Briefcase className="w-5 h-5 mr-3 text-emerald-500" />
          Available Bounties
        </h2>
        
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBounties.map((bounty) => (
              <div 
                key={bounty.id} 
                onClick={() => setSelectedBounty(bounty)}
                className="bg-[#0f1219] p-6 rounded-[2rem] border border-white/10 hover:border-emerald-500/50 transition-all group overflow-hidden relative cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${bounty.color} opacity-[0.02] rounded-bl-[4rem]`}></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-emerald-400 rounded-lg border border-white/5">
                    {bounty.category}
                  </span>
                  <button className="text-slate-500 hover:text-emerald-400 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-black text-white mb-4 group-hover:text-emerald-400 transition-colors leading-snug">
                  {bounty.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mt-6">
                  <div className="flex items-center text-amber-400">
                    <Zap className="w-3 h-3 mr-1" />
                    {bounty.reward}
                  </div>
                  <div className="flex items-center text-slate-400">
                     <Clock className="w-3 h-3 mr-1" /> {bounty.deadline}
                  </div>
                </div>
              </div>
            ))}
            {filteredBounties.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 text-sm font-medium">
                No bounties found matching your criteria.
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#0f1219] p-12 text-center rounded-[2rem] border border-white/10">
            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Projects are Protected</h3>
            <p className="text-slate-500 mb-6 text-sm">Log in to explore and apply for real-time campus opportunities.</p>
            <Link to="/login" className="px-8 py-3 bg-emerald-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 inline-block hover:scale-105 transition-transform">
              Authenticate to Explore
            </Link>
          </div>
        )}
      </div>

      {/* Bounty Detail Modal */}
      {selectedBounty && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <div className="bg-[#0f1219] w-full max-w-lg border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                {selectedBounty.category}
              </span>
              <button 
                onClick={() => setSelectedBounty(null)} 
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto">
              <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
                {selectedBounty.title}
              </h2>
              
              <div className="flex gap-4">
                <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Reward</div>
                  <div className="text-lg font-black text-amber-400">{selectedBounty.reward}</div>
                </div>
                <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Deadline</div>
                  <div className="text-lg font-black text-white">{selectedBounty.deadline}</div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Project Details</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedBounty.description}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedBounty(null)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert('Application submitted! (Demo)');
                  setSelectedBounty(null);
                }}
                className="px-8 py-3 bg-emerald-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}\
