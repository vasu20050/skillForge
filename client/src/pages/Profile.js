import React, { useState, useEffect } from 'react';
import api from '../api';
import { Camera, Mail, Award, Clock, Settings, LogOut, ChevronRight, Zap, Target, FolderKanban, ShieldCheck } from 'lucide-react';
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

  if (loading || !user) return <div className="p-20 text-center font-bold">Inscribing Identity...</div>;

  return (
    <div className="space-y-12 page-transition pb-20">
      <div className="glass-card rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 border-none relative bg-white/40 backdrop-blur-3xl">
        {/* Cover Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 h-56 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        
        <div className="px-8 pb-12 sm:px-16 relative">
          <div className="relative -mt-24 mb-10 flex items-end justify-between flex-wrap gap-6">
            <div className="relative group">
              <div className="relative h-48 w-48 rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl bg-slate-900 flex items-center justify-center">
                <img 
                  src={user.profile?.photoUrl || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                  alt={user.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <button 
                onClick={logout}
                className="p-5 bg-rose-50 text-rose-500 rounded-3xl hover:bg-rose-100 transition-all shadow-sm border border-rose-100"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter text-gradient">{user.name}</h1>
                  <div className="px-5 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-indigo-200">
                    {user.mode_status === 'learner' ? 'Apprentice' : 'Verified Expert'}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-8 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                  <span className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-indigo-400" /> {user.email}</span>
                  <span className="flex items-center gap-2.5 text-indigo-600"><ShieldCheck className="w-4 h-4" /> REPUTATION {user.reputation.score}/100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-white transition-all shadow-sm group">
                  <Target className="w-8 h-8 text-indigo-600 mb-4" />
                  <div className="text-3xl font-black text-slate-900">{user.reputation.score.toFixed(1)}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Reputation Score</div>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-white transition-all shadow-sm group">
                  <Award className="w-8 h-8 text-emerald-600 mb-4" />
                  <div className="text-3xl font-black text-slate-900">{user.credits_wallet.lifetime_earned}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Total Lifetime CR</div>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-rose-50 border border-white transition-all shadow-sm group">
                   <Clock className="w-8 h-8 text-rose-600 mb-4" />
                   <div className="text-3xl font-black text-slate-900">{user.verification.completed_learn_projects}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Learn Projects</div>
                </div>
              </div>

              {/* Portfolio */}
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verified Portfolio</h2>
                <div className="grid grid-cols-1 gap-6">
                  {projects.map(p => (
                    <div key={p._id} className="glass-card p-10 rounded-[3rem] group border-indigo-50 border-2 hover:border-indigo-600 transition-all flex flex-col md:flex-row justify-between items-center bg-white">
                        <div className="space-y-4 text-center md:text-left">
                            <h4 className="text-2xl font-black text-slate-800">{p.title}</h4>
                            <p className="text-slate-500 font-medium">{p.category} • {new Date(p.createdAt).toLocaleDateString()}</p>
                            <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block">
                                Outcome: Completed +{p.credits_total} CR
                            </div>
                        </div>
                        <a href={`/projects/${p._id}`} className="mt-8 md:mt-0 premium-btn text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                            View Proof & Feedback
                        </a>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="text-center py-24 glass-card rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50">
                      <FolderKanban size={40} className="mx-auto mb-4 text-slate-200" />
                      <p className="text-slate-400 font-bold">No verified projects yet. Start earning today!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-10">
               {/* Modes Breakdown */}
               <div className="p-10 glass-card rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                  <h3 className="text-2xl font-black mb-10 tracking-tight">Technical Radar</h3>
                  <div className="space-y-8">
                     {[
                       { label: 'Completion Rate', val: user.reputation.completion_rate * 100, color: 'bg-emerald-500' },
                       { label: 'On-Time Performance', val: user.reputation.on_time_rate * 100, color: 'bg-indigo-500' },
                       { label: 'Team Reliability', val: user.reputation.repeat_collab_rate * 100, color: 'bg-amber-500' }
                     ].map((radar, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                              <span>{radar.label}</span>
                              <span className="text-white">{radar.val || 0}%</span>
                           </div>
                           <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full ${radar.color} transition-all duration-1000`} style={{ width: `${radar.val || 0}%` }}></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
