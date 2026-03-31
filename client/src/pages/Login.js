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
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      await refreshProfile();
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid credentials. If you haven't registered yet, please join now using your college email.");
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your connection and try again.');
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
      await refreshProfile();
      navigate('/dashboard');
    } catch (err) {
      const apiDest = process.env.REACT_APP_API_URL || 'localhost:5000/api';
      const msg = err.response?.data?.message || err.message || 'Network Error';
      setError(`Failed connecting to ${apiDest}. Error: ${msg}`);
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="w-full max-w-md glass-card rounded-[3rem] p-10 md:p-14 transition-all hover:shadow-2xl shadow-indigo-500/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl text-slate-800 mb-6 font-extrabold text-2xl border border-slate-200">
            S
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed">Sign in to your SkillForge account.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-semibold mb-8 flex items-center space-x-3">
             <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
             <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans"
                placeholder="College Email"
              />
            </div>
            <div className="relative group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || guestLoading}
            className="w-full premium-btn text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-sm font-semibold">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Guest Button */}
          <button
            type="button"
            onClick={handleGuest}
            disabled={loading || guestLoading}
            className="w-full flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-300 hover:border-indigo-400 text-slate-700 hover:text-indigo-700 py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">👤</span>
            {guestLoading ? 'Starting session...' : 'Continue as Guest'}
          </button>
          <p className="text-center text-xs text-slate-400 -mt-3">No account needed · Read-only demo access</p>

          <p className="text-center font-semibold text-slate-500 pt-2">
            New to SkillForge? <Link to="/register" className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4">Join now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

