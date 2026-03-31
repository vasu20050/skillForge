import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  
  // FIXED AUTH INJECTION (REMOVED REFRESHPROFILE RACE)
  const { setUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      
      // ORDER MATTERS: Token then User then Navigate
      localStorage.setItem('token', res.data.token);
      setUser(res.data); // Update global state immediately
      
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
      setUser(res.data); // Update global state immediately
      
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Network Error';
      setError(`Guest access failed: ${msg}. Try again in a few seconds.`);
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-in-slide">
      {/* SHADOW CARD - RESTORED PREVIOUS UI */}
      <div className="w-full max-w-md shadow-card p-10 mt-12 bg-white text-slate-800">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-xl text-indigo-600 mb-6 font-black text-2xl border border-indigo-100 shadow-sm">
            S
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="mt-2 text-slate-500 font-medium tracking-tight">Sign in to your SkillForge account.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-semibold mb-6 flex items-center space-x-2">
             <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
             <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans"
              placeholder="College Email"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading || guestLoading}
            className="w-full btn-primary text-lg shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {loading ? 'Entering...' : 'Sign In'}
          </button>

          <div className="flex items-center gap-4 my-2 text-[#94a3b8]">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-bold uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGuest}
            disabled={loading || guestLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border-2 border-dashed border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-600 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            👤 {guestLoading ? 'Starting...' : 'Continue as Guest'}
          </button>

          <div className="text-center pt-2">
             <p className="text-sm font-semibold text-slate-500">
               New to SkillForge? <Link to="/register" className="link-indigo">Join now</Link>
             </p>
          </div>
        </form>
      </div>
      <p className="text-center text-xs text-[#cbd5e1] mt-8 font-bold uppercase tracking-widest">
        Built for the Campus Economy
      </p>
    </div>
  );
}
