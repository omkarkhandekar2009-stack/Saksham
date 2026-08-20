'use client';

import React from 'react';
import { mockInstitutions } from '@/lib/seedData';
import { Landmark, Building2, Scale, AlertTriangle } from 'lucide-react';

export default function AuthoritiesPage() {
  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              State & District Governance Level
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Government & District Education Authority Analytics
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Macro-level inclusive education coverage, institutional risk indices, compliance trends & district comparisons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1.5 rounded-xl">
            Privacy Filter Active (Aggregated Data)
          </span>
        </div>
      </div>

      {/* Authority Macro KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
            <span>Covered Institutions</span>
            <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">12</div>
          <div className="text-[11px] text-blue-200 mt-1">Across 5 Monitored Districts</div>
        </div>

        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
            <span>State Compliance Average</span>
            <div className="p-1.5 bg-[#081a3b] text-emerald-400 rounded-lg">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">89.4%</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">+4.2% YoY Improvement</div>
        </div>

        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
            <span>High Risk Institutions</span>
            <div className="p-1.5 bg-[#081a3b] text-rose-400 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-400">1</div>
          <div className="text-[11px] text-rose-300 font-bold mt-1">Remediation Notice Issued</div>
        </div>

        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
            <span>Total Specially Abled Students</span>
            <div className="p-1.5 bg-[#081a3b] text-teal-300 rounded-lg">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-teal-300">500+</div>
          <div className="text-[11px] text-teal-200 font-bold mt-1">100% UDID Tagged</div>
        </div>
      </div>

      {/* District-wise Institution Audit & Risk Comparison */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center justify-between">
          <span>District Institutional Accessibility Comparison</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInstitutions.map((inst, idx) => {
            const score = idx === 2 ? 68 : idx === 1 ? 92 : 89;
            const isRisk = score < 75;

            return (
              <div
                key={inst.id}
                className={`p-5 rounded-2xl border space-y-3 transition ${
                  isRisk
                    ? 'bg-rose-950/30 border-rose-800/60'
                    : 'bg-[#081a3b] border-blue-400/20 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-blue-300 font-mono">{inst.code}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black ${
                    isRisk ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {isRisk ? 'High Risk' : 'Compliant'}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-sm text-white line-clamp-1">{inst.name}</div>
                  <div className="text-xs text-cyan-300 mt-0.5">District: {inst.district}</div>
                </div>

                <div className="pt-2 border-t border-blue-400/20 flex items-center justify-between text-xs">
                  <span className="text-blue-300">Audit Score:</span>
                  <span className={`text-base font-black ${isRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
