import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="w-full max-w-md glass-card rounded-3xl p-10 md:p-14 transition-all hover:shadow-2xl shadow-indigo-500/10">
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
            disabled={loading}
            className="w-full premium-btn text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <p className="text-center font-semibold text-slate-500 pt-6">
            New to SkillForge? <Link to="/register" className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4">Join now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
