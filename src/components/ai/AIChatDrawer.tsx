'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Bot, Send, Sparkles, X, CheckCircle, AlertTriangle, ArrowRight, Key, ExternalLink, Zap } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  provider?: string;
  confidence?: number;
  sources?: string[];
  suggestedAction?: string;
  timestamp: string;
}

export const AIChatDrawer: React.FC = () => {
  const { students, serviceRequests, examAccommodations, audits, complianceRecords, policies, incidents } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello! I am **INCLUDE360 AI Assistant** (Powered by Groq / Llama 3.3).\n\nAsk me **ANY question** about our inclusive education platform, RPWD Act 2016 statutory guidelines, student IEPs, exam scribes, audits, or campus barrier reports.',
      timestamp: 'Just now',
    },
  ]);

  // Load saved API key on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('inc360_ai_key') || '';
      if (savedKey) {
        setApiKey(savedKey);
        setTempKey(savedKey);
      }
    }
  }, []);

  const handleSaveApiKey = (keyToSave: string) => {
    const trimmed = keyToSave.trim();
    setApiKey(trimmed);
    if (typeof window !== 'undefined') {
      localStorage.setItem('inc360_ai_key', trimmed);
    }
    setShowKeyInput(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userQuery = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Package live database context
      const platformState = {
        totalStudents: students.length,
        verifiedUDIDCount: students.filter((s) => s.udidCardNumber).length,
        pendingRequestsCount: serviceRequests.filter((r) => r.status === 'pending' || r.status === 'under_review').length,
        activeExamAccommodations: examAccommodations.length,
        auditsSummary: audits.map((a) => ({ name: a.institutionName, score: a.overallScore, risk: a.riskLevel })),
        studentNames: students.map((s) => s.fullName),
      };

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuery,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          apiKey: apiKey || undefined,
          platformState,
        }),
      });

      const data = await response.json();

      if (data.requiresApiKey) {
        setShowKeyInput(true);
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `⚡ **Groq API Key Required**\n\nYou can add your free Groq API key in **\`.env.local\`** as:\n\`\`\`bash\nGROQ_API_KEY=gsk_your_key_here\n\`\`\`\nOr paste your key into the box above!\n\n👉 **Get a free Groq API key (free & ultra-fast):** [console.groq.com/keys](https://console.groq.com/keys)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else if (data.reply) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply,
          provider: data.provider || 'Groq Llama 3.3',
          confidence: data.confidence || 98,
          sources: data.sources || ['INCLUDE360 Live Knowledge Engine'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `❌ Error: ${data.error || 'Failed to process question. Please check Groq API Key.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `❌ Network error connecting to AI endpoint: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm transition transform hover:scale-105 border border-cyan-300"
        aria-label="Open INCLUDE360 AI Assistant"
      >
        <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
        <span>INCLUDE360 AI Assistant</span>
      </button>

      {/* Chat Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-start">
          <div className="bg-[#0f2b5c] border-r border-cyan-500/30 text-white w-full max-w-lg h-full flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-blue-400/20 bg-[#081a3b] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl text-slate-950 font-bold shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-1.5">
                    <span>INCLUDE360 AI Intelligence</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-1.5 py-0.2 rounded border border-emerald-400/40">
                      Groq AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-200">Real-Time LLM for Inclusive Education & Governance</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                    apiKey
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                      : 'bg-[#0f2b5c] text-cyan-300 border-cyan-500/30 hover:bg-[#123366]'
                  }`}
                  title="Configure Groq / Gemini API Key"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">{apiKey ? 'Key Set' : 'Set Key'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#123366]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* API Key Configuration Banner */}
            {showKeyInput && (
              <div className="bg-[#081a3b] p-4 border-b border-cyan-500/30 text-xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between font-bold text-cyan-300 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Enter Groq API Key (or set in .env.local):
                  </span>
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    Get Free Groq Key <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    placeholder="gsk_..."
                    className="flex-1 bg-[#0f2b5c] border border-blue-400/30 rounded-xl px-3 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    onClick={() => handleSaveApiKey(tempKey)}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-sm"
                  >
                    Save Key
                  </button>
                </div>
                <p className="text-[10px] text-blue-200">
                  Tip: You can also place <code className="bg-[#0f2b5c] text-cyan-300 px-1.5 py-0.5 rounded">GROQ_API_KEY=gsk_...</code> inside <code className="text-white">.env.local</code> in your project root!
                </p>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-md'
                        : 'bg-[#081a3b] border border-cyan-500/30 text-blue-100 rounded-bl-none shadow-lg'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                    {m.confidence && (
                      <div className="mt-2.5 pt-2 border-t border-blue-400/20 flex items-center justify-between text-[10px] text-blue-300">
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          {m.provider ? `${m.provider}` : 'AI Grounded'}
                        </span>
                        <span>{m.timestamp}</span>
                      </div>
                    )}

                    {m.sources && (
                      <div className="mt-2 text-[10px] text-blue-300">
                        <span className="font-semibold text-white">Grounded In: </span>
                        {m.sources.join(' • ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold p-3 bg-[#081a3b] rounded-2xl w-fit border border-cyan-500/30">
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Groq Llama 3.3 is generating answer...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-blue-400/20 bg-[#081a3b] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask any custom question about the platform or RPWD laws..."
                className="flex-1 bg-[#0f2b5c] border border-blue-400/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-blue-300 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isTyping}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 p-2.5 rounded-xl transition font-bold shadow-md hover:opacity-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
