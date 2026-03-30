import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Trophy, Clock, CheckCircle2, ChevronRight, TrendingUp, ShieldCheck, Wallet } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading || !user) return (
    <div className="space-y-12 page-transition pb-20 p-8">
      <div className="h-6 w-32 shimmer rounded-full"></div>
      <div className="h-20 w-full shimmer rounded-[3rem]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80 w-full shimmer rounded-[3rem]"></div>
        <div className="h-80 w-full shimmer rounded-[3rem]"></div>
      </div>
    </div>
  );

  const isEarner = user.mode_status === 'verified_earner';
  const isClient = user.roles.includes('client');

  return (
    <div className="space-y-10 page-transition pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>{user.mode_status === 'learner' ? 'Level: Apprentice' : 'Level: Verified Expert'}</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
            Welcome, <br /><span className="text-gradient">{user.name.split(' ')[0]}!</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm min-w-[180px] flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900 leading-none mb-1">
              {user.credits_wallet.available} <span className="text-sm font-medium text-slate-400">CR</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Credits</span>
          </div>
          {user.credits_wallet.escrow_locked > 0 && (
            <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100 min-w-[180px] flex flex-col items-center">
              <span className="text-2xl font-black text-amber-700 leading-none mb-1">
                {user.credits_wallet.escrow_locked} <span className="text-sm font-medium text-amber-500">CR</span>
              </span>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Escrow Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Verification Gateway for Learners */}
      {user.mode_status === 'learner' && (
        <div className="glass-card p-10 rounded-[3rem] border-indigo-100 bg-indigo-50/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Unlock Earn Mode</h2>
              <p className="text-slate-500 font-medium">Complete the baseline projects to start earning real campus rewards.</p>
            </div>
            <div className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20">
              {user.verification.completed_learn_projects}/3 Projects Done
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-[2rem] border-2 transition-all ${user.verification.completed_learn_projects >= 3 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-100 text-slate-400'}`}>
              <CheckCircle2 className={`w-8 h-8 mb-4 ${user.verification.completed_learn_projects >= 3 ? 'text-emerald-500' : 'text-slate-200'}`} />
              <h4 className="font-black text-sm uppercase tracking-widest mb-1">3 Learn Projects</h4>
              <p className="text-xs font-semibold opacity-70">Prove your technical foundation</p>
            </div>
            <div className={`p-6 rounded-[2rem] border-2 transition-all ${user.verification.average_learn_rating >= 3.8 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-100 text-slate-400'}`}>
               <Trophy className={`w-8 h-8 mb-4 ${user.verification.average_learn_rating >= 3.8 ? 'text-emerald-500' : 'text-slate-200'}`} />
              <h4 className="font-black text-sm uppercase tracking-widest mb-1">3.8+ Min. Rating</h4>
              <p className="text-xs font-semibold opacity-70">Current: {user.verification.average_learn_rating.toFixed(1)}/5</p>
            </div>
            <div className="p-6 rounded-[2rem] border-2 bg-white border-dashed border-indigo-200 flex flex-col justify-center items-center text-indigo-600 group hover:bg-indigo-600 hover:text-white hover:border-solid transition-all cursor-pointer">
              <Link to="/learn" className="text-center">
                <Play className="w-8 h-8 mb-2 mx-auto fill-current" />
                <h4 className="font-black text-sm uppercase tracking-widest">Start Learning</h4>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Marketplace Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Learn Mode / Marketplace for Everyone */}
        <div className="glass-card tilt-card p-10 rounded-[3rem] group border-transparent hover:border-indigo-100">
           <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-100 transition-colors">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-3">Learn Zone</h3>
          <p className="text-slate-500 mb-8 leading-relaxed font-medium">Practice with campus organizations using risk-free projects. Build your reputation.</p>
          <Link to="/learn" className="premium-btn text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center shadow-lg shadow-indigo-600/20">
            Browse Learn Projects <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Earn Mode - Conditional Rendering */}
        <div className={`p-10 rounded-[3rem] tilt-card group relative overflow-hidden ${isEarner ? 'bg-slate-900 text-white' : 'bg-slate-50 border-2 border-dashed border-slate-200 opacity-60'}`}>
           <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 ${isEarner ? 'bg-emerald-500 text-black' : 'bg-slate-200 text-slate-400'}`}>
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className={`text-2xl font-black mb-3 ${isEarner ? 'text-white' : 'text-slate-400'}`}>Earn Marketplace</h3>
          <p className={`mb-8 leading-relaxed font-medium ${isEarner ? 'text-slate-400' : 'text-slate-300'}`}>
            {isEarner ? 'Real tasks, real credits. Help campus clubs and startups grow while earning rewards.' : 'Locked: Complete verification to unlock $500+ worth of campus opportunities.'}
          </p>
          {isEarner ? (
             <Link to="/marketplace" className="bg-emerald-500 text-black px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center hover:bg-emerald-400 transition-colors shadow-xl shadow-emerald-500/20">
                Go to Marketplace <ChevronRight className="w-4 h-4 ml-2" />
             </Link>
          ) : (
            <div className="flex items-center text-xs font-black uppercase tracking-widest text-slate-400">
               <ShieldCheck className="w-4 h-4 mr-2" /> Verification Required
            </div>
          )}
        </div>
      </div>

      {/* Client Specific Actions */}
      {isClient && (
        <div className="bg-indigo-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-indigo-600/30">
          <div className="space-y-1">
            <h3 className="text-2xl font-black">Need Talent?</h3>
            <p className="text-indigo-100 font-medium opacity-80">Post a real project and fund it with your credits to hire the best students.</p>
          </div>
          <Link to="/projects/new" className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg">
            Post New Project
          </Link>
        </div>
      )}

      {/* Activity / Wallet History */}
      <div className="glass-card p-10 rounded-[3rem]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-900 flex items-center">
            <Wallet className="w-6 h-6 mr-3 text-slate-400" />
            Recent Transactions
          </h3>
          <Link to="/wallet" className="text-sm font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">Wallet Details</Link>
        </div>
        <div className="space-y-4">
           {/* Transaction list would go here */}
           <div className="flex items-center space-x-4 p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-slate-400 font-bold italic justify-center text-sm">
             No recent activity detected. Connect your skills to start!
           </div>
        </div>
      </div>
    </div>
  );
}
