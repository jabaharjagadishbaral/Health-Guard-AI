import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Heart, Dna, Bot, Zap, Cpu } from 'lucide-react';

export const Hero3DElement: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // range -10 to 10
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center perspective-1000"
      style={{
        transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute w-72 h-72 bg-teal-400/25 rounded-full blur-3xl animate-pulse-glow -z-10" />
      <div className="absolute w-60 h-60 bg-sky-500/20 rounded-full blur-2xl animate-float-reverse -z-10 translate-x-12 translate-y-8" />
      <div className="absolute w-40 h-40 bg-indigo-500/15 rounded-full blur-xl -z-10 -translate-x-16 -translate-y-12" />

      {/* Orbiting Glass Rings */}
      <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-teal-500/20 animate-spin [animation-duration:25s] border-dashed" />
      <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-sky-400/20 animate-spin [animation-duration:15s] [animation-direction:reverse]" />

      {/* Main 3D Floating Glass Medical Cross Container */}
      <div className="relative group flex items-center justify-center animate-float-slow">
        
        {/* Soft Drop Shadow Layer */}
        <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-slate-900/10 blur-xl translate-y-12 scale-90" />

        {/* Central 3D Glass Cross Structure */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-white/90 via-teal-50/80 to-sky-100/90 backdrop-blur-2xl border-2 border-white/80 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
          
          {/* Inner Mesh Highlight */}
          <div className="absolute inset-2 rounded-2xl border border-teal-200/50 bg-gradient-to-br from-teal-500/10 to-sky-500/10" />

          {/* Glowing 3D Cross Icon */}
          <div className="relative flex items-center justify-center">
            {/* Horizontal Bar */}
            <div className="absolute w-24 sm:w-28 h-8 sm:h-9 bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-500 rounded-2xl shadow-lg shadow-teal-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-white/20 rounded-2xl backdrop-blur-sm border border-white/40" />
            </div>
            {/* Vertical Bar */}
            <div className="absolute h-24 sm:h-28 w-8 sm:w-9 bg-gradient-to-b from-teal-500 via-emerald-400 to-sky-500 rounded-2xl shadow-lg shadow-teal-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-white/20 rounded-2xl backdrop-blur-sm border border-white/40" />
            </div>

            {/* Core Glowing AI Heartbeat Badge */}
            <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-teal-100 text-teal-600 animate-pulse">
              <Activity className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>

        {/* Floating Glass Widget 1: Top Right - Triage Confidence */}
        <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 px-4 py-2.5 rounded-2xl glass-panel shadow-lg border border-white/70 flex items-center gap-3 animate-float-reverse">
          <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-md shadow-teal-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Accuracy</p>
            <p className="text-xs font-extrabold text-slate-800">99.4% Verified</p>
          </div>
        </div>

        {/* Floating Glass Widget 2: Bottom Left - HIPAA Compliant */}
        <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 px-4 py-2.5 rounded-2xl glass-panel shadow-lg border border-white/70 flex items-center gap-3 animate-float-slow">
          <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Data Privacy</p>
            <p className="text-xs font-extrabold text-slate-800">HIPAA Compliant</p>
          </div>
        </div>

        {/* Floating Glass Widget 3: Bottom Right - Active Neural Engine */}
        <div className="absolute -bottom-10 right-4 sm:-bottom-12 sm:right-8 px-3.5 py-2 rounded-2xl glass-panel shadow-md border border-white/60 flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-600 animate-bounce" />
          <span className="text-xs font-bold text-slate-700">Real-time Symptom Triage</span>
        </div>
      </div>
    </div>
  );
};
