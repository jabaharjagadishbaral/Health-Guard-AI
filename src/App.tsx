import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { LiveChat } from './components/LiveChat';
import { BodySymptomMap } from './components/BodySymptomMap';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { DoctorModal } from './components/DoctorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [initialChatPrompt, setInitialChatPrompt] = useState<string>('');
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState<boolean>(false);

  const handleStartChat = (prompt?: string) => {
    if (prompt) {
      setInitialChatPrompt(prompt);
    }
    const chatElement = document.getElementById('live-chat');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreBodyMap = () => {
    const mapElement = document.getElementById('symptom-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSymptomQuestion = (question: string) => {
    handleStartChat(question);
  };

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      {/* Glass Header / Navbar */}
      <Navbar
        onStartChatClick={() => handleStartChat()}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
      />

      {/* Hero Section */}
      <main>
        <Hero
          onStartChatClick={() => handleStartChat()}
          onExploreClick={handleExploreBodyMap}
        />

        {/* Trust & Key Stats Bar */}
        <TrustBar />

        {/* Live Chat Interface (Core Section) */}
        <LiveChat
          initialPrompt={initialChatPrompt}
          onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
        />

        {/* Interactive Anatomical Symptom Selector */}
        <BodySymptomMap onSelectSymptomQuestion={handleSelectSymptomQuestion} />

        {/* Features Grid */}
        <Features />

        {/* How It Works Timeline */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Doctor & Telehealth Modal */}
      <DoctorModal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
      />
    </div>
  );
}
