'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  GraduationCap,
  Briefcase,
  UserCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CareerJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'public_sector' | 'corporate' | 'accessible_tech';
  accommodationsOffered: string[];
  matchedDisabilities: string[];
  reservationQuota: string;
  appliedCount: number;
}

const mockJobs: CareerJob[] = [
  {
    id: 'job-1',
    title: 'Junior Software Engineer (Assistive Tech & Web Accessibility)',
    company: 'National Informatics Centre (NIC) / Govt Portal Division',
    location: 'Mumbai / Hybrid',
    type: 'public_sector',
    accommodationsOffered: ['NVDA/JAWS Screen Reader workstation', 'Ergonomic Braille display', 'Flexible hours'],
    matchedDisabilities: ['Visual', 'Mobility'],
    reservationQuota: '4% RPWD Reserved Quota (Govt of India)',
    appliedCount: 14,
  },
  {
    id: 'job-2',
    title: 'Data Analyst & Accessibility Quality Auditor',
    company: 'Tata Inclusive Tech Labs',
    location: 'Pune / Remote',
    type: 'corporate',
    accommodationsOffered: ['Sign language interpreter for meetings', 'Live AI captioning', 'Neurodiverse quiet workspace'],
    matchedDisabilities: ['Hearing', 'Speech', 'Neurodiverse'],
    reservationQuota: 'Inclusive Diversity Equal Opportunity',
    appliedCount: 22,
  },
  {
    id: 'job-3',
    title: 'Financial Operations Associate',
    company: 'State Bank of India (Inclusive Talent Drive)',
    location: 'Nagpur',
    type: 'public_sector',
    accommodationsOffered: ['Ground floor accessible branch', 'Motorized ramp & lift access', 'Tactile keyboards'],
    matchedDisabilities: ['Mobility', 'Visual'],
    reservationQuota: 'Public Sector RPWD Section 34 Quota',
    appliedCount: 31,
  },
];

