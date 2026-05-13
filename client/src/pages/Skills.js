import React, { useState } from 'react';
import { 
  Search, Code, Palette, Megaphone, BarChart, 
  HardHat, GraduationCap, Clock,  
  ArrowRight, BookOpen, CheckCircle2, PlayCircle, ChevronLeft, Plus, X, PlusCircle,
  Calendar, Camera, Mic2, Share2, Component, Download, Play, Zap, Network, Lock, Unlock, Medal
} from 'lucide-react';

const INITIAL_SKILLS = [
  { 
    id: 1, 
    name: 'Web Development', 
    category: 'Tech', 
    count: 4, 
    icon: <Code className="w-5 h-5" />, 
    color: 'bg-emerald-500/10 text-emerald-400',
    description: 'Master the art of building modern, responsive websites from scratch.',
    lessons: [
      { id: 'w1', title: 'HTML5 & Semantic Structure', duration: '1.5h', difficulty: 'Beginner', modules: 12 },
      { id: 'w2', title: 'Modern CSS & Flexbox/Grid', duration: '3.0h', difficulty: 'Beginner', modules: 18 },
      { id: 'w3', title: 'JavaScript ES6+ Deep Dive', duration: '5.5h', difficulty: 'Intermediate', modules: 25 },
      { id: 'w4', title: 'React.js Component Architecture', duration: '8.0h', difficulty: 'Advanced', modules: 42 }
    ]
  },
  { 
    id: 2, 
    name: 'UI/UX Design', 
    category: 'Design', 
    count: 4, 
    icon: <Palette className="w-5 h-5" />, 
    color: 'bg-emerald-500/10 text-emerald-400',
    description: 'Design intuitive digital experiences that users love.',
    lessons: [
      { id: 'u1', title: 'Introduction to Design Thinking', duration: '2.0h', difficulty: 'Beginner', modules: 8 },
      { id: 'u2', title: 'Figma Mastery: Autolayout & Components', duration: '4.5h', difficulty: 'Intermediate', modules: 15 },
      { id: 'u3', title: 'Visual Hierarchy & Typography', duration: '3.0h', difficulty: 'Beginner', modules: 10 },
      { id: 'u4', title: 'Advanced High-Fidelity Prototyping', duration: '6.0h', difficulty: 'Advanced', modules: 20 }
    ]
  },
  { 
    id: 3, 
    name: 'Digital Marketing', 
    category: 'Business', 
    count: 4, 
    icon: <Megaphone className="w-5 h-5" />, 
    color: 'bg-emerald-500/10 text-emerald-400',
    description: 'Learn the strategies to grow brands and reach millions online.',
    lessons: [
      { id: 'm1', title: 'SEO: Search Engine Optimization', duration: '3.5h', difficulty: 'Intermediate', modules: 14 },
      { id: 'm2', title: 'Social Media Strategy & Growth', duration: '2.5h', difficulty: 'Beginner', modules: 9 },
      { id: 'm3', title: 'Paid Ad Campaigns (Google & Meta)', duration: '5.0h', difficulty: 'Intermediate', modules: 18 },
      { id: 'm4', title: 'Marketing Analytics & KPI Tracking', duration: '4.0h', difficulty: 'Advanced', modules: 12 }
    ]
  },
  { 
    id: 4, 
    name: 'Data Science', 
    category: 'Tech', 
    count: 4, 
    icon: <BarChart className="w-5 h-5" />, 
    color: 'bg-emerald-500/10 text-emerald-400',
    description: 'Extract insights from data and build predictive models.',
    lessons: [
      { id: 'd1', title: 'Python for Data Analysis (Pandas)', duration: '4.5h', difficulty: 'Beginner', modules: 16 },
      { id: 'd2', title: 'Statistical Modeling Foundations', duration: '6.0h', difficulty: 'Intermediate', modules: 22 },
      { id: 'd3', title: 'Introduction to Machine Learning', duration: '8.0h', difficulty: 'Intermediate', modules: 30 },
      { id: 'd4', title: 'Deep Learning & Neural Networks', duration: '12.0h', difficulty: 'Advanced', modules: 45 }
    ]
  },
];

