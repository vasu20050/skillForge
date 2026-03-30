import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Target, Calendar, DollarSign, Plus, Trash2, Send, ShieldCheck, Award } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function NewProject() {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    credits_total: 0,
    deadline: '',
    milestones: [
      { title: 'Project Kickoff', description: 'Initial setup and scoping', percentage_split: 30, amount_credits: 0, due_date: '' }
    ]
  });

  const categories = [
    'Graphic Design', 'Web Development', 'Content Writing', 
    'AI Data Tasks', 'Video Editing', 'Presentation Design', 'Research Assistance'
  ];

  const handleAddMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: '', description: '', percentage_split: 0, amount_credits: 0, due_date: '' }]
    });
  };

  const handleRemoveMilestone = (index) => {
    const newMilestones = [...formData.milestones];
    newMilestones.splice(index, 1);
    setFormData({ ...formData, milestones: newMilestones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.credits_wallet.available < formData.credits_total) {
      alert('Insufficient credits in wallet to fund this project.');
      return;
    }

    try {
      // Calculate split amounts
      const updatedMilestones = formData.milestones.map(m => ({
        ...m,
        amount_credits: Math.floor((m.percentage_split / 100) * formData.credits_total)
      }));

      await api.post('/projects', { ...formData, milestones: updatedMilestones });
      
      await refreshProfile();
      alert('Project successfully created and funded!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="space-y-12 page-transition pb-20 max-w-5xl mx-auto">
      <div className="space-y-2 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100 mb-2">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Client Protocol</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              Deploy a New <span className="text-gradient">Project</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Hire verified campus residents. Credits will be locked in escrow until milestones are reached.
          </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Core Details */}
          <div className="glass-card p-10 rounded-[3rem] border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Project Title</label>
                    <input 
                      required
                      className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl font-bold text-sm focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                      placeholder="e.g. Website Overhaul for Tech Club" 
                      value={formData.title} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Category</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl font-bold text-sm focus:border-indigo-500 focus:bg-white transition-all outline-none"
                      value={formData.category} 
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Description</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl font-bold text-sm focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                      placeholder="Tell students what needs to be done..." 
                      value={formData.description} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Budget (Credits)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                      <input 
                        required
                        type="number"
                        className="w-full bg-slate-50 border border-slate-100 py-4 pl-14 pr-6 rounded-2xl font-black text-sm text-emerald-600 focus:border-emerald-500 focus:bg-white transition-all outline-none" 
                        placeholder="0" 
                        value={formData.credits_total} 
                        onChange={(e) => setFormData({ ...formData, credits_total: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Final Deadline</label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input 
                        required
                        type="date"
                        className="w-full bg-slate-50 border border-slate-100 py-4 pl-14 pr-6 rounded-2xl font-bold text-sm focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                        value={formData.deadline} 
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      />
                    </div>
                  </div>
              </div>
          </div>

          {/* Section 2: Milestones */}
          <div className="space-y-6">
              <div className="flex justify-between items-center px-4">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center">
                    <Target className="w-6 h-6 mr-3 text-indigo-200" /> Milestones & Split
                  </h3>
                  <button 
                    type="button"
                    onClick={handleAddMilestone}
                    className="flex items-center text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Milestone
                  </button>
              </div>

              <div className="space-y-6">
                  {formData.milestones.map((milestone, index) => (
                      <div key={index} className="glass-card p-10 rounded-[3rem] group border border-slate-100 hover:border-indigo-100 transition-all relative">
                          <button 
                            type="button"
                            onClick={() => handleRemoveMilestone(index)}
                            className="absolute top-8 right-8 text-slate-200 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                              <div className="lg:col-span-6 space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Milestone Title</label>
                                  <input 
                                    required
                                    className="w-full bg-slate-50 border border-transparent py-4 px-6 rounded-2xl font-bold text-sm focus:bg-white focus:border-indigo-100 outline-none transition-all" 
                                    placeholder="e.g. Design Proposal" 
                                    value={milestone.title}
                                    onChange={(e) => {
                                        const newM = [...formData.milestones];
                                        newM[index].title = e.target.value;
                                        setFormData({ ...formData, milestones: newM });
                                    }}
                                  />
                              </div>
                              <div className="lg:col-span-3 space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Weight (%)</label>
                                  <input 
                                    required
                                    type="number"
                                    className="w-full bg-slate-50 border border-transparent py-4 px-6 rounded-2xl font-black text-sm focus:bg-white focus:border-indigo-100 outline-none transition-all" 
                                    placeholder="%" 
                                    value={milestone.percentage_split}
                                    onChange={(e) => {
                                        const newM = [...formData.milestones];
                                        newM[index].percentage_split = parseInt(e.target.value);
                                        setFormData({ ...formData, milestones: newM });
                                    }}
                                  />
                              </div>
                              <div className="lg:col-span-3 space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Due Date</label>
                                  <input 
                                    required
                                    type="date"
                                    className="w-full bg-slate-50 border border-transparent py-4 px-6 rounded-2xl font-bold text-sm focus:bg-white focus:border-indigo-100 outline-none transition-all" 
                                    value={milestone.due_date}
                                    onChange={(e) => {
                                        const newM = [...formData.milestones];
                                        newM[index].due_date = e.target.value;
                                        setFormData({ ...formData, milestones: newM });
                                    }}
                                  />
                               </div>
                               <div className="lg:col-span-12 space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Description of Deliverable</label>
                                  <input 
                                    required
                                    className="w-full bg-slate-50 border border-transparent py-4 px-6 rounded-2xl font-medium text-sm focus:bg-white focus:border-indigo-100 outline-none transition-all" 
                                    placeholder="What exactly should be submitted?" 
                                    value={milestone.description}
                                    onChange={(e) => {
                                        const newM = [...formData.milestones];
                                        newM[index].description = e.target.value;
                                        setFormData({ ...formData, milestones: newM });
                                    }}
                                  />
                               </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-slate-950 p-12 rounded-[3.5rem] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 w-full max-w-lg space-y-8">
                    <div className="flex justify-center space-x-10 text-white/40 font-black text-[10px] uppercase tracking-widest">
                        <div className="flex flex-col items-center"><Award className="w-5 h-5 mb-2 text-indigo-400" /> Secure Escrow</div>
                        <div className="flex flex-col items-center"><ShieldCheck className="w-5 h-5 mb-2 text-emerald-400" /> Validated Talent</div>
                        <div className="flex flex-col items-center"><Send className="w-5 h-5 mb-2 text-amber-400" /> Auto Contracts</div>
                    </div>
                    <h3 className="text-3xl font-black text-white">Ready to Deploy?</h3>
                    <p className="text-white/40 font-medium">By deploying, <span className="text-emerald-400">{formData.credits_total} CR</span> will be immediately held in the SkillForge secure ledger for potential workers.</p>
                    <button 
                        type="submit"
                        className="w-full bg-emerald-500 text-black py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                    >
                        Deploy Project & Fund Escrow
                    </button>
               </div>
               <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] group-hover:bg-indigo-500/10 transition-colors"></div>
          </div>
      </form>
    </div>
  );
}
