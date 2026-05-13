import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Award, Target, Github, CheckCircle2, Play, Lock } from 'lucide-react';

// Mock data for initial state/preview
const MOCK_TRACKS = [
  { _id: '1', title: 'React Mastery', category: 'Frontend', description: 'Master the fundamentals of React including hooks, state management, and component architecture.', credits_total: 500, proof_requirements: ['GitHub Repo', 'Live Demo'], progress: 65 },
  { _id: '2', title: 'Backend with Node.js', category: 'Backend', description: 'Build scalable APIs using Express, MongoDB, and JWT authentication.', credits_total: 750, proof_requirements: ['GitHub Repo'], progress: 30 },
  { _id: '3', title: 'UI/UX Principles', category: 'Design', description: 'Learn the core principles of modern UI design, typography, and color theory.', credits_total: 300, proof_requirements: ['Figma Link'], progress: 0 },
];

export default function LearnMode() {
  const [projects, setProjects] = useState(MOCK_TRACKS);
  const [loading, setLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);

  // In a real app, you would fetch these from your API
  // useEffect(() => { ... }, []);

  if (loading) return <div className="p-10 text-center font-black text-emerald-400 animate-pulse uppercase tracking-widest">Initialising Skill Tracks...</div>;

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            <Target className="w-4 h-4" />
            <span>Skill Lab</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-none uppercase font-heading">
            Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Mode</span>.
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Build your <span className="text-emerald-400 font-black italic">Proof-of-Work</span> through risk-free projects seeded by campus mentors.
          </p>
        </div>
        <div className="hidden lg:flex gap-4">
           <div className="bg-[#0f1219] p-6 rounded-3xl border border-white/5 text-center w-32 shadow-2xl">
              <div className="text-2xl font-black text-white mb-1">12</div>
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Tracks Available</div>
           </div>
           <div className="bg-[#0f1219] p-6 rounded-3xl border border-emerald-500/20 text-center w-32 shadow-2xl">
              <div className="text-2xl font-black text-emerald-400 mb-1">4.8</div>
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Avg. Rating</div>
           </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project._id} 
            className="bg-[#0f1219] p-8 rounded-[2.5rem] flex flex-col group border border-white/10 hover:border-emerald-500/30 transition-all shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-[0.02] rounded-bl-[5rem] group-hover:opacity-[0.05] transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="p-4 bg-white/5 text-emerald-400 rounded-2xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                {project.category}
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-white mb-4 leading-tight uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-400 text-sm font-medium mb-8 flex-grow line-clamp-3 leading-relaxed">
              {project.description}
            </p>

            {/* Progress Section */}
            <div className="mb-8 space-y-3">
               <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Track Progress</span>
                  <span className="text-emerald-400">{project.progress}%</span>
               </div>
               <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all duration-1000" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
               </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-white">
                    <Award className="w-4 h-4 mr-3 text-amber-400" />
                    REWARD: {project.credits_total} CR
                </div>
                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <Github className="w-4 h-4 mr-3" />
                    REQUIRES: {project.proof_requirements.join(', ')}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => alert('Launching Guide...')}
                className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all border border-white/10"
              >
                <Play className="w-3 h-3 mr-2" /> Guide
              </button>
              <button 
                onClick={() => setActiveQuiz(project)}
                className="py-4 bg-emerald-500 text-black rounded-xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Quiz {project.progress < 100 && <Lock className="w-3 h-3 ml-2 opacity-50" />}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
          <div className="text-center p-20 bg-[#0f1219] rounded-[3.5rem] border border-white/10 shadow-2xl">
              <BookOpen className="w-16 h-16 mx-auto text-slate-700 mb-6" />
              <p className="text-slate-500 font-black uppercase tracking-widest">No tracks available yet. Admin seeding in progress...</p>
          </div>
      )}

      {/* Quiz Modal Mockup */}
      {activeQuiz && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[2000] flex items-center justify-center p-4">
          <div className="bg-[#0f1219] w-full max-w-lg border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-8 border-b border-white/5 bg-black/20 flex justify-between items-center">
                <div>
                   <h3 className="text-lg font-black text-white uppercase tracking-widest">Skill Assessment</h3>
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1">{activeQuiz.title}</p>
                </div>
                <button onClick={() => setActiveQuiz(null)} className="text-slate-500 hover:text-white transition-colors">
                   <Lock className="w-6 h-6" />
                </button>
             </div>
             <div className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                   <Lock className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">Quiz Locked</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                   You must complete at least 80% of the course guide before you can attempt the final skill assessment.
                </p>
                <div className="pt-4">
                   <button 
                     onClick={() => setActiveQuiz(null)}
                     className="w-full py-4 bg-emerald-500 text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                   >
                     Back to Guide
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

