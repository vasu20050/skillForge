import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User, Sparkles, Mail, Lock, UserCircle, ArrowRight, ShieldCheck, AlertCircle, Zap } from 'lucide-react';
import api from '../api';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('worker');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      alert('Welcome aboard! 100 starter credits added to your account.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Use your official college email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000 relative">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-xl bg-[#0f1219] p-12 md:p-16 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.01] transition-opacity duration-1000"></div>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-[2rem] text-black mb-8 shadow-2xl shadow-emerald-500/20 group-hover:rotate-6 transition-transform duration-500">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Initialise Identity</h2>
          <p className="mt-3 text-slate-500 font-medium tracking-tight">Join the decentralized campus economy today.</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 text-rose-400 p-6 rounded-3xl border border-rose-500/20 text-xs font-black uppercase tracking-widest mb-10 flex items-start space-x-4">
             <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
             <span>{error}</span>
          </div>
        )}

        <form className="space-y-10" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-6">
            <button
               type="button"
               onClick={() => setRole('worker')}
               className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center justify-center space-y-3 group/chip relative overflow-hidden ${role === 'worker' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-white/5 bg-white/5 text-slate-500'}`}
            >
               <Briefcase className={`w-6 h-6 transition-transform group-hover/chip:scale-110 ${role === 'worker' ? 'text-emerald-400' : 'text-slate-600'}`} />
               <span className="block text-[10px] font-black uppercase tracking-widest">Technician</span>
               {role === 'worker' && <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>}
            </button>
            <button
               type="button"
               onClick={() => setRole('client')}
               className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center justify-center space-y-3 group/chip relative overflow-hidden ${role === 'client' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-white/5 bg-white/5 text-slate-500'}`}
            >
               <User className={`w-6 h-6 transition-transform group-hover/chip:scale-110 ${role === 'client' ? 'text-emerald-400' : 'text-slate-600'}`} />
               <span className="block text-[10px] font-black uppercase tracking-widest">Solutionist</span>
               {role === 'client' && <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>}
            </button>
          </div>

          <div className="space-y-5">
            <div className="relative group/input">
              <UserCircle className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within/input:text-emerald-500 transition-colors" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-[1.75rem] pl-16 pr-8 py-5 text-white font-medium placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm"
                placeholder="Operational Alias (Full Name)"
              />
            </div>
            <div className="relative group/input">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within/input:text-emerald-500 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-[1.75rem] pl-16 pr-8 py-5 text-white font-medium placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm"
                placeholder="College Email Protocol"
              />
            </div>
            <div className="relative group/input">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within/input:text-emerald-500 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-[1.75rem] pl-16 pr-8 py-5 text-white font-medium placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm"
                placeholder="Secure Access Key"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem]">
             <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-emerald-500 text-black rounded-xl flex items-center justify-center">
                   <Zap className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">Starter Credit Allocation</p>
                   <p className="text-[9px] font-medium text-emerald-500/60 uppercase tracking-widest">100.00 CR Ready for Claim</p>
                </div>
             </div>
             <div className="text-xl font-black text-emerald-500">+100</div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 group/btn mt-4"
          >
            {loading ? 'Processing Identity...' : 'Join the Forge'}
            <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest pt-4">
            Already verified? <Link to="/login" className="text-emerald-500 hover:text-emerald-400 transition-colors ml-2">Authenticate Identity</Link>
          </p>
        </form>
      </div>

      <div className="mt-12 flex items-center space-x-4 opacity-40 group hover:opacity-100 transition-opacity">
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Campus Compliance Verified: ISO-9001</p>
      </div>
    </div>
  );
}

