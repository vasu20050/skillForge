import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User } from 'lucide-react';
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
  const { setUser } = useAuth(); // REPLACED REFRESHPROFILE RACE

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      
      // ORDER MATTERS: Token then User then Navigate
      localStorage.setItem('token', res.data.token);
      setUser(res.data); // Update global state immediately
      
      alert('Welcome aboard! 100 starter credits added to your account.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Use your official college email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-in-slide">
      {/* SHADOW CARD - RESTORED PREVIOUS UI */}
      <div className="w-full max-w-xl shadow-card p-10 md:p-14 mt-12 bg-white text-slate-800">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-xl text-indigo-600 mb-6 font-black text-2xl border border-indigo-100 shadow-sm">
            S
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Join the Campus Economy</h2>
          <p className="mt-2 text-slate-500 font-medium tracking-tight">Connect and grow with fellow students.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-semibold mb-8 flex items-center space-x-3">
             <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
             <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
               type="button"
               onClick={() => setRole('worker')}
               className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center space-y-2 group text-center ${role === 'worker' ? 'border-primary bg-indigo-50/30' : 'border-slate-100 bg-white'}`}
            >
               <Briefcase className={`w-5 h-5 ${role === 'worker' ? 'text-primary' : 'text-slate-400'}`} />
               <span className={`block text-sm font-bold ${role === 'worker' ? 'text-slate-900' : 'text-slate-500'}`}>I am an Expert</span>
            </button>
            <button
               type="button"
               onClick={() => setRole('client')}
               className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center space-y-2 group text-center ${role === 'client' ? 'border-primary bg-indigo-50/30' : 'border-slate-100 bg-white'}`}
            >
               <User className={`w-5 h-5 ${role === 'client' ? 'text-primary' : 'text-slate-400'}`} />
               <span className={`block text-sm font-bold ${role === 'client' ? 'text-slate-900' : 'text-slate-500'}`}>I am a Student</span>
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              placeholder="Full Name"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              placeholder="College Email"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-lg shadow-lg shadow-indigo-600/20 disabled:opacity-50 mt-4"
          >
            {loading ? 'Creating Account...' : 'Join SkillForge'}
          </button>

          <p className="text-center font-semibold text-slate-500 pt-6">
            Already a member? <Link to="/login" className="link-indigo">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
