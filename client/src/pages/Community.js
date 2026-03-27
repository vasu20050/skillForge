import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, TrendingUp, Users, Award, MoreHorizontal } from 'lucide-react';
import avatarImg from '../avatar.png';

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
  const [posts, setPosts] = useState(POSTS);
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Pioneer' };

  const handlePost = () => {
    if (!newPost.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const post = {
        id: Date.now(),
        user: { name: user.name, avatar: user.photoUrl || avatarImg },
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        tag: 'Update'
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setIsSubmitting(false);
    }, 800);
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p
    ));
  };

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

      <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 bg-white/60 backdrop-blur-xl border-white">
        <div className="flex items-start space-x-6">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
             <img src={user.photoUrl || avatarImg} className="w-full h-full object-cover" alt="Me" />
          </div>
          <div className="flex-1 space-y-4">
            <textarea 
              rows="3" 
              className="w-full bg-slate-50/50 rounded-[2rem] p-6 border-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 text-slate-700 resize-none outline-none font-medium h-32"
              placeholder="Share a milestone or collaborate on a project..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-2xl">
              <div className="flex items-center space-x-1 px-2">
                <button className="p-3 hover:bg-white hover:text-indigo-600 rounded-xl transition-all text-slate-400"><Award className="w-5 h-5" /></button>
                <button className="p-3 hover:bg-white hover:text-indigo-600 rounded-xl transition-all text-slate-400"><Users className="w-5 h-5" /></button>
              </div>
              <button 
                onClick={handlePost}
                disabled={isSubmitting || !newPost.trim()}
                className={`premium-btn text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-3 shadow-xl transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
              >
                <span>{isSubmitting ? 'Publishing...' : 'Post Update'}</span>
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-ping' : ''}`} />
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

        <div className="md:col-span-3 space-y-8 order-1 md:order-2">
          {posts.map(post => (
            <div key={post.id} className="glass-card p-8 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 border border-white/50 hover:border-indigo-100 transition-all group backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-sm relative">
                    <img src={post.user.avatar} className="w-full h-full object-cover" alt={post.user.name} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      {post.user.name}
                      {post.id < 3 && <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center"><Award className="w-2 h-2 text-white" /></div>}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
                    {post.tag}
                  </span>
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal size={20} /></button>
                </div>
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-8 font-medium text-lg tracking-tight">
                {post.content}
              </p>

              <div className="flex items-center space-x-8 pt-6 border-t border-slate-50/50">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-3 transition-all group/btn ${post.isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
                >
                  <div className={`p-2.5 rounded-xl transition-all ${post.isLiked ? 'bg-rose-50 shadow-inner' : 'bg-slate-50 group-hover/btn:bg-rose-50'}`}>
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-rose-500' : 'group-hover/btn:fill-rose-500 transition-all'}`} />
                  </div>
                  <span className="text-xs font-black tracking-widest">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-3 text-slate-400 hover:text-indigo-600 transition-all group/btn">
                  <div className="p-2.5 rounded-xl bg-slate-50 group-hover/btn:bg-indigo-50">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black tracking-widest">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-3 text-slate-400 hover:text-emerald-500 transition-all ml-auto group/btn">
                   <div className="p-2.5 rounded-xl bg-slate-50 group-hover/btn:bg-emerald-50">
                      <Share2 className="w-5 h-5" />
                   </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
