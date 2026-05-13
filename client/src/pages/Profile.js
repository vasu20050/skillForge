import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Camera, Mail, Award, Clock, LogOut, ShieldCheck, Target, FolderKanban, Star, ExternalLink, Activity } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await api.get('/projects?status=completed');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching portfolio', err);
      }
    };
    if (user) fetchPortfolio();
  }, [user]);

  if (loading || !user) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f1219]">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-16 h-16 border-[6px] border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="font-black text-slate-500 uppercase tracking-[0.3em] text-[10px]">Syncing Legend Bio...</p>
      </div>
    </div>
  );

  // Defensive values
  const reputation = user.reputation || { score: 0, completion_rate: 0, on_time_rate: 0, repeat_collab_rate: 0 };
  const wallet = user.credits_wallet || { available: 0, lifetime_earned: 0 };
  const verification = user.verification || { completed_learn_projects: 0 };
  const profile = user.profile || { photoUrl: '', headline: 'Campus Member' };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Profile Header Card */}
      <div className="bg-[#0f1219] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl relative">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10"></div>
        
        {/* Cover Glow */}
        <div className="h-48 relative overflow-hidden bg-black">
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-20"></div>
        </div>
        
        <div className="px-8 pb-16 sm:px-16 relative">
          <div className="relative -mt-24 mb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative group">
                <div className="h-48 w-48 rounded-[3.5rem] overflow-hidden border-8 border-[#0f1219] shadow-2xl bg-black flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-700">
                  <img 
                    src={profile.photoUrl || `https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff&bold=true`} 
                    alt={user.name} 
                    className="w-full h-full object-cover rounded-[2.5rem]"
                  />
                </div>
                <div className="absolute bottom-2 right-2 p-3 bg-emerald-500 text-black rounded-2xl border-4 border-[#0f1219] shadow-xl group-hover:rotate-12 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <h1 className="text-5xl font-black text-white tracking-tighter uppercase font-heading">{user.name}</h1>
                  <div className="px-5 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/20">
                    {user.mode_status === 'learner' ? 'Apprentice' : 'Verified Legend'}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-slate-500 font-black uppercase tracking-widest text-[10px]">
                  <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5"><Mail className="w-4 h-4 text-emerald-400" /> {user.email}</span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 rounded-lg border border-emerald-500/20 text-emerald-400"><ShieldCheck className="w-4 h-4" /> REP {reputation.score}/100</span>
                </div>
              </div>
            </div>

            <button 
              onClick={logout}
              className="px-10 py-5 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20 font-black text-[10px] uppercase tracking-widest flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              Terminate Session
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Core Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 transition-all shadow-2xl relative group hover:border-emerald-500/30">
                  <Target className="w-10 h-10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-black text-white tabular-nums">{Number(reputation.score || 0).toFixed(1)}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Reputation Level</div>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 transition-all shadow-2xl group hover:scale-[1.02]">
                  <Award className="w-10 h-10 text-emerald-400 mb-6" />
                  <div className="text-4xl font-black text-white tabular-nums">{wallet.lifetime_earned}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-2">Life-Earned Credits</div>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 transition-all shadow-2xl group hover:border-teal-500/30">
                   <Clock className="w-10 h-10 text-teal-400 mb-6" />
                   <div className="text-4xl font-black text-white tabular-nums">{verification.completed_learn_projects}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Tracks Mastered</div>
                </div>
              </div>

              {/* Portfolio */}
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase flex items-center">
                    <FolderKanban className="w-8 h-8 mr-4 text-emerald-400" />
                    Verified Portfolio
                  </h2>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                    {projects.length} Entries
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {projects.map(p => (
                    <div key={p._id} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-center hover:border-emerald-500/20 hover:bg-white/[0.07] transition-all group">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                              <h4 className="text-2xl font-black text-white tracking-tight">{p.title}</h4>
                              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded-md border border-emerald-500/20">VERIFIED</span>
                            </div>
                            <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
                              {p.category} <Star className="w-3 h-3" /> {new Date(p.createdAt).toLocaleDateString()}
                            </p>
                            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 inline-block">
                                Reward Transfer: +{p.credits_total} CR
                            </div>
                        </div>
                        <Link to={`/projects/${p._id}`} className="mt-8 md:mt-0 bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-2">
                            View Proof <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="text-center py-24 bg-black/40 rounded-[3rem] border border-dashed border-white/5">
                      <Activity className="w-12 h-12 text-slate-800 mx-auto mb-6" />
                      <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">No verified protocols in ledger.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-12">
               {/* Technical Radar */}
               <div className="p-12 bg-black/40 rounded-[3rem] border border-white/5 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
                  <h3 className="text-[10px] font-black mb-12 uppercase tracking-[0.3em] text-slate-500 flex items-center">
                    <Activity className="w-4 h-4 mr-3 text-emerald-500" />
                    Technical Radar
                  </h3>
                  <div className="space-y-12">
                     {[
                       { label: 'Completion Rate', val: (reputation.completion_rate || 0) * 100, color: 'bg-emerald-500' },
                       { label: 'Latency Efficiency', val: (reputation.on_time_rate || 0) * 100, color: 'bg-teal-500' },
                       { label: 'Collab Reliability', val: (reputation.repeat_collab_rate || 0) * 100, color: 'bg-indigo-500' }
                     ].map((radar, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                               <span>{radar.label}</span>
                               <span className="text-white">{radar.val}%</span>
                           </div>
                           <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                              <div className={`h-full ${radar.color} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.3)]`} style={{ width: `${radar.val}%` }}></div>
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  <div className="mt-12 pt-12 border-t border-white/5 text-center">
                     <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-loose">
                       Metrics calculated from <br /> <span className="text-slate-400">12 Verified Node Interactions</span>
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

