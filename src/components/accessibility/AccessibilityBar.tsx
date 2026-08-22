'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { i18n } from '@/lib/i18n';
import { AccessibilityEngine } from '@/lib/accessibility';
import { Volume2, VolumeX, Eye, Type, Globe, Sparkles, Move, Settings2, Keyboard, Check } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const { accessibilitySettings, updateAccessibilitySettings, language, setLanguage } = useAppStore();
  const t = i18n[language] || i18n.hi;
  const [isOpen, setIsOpen] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Instant DOM synchronization for font scaling and contrast presets
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = `${accessibilitySettings.fontSizeScale}%`;
      
      // Sync contrast classes
      document.documentElement.classList.remove('high-contrast-yellow', 'high-contrast-blue', 'contrast-dark');
      if (accessibilitySettings.contrastMode === 'high-contrast-yellow') {
        document.documentElement.classList.add('high-contrast-yellow');
      } else if (accessibilitySettings.contrastMode === 'high-contrast-blue') {
        document.documentElement.classList.add('high-contrast-blue');
      } else if (accessibilitySettings.contrastMode === 'dark') {
        document.documentElement.classList.add('contrast-dark');
      }

      // Sync dyslexic font
      if (accessibilitySettings.dyslexicFont) {
        document.documentElement.classList.add('font-dyslexic');
      } else {
        document.documentElement.classList.remove('font-dyslexic');
      }
    }
  }, [accessibilitySettings.fontSizeScale, accessibilitySettings.contrastMode, accessibilitySettings.dyslexicFont]);

  const handleReadPage = () => {
    if (isSpeaking) {
      AccessibilityEngine.stopSpeaking();
      setIsSpeaking(false);
      AccessibilityEngine.announceToScreenReader('Speech synthesis stopped.');
    } else {
      const pageText = document.querySelector('main')?.textContent || document.body.textContent || '';
      const summary = pageText.slice(0, 400);
      AccessibilityEngine.announceToScreenReader('Starting screen read aloud.');
      AccessibilityEngine.speak(summary, language, accessibilitySettings.speechRate);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        handleReadPage();
      }
      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        updateAccessibilitySettings({
          contrastMode: accessibilitySettings.contrastMode === 'high-contrast-yellow' ? 'normal' : 'high-contrast-yellow',
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpeaking, language, accessibilitySettings]);

  return (
    <div className="relative z-50">
      {/* Hidden Skip-to-Content Link for Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-cyan-500 focus:text-slate-950 focus:p-3 focus:rounded-xl focus:font-black focus:shadow-2xl"
      >
        Skip to main content (Screen Reader Shortcut)
      </a>

      {/* Top Header Quick Toggle Strip */}
      <div className="bg-[#081a3b] text-blue-100 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs border-b border-cyan-500/20">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            WCAG AAA Accessible Mode
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => updateAccessibilitySettings({ contrastMode: accessibilitySettings.contrastMode === 'high-contrast-yellow' ? 'normal' : 'high-contrast-yellow' })}
              className={`px-2 py-0.5 rounded font-medium transition ${
                accessibilitySettings.contrastMode === 'high-contrast-yellow' ? 'bg-yellow-400 text-black font-bold' : 'bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30'
              }`}
              aria-label="Toggle Yellow on Black High Contrast"
            >
              High Contrast (Alt+C)
            </button>
            <button
              onClick={() => updateAccessibilitySettings({ dyslexicFont: !accessibilitySettings.dyslexicFont })}
              className={`px-2 py-0.5 rounded font-medium transition ${
                accessibilitySettings.dyslexicFont ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30'
              }`}
              aria-label="Toggle OpenDyslexic Font"
            >
              Dyslexic Font
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Read Aloud button */}
          <button
            onClick={handleReadPage}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              isSpeaking ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#0f2b5c] hover:bg-[#123366] text-cyan-300 border border-blue-400/30'
            }`}
            aria-label={isSpeaking ? 'Stop reading page text' : 'Read page text aloud using Text to Speech (Shortcut: Alt + R)'}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {isSpeaking ? 'Stop TTS' : `${t.speechTTS} (Alt+R)`}
          </button>

          {/* Language Switcher: Hindi first, English second, Marathi third */}
          <div className="flex items-center gap-1 bg-[#0f2b5c] border border-blue-400/30 rounded p-0.5" role="group" aria-label="Language selector">
            <Globe className="w-3 h-3 text-cyan-300 ml-1" />
            {[
              { code: 'hi' as const, label: 'हिन्दी', title: 'Hindi' },
              { code: 'en' as const, label: 'English', title: 'English' },
              { code: 'mr' as const, label: 'मराठी', title: 'Marathi' },
            ].map(({ code, label, title }) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code);
                  AccessibilityEngine.announceToScreenReader(`Language changed to ${title}`);
                }}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                  language === code ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold' : 'text-blue-300 hover:text-white'
                }`}
                aria-label={`Switch language to ${title}`}
                title={title}
              >
                {label}
              </button>
            ))}
          </div>


          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-2.5 py-1 rounded font-semibold text-xs transition shadow-sm"
            aria-label="Open full accessibility settings"
            aria-expanded={isOpen}
          >
            <Settings2 className="w-3.5 h-3.5" />
            Controls
          </button>
        </div>
      </div>

      {/* Expanded Accessibility Settings Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Accessibility Settings">
          <div className="bg-[#0f2b5c] border-l border-cyan-500/30 text-white w-full max-w-md p-6 h-full overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-400/20 mb-6">
                <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Universal Accessibility Settings
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-blue-300 hover:text-white text-lg font-bold px-2 py-1"
                  aria-label="Close accessibility controls"
                >
                  ✕
                </button>
              </div>

              {/* Blind & Screen Reader Guide Banner */}
              <div className="mb-6 bg-[#081a3b] border border-cyan-500/30 p-4 rounded-2xl text-xs space-y-2">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Keyboard className="w-4 h-4 text-emerald-400" />
                  Screen Reader & Keyboard Shortcuts:
                </div>
                <ul className="text-blue-100 space-y-1 text-[11px]">
                  <li>• <strong className="text-white">Alt + R</strong>: Instant Page Read-Aloud (TTS)</li>
                  <li>• <strong className="text-white">Alt + C</strong>: Toggle High-Contrast Yellow mode</li>
                  <li>• <strong className="text-white">Tab / Shift + Tab</strong>: Navigate through all buttons & inputs</li>
                  <li>• <strong className="text-white">NVDA / JAWS / TalkBack</strong>: 100% ARIA & semantic HTML compatible</li>
                </ul>
              </div>

              {/* Text Scaling */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-blue-100 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-cyan-400" />
                    Font Rescaling (Low Vision)
                  </span>
                  <span className="text-cyan-300 font-mono font-bold text-base">{accessibilitySettings.fontSizeScale}%</span>
                </label>
                <div className="flex items-center gap-2">
                  {[100, 115, 130, 150, 175, 200].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateAccessibilitySettings({ fontSizeScale: size })}
                      className={`flex-1 py-2 rounded text-xs font-bold transition border ${
                        accessibilitySettings.fontSizeScale === size
                          ? 'bg-cyan-500 border-cyan-300 text-slate-950 font-black shadow-md'
                          : 'bg-[#081a3b] border-blue-400/30 text-blue-200 hover:bg-[#123366]'
                      }`}
                    >
                      {size}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Contrast Mode Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-blue-100">Contrast Preset</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => updateAccessibilitySettings({ contrastMode: 'normal' })}
                    className={`p-3 rounded-xl border text-left font-medium transition ${
                      accessibilitySettings.contrastMode === 'normal'
                        ? 'border-cyan-400 bg-[#081a3b] text-cyan-200 font-bold shadow-md'
                        : 'border-blue-400/30 bg-[#081a3b]/60 text-blue-200 hover:bg-[#081a3b]'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Royal Oceanic</span>
                      {accessibilitySettings.contrastMode === 'normal' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div className="text-[10px] text-blue-300">Default high-contrast blue</div>
                  </button>

                  <button
                    onClick={() => updateAccessibilitySettings({ contrastMode: 'dark' })}
                    className={`p-3 rounded-xl border text-left font-medium transition ${
                      accessibilitySettings.contrastMode === 'dark'
                        ? 'border-cyan-400 bg-slate-950 text-white font-bold shadow-md'
                        : 'border-blue-400/30 bg-[#081a3b]/60 text-blue-200 hover:bg-[#081a3b]'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Deep Dark</span>
                      {accessibilitySettings.contrastMode === 'dark' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div className="text-[10px] text-blue-300">Low-light OLED theme</div>
                  </button>

                  <button
                    onClick={() => updateAccessibilitySettings({ contrastMode: 'high-contrast-yellow' })}
                    className={`p-3 rounded-xl border text-left font-medium transition ${
                      accessibilitySettings.contrastMode === 'high-contrast-yellow'
                        ? 'border-yellow-400 bg-yellow-400 text-black font-bold shadow-md'
                        : 'border-blue-400/30 bg-[#081a3b]/60 text-blue-200 hover:bg-[#081a3b]'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Yellow on Black</span>
                      {accessibilitySettings.contrastMode === 'high-contrast-yellow' && <Check className="w-3.5 h-3.5 text-black" />}
                    </div>
                    <div className="text-[10px]">High visibility for low vision</div>
                  </button>

                  <button
                    onClick={() => updateAccessibilitySettings({ contrastMode: 'high-contrast-blue' })}
                    className={`p-3 rounded-xl border text-left font-medium transition ${
                      accessibilitySettings.contrastMode === 'high-contrast-blue'
                        ? 'border-cyan-400 bg-blue-900 text-cyan-200 font-bold shadow-md'
                        : 'border-blue-400/30 bg-[#081a3b]/60 text-blue-200 hover:bg-[#081a3b]'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Cyan on Navy</span>
                      {accessibilitySettings.contrastMode === 'high-contrast-blue' && <Check className="w-3.5 h-3.5 text-cyan-300" />}
                    </div>
                    <div className="text-[10px]">Soft cognitive contrast</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-blue-400/20">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black py-2.5 rounded-xl transition shadow-lg text-sm"
              >
                Apply Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
