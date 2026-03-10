import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        setError('Failed to load projects. Ensure you are logged in.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleAccept = async (id) => {
    try {
      await api.post(`/projects/${id}/assign`);
      alert('Project accepted! View details in your dashboard.');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept project.');
    }
  };

  if (loading) return <div className="text-center p-20 text-slate-400 font-bold text-xl animate-pulse">Scanning the Campus Market...</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Open Opportunities</h1>
          <p className="mt-3 text-lg text-slate-500 font-medium italic">Handpicked projects from your fellow students.</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100 italic font-semibold text-indigo-700 text-sm">
           <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
           <span>Live Updates</span>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-50 text-red-600 rounded-3xl border border-red-100 font-bold text-center">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="glass-card p-20 text-center rounded-3xl border-dashed border-2 flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mb-6 text-3xl">☕</div>
          <p className="text-2xl font-bold text-slate-800">No active projects right now.</p>
          <p className="text-slate-500 font-medium mt-2">Why not be the first to post something?</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {projects.map((p) => (
            <div key={p._id} className="glass-card flex flex-col rounded-3xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 border-b-4 border-b-indigo-500 group">
              <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-slate-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                    {p.category}
                  </span>
                  <div className="text-xl font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-100">
                    🟡 {p.rewardParams.credits}
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-500 font-medium line-clamp-3 mb-6 leading-relaxed">
                  {p.description}
                </p>
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-700 font-bold uppercase text-xs">
                       {p.client?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Posted By</p>
                      <p className="text-sm font-bold text-slate-800 tracking-tight">{p.client?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8">
                {user && user.role === 'worker' && p.status === 'open' ? (
                  <button
                    onClick={() => handleAccept(p._id)}
                    className="w-full premium-btn text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all font-sans"
                  >
                    Accept Project
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-100 text-slate-400 py-4 rounded-2xl font-bold text-lg cursor-not-allowed"
                  >
                    {p.status === 'open' ? (user?.role === 'client' ? 'Client Restricted' : 'Login to Accept') : 'Already Assigned'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
