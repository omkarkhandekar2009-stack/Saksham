'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Users, Calendar, Plus } from 'lucide-react';

export default function GovernancePage() {
  const { policies } = useAppStore();

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Institutional Governance & Decision Council
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Accessibility Policy & Governance Repository
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Official inclusion policies, committee resolutions, accessibility decision records & action plans.
          </p>
        </div>

        <button
          onClick={() => alert('New governance policy draft initiated!')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Draft Inclusion Policy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Governance Committee Widget */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            Institutional Inclusion Committee
          </h3>

          <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-3 text-xs">
            <div className="font-bold text-white">Committee Leadership:</div>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-center justify-between">
                <span>Chairperson:</span>
                <span className="font-bold text-emerald-400">Dr. Sunita Deshmukh (Principal)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Secretary:</span>
                <span className="font-bold text-cyan-300">Prof. Smita Joshi (Special Ed)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Parent Representative:</span>
                <span className="font-bold text-white">Rajesh Sharma</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-blue-400/20 flex items-center justify-between text-[11px] text-blue-300">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Next Meeting:
              </span>
              <span className="font-bold text-white">28 August 2026</span>
            </div>
          </div>
        </div>

        {/* Policy Repository */}
        <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Active Institutional Policies ({policies.length})</span>
          </h3>

          <div className="space-y-3">
            {policies.map((pol) => (
              <div key={pol.id} className="bg-[#081a3b] border border-blue-400/20 p-5 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-cyan-300 font-mono">{pol.policyNumber}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold">
                    {pol.status}
                  </span>
                </div>

                <div className="font-bold text-sm text-white">{pol.title}</div>
                <div className="text-[11px] text-blue-300 flex items-center justify-between pt-1">
                  <span>Approved By: {pol.approvedBy}</span>
                  <span>Effective Date: {pol.effectiveDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
