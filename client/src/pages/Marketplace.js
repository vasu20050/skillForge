import React, { useState, useEffect } from 'react';
import api from '../api';
import { TrendingUp, Target, DollarSign, ChevronRight, Search, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Marketplace() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects?type=earn_real');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching marketplace projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Loading Campus Opportunities...</div>;

  const isVerified = user.mode_status === 'verified_earner';

  if (!isVerified) return (
      <div className="flex flex-col items-center justify-center p-20 glass-card rounded-[3rem] text-center max-w-xl mx-auto my-20">
          <ShieldCheck className="w-16 h-16 text-indigo-100 mb-6" />
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-snug">Verification Required</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
             The Earn Marketplace is restricted to verified campus talent. Please complete your learning path first.
          </p>
          <a href="/learn" className="premium-btn text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/20">
             Unlock Now
          </a>
      </div>
  );

  return (
    <div className="space-y-10 page-transition pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Earn Marketplace</h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl">
              High-impact projects by campus clubs, startups, and organizers. <span className="text-emerald-500 font-bold">Paid in credits.</span>
            </p>
          </div>
          
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full bg-slate-50 border border-slate-100 py-4 pl-14 pr-6 rounded-2xl font-bold text-sm focus:bg-white focus:border-indigo-200 transition-all shadow-sm"
            />
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="bg-slate-950 text-white p-10 rounded-[3rem] group relative overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-emerald-500/5 transition-all transition duration-500">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-400 font-black text-xl">
                        $
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            {project.category}
                        </div>
                        {project.is_fast_track && (
                            <div className="text-[8px] font-black uppercase tracking-tighter text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg flex items-center">
                                <Zap className="w-3 h-3 mr-1.5" /> Fast-Track Internship
                            </div>
                        )}
                    </div>
                </div>
                
                <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm font-medium mb-12 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-col space-y-6 mb-12">
                     <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Available Pool</span>
                        <span className="text-xl font-black text-emerald-400">{project.credits_total} CR</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                        <span>Milestones: Structured</span>
                        <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                </div>

                <a href={`/projects/${project._id}`} className="bg-emerald-500 text-black py-5 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                    Apply Project <ChevronRight className="w-4 h-4 ml-2" />
                </a>
            </div>
            
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px]"></div>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
          <div className="text-center p-20 glass-card rounded-[3rem]">
              <TrendingUp className="w-12 h-12 mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">Marketplace is quiet today. Check back soon!</p>
          </div>
      )}
    </div>
  );
}
