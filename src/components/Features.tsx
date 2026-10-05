import React from 'react';
import { Activity, Bot, Pill, Stethoscope, ShieldCheck, Zap, HeartPulse, Clock, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  const featuresList = [
    {
      id: 'symptom-analysis',
      title: 'Instant Symptom Analysis',
      description: 'Enter one or multiple symptoms to receive multi-factor risk triage, potential root cause insights, and immediate next steps.',
      badge: 'Real-time Triage',
      gradient: 'from-teal-500 to-emerald-500',
      icon: Activity,
      stats: 'Instant < 2s Response',
    },
    {
      id: 'ai-chat',
      title: '24/7 AI Chat Support',
      description: 'Zero wait times or appointment bookings needed. Ask questions anytime from your phone or desktop with clinical confidentiality.',
      badge: 'Always Online',
      gradient: 'from-sky-500 to-blue-600',
      icon: Bot,
      stats: '100% Uptime Engine',
    },
    {
      id: 'medication-guidance',
      title: 'Medication Guidance',
      description: 'Review proper dosage schedules, potential drug-drug interaction warnings, and dietary cautions for over-the-counter & prescription drugs.',
      badge: 'Safety Checks',
      gradient: 'from-indigo-500 to-purple-600',
      icon: Pill,
      stats: '5,000+ Verified Drugs',
    },
    {
      id: 'doctor-referral',
      title: 'Doctor Referral Suggestions',
      description: 'Receive personalized advice on whether to see a General Practitioner, Cardiologist, Dermatologist, or visit Urgent Care.',
      badge: 'Clinical Escalation',
      gradient: 'from-emerald-500 to-teal-600',
      icon: Stethoscope,
      stats: '2,400+ Network MDs',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-300/60 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-teal-600" /> Clinical Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Speed, Safety & Clarity
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Combining state-of-the-art medical LLM reasoning with an intuitive glassmorphic interface.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuresList.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="group glass-card rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between border border-white/80 bg-white/70 backdrop-blur-xl"
              >
                {/* Background Glow on Hover */}
                <div className={`absolute -right-12 -top-12 w-36 h-36 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-25 transition-opacity blur-2xl -z-10`} />

                <div>
                  {/* Top Badge & 3D Isometric Styled Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center shadow-lg shadow-teal-500/20 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Stat Footer */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-teal-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.stats}
                  </span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
