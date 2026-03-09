import React from 'react';
import { User, Lock, Bell, Shield, Globe, CreditCard, ChevronRight, LogOut } from 'lucide-react';

export default function Settings() {
  const sections = [
    { 
      id: 'account', 
      title: 'Personal Info', 
      desc: 'Update your profile details and private information',
      icon: <User className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      id: 'security', 
      title: 'Security', 
      desc: 'Manage your password and account security settings',
      icon: <Lock className="w-5 h-5" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    { 
      id: 'notifications', 
      title: 'Notifications', 
      desc: 'Choose how and when you want to be notified',
      icon: <Bell className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-600'
    },
    { 
      id: 'privacy', 
      title: 'Privacy', 
      desc: 'Control who can see your profile and activity',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      id: 'billing', 
      title: 'Billing & Subscriptions', 
      desc: 'Manage your payment methods and subscription plan',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-rose-100 text-rose-600'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in slide-in-from-right-4 duration-700">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Customize SkillForge to work perfectly for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="glass-card p-8 rounded-3xl text-center shadow-sm sticky top-28">
            <div className="relative inline-block mx-auto mb-4">
              <img 
                src="https://i.pravatar.cc/150?u=myprofile" 
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow-xl"
                alt="Profile"
              />
              <button className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors">
                <Globe className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Alex Rivera</h2>
            <p className="text-slate-500 text-sm font-medium mb-6">alex.rivera@example.com</p>
            
            <button className="w-full premium-btn text-white py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02]">
              View Public Profile
            </button>

            <button className="w-full mt-3 flex items-center justify-center space-x-2 text-rose-500 font-bold text-sm py-2 hover:bg-rose-50 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Settings Links */}
        <div className="md:col-span-2 space-y-4">
          {sections.map(section => (
            <div 
              key={section.id} 
              className="glass-card p-5 rounded-2xl flex items-center justify-between hover:bg-white cursor-pointer group transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${section.color}`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{section.title}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{section.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
          
          <div className="pt-8 border-t border-slate-200 mt-8">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Danger Zone</h4>
            <div className="p-1 rounded-2xl border border-rose-100 bg-rose-50/20">
              <button className="w-full flex items-center justify-between p-4 text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                <div className="text-left">
                  <span className="font-bold block">Deactivate Account</span>
                  <span className="text-xs opacity-70">This will temporarily hide your profile and data.</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
