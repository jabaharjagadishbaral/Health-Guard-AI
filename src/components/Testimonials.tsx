import React from 'react';
import { Star, ShieldCheck, Quote, ThumbsUp } from 'lucide-react';
import { TestimonialItem } from '../types';

export const Testimonials: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: '1',
      name: 'Dr. Sarah Jenkins',
      role: 'Family Medicine Physician',
      location: 'Boston, MA',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'HealthGuard AI accurately triages symptom severity and reassures patients when to seek emergency care versus home care. It’s an invaluable tool for health literacy.',
      verified: true,
      symptomTag: 'Physician Endorsed',
    },
    {
      id: '2',
      name: 'Marcus Vance',
      role: 'Software Architect',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Woke up at 2 AM with a throbbing migraine and chest tightness. HealthGuard AI guided me through red flag checks and calmed my panic with clear, step-by-step advice.',
      verified: true,
      symptomTag: 'Migraine & Anxiety',
    },
    {
      id: '3',
      name: 'Elena Rostova',
      role: 'Mother of two',
      location: 'Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'When my toddler had a fever after vaccination, the AI checked dosage safety and provided comforting fever management steps in seconds. Simply essential!',
      verified: true,
      symptomTag: 'Pediatric Care',
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ThumbsUp className="w-3.5 h-3.5 text-sky-600" /> Patient Feedback & Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Thousands Every Day
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            See how HealthGuard AI provides instant reassurance and clear medical guidance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-7 border border-white/80 bg-white/75 backdrop-blur-xl flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold border border-teal-200">
                    {item.symptomTag}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              {/* User Profile Footer */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-500/30 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    {item.verified && (
                      <ShieldCheck className="w-4 h-4 text-teal-600" title="Verified User" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.role} &bull; {item.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
