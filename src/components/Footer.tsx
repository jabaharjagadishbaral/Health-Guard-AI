import React, { useState } from 'react';
import { Activity, ShieldCheck, Heart, Send, AlertTriangle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Emergency Warning Notice */}
        <div className="mb-12 p-4 rounded-2xl bg-amber-950/60 border border-amber-800/60 text-amber-200 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p>
              <strong>Emergency Notice:</strong> HealthGuard AI is an automated health education platform and does not replace professional medical diagnosis, emergency services, or in-person physician care.
            </p>
          </div>
          <a href="tel:911" className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex-shrink-0 whitespace-nowrap transition-colors">
            Call 911
          </a>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={scrollToTop}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 text-white shadow-md">
                <Activity className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">HealthGuard <span className="text-teal-400">AI</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Next-generation clinical AI triage providing instant, empathetic, and evidence-backed medical information 24/7.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>HIPAA Compliant &bull; 256-Bit SSL Encrypted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#live-chat" className="hover:text-teal-400 transition-colors">Live AI Chat</a></li>
              <li><a href="#features" className="hover:text-teal-400 transition-colors">Platform Features</a></li>
              <li><a href="#symptom-map" className="hover:text-teal-400 transition-colors">Interactive Body Map</a></li>
              <li><a href="#how-it-works" className="hover:text-teal-400 transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Legal & Medical */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Medical & Privacy</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Clinical Guidelines</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Doctor Network</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">HealthGuard Newsletter</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Subscribe to get weekly evidence-based health tips and new AI diagnostic features.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center cursor-pointer"
              >
                {subscribed ? 'Subscribed!' : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} HealthGuard AI Inc. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-teal-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
