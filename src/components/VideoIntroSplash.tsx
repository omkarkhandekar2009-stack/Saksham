'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, SkipForward, Shield, Sparkles } from 'lucide-react';

import { useAppStore } from '@/lib/store';

export function VideoIntroSplash({ onComplete }: { onComplete?: () => void }) {
  const { videoIntroKey } = useAppStore();
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(8.5);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setShowSplash(true);
    setIsFading(false);
    setTimeLeft(8.5);

    // Attempt auto-play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Fallback for browsers blocking autoplay without user interaction
      });
    }

    // Countdown interval every 100ms
    const startTime = Date.now();
    const DURATION = 8500; // 8.5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (DURATION - elapsed) / 1000);
      setTimeLeft(parseFloat(remaining.toFixed(1)));

      if (elapsed >= DURATION) {
        clearInterval(interval);
        startFadeOut();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [videoIntroKey]);

  const startFadeOut = () => {
    setIsFading(true);
    // After 2.5 seconds of ultra-slow smooth fade out, completely unmount
    setTimeout(() => {
      setShowSplash(false);
      if (onComplete) onComplete();
    }, 2500);
  };

  const handleSkip = () => {
    startFadeOut();
  };

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between overflow-hidden transition-opacity duration-[2500ms] ease-in-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Fullscreen Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105"
        />
        {/* Subtle Gradient Overlays for readability & Cinematic look */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
      </div>

      {/* Top Header Overlay */}
      <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-cyan-400/40 shadow-2xl">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#081a3b] rounded-[10px] flex items-center justify-center">
              <Shield className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div>
            <span className="font-black text-sm text-white tracking-wide">
              Sak<span className="text-cyan-300">sham</span>
            </span>
            <span className="text-[10px] text-blue-200 block font-semibold">AI Inclusive Education Ecosystem</span>
          </div>
        </div>

        {/* Countdown Badge */}
        <div className="flex items-center gap-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-blue-400/30 text-xs shadow-2xl">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono font-bold text-cyan-300 text-sm">{timeLeft.toFixed(1)}s</span>
          <span className="text-blue-200 hidden sm:inline text-[11px]">Intro Video</span>
        </div>
      </div>

      {/* Center Cinematic Title overlay */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          Empowering Every Learner Across Jharkhand
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg leading-tight">
          Inclusive Education &amp; Accessibility Ecosystem
        </h1>
      </div>

      {/* Bottom Control & Slow Fade Bar */}
      <div className="relative z-10 p-6 sm:p-8 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-blue-100 bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-blue-400/20">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Opening Saksham Dashboard in <strong className="text-white font-mono">{timeLeft.toFixed(1)} seconds</strong>...</span>
        </div>

        <button
          onClick={handleSkip}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition shadow-xl flex items-center gap-2 backdrop-blur-md border border-cyan-300/40 cursor-pointer"
        >
          <span>Skip Video &amp; Open Dashboard</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900/80 z-20">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 transition-all duration-100"
          style={{ width: `${Math.min(100, ((8.5 - timeLeft) / 8.5) * 100)}%` }}
        />
      </div>
    </div>
  );
}
