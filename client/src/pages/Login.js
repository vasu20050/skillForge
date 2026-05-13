import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../hooks/useAuth';
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  
  const { setUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid credentials. Please join SkillForge using your college email.");
      } else {
        const msg = err.response?.data?.message || err.message || 'Network Error';
        setError(`Connection Failed: ${msg}. Check if backend is awake.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setError('');
    setGuestLoading(true);
    try {
      const res = await api.post('/auth/guest');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isGuest', 'true');
      setUser(res.data); 
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Network Error';
      setError(`Instant access unavailable: ${msg}. Try regular login.`);
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000 relative">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-md bg-[#0f1219] p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.01] transition-opacity duration-1000"></div>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-[2rem] text-black mb-8 shadow-2xl shadow-emerald-500/20 group-hover:rotate-6 transition-transform duration-500">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Auth Gateway</h2>
          <p className="mt-3 text-slate-500 font-medium tracking-tight">Enter your credentials to access the forge.</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 text-rose-400 p-6 rounded-3xl border border-rose-500/20 text-xs font-black uppercase tracking-widest mb-10 flex items-start space-x-4">
             <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
             <span>{error}</span>
          </div>
        )}

        <form className="space-y-8" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div className="relative group/input">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within/input:text-emerald-500 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-[1.75rem] pl-16 pr-8 py-5 text-white font-medium placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm"
                placeholder="College Email"
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
                placeholder="Access Password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || guestLoading}
            className="w-full btn-primary disabled:opacity-50 group/btn"
          >
            {loading ? 'Decrypting...' : 'Authenticate'}
            <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-6 my-4">
            <div className="flex-1 h-px bg-white/5"></div>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">OR</span>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <button
            type="button"
            onClick={handleGuest}
            disabled={loading || guestLoading}
            className="w-full flex items-center justify-center gap-4 bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 py-5 rounded-[1.75rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50"
          >
            <User className="w-5 h-5" />
            {guestLoading ? 'Allocating Space...' : 'Anonymous Access'}
          </button>

          <div className="text-center pt-4">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
               New to the protocol? <Link to="/register" className="text-emerald-500 hover:text-emerald-400 transition-colors ml-2">Register Identity</Link>
             </p>
          </div>
        </form>
      </div>
      
      <div className="mt-12 flex items-center space-x-4 opacity-40 group hover:opacity-100 transition-opacity">
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Secured Connection: RSA-4096</p>
      </div>
    </div>
  );
}

