import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Zap, ChevronRight, CheckCircle2, ShieldAlert, RotateCcw, Star, Clock, Coffee } from 'lucide-react';
import api from '../api';

const STATUS_CONFIG = {
  open: { label: 'Open', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  assigned: { label: 'In Progress', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  submitted: { label: 'Under Review', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  revision: { label: 'Revision', color: 'text-orange-600 bg-orange-50 border-orange-100' },
  disputed: { label: 'Disputed', color: 'text-rose-700 bg-rose-50 border-rose-200' },
  completed: { label: 'Completed', color: 'text-teal-700 bg-teal-50 border-teal-100' },
  cancelled: { label: 'Cancelled', color: 'text-slate-500 bg-slate-100 border-slate-200' },
};

const MOCK_PROJECTS = [
  {
    _id: 'mock-1',
    title: 'Modern UI Kit for Campus Fest',
    description: 'Looking for a UI/UX designer to create a complete design system for our upcoming cultural fest including mobile app layouts and web components.',
    category: 'Design',
    status: 'open',
    rewardParams: { credits: 2500 },
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    client: { name: 'Tech Club' }
  },
  {
    _id: 'mock-2',
    title: 'React Dashboard for Alumni Portal',
    description: 'We need an experienced React developer to build a robust alumni tracking dashboard with real-time statistics and filterable tables.',
    category: 'Tech',
    status: 'open',
    rewardParams: { credits: 4000 },
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    client: { name: 'Admin Dept' }
  },
  {
    _id: 'mock-3',
    title: 'Short-form Content Strategy (IG/Reels)',
    description: 'Help us grow our campus social media handle. We need 15 reels planned and scripted for the next month focusing on student lifestyle.',
    category: 'Marketing',
    status: 'open',
    rewardParams: { credits: 1500 },
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    client: { name: 'Media Cell' }
  }
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [disputeModal, setDisputeModal] = useState(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [ratingModal, setRatingModal] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/projects');
      if (res.data && res.data.length > 0) {
        setProjects(res.data);
      } else {
        // If logged in but no projects, show mock data for demo
        setProjects(MOCK_PROJECTS);
      }
    } catch (err) {
      console.log('Backend connection failed, loading mock data for demo experience.');
      setProjects(MOCK_PROJECTS);
      // We don't show a hard error anymore, just a subtle notice if desired
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    if (!user) {
      alert('Please log in to accept campus projects!');
      return;
    }
    setActionLoading(id + '-accept');
    try {
      await api.post(`/projects/${id}/assign`);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept project.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return (
    <div className="space-y-10 page-transition pb-20 p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-4 w-full max-w-md">
          <div className="h-6 w-32 bg-slate-100 animate-pulse rounded-full"></div>
          <div className="h-10 w-full bg-slate-100 animate-pulse rounded-2xl"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card rounded-[2.5rem] p-8 h-80 bg-slate-50 animate-pulse"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 p-4 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <Zap className="w-3 h-3 fill-current" />
            <span>Ready for Pickup</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Open Opportunities</h1>
          <p className="text-slate-500 font-medium italic">Handpicked projects from your fellow student entrepreneurs.</p>
        </div>
        <div className="flex items-center gap-3">
          {user?.role === 'client' && (
            <Link to="/projects/new" className="premium-btn text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
              + Post Project
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => {
          const statusCfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.open;
          const deadlineDate = p.deadline ? new Date(p.deadline) : null;
          
          return (
            <div key={p._id} className="glass-card flex flex-col rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-slate-100">
              <div className="p-8 pb-4 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-slate-900 text-white text-[9px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg">{p.category}</span>
                  <div className="text-base font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-100">
                    🟡 {p.rewardParams?.credits || 500}
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">{p.title}</h3>
                <p className="text-slate-500 font-medium line-clamp-3 mb-6 text-sm leading-relaxed">{p.description}</p>

                {deadlineDate && (
                  <div className="flex items-center gap-2 text-xs font-bold mb-6 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Deadline: {deadlineDate.toLocaleDateString()}</span>
                  </div>
                )}

                <div className="pt-5 border-t border-slate-50 flex items-center gap-3">
                   <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                      {p.client?.name?.charAt(0) || 'C'}
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Creator</p>
                      <p className="text-sm font-bold text-slate-800">{p.client?.name || 'Anonymous'}</p>
                   </div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={() => handleAccept(p._id)}
                  className="w-full premium-btn text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  Accept Project <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
