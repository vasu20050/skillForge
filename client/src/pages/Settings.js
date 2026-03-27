import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Shield, CreditCard, ChevronRight, LogOut, Save, Camera, Globe, Loader2 } from 'lucide-react';
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

  if (!user) return <div className="p-20 text-center animate-pulse text-slate-400 font-bold">Initialising Secure Workspace...</div>;

  const sections = [
    { id: 'account', title: 'Personal Info', icon: <User className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
    { id: 'security', title: 'Security', icon: <Lock className="w-5 h-5" />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'notifications', title: 'Notifications', icon: <Bell className="w-5 h-5" />, color: 'bg-amber-100 text-amber-600' },
    { id: 'privacy', title: 'Privacy', icon: <Shield className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Settings</h1>
          <p className="text-slate-500 mt-3 font-medium text-lg">Personalise your SkillForge identity and security.</p>
        </div>
        {message && (
          <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-100 font-bold text-sm animate-in slide-in-from-top-4">
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 px-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-6 rounded-[2.5rem] space-y-2 shadow-sm border border-slate-100/50">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4 text-center">Control Deck</h3>
             {sections.map(section => (
               <button
                 key={section.id}
                 onClick={() => setActiveTab(section.id)}
                 className={`w-full flex items-center space-x-4 p-4 rounded-3xl transition-all ${
                   activeTab === section.id 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                    : 'text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 <div className={`p-2 rounded-xl ${activeTab === section.id ? 'bg-white/20' : section.color}`}>
                   {section.icon}
                 </div>
                 <span className="font-bold text-sm">{section.title}</span>
               </button>
             ))}
             
             <div className="pt-6 mt-6 border-t border-slate-100">
                <button 
                  onClick={logout}
                  className="w-full flex items-center space-x-4 p-4 rounded-3xl text-rose-500 hover:bg-rose-50 transition-all font-bold text-sm"
                >
                  <div className="p-2 bg-rose-100 rounded-xl"><LogOut className="w-4 h-4" /></div>
                  <span>Logout</span>
                </button>
             </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-3">
          <div className="glass-card rounded-[3.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/5 border border-white/80">
            {activeTab === 'account' ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                   {/* Avatar Upload Preview */}
                   <div className="relative group">
                      <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl bg-slate-900 group-hover:scale-[1.02] transition-transform duration-500">
                         <img 
                            src={formData.photoUrl || avatarImg} 
                            className="w-full h-full object-cover"
                            alt="Preview"
                         />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-4 rounded-3xl shadow-2xl border-4 border-white">
                         <Camera className="w-5 h-5" />
                      </div>
                   </div>

                   <div className="flex-1 space-y-6 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Full Name</label>
                           <input 
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all"
                             placeholder="e.g. Alex Rivera"
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Email Address</label>
                           <input 
                             name="email"
                             type="email"
                             value={formData.email}
                             onChange={handleChange}
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all opacity-70"
                             disabled
                           />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Headline / Status</label>
                         <input 
                           name="headline"
                           value={formData.headline}
                           onChange={handleChange}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all"
                           placeholder="e.g. Senior Web Developer UI/UX"
                         />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 flex items-center justify-between">
                           Profile Photo URL
                           <span className="text-[9px] font-bold text-indigo-400 lowercase opacity-60">Uses your current photo if empty</span>
                        </label>
                        <div className="relative group">
                           <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                           <input 
                             name="photoUrl"
                             value={formData.photoUrl}
                             onChange={handleChange}
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-sm"
                             placeholder="https://images.unsplash.com/photo-..."
                           />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                   <div className="text-slate-400 text-xs font-medium flex items-center italic">
                      <Shield className="w-4 h-4 mr-2 text-indigo-400" />
                      Encrypted connection verified
                   </div>
                   <button 
                     type="submit" 
                     disabled={loading}
                     className="premium-btn text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center space-x-3 shadow-2xl shadow-indigo-600/20 hover:shadow-indigo-600/40 disabled:opacity-50 transition-all"
                   >
                     {loading ? (
                        <>
                           <Loader2 className="w-4 h-4 animate-spin" />
                           <span>Simulating...</span>
                        </>
                     ) : (
                        <>
                           <Save className="w-4 h-4" />
                           <span>Update Passport</span>
                        </>
                     )}
                   </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-40 space-y-4">
                 <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
                    <Shield className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Level 2 Clearances Required</h3>
                 <p className="text-slate-500 text-sm max-w-xs mx-auto">This section currently limited to University verified accounts. Contact the administration for Beta access.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
