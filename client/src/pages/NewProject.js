import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NewProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Graphic Design');
  const [rewardCredits, setRewardCredits] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Graphic Design', 'Web Development', 'Content Writing', 
    'AI Data Tasks', 'Video Editing', 'Presentation Design', 'Research Assistance'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/projects', { title, description, category, rewardCredits });
      alert('Project posted successfully! Your credits are held until project approval.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post project. Do you have enough credits?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="w-full max-w-2xl glass-card rounded-3xl p-10 md:p-14 transition-all hover:shadow-2xl shadow-indigo-500/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-2xl text-amber-600 mb-6 font-extrabold text-2xl border border-amber-100 shadow-sm">
             $
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Post Your Task</h2>
          <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed">Find a talented peer to help you with your next assignment or project.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-semibold mb-8 flex items-center space-x-3">
             <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
             <span>{error}</span>
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="relative group">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">What do you need help with?</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans text-xl"
                placeholder="e.g., Redesign my resume, Build a React landing page"
              />
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Reward Credits (Held in Escrow)</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
                 <span className="text-xl mr-3">🟡</span>
                 <input
                    type="number"
                    required
                    min="1"
                    value={rewardCredits}
                    onChange={(e) => setRewardCredits(e.target.value)}
                    className="flex-1 bg-transparent border-none text-slate-900 font-extrabold text-2xl focus:outline-none focus:ring-0 p-0"
                 />
                 <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Credits</span>
              </div>
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Project Details</label>
              <textarea
                required
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans leading-relaxed"
                placeholder="Describe exactly what you need. Be specific about deliverables."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full premium-btn text-white py-5 rounded-3xl font-bold text-xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center space-x-3"
          >
            {loading ? 'Posting Project...' : (
              <>
                 <span>Launch Project</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
