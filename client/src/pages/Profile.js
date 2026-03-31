import React, { useState, useEffect } from 'react';
import api from '../api';
import { Camera, Mail, Award, Clock, LogOut, ShieldCheck, Target, FolderKanban } from 'lucide-react';
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing Profile...</p>
      </div>
    </div>
  );

  // Defensive values
  const reputation = user.reputation || { score: 0, completion_rate: 0, on_time_rate: 0, repeat_collab_rate: 0 };
  const wallet = user.credits_wallet || { available: 0, lifetime_earned: 0 };
  const verification = user.verification || { completed_learn_projects: 0 };
  const profile = user.profile || { photoUrl: '', headline: 'Campus Member' };

  return (
    <div className="space-y-12 animate-in-slide pb-20">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 relative">
        {/* Cover Section */}
        <div className="bg-slate-900 h-40 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        
        <div className="px-6 pb-12 sm:px-12 relative">
          <div className="relative -mt-16 mb-10 flex items-end justify-between flex-wrap gap-6">
            <div className="relative group">
              <div className="h-40 w-40 rounded-2xl overflow-hidden border-8 border-white shadow-xl bg-slate-100 flex items-center justify-center">
                <img 
                  src={profile.photoUrl || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex gap-3 mb-2">
              <button 
                onClick={logout}
                className="p-4 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all border border-rose-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-5xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                  <div className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-indigo-100">
                    {user.mode_status === 'learner' ? 'Apprentice' : 'Verified Expert'}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {user.email}</span>
                  <span className="flex items-center gap-2 text-indigo-600"><ShieldCheck className="w-4 h-4" /> REPUTATION {reputation.score}/100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-8 rounded-2xl bg-indigo-50/50 border border-indigo-100 transition-all shadow-sm">
                  <Target className="w-7 h-7 text-indigo-600 mb-4" />
                  <div className="text-3xl font-black text-slate-900">{Number(reputation.score || 0).toFixed(1)}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Reputation Score</div>
                </div>
                <div className="p-8 rounded-2xl bg-emerald-50/50 border border-emerald-100 transition-all shadow-sm">
                  <Award className="w-7 h-7 text-emerald-600 mb-4" />
                  <div className="text-3xl font-black text-slate-900">{wallet.lifetime_earned}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Lifetime Credits</div>
                </div>
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 transition-all shadow-sm">
                   <Clock className="w-7 h-7 text-slate-600 mb-4" />
                   <div className="text-3xl font-black text-slate-900">{verification.completed_learn_projects}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Learn Projects</div>
                </div>
              </div>

              {/* Portfolio */}
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                  <FolderKanban className="w-6 h-6 mr-3 text-slate-400" />
                  Verified Portfolio
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {projects.map(p => (
                    <div key={p._id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                        <div className="space-y-3 text-center md:text-left">
                            <h4 className="text-xl font-black text-slate-800">{p.title}</h4>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{p.category} • {new Date(p.createdAt).toLocaleDateString()}</p>
                            <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block">
                                Completed +{p.credits_total} CR
                            </div>
                        </div>
                        <Link to={`/projects/${p._id}`} className="mt-6 md:mt-0 btn-primary px-6 py-3 text-[10px] uppercase tracking-widest">
                            View Proof
                        </Link>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-slate-400 font-bold italic text-sm">No verified projects in portfolio yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
               <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-xl">
                  <h3 className="text-xl font-black mb-10 uppercase tracking-widest text-slate-400">Technical Radar</h3>
                  <div className="space-y-10">
                     {[
                       { label: 'Completion Rate', val: (reputation.completion_rate || 0) * 100, color: 'bg-emerald-500' },
                       { label: 'On-Time Perf', val: (reputation.on_time_rate || 0) * 100, color: 'bg-indigo-500' },
                       { label: 'Team Reliability', val: (reputation.repeat_collab_rate || 0) * 100, color: 'bg-amber-500' }
                     ].map((radar, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                               <span>{radar.label}</span>
                               <span className="text-white">{radar.val}%</span>
                           </div>
                           <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full ${radar.color} transition-all duration-1000`} style={{ width: `${radar.val}%` }}></div>
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
