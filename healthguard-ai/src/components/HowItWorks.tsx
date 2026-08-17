import React from 'react';
import { MessageSquare, Cpu, CheckCircle2, UserCheck, ArrowRight, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Ask Your Question',
      description: 'Describe symptoms, medication concerns, or health questions in plain natural language.',
      icon: MessageSquare,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      stepNumber: '02',
      title: 'AI Analyzes Symptoms',
      description: 'HealthGuard LLM cross-references clinical guidelines, age factors, and risk factors in seconds.',
      icon: Cpu,
      color: 'from-sky-500 to-blue-600',
    },
    {
      stepNumber: '03',
      title: 'Get Instant Guidance',
      description: 'Receive structured triage recommendations, potential causes, and red-flag emergency checks.',
      icon: CheckCircle2,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      stepNumber: '04',
      title: 'Connect With Doctor',
      description: 'If symptoms indicate clinical escalation, easily connect with verified telehealth doctors nearby.',
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Seamless Patient Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How HealthGuard AI Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            From initial query to clear action steps in four simple, secure stages.
          </p>
        </div>

        {/* Timeline Grid with Glass Connectors */}
        <div className="relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-teal-400 via-sky-400 to-emerald-500 -translate-y-6 rounded-full opacity-30 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="relative group glass-panel rounded-3xl p-6 sm:p-7 border border-white/80 bg-white/75 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Step Number Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-teal-600 transition-colors">
                      {item.stepNumber}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md shadow-teal-500/20`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Mobile Flow Arrow */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4 text-teal-500">
                      <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
