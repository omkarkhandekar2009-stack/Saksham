'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { i18n } from '@/lib/i18n';
import { AccessibilityEngine } from '@/lib/accessibility';
import {
  Bot,
  Send,
  Sparkles,
  X,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Compass,
  FileText,
  HelpCircle,
  Square,
  Radio,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  provider?: string;
  confidence?: number;
  sources?: string[];
  suggestedAction?: {
    label: string;
    href: string;
  };
  timestamp: string;
}

type VoiceState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'ERROR';

export const AIChatDrawer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const stopAudioRef = useRef<(() => void) | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Map route to friendly title
  const getRouteTitle = (path: string) => {
    switch (path) {
      case '/':
        return language === 'hi' ? 'मुख्य पृष्ठ' : language === 'mr' ? 'मुख्य पृष्ठ' : 'Home Page';
      case '/dashboard':
        return t.navDashboard;
      case '/learning':
        return t.navLearning;
      case '/opportunities':
        return t.navOpportunities;
      case '/lifecycle':
        return t.navLifecycle;
      case '/students':
        return currentRole === 'student' ? t.navMyProfile : t.navStudents;
      case '/accessibility':
        return t.navServices;
      case '/examinations':
        return t.navExams;
      case '/audit':
        return t.navAudit;
      case '/compliance':
        return t.navCompliance;
      case '/governance':
        return t.navGovernance;
      case '/conduct':
        return t.navConduct;
      case '/authorities':
        return t.navAuthorities;
      default:
        return 'Saksham';
    }
  };

  const currentTitle = getRouteTitle(pathname);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: t.aiGreeting,
      timestamp: 'Just now',
    },
  ]);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, voiceState]);

  // Sync greeting on language change if only initial message exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'ai') {
        return [
          {
            id: 'm-1',
            sender: 'ai',
            text: t.aiGreeting,
            timestamp: 'Just now',
          },
        ];
      }
      return prev;
    });
  }, [language, t.aiGreeting]);

  // Stop active audio playback (Interruption / Barge-in)
  const stopAudioPlayback = () => {
    if (stopAudioRef.current) {
      try {
        stopAudioRef.current();
      } catch (e) {}
      stopAudioRef.current = null;
    }
    AccessibilityEngine.stopSpeaking();
    if (voiceState === 'SPEAKING') {
      setVoiceState('IDLE');
    }
  };

  // Play Native PCM Audio from Gemini
  const playNativePcmAudio = (base64Audio: string, onEndedCallback?: () => void) => {
    stopAudioPlayback();
    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) {
        if (onEndedCallback) onEndedCallback();
        return;
      }

      const audioCtx = new AudioCtxClass({ sampleRate: 24000 });
      const buffer = audioCtx.createBuffer(1, float32Array.length, 24000);
      buffer.copyToChannel(float32Array, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);

      setVoiceState('SPEAKING');

      source.onended = () => {
        setVoiceState('IDLE');
        stopAudioRef.current = null;
        try {
          audioCtx.close();
        } catch (e) {}
        if (onEndedCallback) onEndedCallback();
      };

      source.start(0);

      stopAudioRef.current = () => {
        try {
          source.stop();
          audioCtx.close();
        } catch (e) {}
      };
    } catch (err) {
      console.error('Error playing native PCM audio:', err);
      setVoiceState('IDLE');
      if (onEndedCallback) onEndedCallback();
    }
  };

  // 1. GROK / xAI TEXT CHAT HANDLER
  const handleSendMessage = async (textToSend: string, customInstruction?: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    stopAudioPlayback();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const pageText = document.querySelector('main')?.textContent || '';
      const cleanPageContext = pageText.replace(/\s+/g, ' ').slice(0, 400);

      const historyPayload = messages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: customInstruction ? `${customInstruction}: "${trimmed}"` : trimmed,
          history: historyPayload,
          currentPage: pathname,
          pageTitle: currentTitle,
          currentRole,
          language,
          pageContext: cleanPageContext,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply,
          provider: data.provider || 'Saksham AI',
          confidence: data.confidence || 98,
          suggestedAction: data.suggestedAction,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, aiMsg]);

        if (ttsEnabled) {
          const cleanSpeech = data.reply.replace(/[*_#]/g, '').slice(0, 300);
          AccessibilityEngine.speak(cleanSpeech, language);
        }
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text:
            language === 'mr'
              ? 'क्षमस्व, सक्षम एआय सेवा तात्पुरती अनुपलब्ध आहे. आपण वेबसाइटचा वापर सुरू ठेवू शकता.'
              : language === 'hi'
              ? 'क्षमा करें, सक्षम एआई सेवा अस्थायी रूप से अनुपलब्ध है। आप सामान्य रूप से वेबसाइट का उपयोग जारी रख सकते हैं।'
              : 'Sorry, the Saksham AI service is temporarily unavailable. You can continue using the website normally.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (e: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text:
          language === 'mr'
            ? 'नेटवर्क त्रुटी. कृपया आपले इंटरनेट कनेक्शन तपासा.'
            : language === 'hi'
            ? 'नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें।'
            : 'Network error. Please check your connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // 2. GEMINI LIVE VOICE HANDLER (REAL-TIME NATIVE AUDIO & DEVANGARI TRANSCRIPT)
  const startRecording = async () => {
    stopAudioPlayback();
    setErrorMessage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        if (audioBlob.size > 500) {
          await processVoiceInput(audioBlob, mimeType);
        } else {
          setVoiceState('IDLE');
        }
      };

      mediaRecorder.start(250);
      setVoiceState('LISTENING');
      AccessibilityEngine.announceToScreenReader('Listening for voice input');
    } catch (err: any) {
      console.error('Microphone access error:', err);
      setVoiceState('ERROR');
      setErrorMessage(
        language === 'mr'
          ? 'मायक्रोफोन प्रवेश नाकारला किंवा उपलब्ध नाही.'
          : language === 'hi'
          ? 'माइक्रोफ़ोन एक्सेस अस्वीकृत या अनुपलब्ध है।'
          : 'Microphone access is required for voice assistance.'
      );
      setTimeout(() => setVoiceState('IDLE'), 3500);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setVoiceState('THINKING');
    }
  };

  const toggleVoiceMode = () => {
    if (voiceState === 'LISTENING') {
      stopRecording();
    } else if (voiceState === 'SPEAKING') {
      stopAudioPlayback();
    } else {
      startRecording();
    }
  };

  const processVoiceInput = async (audioBlob: Blob, mimeType: string) => {
    setVoiceState('THINKING');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        if (!base64Data) {
          setVoiceState('IDLE');
          return;
        }

        const pageText = document.querySelector('main')?.textContent || '';
        const cleanPageContext = pageText.replace(/\s+/g, ' ').slice(0, 400);

        const historyPayload = messages.slice(-4).map((m) => ({
          sender: m.sender,
          text: m.text,
        }));

        const res = await fetch('/api/ai/live-voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioBase64: base64Data,
            audioMimeType: mimeType,
            history: historyPayload,
            currentPage: pathname,
            pageTitle: currentTitle,
            currentRole,
            language,
            pageContext: cleanPageContext,
          }),
        });

        if (!res.ok) {
          throw new Error('Gemini Voice processing failed');
        }

        const data = await res.json();

        // 1. Add User Transcript to Chat
        if (data.userTranscript) {
          const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: data.userTranscript,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, userMsg]);
        }

        // 2. Add AI Reply to Chat
        if (data.reply) {
          const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply,
            provider: 'Saksham AI (Gemini Live)',
            confidence: 99,
            suggestedAction: data.suggestedAction,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, aiMsg]);

          // 3. Play Native Gemini Speech Audio
          if (ttsEnabled && data.audioBase64) {
            playNativePcmAudio(data.audioBase64);
          } else if (ttsEnabled) {
            setVoiceState('SPEAKING');
            AccessibilityEngine.speak(data.speechText || data.reply, language);
            setTimeout(() => setVoiceState('IDLE'), 6000);
          } else {
            setVoiceState('IDLE');
          }
        } else {
          setVoiceState('IDLE');
        }
      };
    } catch (err) {
      console.error('Voice Processing Error:', err);
      setVoiceState('ERROR');
      setErrorMessage(
        language === 'mr'
          ? 'आवाज सहाय्य तात्पुरते अनुपलब्ध आहे. आपण मजकूर चॅट सुरू ठेवू शकता.'
          : language === 'hi'
          ? 'ध्वनि सहायता अस्थायी रूप से अनुपलब्ध है। आप टेक्स्ट चैट जारी रख सकते हैं।'
          : 'Voice assistance is temporarily unavailable. You can continue using text chat.'
      );
      setTimeout(() => setVoiceState('IDLE'), 4000);
    }
  };

  const handleExplainPage = () => {
    handleSendMessage(
      language === 'hi'
        ? `कृपया इस पृष्ठ (${currentTitle} - ${pathname}) के बारे में बताएं: यह क्या करता है और मैं क्या कार्य कर सकता हूँ?`
        : language === 'mr'
        ? `कृपया या पृष्ठाबद्दल (${currentTitle} - ${pathname}) सांगा: हे काय करते आणि मी कोणती कृती करू शकतो?`
        : `Please explain this page (${currentTitle} - ${pathname}): what it does, important sections, and what actions I can take.`
    );
  };

  const handleReadPage = () => {
    const pageText = document.querySelector('main')?.textContent || document.body.textContent || '';
    const cleanText = pageText.replace(/\s+/g, ' ').slice(0, 350);
    setVoiceState('SPEAKING');
    AccessibilityEngine.speak(cleanText, language);
    setTimeout(() => setVoiceState('IDLE'), 8000);
  };

  const handleSimplifyContent = () => {
    const pageText = document.querySelector('main')?.textContent || '';
    const sampleExcerpt = pageText.replace(/\s+/g, ' ').slice(0, 250);
    handleSendMessage(
      sampleExcerpt,
      language === 'hi'
        ? 'निम्नलिखित पृष्ठ सामग्री को सरल व सुगम भाषा में समझाएं'
        : language === 'mr'
        ? 'खालील पृष्ठावरील मजकूर सोप्या व सुलभ भाषेत समजावून सांगा'
        : 'Please simplify the following visible page content in plain accessible language'
    );
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs sm:text-sm transition transform hover:scale-105 border border-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        aria-label="Open Saksham AI Assistant"
      >
        <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
        <span>{t.aiAssistantTitle}</span>
      </button>

      {/* Assistant Drawer Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-start"
          role="dialog"
          aria-modal="true"
          aria-label="Saksham AI Assistant Panel"
        >
          <div className="bg-[#0f2b5c] border-r border-cyan-500/30 text-white w-full max-w-lg h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-4 border-b border-blue-400/20 bg-[#081a3b] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl text-slate-950 font-bold shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-1.5">
                    <span>{t.aiAssistantTitle}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
                      {language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English'}
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-200">{t.aiAssistantSub}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice State Indicator */}
                {voiceState === 'SPEAKING' && (
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-lg text-[10px] font-bold animate-pulse">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'hi' ? 'बोल रहा हूँ...' : language === 'mr' ? 'बोलत आहे...' : 'Speaking...'}</span>
                    <button
                      onClick={stopAudioPlayback}
                      className="ml-1 px-1.5 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-bold flex items-center gap-0.5"
                      title="Stop Speaking"
                    >
                      <Square className="w-2.5 h-2.5" />
                      <span>Stop</span>
                    </button>
                  </div>
                )}

                {voiceState === 'THINKING' && (
                  <div className="flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-1 rounded-lg text-[10px] font-bold animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                    <span>{language === 'hi' ? 'सोच रहा है...' : language === 'mr' ? 'विचार करत आहे...' : 'Thinking...'}</span>
                  </div>
                )}

                {/* TTS Toggle */}
                <button
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={`p-1.5 rounded-lg border transition ${
                    ttsEnabled
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                      : 'bg-[#0f2b5c] text-blue-300 border-blue-400/30'
                  }`}
                  title={ttsEnabled ? 'Mute Voice Output' : 'Enable Voice Output'}
                  aria-label={ttsEnabled ? 'Mute Voice Output' : 'Enable Voice Output'}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                </button>

                <button
                  onClick={() => {
                    stopAudioPlayback();
                    setIsOpen(false);
                  }}
                  className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#123366]"
                  aria-label="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Current Page Context Header */}
            <div className="px-4 py-2.5 bg-[#06142e] border-b border-blue-400/20 flex items-center justify-between text-xs text-blue-200">
              <div className="flex items-center gap-2 truncate">
                <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-[11px] text-blue-300">{t.aiCurrentPage}</span>
                <strong className="text-white text-xs truncate">{currentTitle}</strong>
              </div>
            </div>

            {/* Quick Action Accessibility Buttons */}
            <div className="px-4 py-2.5 bg-[#081a3b]/90 border-b border-blue-400/20 flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={handleExplainPage}
                className="bg-[#0f2b5c] hover:bg-[#123366] text-cyan-200 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition shadow-xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
                <span>{t.aiExplainPage}</span>
              </button>
              <button
                onClick={handleReadPage}
                className="bg-[#0f2b5c] hover:bg-[#123366] text-emerald-200 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition shadow-xs"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.aiReadPage}</span>
              </button>
              <button
                onClick={handleSimplifyContent}
                className="bg-[#0f2b5c] hover:bg-[#123366] text-amber-200 border border-amber-500/30 px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.aiSimplifyContent}</span>
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl p-4 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-md'
                        : 'bg-[#081a3b] border border-cyan-500/30 text-blue-100 rounded-bl-none shadow-lg'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                    {/* Agentic Navigation Action Button */}
                    {m.suggestedAction && (
                      <div className="mt-3 pt-2.5 border-t border-blue-400/20">
                        <button
                          onClick={() => {
                            stopAudioPlayback();
                            setIsOpen(false);
                            router.push(m.suggestedAction!.href);
                          }}
                          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition hover:scale-105"
                        >
                          <span>{m.suggestedAction.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {m.confidence && (
                      <div className="mt-2.5 pt-2 border-t border-blue-400/20 flex items-center justify-between text-[10px] text-blue-300">
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          {m.provider || 'Saksham AI'}
                        </span>
                        <span>{m.timestamp}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold p-3 bg-[#081a3b] rounded-2xl w-fit border border-cyan-500/30">
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>{t.aiProcessing}</span>
                </div>
              )}

              {errorMessage && (
                <div className="flex items-center gap-2 text-amber-200 text-xs p-3 bg-amber-950/60 rounded-2xl border border-amber-500/40">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Voice Listening Wave Indicator */}
            {voiceState === 'LISTENING' && (
              <div className="p-3.5 bg-gradient-to-r from-rose-900/80 via-purple-900/80 to-blue-900/80 border-t border-rose-500/40 text-xs flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2.5 text-rose-200 font-bold">
                  <Radio className="w-4 h-4 text-rose-400 animate-ping" />
                  <span>{t.aiListening || 'Listening...'}</span>
                  <span className="text-[11px] text-rose-300 font-normal">
                    ({language === 'mr' ? 'बोला...' : language === 'hi' ? 'बोलिए...' : 'Speak now...'})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={stopRecording}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-1 transition"
                >
                  <Square className="w-3 h-3" />
                  <span>Done</span>
                </button>
              </div>
            )}

            {/* Input Form with Unified Voice & Text Modes */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 border-t border-blue-400/20 bg-[#081a3b] flex items-center gap-2"
            >
              {/* Gemini Live Voice Microphone Button */}
              <button
                type="button"
                onClick={toggleVoiceMode}
                className={`p-2.5 rounded-xl font-bold transition flex items-center justify-center shadow-md ${
                  voiceState === 'LISTENING'
                    ? 'bg-rose-600 text-white ring-4 ring-rose-400/50 animate-pulse'
                    : voiceState === 'SPEAKING'
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/50'
                    : voiceState === 'THINKING'
                    ? 'bg-cyan-600 text-white animate-spin'
                    : 'bg-[#0f2b5c] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30'
                }`}
                title={
                  voiceState === 'LISTENING'
                    ? 'Stop listening'
                    : voiceState === 'SPEAKING'
                    ? 'Interrupt & Speak'
                    : t.aiSpeakNow
                }
                aria-label={
                  voiceState === 'LISTENING'
                    ? 'Stop listening'
                    : voiceState === 'SPEAKING'
                    ? 'Interrupt & Speak'
                    : t.aiSpeakNow
                }
              >
                {voiceState === 'LISTENING' ? (
                  <MicOff className="w-4 h-4 text-white" />
                ) : voiceState === 'SPEAKING' ? (
                  <Volume2 className="w-4 h-4 text-white animate-bounce" />
                ) : (
                  <Mic className="w-4 h-4 text-cyan-300" />
                )}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.aiPlaceholder}
                className="flex-1 bg-[#0f2b5c] border border-blue-400/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-blue-300 focus:outline-none"
              />

              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 p-2.5 rounded-xl transition font-bold shadow-md hover:opacity-95 disabled:opacity-50"
                aria-label={t.aiSend}
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
