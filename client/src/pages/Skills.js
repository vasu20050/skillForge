import React, { useState } from 'react';
import { 
  Search, Code, Palette, Megaphone, BarChart, 
  HardHat, GraduationCap, Clock,  
  ArrowRight, BookOpen, CheckCircle2, PlayCircle, ChevronLeft, Plus, X, PlusCircle,
  Calendar, Camera, Mic2, Share2, Component, Download, Play, Zap, Network, Lock, Unlock
} from 'lucide-react';

const INITIAL_SKILLS = [
  { 
    id: 1, 
    name: 'Web Development', 
    category: 'Tech', 
    count: 4, 
    icon: <Code className="w-5 h-5" />, 
    color: 'bg-blue-100 text-blue-600',
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
    color: 'bg-purple-100 text-purple-600',
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
    color: 'bg-orange-100 text-orange-600',
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
    color: 'bg-emerald-100 text-emerald-600',
    description: 'Extract insights from data and build predictive models.',
    lessons: [
      { id: 'd1', title: 'Python for Data Analysis (Pandas)', duration: '4.5h', difficulty: 'Beginner', modules: 16 },
      { id: 'd2', title: 'Statistical Modeling Foundations', duration: '6.0h', difficulty: 'Intermediate', modules: 22 },
      { id: 'd3', title: 'Introduction to Machine Learning', duration: '8.0h', difficulty: 'Intermediate', modules: 30 },
      { id: 'd4', title: 'Deep Learning & Neural Networks', duration: '12.0h', difficulty: 'Advanced', modules: 45 }
    ]
  },
  { 
    id: 5, 
    name: 'Project Management', 
    category: 'Business', 
    count: 4, 
    icon: <HardHat className="w-5 h-5" />, 
    color: 'bg-slate-100 text-slate-600',
    description: 'Lead teams effectively and deliver complex projects on time.',
    lessons: [
      { id: 'p1', title: 'Agile & Scrum Methodologies', duration: '3.0h', difficulty: 'Beginner', modules: 10 },
      { id: 'p2', title: 'Project Planning & Risk Mitigation', duration: '4.5h', difficulty: 'Intermediate', modules: 14 },
      { id: 'p3', title: 'Stakeholder Management', duration: '2.5h', difficulty: 'Beginner', modules: 8 }
    ]
  },
  { 
    id: 6, 
    name: 'Artificial Intelligence', 
    category: 'Tech', 
    count: 5, 
    icon: <BarChart className="w-5 h-5" />, 
    color: 'bg-purple-100 text-purple-600',
    description: 'Explore the world of neural networks and generative AI models.',
    lessons: [
      { id: 'ai1', title: 'Generative AI & LLM Prompting', duration: '3.5h', difficulty: 'Beginner', modules: 10 },
      { id: 'ai2', title: 'Natural Language Processing', duration: '5.5h', difficulty: 'Advanced', modules: 18 }
    ]
  },
  { 
    id: 7, 
    name: 'Cyber Security', 
    category: 'Tech', 
    count: 5, 
    icon: <CheckCircle2 className="w-5 h-5" />, 
    color: 'bg-rose-100 text-rose-600',
    description: 'Protect digital assets and learn ethical hacking techniques.',
    lessons: [
      { id: 'cs1', title: 'Network Security Basics', duration: '3.0h', difficulty: 'Beginner', modules: 10 },
      { id: 'cs2', title: 'Ethical Hacking 101', duration: '7.5h', difficulty: 'Advanced', modules: 25 }
    ]
  },
  { 
    id: 10, 
    name: 'Event Management', 
    category: 'College', 
    count: 4, 
    icon: <Calendar className="w-5 h-5" />, 
    color: 'bg-indigo-100 text-indigo-600',
    description: 'Learn to organize, coordinate, and execute large-scale campus events and fests.',
    lessons: [
      { id: 'ev1', title: 'Budgeting & Sponsorship', duration: '3.0h', difficulty: 'Beginner', modules: 8 },
      { id: 'ev2', title: 'Logistics & Vendor Management', duration: '4.5h', difficulty: 'Intermediate', modules: 12 }
    ]
  },
  { 
    id: 11, 
    name: 'Photography & Cinematography', 
    category: 'Media', 
    count: 5, 
    icon: <Camera className="w-5 h-5" />, 
    color: 'bg-rose-100 text-rose-600',
    description: 'Capture campus moments with professional techniques.',
    lessons: [
      { id: 'ph1', title: 'Manual Mode Mastery', duration: '2.5h', difficulty: 'Beginner', modules: 10 },
      { id: 'ph2', title: 'Video Editing for Reels', duration: '6.0h', difficulty: 'Advanced', modules: 20 }
    ]
  },
  { 
    id: 12, 
    name: 'Public Speaking & Debate', 
    category: 'Soft Skills', 
    count: 3, 
    icon: <Mic2 className="w-5 h-5" />, 
    color: 'bg-amber-100 text-amber-600',
    description: 'Master the art of persuasion and rhetoric.',
    lessons: [
      { id: 'ps1', title: 'Overcoming Stage Fright', duration: '1.5h', difficulty: 'Beginner', modules: 5 },
      { id: 'ps2', title: 'Structuring a Winning Argument', duration: '3.5h', difficulty: 'Intermediate', modules: 10 }
    ]
  },
  { 
    id: 13, 
    name: 'Social Media Growth', 
    category: 'Marketing', 
    count: 4, 
    icon: <Share2 className="w-5 h-5" />, 
    color: 'bg-blue-100 text-blue-600',
    description: 'Manage campus club handles and grow organic reach.',
    lessons: [
      { id: 'sg1', title: 'Algorithm Secrets (IG & LinkedIn)', duration: '2.5h', difficulty: 'Beginner', modules: 9 },
      { id: 'sg2', title: 'Creating Viral Content', duration: '4.0h', difficulty: 'Intermediate', modules: 14 }
    ]
  },
  { 
    id: 14, 
    name: 'Poster & Flyer Design', 
    category: 'Design', 
    count: 3, 
    icon: <Palette className="w-5 h-5" />, 
    color: 'bg-emerald-100 text-emerald-600',
    description: 'Create eye-catching visuals for campus fests.',
    lessons: [
      { id: 'pd1', title: 'Canva vs Illustrator for Posters', duration: '2.0h', difficulty: 'Beginner', modules: 8 }
    ]
  }
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
    <div className="relative w-full h-[300px] bg-slate-900 rounded-[3rem] overflow-hidden mb-12 border border-white/5 shadow-2xl group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="absolute top-8 left-10 z-10">
        <h2 className="text-white text-xl font-black flex items-center tracking-tight">
          <Network className="w-6 h-6 mr-3 text-indigo-400 animate-pulse" />
          Neural Pathfinding
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">AI-Powered Career Progression</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center translate-x-[-150px]">
        <svg className="absolute inset-0 w-full h-full">
          {/* Connections */}
          <line x1="120" y1="150" x2="320" y2="50" stroke="rgba(129, 140, 248, 0.3)" strokeWidth="2" strokeDasharray="4" />
          <line x1="120" y1="150" x2="320" y2="250" stroke="rgba(129, 140, 248, 0.1)" strokeWidth="2" />
          <line x1="320" y1="50" x2="520" y2="150" stroke="rgba(129, 140, 248, 0.1)" strokeWidth="2" />
          <line x1="320" y1="250" x2="520" y2="150" stroke="rgba(129, 140, 248, 0.1)" strokeWidth="2" />
        </svg>

        {nodes.map(node => (
          <div 
            key={node.id}
            className="absolute transition-all duration-700 hover:scale-110 cursor-pointer"
            style={{ left: node.x + 70, top: node.y + 100 }}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md border ${
              node.status === 'unlocked' 
              ? 'bg-indigo-600/20 border-indigo-400 text-indigo-400 shadow-indigo-500/20' 
              : 'bg-white/5 border-white/10 text-slate-600'
            }`}>
              {node.status === 'unlocked' ? node.icon : <Lock className="w-4 h-4" />}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap">
              <span className={`text-[10px] font-black uppercase tracking-tighter ${node.status === 'unlocked' ? 'text-indigo-400' : 'text-slate-600'}`}>
                {node.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-8 right-10 bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 hidden md:block">
        <div className="flex gap-8">
          <div>
            <div className="text-indigo-400 text-xl font-black">2/12</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nodes Unlocked</div>
          </div>
          <div>
            <div className="text-white text-xl font-black">84%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Next Node: Backend</div>
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
    const colors = [
      'bg-indigo-100 text-indigo-600',
      'bg-rose-100 text-rose-600',
      'bg-cyan-100 text-cyan-600',
      'bg-amber-100 text-amber-600'
    ];
    const skillToAdd = {
      ...newSkill,
      id,
      count: 0,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: colors[id % colors.length],
      lessons: [
        { id: `${id}-1`, title: 'Introduction to ' + newSkill.name, duration: '1.0h', difficulty: 'Beginner', modules: 5 }
      ]
    };
    setSkills([...skills, skillToAdd]);
    setShowCreateModal(false);
    setNewSkill({ name: '', category: 'Tech', description: '', lessons: [] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 relative">
      
      {selectedSkill ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <button 
            onClick={() => setSelectedSkill(null)}
            className="flex items-center text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </button>

          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className={`p-6 rounded-3xl ${selectedSkill.color} shadow-lg shadow-indigo-500/10`}>
                {selectedSkill.icon}
              </div>
              <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{selectedSkill.name}</h1>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">{selectedSkill.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
              Course Curriculum
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {selectedSkill.lessons.map((lesson, idx) => (
                <div key={lesson.id} className="glass-card p-6 rounded-[2rem] border border-transparent hover:border-indigo-100 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">{lesson.title}</h3>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {lesson.duration} &bull; {lesson.difficulty}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setActiveVideo({ ...lesson, skillName: selectedSkill.name })}
                      className="premium-btn text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/10"
                    >
                      Watch Lesson
                    </button>
                    <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-100">
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Skills Catalog</h1>
              <p className="text-slate-500 mt-1 text-lg font-medium">Master new technologies and professional crafts.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative group max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search skills..." 
                  className="w-full pl-12 pr-4 py-3.5 glass-card rounded-2xl border-none outline-none font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="premium-btn text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2"
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
                className="glass-card p-8 rounded-[2.5rem] hover:scale-[1.03] transition-all duration-500 cursor-pointer group border-b-4 border-b-transparent hover:border-b-indigo-500"
              >
                <div className={`p-4 rounded-2xl w-fit ${skill.color} mb-6 transition-transform group-hover:rotate-12`}>
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{skill.name}</h3>
                <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-6">{skill.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-50 text-slate-500 rounded-lg">
                    {skill.category}
                  </span>
                  <span className="flex items-center text-xs font-bold text-slate-400 group-hover:text-indigo-600">
                    Learn More <ArrowRight className="w-3 h-3 ml-1.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-[3rem] p-12 bg-gradient-to-br from-indigo-600 to-violet-800 text-white relative overflow-hidden shadow-2xl">
            <h2 className="text-3xl font-black mb-4">Can't find it?</h2>
            <p className="text-indigo-100/80 mb-8 font-medium">Request a custom training path or suggest a category.</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-indigo-600 px-8 py-3.5 rounded-2xl font-black text-sm uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Suggest a Skill
            </button>
          </div>
        </>
      )}

      {/* MODALS */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-card w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-900">Create Skill</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={handleCreateSkill} className="space-y-6">
              <input required placeholder="Skill Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} />
              <textarea required placeholder="Brief Description" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 h-24" value={newSkill.description} onChange={(e) => setNewSkill({...newSkill, description: e.target.value})} />
              <button type="submit" className="w-full premium-btn text-white py-4 rounded-2xl font-bold">Create Skill</button>
            </form>
          </div>
        </div>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 bg-slate-900/80 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="glass-card w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 bg-black flex flex-col md:flex-row h-full max-h-[85vh]">
            <div className="flex-grow bg-black relative">
              <video key={activeVideo.id} controls autoPlay className="w-full h-full object-contain">
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-6 left-6">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-bold text-sm">
                  {activeVideo.title}
                </div>
              </div>
            </div>
            <div className="w-full md:w-80 bg-slate-900/90 p-8 border-l border-white/5 overflow-y-auto">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-white font-bold text-lg">Curriculum</h3>
                  <button onClick={() => setActiveVideo(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className={`p-4 rounded-2xl border transition-all ${i === 1 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Module 0{i}</div>
                      <div className="text-sm font-bold line-clamp-1">{i === 1 ? activeVideo.title : `Advanced Lesson ${i}`}</div>
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