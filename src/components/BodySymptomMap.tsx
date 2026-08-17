import React, { useState } from 'react';
import { Activity, ArrowRight, HeartPulse, Sparkles, Stethoscope, ChevronRight } from 'lucide-react';

interface BodySymptomMapProps {
  onSelectSymptomQuestion: (question: string) => void;
}

export const BodySymptomMap: React.FC<BodySymptomMapProps> = ({ onSelectSymptomQuestion }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('head');

  const regions = [
    {
      id: 'head',
      name: 'Head & Neurological',
      icon: '🧠',
      commonSymptoms: ['Throbbing headache / migraine', 'Dizziness or lightheadedness', 'Brain fog & concentration difficulty', 'Eye strain or double vision'],
      sampleQuestions: [
        'What causes throbbing pressure behind my left eye?',
        'How to differentiate a tension headache from a migraine?',
        'When is dizziness considered a serious medical warning sign?',
      ],
    },
    {
      id: 'chest',
      name: 'Chest, Heart & Lungs',
      icon: '🫀',
      commonSymptoms: ['Sharp or dull chest discomfort', 'Shortness of breath on exertion', 'Persistent dry or wet cough', 'Rapid heart palpitations'],
      sampleQuestions: [
        'Is sharp chest pain when breathing deeply acid reflux or anxiety?',
        'What causes heart palpitations after drinking coffee or stress?',
        'How can I soothe a persistent tickling cough at night?',
      ],
    },
    {
      id: 'abdomen',
      name: 'Abdomen & Digestive System',
      icon: '🫄',
      commonSymptoms: ['Bloating & abdominal cramps', 'Acid reflux / heartburn after meals', 'Nausea or upset stomach', 'Irritable bowel or digestive changes'],
      sampleQuestions: [
        'What foods cause upper stomach bloating and sharp gas pain?',
        'How do I treat severe heartburn naturally before bedtime?',
        'What are early signs of appendicitis vs general stomach cramps?',
      ],
    },
    {
      id: 'spine',
      name: 'Back, Spine & Neck',
      icon: '🦴',
      commonSymptoms: ['Lower back stiffness', 'Neck strain from computer posture', 'Radiating nerve numbness in arm/leg', 'Upper back muscle knot'],
      sampleQuestions: [
        'What stretches relieve lower back stiffness after sitting long hours?',
        'Could neck pain radiating down my arm be a pinched nerve?',
        'Is ice or heat better for acute lower back strain?',
      ],
    },
    {
      id: 'joints',
      name: 'Joints & Limbs',
      icon: '🦾',
      commonSymptoms: ['Knee swelling or popping', 'Wrist tendonitis / carpal tunnel', 'Ankle sprain discomfort', 'Morning stiffness in fingers'],
      sampleQuestions: [
        'What are early signs of knee arthritis vs meniscus strain?',
        'How to prevent wrist pain from heavy typing and mouse use?',
        'How long does a mild ankle ligament sprain take to heal?',
      ],
    },
    {
      id: 'skin',
      name: 'Skin & Allergy',
      icon: '🫧',
      commonSymptoms: ['Itchy red skin rash', 'Eczema flare-up / dry patches', 'Hives or allergic reaction', 'Acne inflammation or cyst'],
      sampleQuestions: [
        'What causes sudden red itchy hives on arms and chest?',
        'How to calm down an active eczema flare-up naturally?',
        'What skincare ingredients help soothe rosacea and redness?',
      ],
    },
  ];

  const currentRegionObj = regions.find((r) => r.id === selectedRegion) || regions[0];

  return (
    <section id="symptom-map" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartPulse className="w-4 h-4 text-sky-600" /> Interactive Symptom Mapping
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Targeted Anatomical Analysis
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Select a body region to explore common symptoms and send tailored diagnostic questions directly to HealthGuard AI.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Region Buttons */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {regions.map((region) => {
              const isSelected = region.id === selectedRegion;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`p-4 rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-xl shadow-teal-600/20 border-transparent transform scale-[1.02]'
                      : 'glass-card text-slate-800 hover:bg-white/90 border-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{region.icon}</span>
                    <span className="font-bold text-sm sm:text-base">{region.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Detail Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-white/80 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60">
              <span className="text-4xl p-3 bg-teal-50 rounded-2xl border border-teal-100">{currentRegionObj.icon}</span>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">{currentRegionObj.name}</h3>
                <p className="text-xs text-slate-500 font-medium">Click any question below to ask the AI assistant immediately.</p>
              </div>
            </div>

            {/* Common Symptoms Badges */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Frequent Symptoms:</h4>
              <div className="flex flex-wrap gap-2">
                {currentRegionObj.commonSymptoms.map((sym, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample AI Diagnostic Prompts */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ask HealthGuard AI About This Region:</h4>
              <div className="flex flex-col gap-3">
                {currentRegionObj.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectSymptomQuestion(q)}
                    className="p-4 rounded-2xl glass-card text-left text-slate-800 hover:text-teal-700 font-semibold text-sm flex items-center justify-between group cursor-pointer border-white/70"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-teal-500 group-hover:scale-125 transition-transform flex-shrink-0" />
                      <span>"{q}"</span>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors flex items-center gap-1 flex-shrink-0">
                      Ask AI <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