export default function LifecyclePage() {
  const { students } = useAppStore();
  const [activeTab, setActiveTab] = useState<'intake' | 'progress' | 'outgo'>('outgo');
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);

  const handleApply = (jobId: string) => {
    setAppliedJobId(jobId);
    alert('✅ Application submitted with verified UDID & Accessibility Profile attached!');
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Full Education-To-Employment Lifecycle (UNESCO & RPWD Aligned)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Student Intake, Progress & Career Placement Gateway
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Holistic management from admission intake to academic growth, retention radar, and graduate career placements.
          </p>
        </div>

        {/* Phase Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#081a3b] p-1.5 rounded-2xl border border-blue-400/30">
          <button
            onClick={() => setActiveTab('intake')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'intake' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' : 'text-blue-200 hover:text-white'
            }`}
          >
            1. Intake & Admissions
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'progress' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' : 'text-blue-200 hover:text-white'
            }`}
          >
            2. Progress & Retention
          </button>
          <button
            onClick={() => setActiveTab('outgo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'outgo' ? 'bg-emerald-600 text-white shadow-md' : 'text-blue-200 hover:text-white'
            }`}
          >
            3. Placement & Outgo
          </button>
        </div>
      </div>

      {/* UNESCO & WHODAS Benchmark Card */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs shadow-xl">
        <div className="space-y-1">
          <span className="text-cyan-300 font-semibold uppercase tracking-wider text-[10px]">UNESCO 2019 Benchmark:</span>
          <div className="text-sm font-bold text-white">Gender Inclusion & Retention Radar</div>
          <p className="text-blue-100 text-[11px] leading-relaxed">
            Zero-dropout monitoring active for specially-abled female students across 5 districts.
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-teal-300 font-semibold uppercase tracking-wider text-[10px]">WHODAS 2.0 Standard:</span>
          <div className="text-sm font-bold text-white">Independent Functioning & Mobility</div>
          <p className="text-blue-100 text-[11px] leading-relaxed">
            Standardized functional mobility & classroom accessibility scoring for every campus.
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">RPWD Section 34 Mandate:</span>
          <div className="text-sm font-bold text-white">4% Public & Corporate Reservation</div>
          <p className="text-blue-100 text-[11px] leading-relaxed">
            Direct mapping of graduating disabled students to verified affirmative action employers.
          </p>
        </div>
      </div>

      {/* TAB 1: INTAKE & ADMISSIONS */}
      {activeTab === 'intake' && (
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-400" />
                Inclusive Intake & Accessible Admission Gateway
              </h3>
              <p className="text-xs text-blue-200">UDID Verification, 5% RPWD Section 32 Course Reservation & Seat Allocation</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40">
              Admissions Open (2026-27)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">Total Specially Abled Inquiries</span>
              <span className="text-2xl font-black text-white">642 Applications</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">UDID Cards Verified</span>
              <span className="text-2xl font-black text-emerald-400">100% Automated</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">Seats Allocated in Regular Streams</span>
              <span className="text-2xl font-black text-cyan-300">512 Mainstreamed</span>
            </div>
          </div>

          <div className="bg-[#081a3b] p-5 rounded-2xl border border-blue-400/20 space-y-3">
            <h4 className="font-bold text-sm text-white">Onboarding Checklist for New Students:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated WHODAS 2.0 functional accessibility assessment</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Classroom seating & ramp path orientation mapping</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Assign dedicated Special Educator & Peer Mentor</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Issue digital accessible textbooks & assistive devices</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROGRESS & RETENTION */}
      {activeTab === 'progress' && (
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Academic Progression, Retention & Counseling Monitor
              </h3>
              <p className="text-xs text-blue-200">Continuous intervention planning and zero-dropout safeguard</p>
            </div>
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/40">
              Retention Rate: 98.6%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {students.slice(0, 3).map((s) => (
              <div key={s.id} className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white">{s.fullName}</span>
                  <span className="text-emerald-400">{s.academicPerformanceScore}% Score</span>
                </div>
                <div className="text-[11px] text-blue-200 capitalize">{s.grade} • {s.accessibilityProfile.primaryCategory}</div>
                <div className="text-[10px] text-cyan-300 font-semibold">ILP Status: {s.ilpStatus.toUpperCase()}</div>
                <div className="pt-2 border-t border-blue-400/20 flex justify-between text-[10px] text-blue-300">
                  <span>Counseling: 2 Sessions</span>
                  <span className="text-emerald-400 font-semibold">On Track</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLACEMENT & CAREER OUTGO */}
      {activeTab === 'outgo' && (
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                Inclusive Graduate Placement & Employment Gateway
              </h3>
              <p className="text-xs text-blue-200">
                Assisting differently-abled graduates into public sector & corporate careers with verified accommodations.
              </p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40">
              100% Affirmative Action Verified
            </span>
          </div>

          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div key={job.id} className="bg-[#081a3b] border border-blue-400/20 hover:border-cyan-400/50 p-5 rounded-2xl space-y-3 text-xs transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold">
                  <div>
                    <span className="text-base text-white">{job.title}</span>
                    <div className="text-xs text-cyan-300">{job.company} • {job.location}</div>
                  </div>
                  <span className="bg-[#0f2b5c] text-cyan-200 border border-cyan-500/30 px-3 py-1 rounded-full text-[10px] uppercase font-bold w-fit">
                    {job.reservationQuota}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Workplace Accommodations Guaranteed:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {job.accommodationsOffered.map((acc, i) => (
                      <span key={i} className="bg-[#0f2b5c] text-blue-100 px-2.5 py-0.5 rounded-lg border border-blue-400/30 text-[10px]">
                        ✓ {acc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-400/20 flex items-center justify-between text-xs">
                  <span className="text-blue-300">Suitable for: <span className="text-white font-semibold">{job.matchedDisabilities.join(', ')} Disabilities</span></span>
                  <button
                    onClick={() => handleApply(job.id)}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    {appliedJobId === job.id ? '✓ Application Sent' : 'Apply with UDID Profile'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
