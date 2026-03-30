import React, { useState, useEffect } from 'react';
import api from '../api';
import { Settings, Users, Database, ShieldAlert, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [seeding, setSeeding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const [usersRes, projectsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/projects')
      ]);
      setUsers(usersRes.data);
      setProjects(projectsRes.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await api.post('/admin/seed-learn-projects');
      alert('Projects successfully seeded!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Seeding failed');
    } finally {
      setSeeding(false);
    }
  };

  const handleManualVerify = async (userId, targetStatus) => {
    try {
      await api.post('/admin/verify-user', { userId, status: targetStatus });
      fetchData();
    } catch (err) {
      alert('Verification update failed');
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Inscribing Admin Protocols...</div>;

  return (
    <div className="space-y-12 page-transition pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-10">
        <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-widest border border-slate-200 mb-2">
                <ShieldAlert className="w-3 h-3" />
                <span>God Mode Active</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                SkillForge <span className="text-indigo-600">Admin</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                Manage the campus economy, oversee disputes, and simulate ecosystem growth.
            </p>
        </div>

        <button 
          onClick={handleSeed}
          disabled={seeding}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all disabled:opacity-50"
        >
          <Database className="w-4 h-4 mr-2" /> {seeding ? 'Seeding...' : 'Seed Learn Track'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-[2.5rem]">
              <Users className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-1">{users.length}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Campus Residents</p>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem]">
              <Database className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-1">{projects.length}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active System Projects</p>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem]">
              <TrendingUp className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-1">
                  {users.filter(u => u.mode_status === 'verified_earner').length}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Market Talent</p>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">User Management</h2>
              <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Resident</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Mode</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {users.map(u => (
                              <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-8 py-5">
                                      <div className="font-bold text-sm text-slate-800">{u.name}</div>
                                      <div className="text-[10px] font-medium text-slate-400">{u.email}</div>
                                  </td>
                                  <td className="px-8 py-5 uppercase">
                                       <span className={`text-[10px] font-black px-3 py-1 rounded-full ${u.mode_status === 'verified_earner' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                          {u.mode_status}
                                       </span>
                                  </td>
                                  <td className="px-8 py-5">
                                      <button 
                                        onClick={() => handleManualVerify(u._id, u.mode_status === 'verified_earner' ? 'learner' : 'verified_earner')}
                                        className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
                                      >
                                          Toggle Mode
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

          <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">System Activity</h2>
              <div className="space-y-4">
                  {projects.slice(0, 5).map(p => (
                      <div key={p._id} className="glass-card p-6 rounded-[2rem] flex items-center justify-between group">
                          <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${p.type === 'earn_real' ? 'bg-slate-950 shadow-slate-900/10' : 'bg-indigo-600 shadow-indigo-600/10'}`}>
                                  {p.type === 'earn_real' ? '$' : 'L'}
                              </div>
                              <div>
                                  <h4 className="font-black text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{p.title}</h4>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client: {p.client_id?.name || 'System'}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className="text-sm font-black text-slate-900">{p.credits_total} CR</div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{p.status}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
