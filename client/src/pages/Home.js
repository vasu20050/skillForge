import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-1000">
      <div className="max-w-4xl text-center">
        <div className="mb-12 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="/logo.png" 
              alt="SkillForge Logo" 
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        </div>
        <div className="inline-flex items-center space-x-2 bg-white/40 px-4 py-2 rounded-full border border-slate-200 mb-8 pointer-events-none shadow-sm">
           <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">A Campus-First Marketplace</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
          Ignite Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Skill.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          The closed-campus peer-to-peer exchange for verified students. Build your reputation, earn credits, and find top talent in your community.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12 px-4">
          <Link 
            to="/register" 
            className="premium-btn text-white font-bold py-5 px-12 rounded-3xl shadow-2xl shadow-indigo-600/30 text-lg transition-transform hover:scale-105 active:scale-95"
          >
            Start Foraging
          </Link>
          <Link 
            to="/login" 
            className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-5 px-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-lg hover:scale-105 active:scale-95"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { n: '100', l: 'Initial Credits', i: '🟡' },
             { n: '20+', l: 'Skills Verified', i: '✅' },
             { n: 'Campus', l: 'Exclusively', i: '🎓' },
             { n: 'Secure', l: 'Escrow Logic', i: '🔒' }
           ].map((stat, idx) => (
             <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-200/50 hover:border-indigo-200 transition-colors group text-center">
               <div className="text-2xl mb-2">{stat.i}</div>
               <div className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{stat.n}</div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.l}</div>
             </div>
           ))}
        </div>

        <div className="mt-32 w-full text-left">
           <h2 className="text-3xl font-bold text-slate-900 mb-8 border-l-4 border-indigo-600 pl-6">Everything you need to <span className="text-indigo-600">Grow.</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Skills Catalog', desc: 'Browse hundreds of verified skill modules and start learning.', path: '/skills', color: 'indigo' },
                { title: 'Mentor Network', desc: 'Connect with senior students and alumni for guidance.', path: '/mentors', color: 'rose' },
                { title: 'Live Community', desc: 'Share your progress and collaborate on campus projects.', path: '/community', color: 'emerald' },
              ].map((feature, i) => (
                <Link key={i} to={feature.path} className="group relative">
                  <div className="glass-card p-8 rounded-[2rem] border border-white h-full transition-all group-hover:translate-y-[-8px] group-hover:shadow-2xl">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{feature.desc}</p>
                    <div className="flex items-center text-xs font-black uppercase tracking-widest text-indigo-600">
                       Explore {feature.title.split(' ')[0]}
                       <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
