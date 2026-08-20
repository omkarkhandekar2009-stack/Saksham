'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { FileCheck2, Clock } from 'lucide-react';

export default function ExaminationsPage() {
  const { examAccommodations } = useAppStore();

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Examination Governance & Conduct
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Examination Accommodations & Scribe Matrix
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            RPWD Section 16 compliant extra-time calculator, scribe allocations, and invigilator instructions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Extra-time Calculator Card */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            RPWD Compensatory Extra-Time Rules
          </h3>
          <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-3 text-xs">
            <div className="font-bold text-white">Official Standard: 20 Minutes per Hour of Exam</div>
            <p className="text-blue-100 text-[11px] leading-relaxed">
              Students with benchmark disabilities (&ge;40%) are entitled to compensatory extra time automatically calculated by the system.
            </p>
            <div className="pt-2 border-t border-blue-400/20 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-blue-300">2-Hour Physics Exam:</span>
                <span className="text-emerald-400 font-bold">+40 Mins Extra Time</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-blue-300">3-Hour Board Mathematics Paper:</span>
                <span className="text-emerald-400 font-bold">+60 Mins Extra Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Accommodation List */}
        <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Approved Exam Accommodations ({examAccommodations.length})</span>
          </h3>

          <div className="space-y-3">
            {examAccommodations.map((ea) => (
              <div key={ea.id} className="bg-[#081a3b] border border-blue-400/20 p-5 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-cyan-300 font-mono">{ea.subjectCode} - {ea.examName}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                    {ea.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <span className="text-blue-300 block">Student Name:</span>
                    <span className="font-bold text-white">{ea.studentName}</span>
                  </div>
                  <div>
                    <span className="text-blue-300 block">Compensatory Extra Time:</span>
                    <span className="font-bold text-emerald-400">+{ea.extraTimeMinutes} Minutes</span>
                  </div>
                  <div>
                    <span className="text-blue-300 block">Assigned Certified Scribe:</span>
                    <span className="font-bold text-cyan-200">{ea.scribeAssignedName || 'Not Required'}</span>
                  </div>
                  <div>
                    <span className="text-blue-300 block">Exam Date:</span>
                    <span className="font-bold text-white">{ea.examDate}</span>
                  </div>
                </div>

                {ea.invigilatorNotes && (
                  <div className="bg-[#0f2b5c] p-3 rounded-xl border border-blue-400/20 text-[11px] text-blue-100">
                    <span className="font-bold text-amber-300 block mb-0.5">Invigilator Instructions:</span>
                    {ea.invigilatorNotes}
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
