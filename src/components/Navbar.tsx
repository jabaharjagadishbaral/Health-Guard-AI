import React, { useState } from 'react';
import { Activity, ShieldCheck, Sparkles, Stethoscope, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onStartChatClick: () => void;
  onOpenDoctorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartChatClick, onOpenDoctorModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl px-4 py-3 sm:px-6 flex items-center justify-between shadow-lg backdrop-blur-xl border border-white/50">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 text-white shadow-md shadow-teal-500/20 group">
              <Activity className="w-6 h-6 transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">HealthGuard</span>
                <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent font-black text-xl">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-600 inline" /> Clinical AI Triage
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-700">
            <button 
              onClick={() => scrollToSection('live-chat')} 
              className="hover:text-teal-600 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-teal-500" />
              Live Chat
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-teal-600 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('symptom-map')} 
              className="hover:text-teal-600 transition-colors cursor-pointer"
            >
              Body Map
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-teal-600 transition-colors cursor-pointer"
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Controls & AI Status */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Gemini 3.6 Active</span>
            </div>

            <button
              onClick={onOpenDoctorModal}
              className="px-4 py-2 rounded-xl border border-teal-500/30 text-teal-700 hover:bg-teal-50/80 transition-all font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              Doctor Network
            </button>

            <button
              onClick={onStartChatClick}
              className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-semibold text-sm shadow-md shadow-teal-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Start Chatting</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-white/50 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 glass-panel rounded-2xl shadow-xl flex flex-col gap-3 animate-in fade-in duration-200">
            <button
              onClick={() => scrollToSection('live-chat')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50 text-slate-800 font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-teal-600" />
              Live AI Chat
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50 text-slate-700 font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('symptom-map')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50 text-slate-700 font-medium"
            >
              Interactive Body Map
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50 text-slate-700 font-medium"
            >
              How It Works
            </button>
            <hr className="border-slate-200/60 my-1" />
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDoctorModal(); }}
              className="w-full text-center py-2.5 rounded-xl border border-teal-500/30 text-teal-700 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              Connect with Doctor
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onStartChatClick(); }}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 text-white font-semibold text-sm shadow-md"
            >
              Start Chatting Now
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
