'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { AccessibilityEngine } from '@/lib/accessibility';
import { Volume2, Mic, AlertTriangle, ArrowLeft, CheckCircle2, UserCheck, HeartHandshake } from 'lucide-react';

export default function KioskPage() {
  const { language, setLanguage, students } = useAppStore();
  const [selectedStudent] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const handleVoiceAssist = (text: string) => {
    AccessibilityEngine.speak(text, language, 0.9);
  };

  const activeStudent = students.find((s) => s.id === (selectedStudent || 'std-001')) || students[0];

  const handleEmergencyHelp = () => {
    handleVoiceAssist('Emergency assistance alert broadcasted to campus accessibility team.');
    alert('🚨 Emergency assistance signal sent to Campus Support Staff & Medical Desk!');
  };

  const handleQuickScribeRequest = () => {
    setRequestSent(true);
    handleVoiceAssist('Exam Scribe request logged successfully.');
  };

  return (
    <div className="bg-[#0f2b5c] text-white min-h-[85vh] p-4 sm:p-8 space-y-8 rounded-3xl border-2 border-cyan-400 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-blue-400/20">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-3 bg-[#081a3b] hover:bg-[#123366] rounded-2xl text-cyan-200 border border-blue-400/30 text-sm font-bold flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Exit Kiosk</span>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">Campus Accessibility Kiosk</h1>
            <p className="text-xs sm:text-sm text-blue-200">Touch or Voice-Guided Student Support Kiosk</p>
          </div>
        </div>

        {/* Big Language Buttons */}
        <div className="flex items-center gap-2">
          {(['en', 'hi', 'mr'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                handleVoiceAssist(lang === 'hi' ? 'भाषा बदली गई' : lang === 'mr' ? 'भाषा बदलली' : 'Language changed');
              }}
              className={`px-4 py-2.5 rounded-2xl text-sm font-black uppercase transition border-2 ${
                language === lang
                  ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-md font-black'
                  : 'bg-[#081a3b] border-blue-400/30 text-blue-200 hover:bg-[#123366]'
              }`}
            >
              {lang === 'hi' ? 'हिन्दी' : lang === 'mr' ? 'मराठी' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Prompt Banner */}
      <div className="bg-[#081a3b] border border-cyan-500/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-md">
            <Volume2 className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Tap any button to listen to options</h3>
            <p className="text-xs text-blue-200">Kiosk is equipped with screen reading & audio feedback.</p>
          </div>
        </div>

        <button
          onClick={() => handleVoiceAssist('Welcome to INCLUDE360 Kiosk. Select your name or tap Emergency Assistance.')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm shadow-md flex items-center gap-2"
        >
          <Mic className="w-5 h-5" />
          Read Instructions
        </button>
      </div>

      {/* Main Kiosk Action Grid (Large Touch Targets) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Assistance Card */}
        <button
          onClick={handleEmergencyHelp}
          className="bg-[#081a3b] border-4 border-rose-500 hover:border-rose-400 p-8 rounded-3xl text-left space-y-4 shadow-2xl transition transform hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between">
            <div className="p-4 bg-rose-600 rounded-2xl text-white">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <span className="bg-rose-500/20 text-rose-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-rose-400/40">
              Immediate Help
            </span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-rose-400">EMERGENCY ASSISTANCE</h2>
            <p className="text-sm text-blue-100 mt-2">
              Tap for immediate wheelchair assistance, medical support, or emergency campus escort.
            </p>
          </div>
        </button>

        {/* Quick Scribe Request Card */}
        <div className="bg-[#081a3b] border-4 border-emerald-500 p-8 rounded-3xl space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="p-4 bg-emerald-600 rounded-2xl text-white">
                <HeartHandshake className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold text-emerald-400">Quick Scribe Request</span>
            </div>
            <h2 className="text-2xl font-black text-white">Request Exam Accommodations</h2>
            <p className="text-xs text-blue-200 mt-2">
              Logged as: <span className="font-bold text-cyan-300">{activeStudent.fullName}</span> ({activeStudent.rollNumber})
            </p>
          </div>

          {requestSent ? (
            <div className="bg-[#0f2b5c] border border-emerald-400 p-4 rounded-2xl text-emerald-300 text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Scribe request logged! Ticket #REQ-2026-8804.
            </div>
          ) : (
            <button
              onClick={handleQuickScribeRequest}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black py-4 rounded-2xl text-base shadow-lg transition"
            >
              Request Certified Scribe
            </button>
          )}
        </div>
      </div>

      {/* Student Status Summary */}
      <div className="bg-[#081a3b] border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Active Student Profile Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#0f2b5c] p-4 rounded-2xl border border-blue-400/20">
            <span className="text-blue-300 block mb-1">Student Name</span>
            <span className="text-sm font-bold text-white">{activeStudent.fullName}</span>
          </div>
          <div className="bg-[#0f2b5c] p-4 rounded-2xl border border-blue-400/20">
            <span className="text-blue-300 block mb-1">Disability Category</span>
            <span className="text-sm font-bold text-emerald-400 capitalize">{activeStudent.accessibilityProfile.primaryCategory} (75%)</span>
          </div>
          <div className="bg-[#0f2b5c] p-4 rounded-2xl border border-blue-400/20">
            <span className="text-blue-300 block mb-1">Active Accommodations</span>
            <span className="text-sm font-bold text-cyan-300">4 Verified Supports</span>
          </div>
        </div>
      </div>
    </div>
  );
}
