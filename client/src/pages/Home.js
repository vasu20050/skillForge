import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 page-transition">
      <div className="max-w-5xl text-center">
        <div className="mb-14 flex justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-300"></div>
            <img 
              src="/logo.png" 
              alt="SkillForge Logo" 
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-[3rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-1 animate-float" 
            />
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100 mb-8 shadow-sm">
           <ShieldCheck className="w-4 h-4 text-indigo-600" />
           <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none">The Trusted Campus Economy</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85] uppercase">
          Build. <span className="text-gradient">Prove.</span> Earn.
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
          The first closed-campus skill marketplace where your portfolio is your currency. Transform from a student to a verified earner.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12 px-4 mb-32">
          <Link 
            to="/register" 
            className="premium-btn text-white font-black py-6 px-14 rounded-[2rem] shadow-2xl shadow-indigo-600/30 text-sm uppercase tracking-widest transition-transform hover:scale-105 active:scale-95"
          >
            Join SkillForge
          </Link>
          <Link 
            to="/login" 
            className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-black py-6 px-14 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all text-sm uppercase tracking-widest hover:scale-105 active:scale-95"
          >
            Sign In
          </Link>
        </div>

        {/* The Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
           {[
             { title: 'LEARN', desc: 'Complete admin-seeded dummy projects to build your baseline technical reputation.', icon: <BookOpen className="w-8 h-8" />, color: 'indigo' },
             { title: 'PROVE', desc: 'Achieve 3.8+ rating and 3 project completions to unlock the verified Earner mode.', icon: <Target className="w-8 h-8" />, color: 'amber' },
             { title: 'EARN', desc: 'Secure high-impact real projects from campus clubs and startups for real credits.', icon: <TrendingUp className="w-8 h-8" />, color: 'emerald' }
           ].map((step, i) => (
             <div key={i} className="glass-card p-10 rounded-[3rem] border-slate-100 group hover:border-indigo-600 transition-all flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-${step.color}-50 text-${step.color}-600 group-hover:bg-indigo-600 group-hover:text-white transition-all`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>

        <div className="mt-40 p-20 glass-card rounded-[4rem] bg-slate-950 text-white relative overflow-hidden text-center group">
            <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                <h2 className="text-5xl font-black tracking-tight leading-tight">Ready to fund a <span className="text-emerald-400">Project?</span></h2>
                <p className="text-slate-400 text-lg font-medium">Post a real task and hire your verified campus peers using your credit wallet.</p>
                <Link to="/register" className="inline-flex items-center px-12 py-6 bg-emerald-500 text-black rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                    Get Started <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-colors"></div>
        </div>
      </div>
    </div>
  );
}
