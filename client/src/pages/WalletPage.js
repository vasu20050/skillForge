import React, { useState, useEffect } from 'react';
import api from '../api';
import { Wallet, History, Gift, Award, Heart, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, transRes] = await Promise.all([
          api.get('/wallet/balance'),
          api.get('/wallet/history')
        ]);
        setWallet(walletRes.data);
        setTransactions(transRes.data);
      } catch (err) {
        console.error('Wallet fetch failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold">Initializing Secure Ledger...</div>;

  const rewards = [
    { id: 'intern_pass', title: 'Internship Priority Pass', cost: 500, icon: <Award className="w-8 h-8" /> },
    { id: 'campus_merch', title: 'Limited Campus Hoodie', cost: 200, icon: <Gift className="w-8 h-8" /> },
    { id: 'cert_unlock', title: 'Blockchain Certificate', cost: 100, icon: <CheckCircle2 className="w-8 h-8" /> },
    { id: 'club_perks', title: 'Lab Access Pass', cost: 50, icon: <TrendingUp className="w-8 h-8" /> }
  ];

  const handleRedeem = async (reward) => {
    if (wallet.available < reward.cost) {
      alert('Insufficient credits');
      return;
    }
    try {
      await api.post('/wallet/redeem', { rewardId: reward.id, cost: reward.cost });
      alert('Success! Your reward has been recorded.');
      window.location.reload();
    } catch (err) {
      alert('Redemption failed');
    }
  };

  return (
    <div className="space-y-12 page-transition pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-10">
        <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100 mb-2">
                <Wallet className="w-3 h-3" />
                <span>Credit Wallet Secure</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                Your <span className="text-gradient">Economy</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                Track your earnings, manage your locked capital, and redeem your hard-earned credit rewards.
            </p>
        </div>

        <div className="flex gap-4">
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm min-w-[200px] flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 leading-none mb-1">{wallet.available}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Credits</span>
            </div>
            <div className={`p-6 rounded-[2.5rem] border transition-all min-w-[200px] flex flex-col items-center ${wallet.escrow_locked > 0 ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                <span className="text-3xl font-black leading-none mb-1">{wallet.escrow_locked}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Escrow Locked</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reward Catalog */}
          <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center">
                <Gift className="w-6 h-6 mr-3 text-indigo-200" /> Reward Catalog
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {rewards.map(reward => (
                      <div key={reward.id} className="glass-card p-8 rounded-[3rem] group border-indigo-50 hover:border-indigo-600 transition-all flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-indigo-500/5">
                              {reward.icon}
                          </div>
                          <h4 className="font-black text-slate-800 mb-2 leading-tight">{reward.title}</h4>
                          <span className="text-sm font-black text-indigo-600 mb-6">{reward.cost} Credits</span>
                          <button 
                            onClick={() => handleRedeem(reward)}
                             className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10"
                          >
                             Redeem This Reward
                          </button>
                      </div>
                  ))}
              </div>
          </div>

          {/* Transaction Ledger */}
          <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center">
                <History className="w-6 h-6 mr-3 text-indigo-200" /> Ledger History
              </h2>
              <div className="space-y-4">
                  {transactions.map(tx => (
                      <div key={tx._id} className="glass-card p-6 rounded-[2rem] flex items-center justify-between group hover:border-indigo-100 transition-all">
                          <div className="flex items-center space-x-5">
                              <div className={`w-12 h-12 rounded-2.5xl flex items-center justify-center font-black text-xl shadow-lg ${
                                  tx.tx_type === 'earn_payout' ? 'bg-emerald-500 text-white' : 
                                  tx.tx_type === 'escrow_lock' ? 'bg-amber-500 text-white' : 
                                  'bg-slate-950 text-white'
                              }`}>
                                  {tx.tx_type === 'earn_payout' ? '+' : '-'}
                              </div>
                              <div>
                                  <h4 className="font-black text-slate-800 text-sm">{tx.tx_type.replace('_', ' ').toUpperCase()}</h4>
                                  <p className="text-[10px] font-bold text-slate-400">{new Date(tx.createdAt).toLocaleString()}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className={`text-lg font-black ${tx.tx_type === 'earn_payout' || tx.tx_type === 'bonus' ? 'text-emerald-500' : 'text-slate-900'}`}>
                                  {tx.amount} CR
                              </div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirmed</div>
                          </div>
                      </div>
                  ))}
                  {transactions.length === 0 && (
                      <div className="p-10 bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] text-center text-slate-400 font-bold italic">
                        Your transaction ledger is empty. Start contributing.
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}
