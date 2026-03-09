import React from 'react';
import { Bell, MessageCircle, Star, Briefcase, Zap, CheckCircle2 } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'message',
    title: 'New Message from Sarah',
    content: 'Hi! I checked your portfolio and would love to discuss the Product Designer mentor position.',
    time: '5m ago',
    read: false,
    icon: <MessageCircle className="w-5 h-5 text-blue-500" />
  },
  {
    id: 2,
    type: 'award',
    title: 'Achievement Unlocked: Fast Learner',
    content: 'You completed 3 courses in a single week. Keep up the momentum!',
    time: '2h ago',
    read: false,
    icon: <Zap className="w-5 h-5 text-amber-500" />
  },
  {
    id: 3,
    type: 'project',
    title: 'Project Application Update',
    content: 'Your application for "SmartCity Dashboard" project has been viewed by the manager.',
    time: '1d ago',
    read: true,
    icon: <Briefcase className="w-5 h-5 text-indigo-500" />
  }
];

export default function Notifications() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            Notifications
            <span className="ml-3 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">2 New</span>
          </h1>
          <p className="text-slate-500 mt-1">Stay updated with your activities and connections.</p>
        </div>
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map((note) => (
          <div 
            key={note.id} 
            className={`glass-card p-5 rounded-2xl border-l-4 transition-all hover:translate-x-1 cursor-pointer ${
              note.read ? 'border-transparent opacity-80' : 'border-indigo-500'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl bg-slate-50 relative ${note.read ? '' : 'animate-pulse'}`}>
                {note.icon}
                {!note.read && (
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold ${note.read ? 'text-slate-700' : 'text-slate-900'}`}>{note.title}</h3>
                  <span className="text-xs font-medium text-slate-400">{note.time}</span>
                </div>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">{note.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <button className="text-slate-500 text-sm font-bold flex items-center mx-auto hover:text-slate-800 transition-colors">
          Clear notification history
        </button>
      </div>

      <div className="glass-card p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-2" />
            Notification Preferences
          </h4>
          <p className="text-slate-500 text-xs">Configure how you want to be notified about platform activity.</p>
        </div>
        <button className="text-sm font-bold bg-white text-indigo-600 px-4 py-2 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all">
          Manage
        </button>
      </div>
    </div>
  );
}
