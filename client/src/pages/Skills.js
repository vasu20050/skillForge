import React, { useState } from 'react';
import { Search, Code, Palette, Megaphone, BarChart, HardHat, GraduationCap } from 'lucide-react';

const SKILLS_DATA = [
  { id: 1, name: 'Web Development', category: 'Tech', count: 124, icon: <Code className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'UI/UX Design', category: 'Design', count: 86, icon: <Palette className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
  { id: 3, name: 'Digital Marketing', category: 'Business', count: 52, icon: <Megaphone className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' },
  { id: 4, name: 'Data Science', category: 'Tech', count: 91, icon: <BarChart className="w-5 h-5" />, color: 'bg-emerald-100 text-emerald-600' },
  { id: 5, name: 'Project Management', category: 'Business', count: 43, icon: <HardHat className="w-5 h-5" />, color: 'bg-slate-100 text-slate-600' },
];

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = SKILLS_DATA.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Skills Catalog</h1>
          <p className="text-slate-500 mt-1 text-lg">Master new technologies and professional crafts.</p>
        </div>
        
        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search skills..." 
            className="w-full pl-10 pr-4 py-2.5 glass-card rounded-xl border-none focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div key={skill.id} className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
            <div className={`p-3 rounded-lg w-fit ${skill.color} mb-4 transition-transform group-hover:rotate-6`}>
              {skill.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-800">{skill.name}</h3>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {skill.category}
              </span>
              <span className="flex items-center text-sm text-slate-500 font-medium">
                <GraduationCap className="w-4 h-4 mr-1 text-indigo-500" />
                {skill.count} Courses
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
          <p className="text-indigo-100 mb-6 max-w-lg">Request a custom training path or suggest a new skill category for our community.</p>
          <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-lg shadow-indigo-900/20">
            Suggest a Skill
          </button>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 mr-8 mb-8 opacity-20">
          <Code size={120} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
