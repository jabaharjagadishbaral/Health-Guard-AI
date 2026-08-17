import React from 'react';
import { MessageSquare, Clock, ShieldCheck, Award, Stethoscope } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      icon: MessageSquare,
      value: '1M+',
      label: 'Questions Answered',
      color: 'text-teal-600',
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Instant Availability',
      color: 'text-sky-600',
    },
    {
      icon: ShieldCheck,
      value: 'HIPAA',
      label: 'Compliant Protocol',
      color: 'text-emerald-600',
    },
    {
      icon: Award,
      value: '99.4%',
      label: 'Accuracy & User Trust',
      color: 'text-indigo-600',
    },
    {
      icon: Stethoscope,
      value: '150+',
      label: 'Specialist Triage Maps',
      color: 'text-teal-600',
    },
  ];

  return (
    <div className="relative my-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-lg border border-white/60 bg-gradient-to-r from-white/80 via-teal-50/40 to-sky-50/60 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-center gap-3.5 ${idx > 0 ? 'pt-4 md:pt-0' : ''} ${idx % 2 !== 0 && idx < 2 ? 'sm:border-l sm:border-slate-200/60' : ''}`}
                >
                  <div className={`p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 ${stat.color}`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
