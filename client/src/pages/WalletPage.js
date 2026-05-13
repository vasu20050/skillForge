import React, { useState, useEffect } from 'react';
import api from '../api';
import { Wallet, History, Gift, Award, Heart, CheckCircle2, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function WalletPage() {
  const [wallet, setWallet] = useState({ available: 0, escrow_locked: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [walletRes, transRes] = await Promise.all([
          api.get('/wallet/balance'),
          api.get('/wallet/history')
        ]);
        if (walletRes.data) setWallet(walletRes.data);
        if (transRes.data) setTransactions(transRes.data);
      } catch (err) {
        console.error('Wallet fetch failed', err);
        setError('Failed to sync with secure ledger. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
      <div className="flex flex-col items-center justify-center p-20 min-h-[60vh] bg-[#0f1219]">
          <div className="w-16 h-16 border-[6px] border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
          <p className="font-black text-slate-500 uppercase tracking-[0.3em] text-[10px]">Initializing Secure Ledger...</p>
      </div>
  );

  if (error) return (
      <div className="flex flex-col items-center justify-center p-20 text-center bg-[#0f1219] border border-white/5 rounded-[3rem] max-w-xl mx-auto my-20 shadow-2xl">
          <AlertCircle className="w-16 h-16 text-rose-500 mb-6" />
          <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Ledger Sync Error</h3>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-white text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all">
              Retry Connection
          </button>
      </div>
  );

  const rewards = [
    { id: 'intern_pass', title: 'Internship Priority Pass', cost: 500, icon: <Award className="w-6 h-6" />, desc: 'Jump to the front of the queue.' },
    { id: 'campus_merch', title: 'Limited Campus Hoodie', cost: 200, icon: <Gift className="w-6 h-6" />, desc: 'Exclusive SkillForge apparel.' },
    { id: 'cert_unlock', title: 'Blockchain Certificate', cost: 100, icon: <CheckCircle2 className="w-6 h-6" />, desc: 'Verified proof of expertise.' },
    { id: 'club_perks', title: 'Lab Access Pass', cost: 50, icon: <TrendingUp className="w-6 h-6" />, desc: '24/7 premium lab access.' }
  ];

  const handleRedeem = async (reward) => {
    if (wallet.available < reward.cost) {
      alert('Insufficient credits in your available wallet.');
      return;
    }
    try {
      const res = await api.post('/wallet/redeem', { rewardId: reward.id, cost: reward.cost });
      setWallet(res.data.wallet);
      setTransactions([res.data.tx, ...transactions]);
      alert(`Success! Redeemed: ${reward.title}. Check your history.`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Redemption failed';
      alert(`Error: ${msg}`);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase font-heading">Ledger.</h1>
          <p className="text-slate-500 text-lg font-medium">Manage your campus credits and verify spent proof.</p>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
           <ShieldCheck className="w-5 h-5 text-emerald-400" />
           <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">End-to-End Encrypted Ledger</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Wallet View */}
          <div className="lg:col-span-2 space-y-10">
              <div className="bg-[#0f1219] p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 text-center md:text-left">
                          <div className="w-24 h-24 bg-emerald-500 text-black rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 mb-6 md:mb-0 transform group-hover:rotate-6 transition-transform duration-500">
                              <Wallet className="w-10 h-10" />
                          </div>
                          <div>
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Total Liquid Balance</div>
                              <div className="text-6xl font-black text-white tracking-tighter tabular-nums">{wallet.available} <span className="text-emerald-500 text-3xl font-black ml-2 uppercase italic">CR</span></div>
                          </div>
                      </div>
                      
                      {wallet.escrow_locked > 0 && (
                          <div className="px-8 py-6 bg-amber-500/5 rounded-[2.5rem] border border-amber-500/20 text-center md:text-right group-hover:scale-105 transition-transform">
                              <div className="text-3xl font-black text-amber-500 tabular-nums">{wallet.escrow_locked}</div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 mt-1">Escrowed Funds</div>
                          </div>
                      )}
                  </div>
              </div>

              {/* Transaction History */}
              <div className="bg-[#0f1219] p-12 rounded-[4rem] border border-white/5 shadow-2xl space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white flex items-center uppercase tracking-widest">
                        <History className="w-7 h-7 mr-4 text-emerald-400" /> Transaction Log
                    </h3>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {transactions.length} Records
                    </div>
                  </div>

                  <div className="space-y-4">
                      {transactions.length === 0 ? (
                          <div className="p-20 bg-black/40 border border-dashed border-white/5 rounded-[3rem] text-center">
                            <Zap className="w-12 h-12 text-slate-800 mx-auto mb-6" />
                            <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Your transaction ledger is currently empty.</p>
                          </div>
                      ) : transactions.map(tx => {
                          const isPositive = ['earn_payout', 'escrow_release', 'bonus', 'initial_seed'].includes(tx.tx_type);
                          return (
                              <div key={tx._id} className="p-8 bg-white/5 rounded-[2.5rem] flex justify-between items-center border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.07] transition-all group">
                                  <div className="flex items-center space-x-6">
                                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isPositive ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black' : 'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500 group-hover:text-white'}`}>
                                          {isPositive ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownLeft className="w-6 h-6" />}
                                      </div>
                                      <div>
                                          <div className="font-black text-white text-lg tracking-tight uppercase">{tx.tx_type.replace(/_/g, ' ')}</div>
                                          <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic">{new Date(tx.createdAt).toLocaleDateString()}</div>
                                      </div>
                                  </div>
                                  <div className={`text-2xl font-black tabular-nums tracking-tighter ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                                      {isPositive ? '+' : '-'}{tx.amount} <span className="text-xs font-black ml-1 uppercase opacity-60">CR</span>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
          
          {/* Redeem Section */}
          <div className="space-y-10">
              <div className="bg-[#0f1219] p-12 rounded-[4rem] border border-white/5 shadow-2xl space-y-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-0 group-hover:opacity-[0.03] rounded-bl-[5rem] transition-opacity"></div>
                  <h3 className="text-2xl font-black text-white flex items-center uppercase tracking-widest">
                      <Gift className="w-7 h-7 mr-4 text-emerald-400" /> Redeem Proof
                  </h3>
                  <div className="space-y-6">
                      {rewards.map(reward => (
                          <div key={reward.id} onClick={() => handleRedeem(reward)} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group/item hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer relative overflow-hidden">
                              <div className="flex justify-between items-center mb-6">
                                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover/item:text-emerald-400 transition-colors">
                                    {reward.icon}
                                  </div>
                                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">{reward.cost} CR</span>
                              </div>
                              <h5 className="font-black text-white text-lg tracking-tight uppercase">{reward.title}</h5>
                              <p className="text-[10px] text-slate-500 mt-2 font-medium leading-relaxed">{reward.desc}</p>
                              
                              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest group-hover/item:text-emerald-500/60 transition-colors">Authorise Transaction</span>
                                <ChevronRight className="w-4 h-4 text-slate-700 group-hover/item:text-emerald-400 transition-all group-hover/item:translate-x-1" />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

