import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Shield, CreditCard, ChevronRight, LogOut, Save, Camera, Globe, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import avatarImg from '../avatar.png';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('account');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    headline: '',
    photoUrl: '',
    password: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        headline: parsedUser.headline || '',
        photoUrl: parsedUser.photoUrl || '',
        password: ''
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.put('/auth/profile', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      setMessage('Profile updated successfully! ✨');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div className="p-20 text-center animate-pulse text-emerald-400 font-black uppercase tracking-widest">Initialising Secure Workspace...</div>;

  const sections = [
    { id: 'account', title: 'Personal Info', icon: <User className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-400' },
    { id: 'security', title: 'Security', icon: <Lock className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-400' },
    { id: 'notifications', title: 'Notifications', icon: <Bell className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-400' },
    { id: 'privacy', title: 'Privacy', icon: <Shield className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 px-4">
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tight uppercase font-heading">Settings.</h1>
          <p className="text-slate-400 text-lg font-medium">Configure your <span className="text-emerald-400 font-black italic">SkillForge</span> identity & security protocols.</p>
        </div>
        {message && (
          <div className="bg-emerald-500 text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 animate-in slide-in-from-top-4 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 px-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0f1219] p-4 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative group">
             <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 mb-6 mt-4">Control Deck</h3>
             <div className="space-y-2">
               {sections.map(section => (
                 <button
                   key={section.id}
                   onClick={() => setActiveTab(section.id)}
                   className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all relative z-10 ${
                     activeTab === section.id 
                      ? 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20 scale-[1.02]' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                   }`}
                 >
                   <div className={`p-2.5 rounded-xl ${activeTab === section.id ? 'bg-black/10' : 'bg-white/5'}`}>
                     {section.icon}
                   </div>
                   <span className="font-black text-[10px] uppercase tracking-widest">{section.title}</span>
                 </button>
               ))}
             </div>
             
             <div className="pt-6 mt-6 border-t border-white/5">
                <button 
                  onClick={logout}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all font-black text-[10px] uppercase tracking-widest"
                >
                  <div className="p-2.5 bg-rose-500/10 rounded-xl"><LogOut className="w-4 h-4" /></div>
                  <span>Logout</span>
                </button>
             </div>
          </div>

          {/* Quick Profile Preview */}
          <div className="bg-[#0f1219] p-8 rounded-[2.5rem] border border-white/5 text-center space-y-4">
             <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden border-4 border-emerald-500/20 p-1">
                <img src={formData.photoUrl || avatarImg} className="w-full h-full object-cover rounded-2xl" alt="PFP" />
             </div>
             <div>
                <h4 className="text-white font-black uppercase tracking-tight text-lg">{user.name}</h4>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Level 12 Legend</p>
             </div>
             <div className="flex justify-center gap-2">
                <div className="px-3 py-1 bg-emerald-500/10 rounded-lg text-emerald-400 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">PRO</div>
                <div className="px-3 py-1 bg-white/5 rounded-lg text-slate-400 text-[8px] font-black uppercase tracking-widest border border-white/10">VET</div>
             </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#0f1219] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full blur-[150px]"></div>
            </div>

            {activeTab === 'account' ? (
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                   {/* Avatar Upload Preview */}
                   <div className="relative group self-center md:self-start">
                      <div className="w-48 h-48 rounded-[3.5rem] overflow-hidden border-8 border-white/5 shadow-2xl bg-black group-hover:scale-[1.05] transition-all duration-700 p-2">
                         <img 
                            src={formData.photoUrl || avatarImg} 
                            className="w-full h-full object-cover rounded-[2.5rem]"
                            alt="Preview"
                         />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-5 rounded-3xl shadow-2xl border-8 border-[#0f1219] group-hover:rotate-12 transition-transform cursor-pointer">
                         <Camera className="w-6 h-6" />
                      </div>
                   </div>

                   <div className="flex-1 space-y-8 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Display Name</label>
                           <input 
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white font-black text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder-slate-700"
                             placeholder="e.g. Satoshi Nakamoto"
                           />
                         </div>
                         <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Email Identity</label>
                           <input 
                             name="email"
                             type="email"
                             value={formData.email}
                             onChange={handleChange}
                             className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-slate-600 font-black text-sm cursor-not-allowed"
                             disabled
                           />
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Professional Headline</label>
                         <input 
                           name="headline"
                           value={formData.headline}
                           onChange={handleChange}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white font-black text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder-slate-700"
                           placeholder="e.g. Senior Web Developer | UI/UX Sensei"
                         />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center justify-between">
                           Avatar URL
                           <Sparkles className="w-3 h-3 text-emerald-400 opacity-60" />
                        </label>
                        <div className="relative">
                           <Globe className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                           <input 
                             name="photoUrl"
                             value={formData.photoUrl}
                             onChange={handleChange}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 py-5 text-white font-black text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder-slate-700"
                             placeholder="https://images.unsplash.com/photo-..."
                           />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center italic">
                      <Shield className="w-4 h-4 mr-3 text-emerald-500" />
                      End-to-End Encryption Enabled
                   </div>
                   <button 
                     type="submit" 
                     disabled={loading}
                     className="w-full md:w-auto bg-emerald-500 text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center space-x-3"
                   >
                     {loading ? (
                        <>
                           <Loader2 className="w-4 h-4 animate-spin" />
                           <span>Simulating Protocol...</span>
                        </>
                     ) : (
                        <>
                           <Save className="w-5 h-5" />
                           <span>Update Passport</span>
                        </>
                     )}
                   </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-40 space-y-8 animate-in zoom-in-95 duration-500">
                 <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-700 border border-white/5 shadow-2xl">
                    <Lock className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-3xl font-black text-white tracking-tight uppercase">Clearance Required</h3>
                   <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                     This protocol is currently restricted to <span className="text-emerald-400 font-bold uppercase tracking-widest">Verified Legends</span>. Complete more bounties to unlock beta access.
                   </p>
                 </div>
                 <button 
                   onClick={() => setActiveTab('account')}
                   className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10"
                 >
                   Back to Account
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

