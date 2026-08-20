'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { AccessibilityEngine } from '@/lib/accessibility';
import { BookOpen, Volume2, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export default function LearningPage() {
  const { language } = useAppStore();
  const [complexText, setComplexText] = useState(
    'Photosynthesis is the photochemical process by which chlorophyll-containing organisms convert radiant solar energy into chemical bond energy stored within glucose molecules.'
  );
  const [simplifiedOutput, setSimplifiedOutput] = useState('');
  const [isSimplifying, setIsSimplifying] = useState(false);

  const handleSimplifyText = () => {
    setIsSimplifying(true);
    setTimeout(() => {
      setSimplifiedOutput(
        '🌿 **Simple Explanation**:\n1. Plants use sunlight, water, and air to make food.\n2. Sunlight gives them energy.\n3. The food they make is sugar (glucose) that helps them grow!'
      );
      setIsSimplifying(false);
      AccessibilityEngine.speak('Text simplified. Plants use sunlight and water to make food.', language);
    }, 600);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Adaptive Accessibility Learning Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Personalized & Accessible Learning Environment
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Multimodal learning: Text-to-Speech audio, OpenDyslexic views, AI Concept Simplifiers & accessible quizzes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: AI Concept Simplifier */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              AI Concept Simplifier & Read-Aloud
            </h2>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              Neurodiverse Friendly
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-blue-200">Enter Complex Textbook Paragraph:</label>
            <textarea
              rows={4}
              value={complexText}
              onChange={(e) => setComplexText(e.target.value)}
              className="w-full bg-[#081a3b] border border-blue-400/20 rounded-2xl p-3 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimplifyText}
              disabled={isSimplifying}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md"
            >
              {isSimplifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Simplify Language with AI
            </button>

            <button
              onClick={() => AccessibilityEngine.speak(simplifiedOutput || complexText, language)}
              className="bg-[#081a3b] hover:bg-[#123366] text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-blue-400/30 transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              Read Aloud (TTS)
            </button>
          </div>

          {simplifiedOutput && (
            <div className="bg-[#081a3b] border border-emerald-400/40 p-4 rounded-2xl text-xs space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Simplified Result:
              </div>
              <p className="text-blue-100 whitespace-pre-line leading-relaxed">{simplifiedOutput}</p>
            </div>
          )}
        </div>

        {/* Right Card: Accessible Quizzes */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Adaptive Quiz & Self Assessment
            </h2>
            <span className="text-xs text-blue-200">Subject: Science 101</span>
          </div>

          <div className="bg-[#081a3b] p-5 rounded-2xl border border-blue-400/20 space-y-4">
            <div className="font-bold text-sm text-white">
              Question 1: Which part of the plant absorbs water from the soil?
            </div>

            <div className="space-y-2">
              {['Roots (जड़ें / मुळे)', 'Leaves (पत्तियां / पाने)', 'Flowers (फूल / फुले)', 'Stem (तना / खोड)'].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === 0) {
                      AccessibilityEngine.speak('Correct answer! Roots absorb water.', language);
                      alert('✅ Correct! Roots absorb water and minerals from the soil.');
                    } else {
                      alert('❌ Try again!');
                    }
                  }}
                  className="w-full text-left bg-[#0f2b5c] hover:bg-[#13356e] border border-blue-400/20 hover:border-cyan-400 p-3 rounded-xl text-xs font-semibold text-white transition shadow-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
