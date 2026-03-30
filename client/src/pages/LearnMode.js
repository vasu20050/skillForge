import React, { useState, useEffect } from 'react';
import api from '../api';
import { BookOpen, ChevronRight, Award, Target, Github, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LearnMode() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects?type=learn_dummy');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching learn projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Loading Skill Tracks...</div>;

  return (
    <div className="space-y-10 page-transition pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Learn Mode</h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl">
          Risk-free projects seeded by campus admins to help you build your <span className="text-indigo-600 font-bold">Proof-of-Work</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="glass-card p-8 rounded-[2.5rem] flex flex-col group border-indigo-50 hover:border-indigo-200">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50 px-3 py-1 rounded-full">
                {project.category}
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight">{project.title}</h3>
            <p className="text-slate-500 text-sm font-medium mb-8 flex-grow line-clamp-3">
              {project.description}
            </p>

            <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm font-bold text-slate-700">
                    <Award className="w-4 h-4 mr-2 text-amber-500" />
                    Reward: {project.credits_total} Credits
                </div>
                <div className="flex items-center text-xs font-bold text-slate-400">
                    <Github className="w-4 h-4 mr-2" />
                    Required: {project.proof_requirements.join(', ')}
                </div>
            </div>

            <a href={`/projects/${project._id}`} className="premium-btn text-white py-4 rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-widest group-hover:shadow-xl transition-all">
              View Guide <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
          <div className="text-center p-20 glass-card rounded-[3rem]">
              <BookOpen className="w-12 h-12 mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">No tracks available yet. Admin seeding in progress...</p>
          </div>
      )}
    </div>
  );
}
