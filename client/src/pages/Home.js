import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, TrendingUp, ShieldCheck, ChevronRight, Zap, Sparkles, Globe, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-1000">
      <div className="max-w-6xl text-center px-6">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-3 bg-emerald-500/5 px-6 py-3 rounded-2xl border border-emerald-500/20 mb-12 shadow-2xl">
           <ShieldCheck className="w-5 h-5 text-emerald-500" />
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] leading-none">Protocol v2.4: Secured Campus Ledger</span>
        </div>
        
        {/* Hero Title */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
          <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter mb-6 leading-[0.85] uppercase font-heading">
            Forge. <span className="text-emerald-500 italic">Prove.</span> Earn.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed mt-10">
            The decentralized skill marketplace where <span className="text-white font-bold italic">proof of work</span> is your primary currency. 
            Transform technical ability into verified campus credits.
          </p>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-16 px-4 mb-40">
          <Link 
            to="/register" 
            className="btn-primary"
          >
            Initiate Sequence
          </Link>
          <Link 
            to="/login" 
            className="btn-secondary"
          >
            Access Vault
          </Link>
        </div>

        {/* The Pipeline Section */}
        <div className="space-y-16 mb-40">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-black text-white uppercase tracking-tighter">The Technical Pipeline</h2>
             <p className="text-slate-500 text-sm font-black uppercase tracking-[0.3em]">Phase 01 — Phase 03</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
             {[
               { title: 'LEARN', desc: 'Execute admin-seeded projects to establish your technical baseline reputation.', icon: <Cpu className="w-8 h-8" />, color: 'emerald' },
               { title: 'PROVE', desc: 'Maintain 3.8+ rating to unlock verified Earner status and secure level 2 clearance.', icon: <Target className="w-8 h-8" />, color: 'teal' },
               { title: 'EARN', desc: 'Secure real bounty projects from verified campus entities and earn liquid credits.', icon: <Zap className="w-8 h-8" />, color: 'emerald' }
             ].map((step, i) => (
               <div key={i} className="bg-[#0f1219] p-12 rounded-[4rem] border border-white/5 group hover:border-emerald-500/30 transition-all flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-0 group-hover:opacity-[0.03] rounded-bl-[5rem] transition-opacity"></div>
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 bg-white/5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-xl`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{step.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{step.desc}</p>
                  
                  <div className="mt-10 w-full h-px bg-white/5 relative">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-full bg-emerald-500 group-hover:w-full transition-all duration-700"></div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Marketplace CTA */}
        <div className="p-20 bg-[#0f1219] border border-white/5 rounded-[5rem] text-white relative overflow-hidden text-center group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-emerald-500 opacity-[0.02] pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                <div className="w-20 h-20 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center justify-center mb-4">
                   <Globe className="w-10 h-10 text-emerald-500 animate-spin-slow" />
                </div>
                <h2 className="text-6xl font-black tracking-tighter leading-none uppercase">Need a <span className="text-emerald-500 italic">Solution?</span></h2>
                <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Post your task to the closed-campus marketplace and hire verified peers using your secure credit wallet.</p>
                <Link to="/register" className="inline-flex items-center px-16 py-7 bg-emerald-500 text-black rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-emerald-500/30">
                    Deploy Tasking Request <ChevronRight className="ml-3 w-5 h-5" />
                </Link>
            </div>
            
            <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-teal-500/20 transition-all duration-1000"></div>
            <div className="absolute top-0 right-0 p-12 text-slate-800 pointer-events-none select-none">
               <Sparkles className="w-40 h-40 opacity-10 rotate-12" />
            </div>
        </div>
      </div>
    </div>
  );
}

