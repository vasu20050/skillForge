import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, TrendingUp, Users, Award } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    user: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    content: "Just finished the Advanced React Performance course! 🚀 The section on concurrent rendering was mind-blowing. Highly recommend it to anyone looking to level up.",
    likes: 42,
    comments: 12,
    timestamp: '2 hours ago',
    tag: 'Achievement'
  },
  {
    id: 2,
    user: { name: 'Jamie Smith', avatar: 'https://i.pravatar.cc/150?u=2' },
    content: "Looking for a partner to collaborate on a full-stack e-commerce project. I'm handling the frontend with Next.js, need someone for the backend (Node/Express). DMs are open! 💻",
    likes: 15,
    comments: 28,
    timestamp: '5 hours ago',
    tag: 'Collaboration'
  }
];

export default function Community() {
  const [newPost, setNewPost] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900">Community Feed</h1>
        <div className="flex -space-x-3 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={`https://i.pravatar.cc/150?u=user${i}`} alt="" />
          ))}
          <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-indigo-500 text-white text-xs font-bold">+2k</div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl shadow-sm">
        <div className="flex items-start space-x-4">
          <img src="https://i.pravatar.cc/150?u=myprofile" className="w-12 h-12 rounded-full ring-2 ring-indigo-100" alt="Me" />
          <div className="flex-1 space-y-4">
            <textarea 
              rows="3" 
              className="w-full bg-slate-50/50 rounded-2xl p-4 border-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 text-slate-700 resize-none outline-none"
              placeholder="What's happening in your journey?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex justify-between items-center border-t border-slate-100 pt-4">
              <div className="flex items-center space-x-2 text-slate-500">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Award className="w-5 h-5" /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Users className="w-5 h-5" /></button>
              </div>
              <button className="premium-btn text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 shadow-lg shadow-indigo-200">
                <span>Post Update</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4 order-2 md:order-1">
          <div className="glass-card p-5 rounded-2xl">
            <h3 className="flex items-center text-sm font-bold text-slate-800 mb-4">
              <TrendingUp className="w-4 h-4 mr-2 text-rose-500" />
              Trending Topics
            </h3>
            <ul className="space-y-3">
              {['#ReactTips', '#WebDev2024', '#UIPatterns', '#CareerGrowth'].map(tag => (
                <li key={tag} className="text-sm font-medium text-slate-600 hover:text-indigo-600 cursor-pointer">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6 order-1 md:order-2">
          {POSTS.map(post => (
            <div key={post.id} className="glass-card p-6 rounded-3xl shadow-sm border border-white hover:border-indigo-100 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src={post.user.avatar} className="w-10 h-10 rounded-full ring-1 ring-slate-100" alt={post.user.name} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{post.user.name}</h4>
                    <span className="text-xs text-slate-400 font-medium">{post.timestamp}</span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 text-slate-500 rounded-md border border-slate-100">
                  {post.tag}
                </span>
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-6 font-medium">
                {post.content}
              </p>

              <div className="flex items-center space-x-6 pt-4 border-t border-slate-50">
                <button className="flex items-center space-x-2 text-slate-500 hover:text-rose-500 transition-colors group">
                  <Heart className="w-5 h-5 group-hover:fill-rose-500" />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs font-bold">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
