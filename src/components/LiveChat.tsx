import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Sparkles, RefreshCw, Volume2, VolumeX, Copy, Check, 
  Trash2, AlertTriangle, ArrowRight, History, Mic, MicOff, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { ChatMessage } from '../types';

interface LiveChatProps {
  initialPrompt?: string;
  onOpenDoctorModal?: () => void;
}

const CHAT_STORAGE_KEY = 'healthguard_chat_history';

const DEFAULT_REALISTIC_CONVERSATION: ChatMessage[] = [
  {
    id: 'demo-user-1',
    sender: 'user',
    text: "I have a headache and mild fever, what could it be?",
    timestamp: new Date(Date.now() - 120000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'demo-ai-1',
    sender: 'ai',
    text: `I'm sorry you're not feeling well. Here's what could be going on:

**Possible Causes:**
- Viral infection (such as seasonal flu or cold)
- Dehydration or inadequate fluid intake
- Stress or tension buildup
- Seasonal allergies or sinus inflammation

**Suggested Care:**
- Rest in a quiet, cool room
- Stay well-hydrated with water or electrolytes
- Monitor your temperature regularly

**Common Medicine:**
- Over-the-counter pain relievers/fever reducers like **Paracetamol / Acetaminophen** (or Ibuprofen) can help reduce fever and ease pain. *Note: Always follow package dosage instructions (e.g., max 4,000mg/day for adults) and check with a doctor or pharmacist if taking other medications.*

*This is general information, not a medical diagnosis. Please consult a doctor if symptoms persist.*`,
    timestamp: new Date(Date.now() - 110000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedFollowups: [
      'What is the maximum safe dose of Paracetamol?',
      'When should I see a doctor for a fever?',
      'How can I tell if my headache is from dehydration?',
    ],
  },
];

export const LiveChat: React.FC<LiveChatProps> = ({ initialPrompt, onOpenDoctorModal }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const savedHistory = localStorage.getItem(CHAT_STORAGE_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved chat history:', e);
    }
    return DEFAULT_REALISTIC_CONVERSATION;
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'up' | 'down'>>({});
  const [isListening, setIsListening] = useState<boolean>(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  const suggestedChips = [
    "I have a headache and mild fever",
    "What causes sudden sharp back pain?",
    "Is my sore throat serious?",
    "Check medication side-effects",
    "When to visit urgent care?",
    "How to manage fever safely?",
  ];

  // Sync messages to localStorage whenever chat history updates
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history to localStorage:', e);
    }
  }, [messages]);

  // Handle auto scroll to bottom on new messages or streaming
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, streamingMsgId]);

  // Handle external initial prompt if provided
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      setInputQuery(initialPrompt);
      setTimeout(() => {
        handleSendMessage(initialPrompt);
      }, 300);
    }
  }, [initialPrompt]);

  // Web Speech API initialization for Mic button
  const toggleMicListening = () => {
    if (isListening) {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      speechRecognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  };

  // Animate text word by word for ChatGPT streaming effect
  const streamTextWordByWord = (aiMsgId: string, fullText: string, followups: string[]) => {
    const words = fullText.split(' ');
    let currentIndex = 0;
    setStreamingMsgId(aiMsgId);

    const interval = setInterval(() => {
      currentIndex += 1;
      const currentText = words.slice(0, currentIndex).join(' ');

      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId ? { ...m, text: currentText } : m
        )
      );

      if (currentIndex >= words.length) {
        clearInterval(interval);
        setStreamingMsgId(null);
        // Attach followups once finished streaming
        if (followups && followups.length > 0) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, suggestedFollowups: followups } : m
            )
          );
        }
      }
    }, 28); // 28ms word interval for a realistic typing pace
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading || streamingMsgId !== null) return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    if (isListening && speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const rawResponse = data.response || "I apologize, but I could not generate a response.";
      const followups = data.suggestedFollowups || [];

      setIsLoading(false);

      const aiMsgId = `ai-${Date.now()}`;
      const placeholderAiMessage: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowups: [],
      };

      setMessages((prev) => [...prev, placeholderAiMessage]);
      streamTextWordByWord(aiMsgId, rawResponse, followups);

    } catch (err: any) {
      console.error('Failed to send message:', err);
      setIsLoading(false);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `### ⚠️ Connection Notice
I experienced a momentary connection issue. Please check your network or try asking your question again.

*This is general information, not a medical diagnosis. Please consult a doctor if symptoms persist.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleRegenerate = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.text);
    }
  };

  const handleFeedback = (msgId: string, type: 'up' | 'down') => {
    setFeedbackMap((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? (undefined as any) : type,
    }));
  };

  const handleChipClick = (chipText: string) => {
    setInputQuery(chipText);
    handleSendMessage(chipText);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/ - /g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    const resetMsg: ChatMessage = {
      id: `welcome-msg-${Date.now()}`,
      sender: 'ai',
      text: `Chat history cleared. How can I assist with your health questions?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([resetMsg]);
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage history:', e);
    }
  };

  return (
    <section id="live-chat" className="relative py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-300/60 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" /> ChatGPT-Style Health Assistant
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Interactive AI Health Triage
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Get structured, evidence-backed medical information and guidance instantly.
          </p>
        </div>

        {/* Core Glassmorphic Chat Container */}
        <div className="glass-panel rounded-3xl shadow-2xl border border-white/80 overflow-hidden bg-gradient-to-b from-white/95 via-slate-50/80 to-sky-50/40 backdrop-blur-2xl">
          
          {/* Chat Window Top Navigation Bar */}
          <div className="px-6 py-4 bg-white/80 border-b border-slate-200/80 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              {/* 3D-styled AI Avatar */}
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-500/25">
                <Bot className="w-6 h-6 animate-pulse" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-base">HealthGuard AI</h3>
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-extrabold uppercase">
                    GPT-Style Triage
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100/80 text-slate-600 text-[10px] font-semibold border border-slate-200/60" title="Your messages are saved in browser local storage">
                    <History className="w-3 h-3 text-teal-600" /> History Saved
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active & Ready
                </p>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                title="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden md:inline">Clear Chat</span>
              </button>
              {onOpenDoctorModal && (
                <button
                  onClick={onOpenDoctorModal}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold border border-teal-200 transition-colors cursor-pointer"
                >
                  Consult Doctor
                </button>
              )}
            </div>
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="px-6 py-2 bg-amber-50/80 border-b border-amber-200/60 text-amber-800 text-xs flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Medical Notice:</strong> Information provided is for educational triage purposes only. Call 911 for emergencies.
            </span>
          </div>

          {/* Chat Messages Body Area */}
          <div className="p-6 min-h-[400px] max-h-[540px] overflow-y-auto chat-scroll flex flex-col gap-6">
            {messages.map((msg) => {
              const isStreamingThisMsg = streamingMsgId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  } group animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  {/* AI Avatar (3D robot styling) */}
                  {msg.sender === 'ai' && (
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-600 via-sky-600 to-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-600/20 mt-1 border border-white/60">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed transition-all ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-tr-none shadow-teal-600/15'
                        : 'glass-panel rounded-tl-none border border-white/90 bg-white/90 text-slate-800 shadow-slate-200/50'
                    }`}
                  >
                    {/* Markdown Text Formatting Render */}
                    <div className="space-y-2 whitespace-pre-wrap font-sans">
                      {msg.text.split('\n').map((line, idx) => {
                        if (line.startsWith('### ')) {
                          return (
                            <h4 key={idx} className={`font-extrabold text-base sm:text-lg mt-2 mb-1 ${msg.sender === 'user' ? 'text-white' : 'text-slate-900'}`}>
                              {line.replace('### ', '')}
                            </h4>
                          );
                        }
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <p key={idx} className={`font-bold text-slate-900 mt-2 mb-0.5`}>
                              {line.replace(/\*\*/g, '')}
                            </p>
                          );
                        }
                        if (line.startsWith('- ')) {
                          const content = line.replace('- ', '');
                          return (
                            <p key={idx} className="ml-3 my-0.5 flex items-start gap-1.5">
                              <span className="text-teal-600 font-bold">&bull;</span>
                              <span>
                                {content.split('**').map((part, pIdx) =>
                                  pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-900">{part}</strong> : part
                                )}
                              </span>
                            </p>
                          );
                        }
                        if (line.startsWith('*') && line.endsWith('*')) {
                          return (
                            <p key={idx} className="text-xs italic text-slate-500 mt-3 pt-2 border-t border-slate-200/60">
                              {line.replace(/\*/g, '')}
                            </p>
                          );
                        }
                        return (
                          <p key={idx}>
                            {line.split('**').map((part, pIdx) =>
                              pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-900">{part}</strong> : part
                            )}
                          </p>
                        );
                      })}

                      {/* Blinking Cursor during streaming */}
                      {isStreamingThisMsg && (
                        <span className="inline-block w-2 h-4 bg-teal-600 font-bold ml-1 animate-pulse font-mono">
                          ▋
                        </span>
                      )}
                    </div>

                    {/* ChatGPT Action Row below AI responses */}
                    {msg.sender === 'ai' && !isStreamingThisMsg && msg.text.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                        <span className="text-[11px] font-medium">{msg.timestamp}</span>
                        
                        <div className="flex items-center gap-1">
                          {/* Copy Action */}
                          <button
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          {/* Speak TTS Action */}
                          <button
                            onClick={() => handleSpeakText(msg.text)}
                            className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${isSpeaking ? 'text-teal-600 animate-pulse' : 'text-slate-400 hover:text-slate-700'}`}
                            title="Read response aloud"
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>

                          {/* Thumbs Up Action */}
                          <button
                            onClick={() => handleFeedback(msg.id, 'up')}
                            className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                              feedbackMap[msg.id] === 'up' ? 'text-teal-600 bg-teal-50 font-bold' : 'text-slate-400 hover:text-slate-700'
                            }`}
                            title="Helpful response"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>

                          {/* Thumbs Down Action */}
                          <button
                            onClick={() => handleFeedback(msg.id, 'down')}
                            className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                              feedbackMap[msg.id] === 'down' ? 'text-rose-600 bg-rose-50 font-bold' : 'text-slate-400 hover:text-slate-700'
                            }`}
                            title="Needs improvement"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Regenerate Action */}
                          <button
                            onClick={handleRegenerate}
                            disabled={isLoading || streamingMsgId !== null}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                            title="Regenerate response"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Suggested Follow-up Question Buttons */}
                    {msg.sender === 'ai' && !isStreamingThisMsg && msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-200/60">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Suggested Follow-ups:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedFollowups.map((followup, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleChipClick(followup)}
                              disabled={isLoading || streamingMsgId !== null}
                              className="px-2.5 py-1 rounded-lg bg-teal-50/80 hover:bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200/80 transition-colors text-left flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <span>{followup}</span>
                              <ArrowRight className="w-3 h-3 text-teal-600 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Thinking Dots Indicator before streaming */}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-in fade-in duration-200">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-600 via-sky-600 to-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-5 h-5 animate-spin" />
                </div>
                <div className="glass-panel rounded-2xl rounded-tl-none p-4 border border-white/80 bg-white/90 flex items-center gap-3 shadow-sm">
                  <span className="text-xs font-bold text-teal-800">HealthGuard AI is thinking</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompt Chips Bar */}
          <div className="px-6 py-2.5 bg-slate-50/80 border-t border-slate-200/60 overflow-x-auto whitespace-nowrap flex items-center gap-2 chat-scroll">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">Examples:</span>
            {suggestedChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                disabled={isLoading || streamingMsgId !== null}
                className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-slate-700 hover:text-teal-700 hover:border-teal-400 transition-all flex-shrink-0 cursor-pointer disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* ChatGPT-Style Fixed Bottom Input Bar */}
          <div className="p-4 sm:p-5 bg-white/90 border-t border-slate-200/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isListening ? "Listening... Speak your symptom question..." : "Ask your health question (e.g. 'I have a headache and mild fever')..."}
                disabled={isLoading || streamingMsgId !== null}
                className={`w-full pl-5 pr-32 py-3.5 sm:py-4 rounded-2xl glass-input text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none focus:ring-2 focus:ring-teal-500/30 transition-all shadow-inner ${
                  isListening ? 'ring-2 ring-rose-500 bg-rose-50/40' : ''
                }`}
              />

              {/* Input Action Controls (Mic + Send) */}
              <div className="absolute right-2 flex items-center gap-1.5">
                {/* Voice Input Mic Button */}
                <button
                  type="button"
                  onClick={toggleMicListening}
                  title={isListening ? "Stop listening" : "Click to speak your symptom"}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                      : 'text-slate-400 hover:text-teal-700 hover:bg-slate-100'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isLoading || streamingMsgId !== null}
                  className="px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer group"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
            
            <p className="text-[11px] text-slate-400 text-center mt-2 font-medium">
              HealthGuard AI Triage Engine &bull; Private & local history saved.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

