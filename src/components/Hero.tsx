import React from 'react';
import { ArrowRight, MessageSquare, ShieldAlert, Sparkles, CheckCircle2, HeartPulse } from 'lucide-react';
import { Hero3DElement } from './Hero3DElement';

interface HeroProps {
  onStartChatClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartChatClick, onExploreClick }) => {
  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-teal-500/30 text-xs sm:text-sm text-slate-700 shadow-sm hover:shadow transition-all cursor-pointer group" onClick={onStartChatClick}>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <Sparkles className="w-4 h-4 text-teal-600 group-hover:rotate-12 transition-transform" />
            <span className="font-semibold text-slate-800">Next-Gen HealthGuard Engine v3.6</span>
            <span className="text-slate-400">|</span>
            <span className="text-teal-700 font-bold group-hover:underline flex items-center gap-1">
              Try Instant AI Triage <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Ask Anything About Your Health —{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Get Instant AI Answers.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience instant, empathetic, and evidence-backed health intelligence. Analyze symptoms, check medication guidance, and receive clinical triage answers in seconds — available 24/7.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={onStartChatClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-base shadow-xl shadow-teal-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <MessageSquare className="w-5 h-5 text-teal-100" />
                <span>Start Chatting Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-panel text-slate-800 font-semibold text-base hover:bg-white/90 border border-slate-200 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartPulse className="w-5 h-5 text-teal-600" />
                <span>Explore Interactive Body Map</span>
              </button>
            </div>

            {/* Key Value Checklist */}
            <div className="pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No sign-up required to ask</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>24/7 Instant Medical AI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Private & Encrypted</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual (3D Floating Glass Medical Element) */}
          <div className="lg:col-span-5 flex justify-center">
            <Hero3DElement />
          </div>

        </div>
      </div>
    </section>
  );
};
