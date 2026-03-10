import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('worker');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      alert('Welcome on board! 100 starter credits have been added to your account.');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Use your official college domain.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="w-full max-w-xl glass-card rounded-3xl p-10 md:p-14 transition-all hover:shadow-2xl shadow-indigo-500/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl text-indigo-600 mb-6 font-extrabold text-2xl border border-indigo-100 shadow-sm">
            S
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Join the Campus Economy</h2>
          <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed">Connect, learn, and grow with your fellow students.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-semibold mb-8 flex items-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
               type="button"
               onClick={() => setRole('worker')}
               className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 group ${role === 'worker' ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white/40'}`}
            >
               <span className={`text-xl font-bold ${role === 'worker' ? 'text-indigo-700' : 'text-slate-400 group-hover:text-slate-600'}`}>Freelancer</span>
               <span className="text-xs font-semibold text-slate-400 text-center uppercase tracking-wider">Accept tasks</span>
            </button>
            <button
               type="button"
               onClick={() => setRole('client')}
               className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 group ${role === 'client' ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white/40'}`}
            >
               <span className={`text-xl font-bold ${role === 'client' ? 'text-indigo-700' : 'text-slate-400 group-hover:text-slate-600'}`}>Employer</span>
               <span className="text-xs font-semibold text-slate-400 text-center uppercase tracking-wider">Post tasks</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="Full Name"
              />
            </div>
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="College Email (name@college.edu)"
              />
            </div>
            <div className="relative group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full premium-btn text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-shadow mt-4"
          >
            Create Your Account
          </button>

          <p className="text-center font-semibold text-slate-500 pt-6">
            Member of the community? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
