import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { ChevronLeft, Target, Award, Calendar, Github, Star, CheckCircle2, AlertCircle, FileText, Send } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState({ github_url: '', video_url: '', notes: '' });

  const fetchData = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching project details', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post(`/projects/${id}/apply`);
      fetchData();
      alert('Application successful! View your contract below.');
    } catch (err) {
      alert(err.response?.data?.message || 'Application failed');
    }
  };

  const handleAcceptContract = async (contractId) => {
    try {
      await api.post(`/projects/contract/${contractId}/accept`);
      fetchData();
    } catch (err) {
      alert('Acceptance failed');
    }
  };

  const handleSubmitMilestone = async (milestoneId) => {
    try {
      await api.post(`/projects/milestones/${milestoneId}/submit`, submission);
      fetchData();
      setSubmission({ github_url: '', notes: '' });
    } catch (err) {
      alert('Submission failed');
    }
  };

  const handleApproveMilestone = async (milestoneId) => {
    try {
      await api.post(`/projects/milestones/${milestoneId}/approve`);
      fetchData();
    } catch (err) {
      alert('Approval failed');
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Project...</div>;
  if (!data) return <div className="p-20 text-center font-bold">Project not found.</div>;

  const { project, milestones, contract } = data;
  const isWorker = project.team.worker_ids.map(w => w._id.toString()).includes(user._id.toString());
  const isClient = project.client_id._id.toString() === user._id.toString();

  return (
    <div className="space-y-10 page-transition pb-20">
      {/* Header */}
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 font-bold hover:text-indigo-600 transition-colors uppercase tracking-widest text-xs">
         <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-4 flex-grow">
            <div className={`px-4 py-1 inline-block rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${project.type === 'learn_dummy' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {project.type.replace('_', ' ')}
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl">
                {project.title}
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
                {project.description}
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 min-w-[280px] shadow-sm flex flex-col items-center">
              <Award className="w-10 h-10 text-amber-500 mb-4" />
              <span className="text-4xl font-black text-slate-900 mb-1">{project.credits_total} <span className="text-sm font-medium text-slate-400">CR</span></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Pool</span>
              
              <div className="w-full h-px bg-slate-100 my-6"></div>
              
              <div className="w-full flex justify-between items-center text-xs font-bold text-slate-500 mb-4">
                  <div className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> Deadline</div>
                  <div className="text-slate-900">{new Date(project.deadline).toLocaleDateString()}</div>
              </div>
              
              {!isWorker && !isClient && project.status === 'open' && (
                <button 
                  onClick={handleApply}
                  className="w-full premium-btn text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20"
                >
                  Accept Task
                </button>
              )}

              {isWorker && project.status === 'pending_contract' && (
                  <div className="text-[10px] font-black text-amber-500 uppercase flex items-center bg-amber-50 px-4 py-2 rounded-xl">
                      <AlertCircle className="w-4 h-4 mr-2" /> Accept Contract Below
                  </div>
              )}

              {isWorker && project.status === 'active' && (
                  <div className="text-[10px] font-black text-indigo-500 uppercase flex items-center bg-indigo-50 px-4 py-2 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Active Contribution
                  </div>
              )}
          </div>
      </div>

      {/* Escrow Shield Tracker */}
      <div className="glass-card p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mr-4 shadow-lg shadow-indigo-600/40">
                          <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                          <h3 className="text-xl font-black tracking-tight">Shield Escrow Tracker</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Credit Security</p>
                      </div>
                  </div>
                  <div className="text-right">
                      <div className="text-2xl font-black text-indigo-400">{project.credits_total} CR</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Vault</div>
                  </div>
              </div>

              <div className="relative h-4 bg-white/5 rounded-full overflow-hidden mb-4">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-1000"
                    style={{ width: `${(milestones.filter(m => m.status === 'paid').length / milestones.length) * 100}%` }}
                  ></div>
              </div>

              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Locked: {milestones.filter(m => m.status !== 'paid').reduce((sum, m) => sum + m.amount_credits, 0)} CR</span>
                  <span>Released: {milestones.filter(m => m.status === 'paid').reduce((sum, m) => sum + m.amount_credits, 0)} CR</span>
              </div>
          </div>
      </div>

      {/* Contract & Milestones Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
          
          {/* Contracts */}
          <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-indigo-200" /> Contract
              </h2>
              
              {contract ? (
                  <div className={`glass-card p-10 rounded-[3rem] border-2 transition-all ${contract.status === 'active' ? 'border-emerald-100 bg-emerald-50/20' : 'border-indigo-100 bg-indigo-50/10'}`}>
                      <div className="flex justify-between items-start mb-10">
                        <div className="space-y-1">
                          <h3 className="font-black text-slate-800">Binding Agreement</h3>
                          <p className="text-xs font-bold text-slate-400">Project: {contract.scope.title}</p>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${contract.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'}`}>
                            {contract.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="space-y-4 mb-10 text-sm font-medium text-slate-600 leading-relaxed">
                          <p>• Verification Required for Credit Release.</p>
                          <p>• Dispute Resolution via Admin Oversight.</p>
                          <p>• All deliverables must include verifiable Proof-of-Work.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className={`p-4 rounded-2xl flex flex-col items-center ${contract.acceptance.client_accepted_at ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                              <span className="text-[10px] font-black uppercase tracking-widest mb-1">Client</span>
                              <CheckCircle2 className={`w-4 h-4 ${contract.acceptance.client_accepted_at ? 'text-emerald-500' : 'opacity-20'}`} />
                          </div>
                          <div className={`p-4 rounded-2xl flex flex-col items-center ${contract.acceptance.worker_accepted_at ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                              <span className="text-[10px] font-black uppercase tracking-widest mb-1">Worker</span>
                              <CheckCircle2 className={`w-4 h-4 ${contract.acceptance.worker_accepted_at ? 'text-emerald-500' : 'opacity-20'}`} />
                          </div>
                      </div>

                      {((isClient && !contract.acceptance.client_accepted_at) || (isWorker && !contract.acceptance.worker_accepted_at)) && (
                          <button 
                            onClick={() => handleAcceptContract(contract._id)}
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black contrast-150 transition-all shadow-xl shadow-slate-900/10"
                          >
                             Accept Contract
                          </button>
                      )}
                  </div>
              ) : (
                  <div className="p-10 bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] text-center text-slate-400 font-bold italic">
                      Contract will be generated upon task acceptance.
                  </div>
              )}
          </div>

          {/* Milestones */}
          <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center">
                <Target className="w-6 h-6 mr-3 text-indigo-200" /> Milestones
              </h2>
              
              <div className="space-y-6">
                  {milestones.map((m, i) => (
                      <div key={m._id} className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group">
                          <div className="flex justify-between items-center mb-6">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Milestone {i+1}</span>
                              <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${
                                  m.status === 'paid' ? 'bg-emerald-100 text-emerald-600' :
                                  m.status === 'submitted' ? 'bg-amber-100 text-amber-600' :
                                  'bg-slate-100 text-slate-400'
                              }`}>
                                  {m.status}
                              </span>
                          </div>
                          <h4 className="text-lg font-black text-slate-800 mb-2">{m.title}</h4>
                          <p className="text-sm font-medium text-slate-500 mb-6">{m.description}</p>
                          
                          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                              <div className="text-xs font-bold text-indigo-600">{m.amount_credits} Credits</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due {new Date(m.due_date).toLocaleDateString()}</div>
                          </div>

                          {/* AI Audit Feedback */}
                          {m.ai_audit && m.ai_audit.status !== 'none' && (
                              <div className={`mb-6 p-5 rounded-2xl border ${
                                m.ai_audit.status === 'passed' ? 'bg-emerald-50/50 border-emerald-100' : 
                                m.ai_audit.status === 'flagged' ? 'bg-amber-50/50 border-amber-100' : 'bg-slate-50 border-slate-100'
                              }`}>
                                  <div className="flex justify-between items-center mb-3">
                                      <div className="flex items-center">
                                          <Zap className={`w-4 h-4 mr-2 ${m.ai_audit.status === 'passed' ? 'text-emerald-500' : 'text-amber-500'}`} />
                                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Sahara AI Review</span>
                                      </div>
                                      <span className="text-[10px] font-black text-slate-400">{m.ai_audit.score}% Logic Score</span>
                                  </div>
                                  <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                                      "{m.ai_audit.feedback}"
                                  </p>
                              </div>
                          )}

                          {/* Submission Interface for Workers */}
                          {isWorker && m.status === 'pending' && project.status === 'active' && (
                              <div className="space-y-4 pt-4 border-t border-slate-100">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
                                          <div className="p-4 bg-slate-50 text-slate-400 border-r border-slate-200"><Github className="w-4 h-4" /></div>
                                          <input 
                                            type="text" 
                                            placeholder="GitHub / Demo URL" 
                                            className="w-full px-5 py-4 font-bold text-sm focus:outline-none"
                                            value={m._id === submission.targetId ? submission.github_url : ''}
                                            onChange={(e) => setSubmission({ ...submission, github_url: e.target.value, targetId: m._id })}
                                          />
                                      </div>
                                      <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
                                          <div className="p-4 bg-slate-50 text-slate-400 border-r border-slate-200"><Send className="w-4 h-4" /></div>
                                          <input 
                                            type="text" 
                                            placeholder="Video Proof (Loom/Reel)" 
                                            className="w-full px-5 py-4 font-bold text-sm focus:outline-none"
                                            value={m._id === submission.targetId ? submission.video_url : ''}
                                            onChange={(e) => setSubmission({ ...submission, video_url: e.target.value, targetId: m._id })}
                                          />
                                      </div>
                                  </div>
                                  <button 
                                    onClick={() => handleSubmitMilestone(m._id)}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/10"
                                  >
                                      Submit Phase Proof <Send className="w-3 h-3 ml-2" />
                                  </button>
                              </div>
                          )}

                          {/* Approval Interface for Clients or Admin */}
                          {isClient && m.status === 'submitted' && (
                               <div className="space-y-4 pt-4 border-t border-slate-100">
                                   <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-xs font-bold text-amber-700 mb-4 truncate">
                                      Proof: <a href={m.submission_proof.github_url} target="_blank" rel="noreferrer" className="underline">{m.submission_proof.github_url}</a>
                                   </div>
                                   <button 
                                      onClick={() => handleApproveMilestone(m._id)}
                                      className="w-full bg-emerald-500 text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                                   >
                                      Approve & Unlock Credits
                                   </button>
                               </div>
                          )}
                          
                          {m.status === 'paid' && (
                              <div className="absolute top-0 right-0 p-10 opacity-5 -mr-4 -mt-4 transform rotate-12 group-hover:opacity-10 transition-opacity">
                                  <CheckCircle2 className="w-40 h-40 text-emerald-500" />
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
