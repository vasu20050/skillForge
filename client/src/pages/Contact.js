import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, ChevronRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Get in <span className="text-indigo-600">Touch</span>.</h1>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">Have questions? We're here to help you forge your path.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-8 rounded-[2rem] border border-blue-50/50 hover:bg-white transition-all">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-3 text-indigo-500" />
              Contact Details
            </h3>
            <ul className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5 text-indigo-500" />, label: 'Email', value: 'hello@skillforge.com' },
                { icon: <Phone className="w-5 h-5 text-emerald-500" />, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: <MapPin className="w-5 h-5 text-rose-500" />, label: 'Location', value: 'San Francisco, CA' }
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-4">
                  <div className="bg-slate-50 p-3 rounded-2xl">{item.icon}</div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.label}</span>
                    <span className="text-slate-800 font-bold">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 rounded-[2rem] bg-indigo-600 text-white relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-3 text-indigo-200" />
              FAQs
            </h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Quick answers to common questions about our programs and platform.</p>
            <button className="flex items-center space-x-2 text-white font-bold text-sm bg-white/20 px-6 py-2.5 rounded-xl hover:bg-white/30 transition-all">
              <span>View Help Center</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card p-10 rounded-[2.5rem] border border-white shadow-xl">
             <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-500 ml-1">Full Name</label>
                 <input type="text" className="w-full bg-slate-50/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 text-slate-800 transition-all placeholder:text-slate-300 font-medium" placeholder="Alex Rivera" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
                 <input type="email" className="w-full bg-slate-50/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 text-slate-800 transition-all placeholder:text-slate-300 font-medium" placeholder="alex@example.com" />
               </div>
               <div className="space-y-2 md:col-span-2">
                 <label className="text-sm font-bold text-slate-500 ml-1">Subject</label>
                 <select className="w-full bg-slate-50/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 text-slate-800 transition-all font-medium appearance-none">
                   <option>General Inquiry</option>
                   <option>Mentor Program</option>
                   <option>Project Support</option>
                   <option>Partnership</option>
                 </select>
               </div>
               <div className="space-y-2 md:col-span-2">
                 <label className="text-sm font-bold text-slate-500 ml-1">Message</label>
                 <textarea rows="4" className="w-full bg-slate-50/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 text-slate-800 transition-all placeholder:text-slate-300 font-medium resize-none" placeholder="How can we help you?"></textarea>
               </div>
               <div className="md:col-span-2 pt-4">
                 <button className="premium-btn w-full text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl shadow-indigo-100 hover:scale-[1.01] active:scale-[0.99] transition-transform">
                   <span>Send Message</span>
                   <Send className="w-5 h-5" />
                 </button>
               </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
