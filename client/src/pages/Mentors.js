import React from 'react';
import { Star, MessageSquare, Linkedin, ExternalLink, ShieldCheck } from 'lucide-react';

const MENTORS_DATA = [
  { id: 1, name: 'Sarah Jenkins', role: 'Senior Product Designer', company: 'DesignCo', bio: 'Helping designers transition from junior to senior roles. 10+ years of experience.', rating: 4.9, reviews: 124, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', tags: ['UI/UX', 'Product Strategy'] },
  { id: 2, name: 'David Chen', role: 'Full Stack Engineer', company: 'TechScale', bio: 'Passionate about Scalable Architecture and React Performance.', rating: 5.0, reviews: 89, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', tags: ['React', 'Node.js', 'AWS'] },
  { id: 3, name: 'Elena Rodriguez', role: 'Marketing Director', company: 'GrowthX', bio: 'Specializing in SEO and high-conversion landing pages.', rating: 4.8, reviews: 56, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop', tags: ['SEO', 'Marketing'] },
];

export default function Mentors() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl mb-4">
          Learn from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Best</span>
        </h1>
        <p className="text-slate-600 text-lg md:text-xl">Connect with industry experts who will guide your professional journey.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['All', 'Design', 'Engineering', 'Marketing', 'Business', 'Career'].map(tag => (
          <button key={tag} className="px-5 py-2 glass-card rounded-full text-sm font-medium hover:bg-white transition-all hover:shadow-md">
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MENTORS_DATA.map((mentor) => (
          <div key={mentor.id} className="glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 group">
            <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 transform -skew-y-12 bg-white w-full h-full"></div>
            </div>
            
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-12 mb-4 inline-block">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg ring-1 ring-slate-200"
                />
                <div className="absolute bottom-1 right-1 bg-white p-1 rounded-lg shadow-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{mentor.name}</h3>
                  <p className="text-slate-500 font-medium text-sm">{mentor.role} @ {mentor.company}</p>
                </div>
                <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-700">{mentor.rating}</span>
                </div>
              </div>

              <p className="text-slate-600 mt-4 text-sm leading-relaxed line-clamp-2">
                {mentor.bio}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {mentor.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="premium-btn text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect</span>
                </button>
                <button className="flex items-center justify-center space-x-2 glass-card border border-slate-200 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-white/80 transition-all">
                  <ExternalLink className="w-4 h-4" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
