import React, { useState, useEffect } from 'react';
import api from '../api';
import { Wallet, History, Gift, Award, Heart, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center p-20 min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-black text-slate-500 uppercase tracking-widest text-xs">Initializing Secure Ledger...</p>
      </div>
  );

  if (error) return (
      <div className="flex flex-col items-center justify-center p-20 text-center glass-card max-w-xl mx-auto my-20">
          <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
          <h3 className="text-xl font-black text-white mb-2">Ledger Sync Error</h3>
          <p className="text-slate-400 font-medium mb-8">{error}</p>
          <button onClick={() => window.location.reload()} className="premium-btn text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest">
              Retry Connection
          </button>
      </div>
  );

  const rewards = [
    { id: 'intern_pass', title: 'Internship Priority Pass', cost: 500, icon: <Award className="w-6 h-6" /> },
    { id: 'campus_merch', title: 'Limited Campus Hoodie', cost: 200, icon: <Gift className="w-6 h-6" /> },
    { id: 'cert_unlock', title: 'Blockchain Certificate', cost: 100, icon: <CheckCircle2 className="w-6 h-6" /> },
    { id: 'club_perks', title: 'Lab Access Pass', cost: 50, icon: <TrendingUp className="w-6 h-6" /> }
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
    <div className="space-y-10 page-transition pb-20">
      <h2 className="text-4xl font-black text-white tracking-tight">Wallet & History</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-10 rounded-[3rem]">
              <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-emerald-500 text-black rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <Wallet className="w-8 h-8" />
                      </div>
                      <div>
                          <div className="text-4xl font-black text-white">{wallet.available} <span className="text-emerald-400">Credits</span></div>
                          <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Available to Spend</div>
                      </div>
                  </div>
                  {wallet.escrow_locked > 0 && (
                      <div className="hidden sm:block text-right">
                          <div className="text-2xl font-black text-amber-500">{wallet.escrow_locked}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Escrow Locked</div>
                      </div>
                  )}
              </div>
              <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Recent Transactions</h4>
                  {transactions.length === 0 ? (
                      <div className="p-10 bg-black/40 border border-dashed border-white/10 rounded-[2rem] text-center text-slate-500 font-bold italic">
                        Your transaction ledger is empty. Start contributing.
                      </div>
                  ) : transactions.map(tx => {
                      const isPositive = ['earn_payout', 'escrow_release', 'bonus', 'initial_seed'].includes(tx.tx_type);
                      return (
                          <div key={tx._id} className={`p-6 bg-black/40 rounded-2xl flex justify-between items-center border border-white/5 hover:border-${isPositive ? 'emerald' : 'amber'}-500/20 transition-all`}>
                              <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                      {isPositive ? <History className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                                  </div>
                                  <div>
                                      <div className="font-bold text-white text-sm">{tx.tx_type.replace(/_/g, ' ').toUpperCase()}</div>
                                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{new Date(tx.createdAt).toLocaleDateString()}</div>
                                  </div>
                              </div>
                              <div className={`${isPositive ? 'text-emerald-400' : 'text-amber-400'} font-black tracking-tight`}>
                                  {isPositive ? '+' : '-'}{tx.amount} CR
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
          
          <div className="glass-card p-10 rounded-[3rem] space-y-8">
              <h3 className="text-2xl font-black text-white flex items-center">
                  <Gift className="w-6 h-6 mr-3 text-emerald-400" /> Redeem
              </h3>
              <div className="space-y-4">
                  {rewards.map(reward => (
                      <div key={reward.id} onClick={() => handleRedeem(reward)} className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-emerald-500/10 transition-all cursor-pointer">
                          <div className="flex justify-between items-center mb-4">
                              <div className="text-slate-500 group-hover:text-emerald-400">{reward.icon}</div>
                              <span className="text-xs font-black text-emerald-400">{reward.cost} CR</span>
                          </div>
                          <h5 className="font-bold text-white text-sm">{reward.title}</h5>
                          <p className="text-[10px] text-slate-500 mt-1 uppercase font-black">Click to Redeem</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
