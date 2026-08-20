'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Scale, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function CompliancePage() {
  const { complianceRecords } = useAppStore();

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Statutory Governance & Compliance Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Inclusive Education Legal Compliance Tracker
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            RPWD Act 2016 Section 16/17, UGC Notifications & NEP 2020 inclusive education mandates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('New compliance rule added to framework!')}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition"
          >
            Configure Legal Requirement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Summary Statistics */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            Compliance Status Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 flex items-center justify-between">
              <span className="text-blue-200 font-semibold">Fully Compliant Mandates</span>
              <span className="text-base font-black text-emerald-400">2 Verified</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 flex items-center justify-between">
              <span className="text-blue-200 font-semibold">Pending Corrective Action</span>
              <span className="text-base font-black text-amber-400">1 Overdue</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 flex items-center justify-between">
              <span className="text-blue-200 font-semibold">District Compliance Rate</span>
              <span className="text-base font-black text-cyan-300">89.4%</span>
            </div>
          </div>
        </div>

        {/* Compliance Records & Corrective Actions */}
        <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Mandatory Legal Requirements Checklist</span>
          </h3>

          <div className="space-y-3">
            {complianceRecords.map((cr) => (
              <div key={cr.id} className="bg-[#081a3b] border border-blue-400/20 p-5 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-cyan-300 text-sm">{cr.requirementTitle}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                    cr.status === 'compliant'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {cr.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-blue-100 text-xs">
                  <span className="font-semibold text-blue-300">Institution: </span>
                  {cr.institutionName}
                </div>

                {cr.verifiedBy && (
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified by {cr.verifiedBy} on {cr.verifiedAt}
                  </div>
                )}

                {cr.correctiveActionPlan && (
                  <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl space-y-1">
                    <div className="text-rose-300 font-bold flex items-center gap-1 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Corrective Action Required:
                    </div>
                    <p className="text-blue-100 text-[11px]">{cr.correctiveActionPlan}</p>
                    <div className="text-[10px] text-amber-300 font-mono pt-1">
                      Remediation Deadline: {cr.deadline}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
