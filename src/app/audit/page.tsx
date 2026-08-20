'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Building2, CheckCircle2, XCircle, AlertTriangle, FileText, Award } from 'lucide-react';

export default function AuditPage() {
  const { audits } = useAppStore();
  const [selectedAuditId, setSelectedAuditId] = useState('aud-501');
  const [activeTab, setActiveTab] = useState<'all' | 'infrastructure' | 'digital' | 'washroom' | 'laboratory' | 'emergency'>('all');

  const currentAudit = audits.find((a) => a.id === selectedAuditId) || audits[0];

  const filteredItems = activeTab === 'all'
    ? currentAudit.checklistItems
    : currentAudit.checklistItems.filter((i) => i.category === activeTab);

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Institution Accessibility Assessment
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Institutional Accessibility Audit & Certification
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Physical infrastructure, digital accessibility, tactile paving, accessible washrooms & emergency alarms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-blue-200">Overall Audit Score</div>
            <div className="text-2xl font-black text-emerald-400">{currentAudit.overallScore}/100</div>
          </div>
          <div className="p-3 bg-[#081a3b] border border-cyan-400/30 rounded-2xl text-cyan-400">
            <Award className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Select Institution Audit */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {audits.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelectedAuditId(a.id)}
            className={`p-4 rounded-2xl border text-left transition shrink-0 max-w-sm ${
              selectedAuditId === a.id
                ? 'bg-[#123366] border-cyan-400 text-white shadow-lg'
                : 'bg-[#0f2b5c] border-cyan-500/30 text-blue-100 hover:bg-[#102a54]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-cyan-300">{a.district}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${
                a.riskLevel === 'low' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {a.riskLevel} Risk
              </span>
            </div>
            <div className="font-bold text-sm text-white truncate">{a.institutionName}</div>
            <div className="text-[11px] text-blue-200 mt-1">Auditor: {a.auditorName}</div>
          </button>
        ))}
      </div>

      {/* Audit Checklist Table */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            Audit Parameters & Evidence Verification
          </h3>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {(['all', 'infrastructure', 'digital', 'washroom', 'laboratory', 'emergency'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl font-bold capitalize transition ${
                  activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black shadow-md' : 'bg-[#081a3b] text-blue-200 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition ${
                item.isCompliant
                  ? 'bg-[#081a3b] border-blue-400/20 hover:border-cyan-400/50'
                  : 'bg-rose-950/30 border-rose-800/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold text-sm">
                <div className="flex items-center gap-3">
                  {item.isCompliant ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <span className="text-white">{item.title}</span>
                  <span className="text-[10px] bg-[#0f2b5c] text-cyan-300 px-2 py-0.5 rounded capitalize border border-cyan-500/20">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className={item.isCompliant ? 'text-emerald-400 font-black' : 'text-rose-400 font-black'}>
                    Score: {item.score}/10
                  </span>
                  <button
                    onClick={() => alert(`Viewing verified evidence for: ${item.title}`)}
                    className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 px-2.5 py-1 rounded-lg border border-blue-400/30 text-xs flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Evidence
                  </button>
                </div>
              </div>

              <p className="text-xs text-blue-200 mt-2 pl-8">{item.description}</p>

              {item.notes && (
                <div className="mt-3 ml-8 p-3 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Auditor Remediation Note: </span>
                    {item.notes}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