const NeuralMap = () => {
  const nodes = [
    { id: 'start', label: 'Beginner', x: 50, y: 50, status: 'unlocked', icon: <Zap className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend Master', x: 250, y: -50, status: 'unlocked', icon: <Code className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend Architect', x: 250, y: 150, status: 'locked', icon: <Lock className="w-4 h-4" /> },
    { id: 'design', label: 'Design Sensei', x: 450, y: 50, status: 'locked', icon: <Palette className="w-4 h-4" /> },
    { id: 'diamond', label: 'Fullstack Diamond', x: 700, y: 50, status: 'locked', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div className="relative w-full h-[350px] bg-[#0f1219] rounded-[3rem] overflow-hidden mb-12 border border-white/5 shadow-2xl group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="absolute top-10 left-10 z-10">
        <h2 className="text-white text-2xl font-black flex items-center tracking-tight uppercase">
          <Network className="w-7 h-7 mr-3 text-emerald-400 animate-pulse" />
          Neural Pathfinding
        </h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">AI-Powered Skill Progression</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center translate-x-[-150px]">
        <svg className="absolute inset-0 w-full h-full">
          {/* Connections */}
          <line x1="120" y1="150" x2="320" y2="50" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" strokeDasharray="4" />
          <line x1="120" y1="150" x2="320" y2="250" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="2" />
          <line x1="320" y1="50" x2="520" y2="150" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="2" />
          <line x1="320" y1="250" x2="520" y2="150" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="2" />
        </svg>

        {nodes.map(node => (
          <div 
            key={node.id}
            className="absolute transition-all duration-700 hover:scale-110 cursor-pointer"
            style={{ left: node.x + 70, top: node.y + 100 }}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border ${
              node.status === 'unlocked' 
              ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400 shadow-emerald-500/20' 
              : 'bg-white/5 border-white/10 text-slate-700'
            }`}>
              {node.status === 'unlocked' ? node.icon : <Lock className="w-5 h-5" />}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap">
              <span className={`text-[10px] font-black uppercase tracking-widest ${node.status === 'unlocked' ? 'text-emerald-400' : 'text-slate-700'}`}>
                {node.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-10 right-10 bg-black/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hidden md:block">
        <div className="flex gap-10">
          <div>
            <div className="text-emerald-400 text-2xl font-black tabular-nums">2/12</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Unlocked</div>
          </div>
          <div className="w-px bg-white/5"></div>
          <div>
            <div className="text-white text-2xl font-black">84%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Next: Backend</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Tech',
    description: '',
    lessons: []
  });

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSkill = (e) => {
    e.preventDefault();
    const id = skills.length + 1;
    const skillToAdd = {
      ...newSkill,
      id,
      count: 0,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'bg-emerald-500/10 text-emerald-400',
      lessons: [
        { id: `${id}-1`, title: 'Introduction to ' + newSkill.name, duration: '1.0h', difficulty: 'Beginner', modules: 5 }
      ]
    };
    setSkills([...skills, skillToAdd]);
    setShowCreateModal(false);
    setNewSkill({ name: '', category: 'Tech', description: '', lessons: [] });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 relative">
      
      {selectedSkill ? (
        <div className="space-y-10 animate-in fade-in duration-500">
          <button 
            onClick={() => setSelectedSkill(null)}
            className="flex items-center text-slate-500 hover:text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </button>

          <div className="bg-[#0f1219] rounded-[3.5rem] p-12 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
              <div className={`p-8 rounded-[2rem] ${selectedSkill.color} border border-emerald-500/20 shadow-2xl shadow-emerald-500/10`}>
                {React.cloneElement(selectedSkill.icon, { className: 'w-10 h-10' })}
              </div>
              <div className="space-y-6 max-w-2xl">
                <h1 className="text-5xl font-black text-white tracking-tight uppercase font-heading">{selectedSkill.name}</h1>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">{selectedSkill.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-black text-white flex items-center uppercase tracking-widest">
              <BookOpen className="w-6 h-6 mr-3 text-emerald-400" />
              Curriculum
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {selectedSkill.lessons.map((lesson, idx) => (
                <div key={lesson.id} className="bg-[#0f1219] p-8 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/30 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 font-black text-lg group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors mb-2 uppercase tracking-tight">{lesson.title}</h3>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-4">
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {lesson.duration}</span>
                        <span className="flex items-center"><Medal className="w-3 h-3 mr-1.5" /> {lesson.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setActiveVideo({ ...lesson, skillName: selectedSkill.name })}
                      className="px-8 py-3 bg-emerald-500 text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
                    >
                      Watch Lesson
                    </button>
                    <button className="p-3 bg-white/5 text-slate-500 hover:text-white rounded-xl transition-all border border-white/5">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <NeuralMap />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-white tracking-tight uppercase font-heading">Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Catalog</span>.</h1>
              <p className="text-slate-400 text-lg font-medium">Master new technologies and professional crafts.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search skills..." 
                  className="w-full bg-[#0f1219] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-4 bg-emerald-500 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Plus className="w-5 h-5" />
                <span>Create Skill</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((skill) => (
              <div 
                key={skill.id} 
                onClick={() => setSelectedSkill(skill)}
                className="bg-[#0f1219] p-10 rounded-[3rem] border border-white/10 hover:border-emerald-500/30 transition-all duration-500 cursor-pointer group shadow-2xl relative overflow-hidden"
              >
                <div className={`p-5 rounded-2xl w-fit ${skill.color} border border-emerald-500/20 mb-8 transition-transform group-hover:rotate-12`}>
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{skill.name}</h3>
                <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-8 leading-relaxed">{skill.description}</p>
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-slate-500 rounded-lg">
                    {skill.category}
                  </span>
                  <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-emerald-400 transition-colors">
                    Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[3.5rem] p-16 text-black relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Can't find your craft?</h2>
              <p className="text-black/60 mb-10 text-lg font-bold max-w-md">Request a custom training path or suggest a new category to our mentors.</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-black text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Suggest a Skill
              </button>
            </div>
            <Network className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 text-black/10" />
          </div>
        </>
      )}

      {/* MODALS */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0f1219] w-full max-w-lg rounded-[3rem] p-10 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Create Skill</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-500 hover:text-white transition-colors"><X /></button>
            </div>
            <form onSubmit={handleCreateSkill} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Skill Title</label>
                <input required placeholder="e.g., Advanced Solidity" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</label>
                <textarea required placeholder="What will students learn?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors h-32 resize-none" value={newSkill.description} onChange={(e) => setNewSkill({...newSkill, description: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-5 bg-emerald-500 text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Create Skill</button>
            </form>
          </div>
        </div>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl bg-black border border-white/10 flex flex-col md:flex-row h-full max-h-[85vh]">
            <div className="flex-grow bg-black relative flex items-center justify-center">
              <video key={activeVideo.id} controls autoPlay className="w-full h-full object-contain shadow-2xl">
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-8 left-8">
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-white font-black text-xs uppercase tracking-widest">
                  {activeVideo.title}
                </div>
              </div>
            </div>
            <div className="w-full md:w-96 bg-[#0f1219] p-10 border-l border-white/10 overflow-y-auto">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-white font-black text-xl uppercase tracking-tight">Curriculum</h3>
                  <button onClick={() => setActiveVideo(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all"><X className="w-6 h-6" /></button>
               </div>
               <div className="space-y-4">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className={`p-5 rounded-2xl border transition-all cursor-pointer group ${i === 1 ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}>
                      <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${i === 1 ? 'text-black/60' : 'text-slate-600'}`}>Module 0{i}</div>
                      <div className="text-sm font-black uppercase tracking-tight line-clamp-1">{i === 1 ? activeVideo.title : `Advanced Concept ${i}`}</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
