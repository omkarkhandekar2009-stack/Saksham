'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { BrainCircuit, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AIPage() {
  const { aiRecommendations } = useAppStore();

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Predictive AI & Accessibility Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            INCLUDE360 AI Accessibility Intelligence Engine
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Scribe demand forecasting, accessibility gap detection, compliance risk prediction & automated resource planning.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-emerald-400" /> AI Models Synced
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Metrics Card */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            AI Model Performance & Guardrails
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">Accessibility Gap Detection Accuracy</span>
              <span className="text-xl font-black text-white">96.8%</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">Human-In-The-Loop Verification</span>
              <span className="text-sm font-bold text-emerald-400">100% Required Before Execution</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">Explainability Engine</span>
              <span className="text-xs text-blue-100">All predictions cite internal RPWD & audit records</span>
            </div>
          </div>
        </div>

        {/* AI Recommendations Stream */}
        <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Automated AI Recommendations & Insights ({aiRecommendations.length})</span>
          </h3>

          <div className="space-y-4">
            {aiRecommendations.map((ai) => (
              <div key={ai.id} className="bg-[#081a3b] border border-cyan-500/30 p-6 rounded-3xl space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    {ai.type.replace(/_/g, ' ')}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-3 py-0.5 rounded-full text-[11px]">
                    Confidence: {ai.confidenceScore}%
                  </span>
                </div>

                <div className="font-bold text-base text-white">{ai.title}</div>
                <p className="text-blue-100 text-xs leading-relaxed">{ai.description}</p>

                <div className="bg-[#0f2b5c] p-4 rounded-2xl border border-cyan-500/30 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Recommended Corrective Action:
                  </div>
                  <div className="text-xs text-blue-100 font-medium">{ai.suggestedAction}</div>
                  <button
                    onClick={() => alert(`Approved & Applied AI Action: ${ai.suggestedAction}`)}
                    className="mt-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Execute Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
