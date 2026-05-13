import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Trophy, CheckCircle2, ChevronRight, TrendingUp, ShieldCheck, Wallet, Zap, Star, LayoutGrid } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { t } = useAppContext();

  // Safely handle loading or missing user
  if (loading || !user) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f1219]">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-16 h-16 border-[6px] border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="font-black text-slate-500 uppercase tracking-[0.3em] text-[10px]">Syncing SkillForge Systems...</p>
      </div>
    </div>
  );

  // Defensive checks for user properties
  const roles = user.roles || [];
  const isEarner = user.mode_status === 'verified_earner';
  const isClient = roles.includes('client');
  const wallet = user.credits_wallet || { available: 0, escrow_locked: 0 };
  const verification = user.verification || { completed_learn_projects: 0, average_learn_rating: 0 };
  const firstName = user.name ? user.name.split(' ')[0] : 'Member';

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
      
      {/* Header Section */}
      <div className="relative rounded-[4rem] p-12 overflow-hidden bg-[#0f1219] border border-white/5 shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{user.mode_status === 'learner' ? 'Protocol: Apprentice' : 'Protocol: Verified Legend'}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase font-heading">
              {t('welcome')}, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">{firstName}!</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-md">Your campus economy dashboard is online. Build, earn, and scale.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
            <div className="bg-black/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl min-w-[220px] text-center group hover:border-emerald-500/30 transition-all">
              <div className="text-4xl font-black text-white mb-2 tabular-nums">
                {wallet.available} <span className="text-sm font-black text-emerald-500 ml-1">CR</span>
              </div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('available')} {t('credits')}</div>
            </div>
            {wallet.escrow_locked > 0 ? (
              <div className="bg-amber-500/5 p-8 rounded-[2.5rem] border border-amber-500/20 shadow-2xl min-w-[220px] text-center">
                <div className="text-4xl font-black text-amber-500 mb-2 tabular-nums">
                  {wallet.escrow_locked} <span className="text-sm font-black opacity-40 ml-1">CR</span>
                </div>
                <div className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest">Escrow Locked</div>
              </div>
            ) : (
              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl min-w-[220px] text-center opacity-60">
                <div className="text-4xl font-black text-slate-600 mb-2 tabular-nums">0.0</div>
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Vault Empty</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verification Gateway for Learners */}
      {user.mode_status === 'learner' && (
        <div className="bg-[#0f1219] p-10 md:p-14 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-10">
             <Zap className="w-20 h-20 text-emerald-500 opacity-5" />
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Unlock Earn Mode.</h2>
              <p className="text-slate-500 text-lg font-medium">Complete baseline projects to start earning real campus rewards.</p>
            </div>
            <div className="px-10 py-5 bg-emerald-500 text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/20">
              {verification.completed_learn_projects}/3 Baseline Tracks
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-[2.5rem] border transition-all ${verification.completed_learn_projects >= 3 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/5 text-slate-600'}`}>
              <CheckCircle2 className={`w-10 h-10 mb-6 ${verification.completed_learn_projects >= 3 ? 'text-emerald-500' : 'text-slate-800'}`} />
              <h4 className="font-black text-xs uppercase tracking-widest mb-2">Technical Foundations</h4>
              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">{verification.completed_learn_projects}/3 Projects</p>
            </div>
            <div className={`p-8 rounded-[2.5rem] border transition-all ${verification.average_learn_rating >= 3.8 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/5 text-slate-600'}`}>
               <Trophy className={`w-10 h-10 mb-6 ${verification.average_learn_rating >= 3.8 ? 'text-emerald-500' : 'text-slate-800'}`} />
              <h4 className="font-black text-xs uppercase tracking-widest mb-2">Quality Standards</h4>
              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Score: {Number(verification.average_learn_rating || 0).toFixed(1)}/5.0</p>
            </div>
            <Link to="/learn" className="p-8 rounded-[2.5rem] border-2 border-emerald-500/20 border-dashed bg-emerald-500/5 flex flex-col justify-center items-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all group shadow-xl">
                <Play className="w-12 h-12 mb-4 fill-current group-hover:scale-110 transition-transform" />
                <h4 className="font-black text-[10px] uppercase tracking-[0.2em]">Initialise System</h4>
            </Link>
          </div>
        </div>
      )}

      {/* Main Marketplace Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-[#0f1219] p-12 rounded-[3.5rem] border border-white/5 flex flex-col items-start hover:border-emerald-500/20 transition-all shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-0 group-hover:opacity-[0.03] rounded-bl-[5rem] transition-opacity"></div>
           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 mb-10 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">{t('learn')} Zone.</h3>
          <p className="text-slate-500 mb-10 leading-relaxed font-medium text-lg">Practice with risk-free projects and build your campus reputation.</p>
          <Link to="/learn" className="bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 transition-all">
            Explore Tracks <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className={`p-12 rounded-[3.5rem] flex flex-col items-start transition-all relative overflow-hidden shadow-2xl ${isEarner ? 'bg-black border border-emerald-500/30' : 'bg-[#0f1219] border border-white/5 opacity-60'}`}>
           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 ${isEarner ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-700'}`}>
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className={`text-3xl font-black mb-4 uppercase tracking-tight ${isEarner ? 'text-white' : 'text-slate-600'}`}>{t('marketplace')}.</h3>
          <p className={`mb-10 leading-relaxed font-medium text-lg ${isEarner ? 'text-slate-400' : 'text-slate-700'}`}>
            {isEarner ? 'Real tasks for real credits. Help campus startups grow.' : 'Clearance Required: Complete verification to access earning protocols.'}
          </p>
          {isEarner ? (
             <Link to="/marketplace" className="bg-emerald-500 text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all">
                Access Market <ChevronRight className="w-4 h-4 ml-2" />
             </Link>
          ) : (
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
               <ShieldCheck className="w-5 h-5 mr-3" /> System Locked
            </div>
          )}
        </div>
      </div>

      {/* Client Specific Actions */}
      {isClient && (
        <div className="bg-emerald-500 p-12 rounded-[3.5rem] text-black flex flex-col lg:flex-row justify-between items-center gap-10 shadow-2xl shadow-emerald-500/20">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-4xl font-black uppercase tracking-tighter">Need Talent?</h3>
            <p className="text-black/60 text-lg font-bold">Post a project and fund it to hire from the campus elite.</p>
          </div>
          <Link to="/projects/new" className="bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
            Deploy Project
          </Link>
        </div>
      )}

      {/* Activity / Wallet History */}
      <div className="bg-[#0f1219] p-10 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <h3 className="text-2xl font-black text-white flex items-center uppercase tracking-widest">
            <Wallet className="w-7 h-7 mr-4 text-emerald-400" />
            Ledger History
          </h3>
          <Link to="/wallet" className="text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-[0.2em] transition-all border-b border-transparent hover:border-emerald-400 pb-1">View Full Ledger</Link>
        </div>
        <div className="flex flex-col items-center justify-center p-20 bg-black/40 rounded-[2.5rem] border border-dashed border-white/5 text-slate-700 font-black uppercase tracking-widest text-[10px] text-center">
          <LayoutGrid className="w-10 h-10 mb-6 text-slate-800" />
          No recent transactions in the ledger history.
        </div>
      </div>
    </div>
  );
}

