import React from 'react';
import { Target, Users, Code, Award, Zap, Globe } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Active Users', value: '25K+', icon: <Users className="w-5 h-5 text-indigo-500" /> },
    { label: 'Projects Built', value: '12K+', icon: <Code className="w-5 h-5 text-emerald-500" /> },
    { label: 'Courses', value: '450+', icon: <Award className="w-5 h-5 text-amber-500" /> },
    { label: 'Countries', value: '45+', icon: <Globe className="w-5 h-5 text-rose-500" /> }
  ];

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-1000">
      <div className="text-center space-y-6 pt-10">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter sm:text-7xl">
          Forge Your <span className="text-indigo-600">Future</span>.
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
          SkillForge is more than just a learning platform. It's an ecosystem where ambition meets expertise, and where every project is a stepping stone to mastery.
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <button className="premium-btn text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100">Our Story</button>
          <button className="glass-card text-slate-700 px-8 py-3 rounded-2xl font-bold border border-slate-200 hover:bg-white transition-all">Join Team</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] text-center group hover:translate-y-[-4px] transition-all">
            <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
            className="relative rounded-[2.5rem] shadow-2xl border-4 border-white"
            alt="Team"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-wider">
            Our Mission
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Democratizing Tech Education Through Experience.</h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            We believe that the best way to learn is by doing. SkillForge connects students with real-world problems and industry veterans to ensure that every minute spent learning translated directly into professional growth.
          </p>
          <ul className="space-y-4 pt-4">
            {[
              { title: 'Project-First Learning', desc: 'Theory is great, but building is better.' },
              { title: 'Industry Integration', desc: 'Direct links to hiring partners and top agencies.' },
              { title: 'Mentorship Ecosystem', desc: 'Expert guidance at every step of your journey.' }
            ].map((item, i) => (
              <li key={i} className="flex items-start space-x-4">
                <div className="mt-1 bg-emerald-500 rounded-lg p-1">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
