import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Mic, Send, X, Bot, Volume2, Sparkles, MessageSquare } from 'lucide-react';

export default function SaharaBot() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Greeting, commander. I am Sahara AI, your strategic companion for SkillForge.' }
  ]);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  // ────────────────── TEXT-TO-SPEECH (HEAVY MALE VOICE) ──────────────────
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    
    // Stop any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Attempt to find a deep/heavy male voice
    // "Google UK English Male" or similar usually fits well
    const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Microsoft David')) 
                     || voices[0];
    
    utterance.voice = maleVoice;
    utterance.pitch = 0.85; // Slightly lower pitch for "Heavy" feel
    utterance.rate = 0.95;  // Slightly slower for authority

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // ────────────────── SPEECH-TO-TEXT (LISTENING) ──────────────────
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };

    recognition.start();
  };

  const handleSend = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    // S.A.H.A.R.A - Intelligent Response Core
    setTimeout(() => {
      let botResponse = "";
      const lower = userMessage.toLowerCase();
      
      const responses = {
        greeting: [
          "Hey! Sahara here. So glad you're back! Ready to see what we can achieve today? 😊",
          "Hello my friend! I'm' fully charged and ready to brainstorm with you. What's on your mind? 👋",
          "Hi! Good to see you. I was just looking through some new project ideas. How can I help? ✨",
          "Hey there! It's a beautiful day to learn something new, don't you think? 🌟"
        ],
        feeling: [
          "I'm' doing great, thank you! Just vibes and data over here. How's your heart feeling today? ❤️",
          "100% operational and happy to be your companion! How has your week been so far? 😊",
          "I'm' fantastic! There's nothing I love more than helping people like you find their path. 🚀"
        ],
        beginner: [
          "Hey, don't say that! Everyone starts at zero. ❤️ Since you're just starting out, why not try 'Public Speaking' or 'Poster Design'? They're amazing entry points!",
          "That's the best place to be—a blank canvas! 🎨 I'd recommend starting with 'Soft Skills' or 'Basic Web Dev'. It's easier than you think, I promise!",
          "Growing up is a journey, not a race. 😊 Let's start with something fun like 'Event Management'. You'll learn so much without even feeling like it's 'work'!"
        ],
        skills: [
          "Ooh, looking to level up? 🚀 Based on the current campus buzz, 'Photography' and 'Social Media Growth' are massive right now!",
          "There's an entire world of craft out there! If you want a challenge, 'Cyber Security' is huge. For something creative, 'UI Design' is my favorite! 🎨",
          "I've been scanning the trends... 'Data Science' is a superpower these days. But honestly, 'Public Speaking' will change your life! 🎤",
          "Thinking about the future? 'AI & Prompt Engineering' is the way to go. Shall we look at that path? 🤖"
        ],
        opportunities: [
          "You're ready to earn! 💰 There's a 'React Dashboard' gig that pays 4000 credits. That would be a huge win!",
          "Found one! 🚀 A local campus club needs a 'Poster Designer'. It's a quick 500 credits and great for your portfolio!",
          "Income mode: Activated. 💎 Check out the 'Social Media Manager' role in Open Opportunities. It's a long-term gig with great rewards!",
        ],
        default: [
          "I'm' still learning your style! Could you tell me a bit more about that? I'm' all ears. 👂",
          "That sounds like an interesting thought! Let's dive deeper—what do you mean exactly? 😊",
          "You always have the most interesting things to say! Give me a few more details so I can give you the best advice. 🤝"
        ]
      };

      const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

      const matches = (words) => {
        return words.some(word => {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          return regex.test(lower);
        });
      };

      // PRIORITY 1: Beginners / No Skills / Growth
      if (matches(['no', 'none', 'any', 'beginner', 'start', 'grow', 'starting'])) {
        botResponse = getRandom(responses.beginner);
      }
      // PRIORITY 2: Specific Skill Queries
      else if (matches(['skill', 'skills', 'suitable', 'learn', 'curriculum', 'path', 'guide', 'help'])) {
        botResponse = getRandom(responses.skills);
      } 
      // PRIORITY 3: Projects & Earning
      else if (matches(['project', 'projects', 'opportunity', 'gig', 'money', 'credit', 'credits', 'earn'])) {
        botResponse = getRandom(responses.opportunities);
      }
      // PRIORITY 4: Personal Interest
      else if (matches(['how', 'doing', 'wbu', 'status', 'fine', 'good', 'great'])) {
        botResponse = getRandom(responses.feeling);
      }
      // PRIORITY 5: Greetings
      else if (matches(['hi', 'hello', 'hey', 'sahara', 'greetings'])) {
        botResponse = getRandom(responses.greeting);
      }
      // DEFAULT
      else {
        botResponse = getRandom(responses.default);
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      speak(botResponse);
    }, 700);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  if (isAuthPage) return null;

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-[1.5rem] bg-slate-950 text-white flex items-center justify-center shadow-2xl z-[500] hover:scale-110 active:scale-95 transition-all group overflow-hidden ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent group-hover:opacity-100 transition-opacity"></div>
        <Bot className="w-8 h-8 relative z-10" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white animate-pulse"></div>
      </button>

      {/* Sahara AI Panel */}
      <div className={`fixed bottom-8 right-8 w-[24rem] h-[36rem] max-h-[80vh] bg-slate-900 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[600] flex flex-col overflow-hidden border border-white/10 transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-6 bg-slate-950 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
             </div>
             <div>
               <h3 className="text-white font-black text-sm tracking-tight">SAHARA AI</h3>
               <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                 Active Protocol
               </p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-all text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'}`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer / Input */}
        <div className="p-6 bg-slate-950 border-t border-white/5">
           <div className="flex items-center gap-3">
              <button 
                onClick={toggleListening}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/20' : 'bg-white/5 text-slate-400 hover:text-white'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Initiate command..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder-slate-600"
                />
                <button 
                  onClick={() => handleSend()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
           </div>

           {/* Voice Indicator */}
           {isSpeaking && (
              <div className="mt-4 flex items-center justify-center gap-1">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="w-1 bg-indigo-500 h-2 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                 ))}
                 <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest ml-2">Transmitting Audio</span>
              </div>
           )}
        </div>
      </div>
    </>
  );
}
