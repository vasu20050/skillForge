import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, MapPin, Mail, Award, Clock, Heart, Settings, LogOut, ChevronRight, Zap, Target, FolderKanban } from 'lucide-react';
import avatarImg from '../avatar.png';
import api from '../api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return <div className="p-8 text-center text-gray-500">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
             <Link to="/dashboard" className="text-2xl font-bold text-blue-600">SkillForge</Link>
             <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">← Back to Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 page-transition">
        <div className="glass-card rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 border-none relative bg-white/40 backdrop-blur-3xl">
          {/* Header/Cover Section with Animated Gradient */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 h-56 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px] animate-pulse"></div>
          </div>
          
          <div className="px-8 pb-12 sm:px-16 relative">
            {/* Avatar Section - Floating Style */}
            <div className="relative -mt-24 mb-10 flex items-end justify-between flex-wrap gap-6">
              <div className="relative group">
                <div className="relative h-48 w-48 rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl bg-slate-900 flex items-center justify-center">
                  <img 
                    src={user.photoUrl || avatarImg} 
                    alt={user.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-4 bg-indigo-600 text-white rounded-2xl shadow-2xl hover:bg-indigo-700 transition-all border-4 border-white group/cam hover:scale-110 active:scale-90">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-4 mb-4">
                <Link to="/settings" className="p-4 bg-white/60 backdrop-blur-md text-slate-600 rounded-3xl hover:bg-white hover:text-indigo-600 transition-all shadow-sm border border-white/40 flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                  }}
                  className="p-4 bg-rose-50 text-rose-500 rounded-3xl hover:bg-rose-100 transition-all shadow-sm border border-rose-100"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* User Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter text-gradient">{user.name}</h1>
                    <div className="px-5 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-indigo-200">
                      {user.role || 'Pioneer'}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-8 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                    <span className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-indigo-400" /> {user.email}</span>
                    <span className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-indigo-400" /> Digital Campus</span>
                    <span className="flex items-center gap-2.5 text-indigo-600"><Zap className="w-4 h-4" /> {user.headline || 'Mastery Rank 4'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: 'Reputation Score', value: user.reputationScore ? user.reputationScore.toFixed(1) : '0.0', icon: <Target className="text-indigo-600" />, color: 'bg-indigo-50' },
                    { label: 'Skill Credits', value: user.credits ?? 100, icon: <Award className="text-amber-500" />, color: 'bg-amber-50' },
                    { label: 'Projects Done', value: user.projectsCompleted ?? 0, icon: <Heart className="text-rose-500" />, color: 'bg-rose-50' }
                  ].map((stat, i) => (
                    <div key={i} className={`p-8 rounded-[2.5rem] ${stat.color} border border-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/5 group`}>
                      <div className="mb-4 p-3 bg-white w-fit rounded-2xl shadow-sm group-hover:rotate-12 transition-transform">{stat.icon}</div>
                      <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Portfolio</h2>
                    <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2 group">
                      Expand Portfolio <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="text-center py-24 glass-card rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50">
                    <div className="max-w-xs mx-auto space-y-6">
                      <div className="h-20 w-20 bg-white text-slate-200 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
                        <FolderKanban size={40} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-800 font-bold text-lg">Your canvas is empty</p>
                        <p className="text-slate-400 text-sm font-medium">Start a project module to display your technical expertise here.</p>
                      </div>
                      <Link to="/skills" className="inline-flex h-14 items-center px-10 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:translate-y-0 transition-all">
                        Initialize Learning
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar/Activity */}
              <div className="space-y-10">
                 <div className="p-10 glass-card rounded-[3rem] bg-slate-900 text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <Zap size={80} />
                    </div>
                    <h3 className="text-2xl font-black mb-10 tracking-tight">Active Curriculums</h3>
                    <div className="space-y-8 relative z-10">
                       {[
                         { name: 'Web Dev Mastery', prog: 65, color: 'bg-indigo-500' },
                         { name: 'UI/UX Architect', prog: 30, color: 'bg-violet-500' },
                         { name: 'Modern React', prog: 12, color: 'bg-blue-500' }
                       ].map((course, i) => (
                         <div key={i} className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                             <span>{course.name}</span>
                             <span className="text-white">{course.prog}%</span>
                           </div>
                           <div className="h-3 bg-white/10 rounded-full overflow-hidden p-[2px]">
                             <div className={`h-full ${course.color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]`} style={{ width: `${course.prog}%` }}></div>
                           </div>
                         </div>
                       ))}
                    </div>
                    <button className="w-full mt-10 py-5 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                       View Learning DNA
                    </button>
                 </div>

                 {/* Reputation Breakdown Widget */}
                 <div className="p-8 glass-card rounded-[2.5rem] bg-white border border-slate-100 shadow-sm">
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-6">Reputation Breakdown</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Avg Rating', value: user.avgRating ? user.avgRating.toFixed(1) : '5.0', max: '5.0', pct: ((user.avgRating || 5) / 5) * 100, color: 'bg-amber-400' },
                        { label: 'Completion Rate', value: `${user.completionRate ?? 100}%`, max: '100%', pct: user.completionRate ?? 100, color: 'bg-emerald-500' },
                        { label: 'On-Time Delivery', value: `${user.onTimeDeliveryRate ?? 100}%`, max: '100%', pct: user.onTimeDeliveryRate ?? 100, color: 'bg-indigo-500' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>{item.label}</span>
                            <span className="text-slate-700">{item.value}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.pct}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Overall Score</span>
                      <span className="text-2xl font-black text-indigo-600">{user.reputationScore ? user.reputationScore.toFixed(1) : '0.0'}</span>
                    </div>
                 </div>

                 <div className="p-8 glass-card rounded-[2.5rem] bg-indigo-50 border border-indigo-100">
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-4">Daily Goal</h4>
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                          <Clock size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-800">2 Hours Learned</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Target: 4 Hours</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
