import React, { useState } from 'react';
import { Search, Send, Phone, Video, Info, MoreVertical, Paperclip, Smile } from 'lucide-react';

const CONTACTS = [
  { id: 1, name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=1', status: 'online', lastMsg: 'I checked your portfolio and...', time: '12:45 PM', unread: 2 },
  { id: 2, name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=2', status: 'offline', lastMsg: 'The PR is merged! Great job.', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?u=3', status: 'online', lastMsg: 'Can we meet at 3 PM?', time: 'Wednesday', unread: 0 },
];

const MESSAGES = [
  { id: 1, senderId: 1, text: "Hi Alex! I reviewed the latest iteration of the 'SmartCity' dashboard design.", time: '12:40 PM' },
  { id: 2, senderId: 'me', text: "Thanks Sarah! I was thinking about the color palette, maybe we should use more slate?", time: '12:42 PM' },
  { id: 3, senderId: 1, text: "Exactly what I was going to suggest. Let's try the Indigo/Slate combination.", time: '12:45 PM' },
];

export default function Messages() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [msgInput, setMsgInput] = useState('');

  return (
    <div className="h-[calc(100vh-160px)] flex glass-card rounded-[2rem] overflow-hidden shadow-sm animate-in zoom-in-95 duration-700">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/30">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-800 mb-4">Messages</h1>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50/50">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id} 
              onClick={() => setActiveContact(contact)}
              className={`p-4 flex items-center space-x-4 cursor-pointer hover:bg-white transition-colors border-l-4 ${
                activeContact.id === contact.id ? 'bg-white border-indigo-600' : 'border-transparent'
              }`}
            >
              <div className="relative">
                <img src={contact.avatar} className="w-12 h-12 rounded-2xl shadow-sm" alt={contact.name} />
                {contact.status === 'online' && (
                  <span className="absolute -bottom-1 -right-1 block h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20 shadow-sm"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{contact.name}</h3>
                  <span className="text-[10px] text-slate-400 font-bold">{contact.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && (
                <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black text-white">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/40">
        {/* Chat Header */}
        <div className="p-4 px-8 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 bg-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <img src={activeContact.avatar} className="w-10 h-10 rounded-xl" alt={activeContact.name} />
            <div>
              <h2 className="font-bold text-slate-800">{activeContact.name}</h2>
              <span className="text-[10px] uppercase font-black text-emerald-500 tracking-widest">{activeContact.status}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><Phone className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><Video className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {MESSAGES.map(msg => (
            <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] group ${msg.senderId === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`p-4 rounded-2xl text-sm font-medium shadow-sm transition-all hover:shadow-md ${
                  msg.senderId === 'me' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-2 font-bold px-1 group-hover:opacity-100 opacity-0 transition-opacity">{msg.time} • Delivered</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 pt-2">
          <div className="glass-card p-2 rounded-2xl flex items-center space-x-2 border border-slate-100 bg-white shadow-lg">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Paperclip className="w-5 h-5" /></button>
            <input 
              type="text" 
              className="flex-1 bg-transparent border-none text-sm px-2 focus:ring-0 outline-none placeholder:text-slate-400 text-slate-800"
              placeholder={`Message ${activeContact.name.split(' ')[0]}...`}
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
            />
            <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors"><Smile className="w-5 h-5" /></button>
            <button className="premium-btn p-2.5 rounded-xl text-white shadow-lg shadow-indigo-100 transition-all hover:scale-110 active:scale-95">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
