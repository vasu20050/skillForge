import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Trophy, CheckCircle2, ChevronRight, TrendingUp, ShieldCheck, Wallet } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { t } = useAppContext();

  // Safely handle loading or missing user
  if (loading || !user) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing SkillForge...</p>
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
    <div className="space-y-10 animate-in-slide pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>{user.mode_status === 'learner' ? 'Level: Apprentice' : 'Level: Verified Expert'}</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-none">
            {t('welcome')}, <br /><span className="text-emerald-500">{firstName}!</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass-card p-5 rounded-2xl border border-slate-200/10 shadow-sm min-w-[180px] flex flex-col items-center">
            <span className="text-2xl font-black leading-none mb-1">
              {wallet.available} <span className="text-sm font-medium opacity-40">CR</span>
            </span>
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{t('available')} {t('credits')}</span>
          </div>
          {wallet.escrow_locked > 0 && (
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 min-w-[180px] flex flex-col items-center">
              <span className="text-2xl font-black text-amber-700 leading-none mb-1">
                {wallet.escrow_locked} <span className="text-sm font-medium text-amber-500">CR</span>
              </span>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Escrow Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Verification Gateway for Learners */}
      {user.mode_status === 'learner' && (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Unlock Earn Mode</h2>
              <p className="text-slate-500 font-medium">Complete baseline projects to start earning real campus rewards.</p>
            </div>
            <div className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20">
              {verification.completed_learn_projects}/3 Projects Done
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border-2 transition-all ${verification.completed_learn_projects >= 3 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
              <CheckCircle2 className={`w-8 h-8 mb-4 ${verification.completed_learn_projects >= 3 ? 'text-emerald-500' : 'text-slate-200'}`} />
              <h4 className="font-black text-sm uppercase tracking-widest mb-1">3 Learn Projects</h4>
              <p className="text-xs font-semibold opacity-70">Technical foundation</p>
            </div>
            <div className={`p-6 rounded-2xl border-2 transition-all ${verification.average_learn_rating >= 3.8 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
               <Trophy className={`w-8 h-8 mb-4 ${verification.average_learn_rating >= 3.8 ? 'text-emerald-500' : 'text-slate-200'}`} />
              <h4 className="font-black text-sm uppercase tracking-widest mb-1">3.8+ Rating</h4>
              <p className="text-xs font-semibold opacity-70">Current: {Number(verification.average_learn_rating || 0).toFixed(1)}/5</p>
            </div>
            <Link to="/learn" className="p-6 rounded-2xl border-2 bg-indigo-50 border-dashed border-indigo-200 flex flex-col justify-center items-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all group">
                <Play className="w-8 h-8 mb-2 fill-current" />
                <h4 className="font-black text-sm uppercase tracking-widest">Start Learning</h4>
            </Link>
          </div>
        </div>
      )}

      {/* Main Marketplace Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow">
           <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black mb-3">{t('learn')} Zone</h3>
          <p className="text-slate-500 mb-8 leading-relaxed font-medium">Practice with risk-free projects and build your campus reputation.</p>
          <Link to="/learn" className="btn-primary px-8 py-4 text-sm uppercase tracking-widest inline-flex items-center">
            Browse Learn <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className={`p-10 rounded-3xl flex flex-col items-start transition-all ${isEarner ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'bg-slate-50 border-2 border-dashed border-slate-200 opacity-60'}`}>
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${isEarner ? 'bg-emerald-500 text-black' : 'bg-slate-200 text-slate-400'}`}>
            <TrendingUp className="w-7 h-7" />
          </div>
          <h3 className={`text-2xl font-black mb-3 ${isEarner ? 'text-white' : 'opacity-40'}`}>{t('marketplace')}</h3>
          <p className={`mb-8 leading-relaxed font-medium ${isEarner ? 'text-slate-400' : 'text-slate-300'}`}>
            {isEarner ? 'Real tasks for real credits. Help campus startups grow.' : 'Locked: Complete verification to access paid opportunities.'}
          </p>
          {isEarner ? (
             <Link to="/marketplace" className="bg-emerald-500 text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest inline-flex items-center hover:bg-emerald-400 transition-colors">
                Marketplace <ChevronRight className="w-4 h-4 ml-2" />
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
        <div className="bg-indigo-600 p-10 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl shadow-indigo-600/20">
          <div className="space-y-1">
            <h3 className="text-2xl font-black">Need Talent?</h3>
            <p className="text-indigo-100 font-medium opacity-80">Post a project and fund it to hire from the best students.</p>
          </div>
          <Link to="/projects/new" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg">
            Post Project
          </Link>
        </div>
      )}

      {/* Activity / Wallet History */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-900 flex items-center">
            <Wallet className="w-6 h-6 mr-3 text-slate-400" />
            Wallet Activity
          </h3>
          <Link to="/wallet" className="text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest border-b-2 border-transparent hover:border-indigo-600 transition-all">View Details</Link>
        </div>
        <div className="flex items-center justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 font-bold italic text-sm">
          No recent activity. Start exploring to earn rewards!
        </div>
      </div>
    </div>
  );
}
