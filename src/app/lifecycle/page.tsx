'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber, localizePercent } from '@/lib/i18n';
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
  X,
  Download,
  FileText,
  Check,
} from 'lucide-react';
import { exportToCSV } from '@/lib/exportUtils';

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
    location: 'Ranchi / Hybrid',
    type: 'public_sector',
    accommodationsOffered: ['NVDA/JAWS Screen Reader workstation', 'Ergonomic Braille display', 'Flexible hours'],
    matchedDisabilities: ['Visual', 'Mobility'],
    reservationQuota: '4% RPWD Reserved Quota (Govt of Jharkhand)',
    appliedCount: 14,
  },
  {
    id: 'job-2',
    title: 'Data Analyst & Accessibility Quality Auditor',
    company: 'Tata Inclusive Tech Labs',
    location: 'Jamshedpur / Remote',
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
    location: 'Dhanbad',
    type: 'public_sector',
    accommodationsOffered: ['Ground floor accessible branch', 'Motorized ramp & lift access', 'Tactile keyboards'],
    matchedDisabilities: ['Mobility', 'Visual'],
    reservationQuota: 'Public Sector RPWD Section 34 Quota',
    appliedCount: 31,
  },
];

export default function LifecyclePage() {
  const { students, language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment = currentRole === 'government' || currentRole === 'government_authority' || currentRole === 'district_officer' || currentRole === 'super_admin';
  const isStaff = !isStudent && !isProfessional && !isGovernment;

  const [activeTab, setActiveTab] = useState<'intake' | 'progress' | 'outgo'>('outgo');
  const [staffTab, setStaffTab] = useState<'admissions' | 'placement'>('admissions');
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);
  const [appliedSuccessMessage, setAppliedSuccessMessage] = useState<string | null>(null);
  const [infoModalMessage, setInfoModalMessage] = useState<string | null>(null);

  const [admissionsList, setAdmissionsList] = useState([
    { id: 'adm-001', studentName: 'Ravi Kumar', grade: 'Grade 9', disability: 'Visual Impairment (80%)', status: 'pending', accessNeeds: 'Braille books, Screen reader', date: '2026-08-15', udidNumber: 'JH-84920-2024-V', phone: '+91 98351 22910' },
    { id: 'adm-002', studentName: 'Sunita Devi', grade: 'Grade 10', disability: 'Hearing Impairment (75%)', status: 'under_review', accessNeeds: 'Sign language interpreter', date: '2026-08-17', udidNumber: 'JH-10394-2023-H', phone: '+91 94311 04829' },
    { id: 'adm-003', studentName: 'Mohan Prasad', grade: 'Grade 11', disability: 'Mobility (60%)', status: 'approved', accessNeeds: 'Wheelchair ramp, Accessible toilet', date: '2026-08-18', udidNumber: 'JH-58291-2025-M', phone: '+91 91223 88402' },
  ]);

  const [placementsList, setPlacementsList] = useState([
    { id: 'pl-001', studentName: 'Aarav Sharma', grade: 'Grade 12 (Completed)', employer: 'NIC Jharkhand', role: 'Junior Data Entry', status: 'placed', supportProvided: 'Screen reader workstation', date: '2026-08-10' },
    { id: 'pl-002', studentName: 'Ananya Deshmukh', grade: 'Grade 12 (Completed)', employer: 'Tata Consultancy', role: 'Accessibility Tester', status: 'placed', supportProvided: 'Remote captioning', date: '2026-08-12' },
    { id: 'pl-003', studentName: 'Lakshmi Iyer', grade: 'Grade 12 (Completed)', employer: 'Pending', role: 'Seeking Placement', status: 'pending', supportProvided: 'Job coach required', date: '2026-08-19' },
  ]);

  const [reviewingAdm, setReviewingAdm] = useState<any | null>(null);
  const [updatingStatusAdm, setUpdatingStatusAdm] = useState<any | null>(null);
  const [assigningSupportAdm, setAssigningSupportAdm] = useState<any | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('approved');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('Priya Kumari (Certified RCI Scribe)');
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  const handleDownloadStaffReport = () => {
    if (staffTab === 'admissions') {
      const headers = ['Admission ID', 'Student Name', 'Grade', 'Disability Details', 'UDID Card Number', 'Status', 'Accessibility Needs', 'Application Date'];
      const rows = admissionsList.map(a => [a.id, a.studentName, a.grade, a.disability, a.udidNumber, a.status, a.accessNeeds, a.date]);
      exportToCSV('Saksham_Inclusive_Admissions_Report_2026', headers, rows);
    } else {
      const headers = ['Placement ID', 'Student Name', 'Grade Status', 'Employer', 'Role', 'Status', 'Workplace Support Provided', 'Placement Date'];
      const rows = placementsList.map(p => [p.id, p.studentName, p.grade, p.employer, p.role, p.status, p.supportProvided, p.date]);
      exportToCSV('Saksham_Graduate_Placement_Report_2026', headers, rows);
    }
  };

  const handleUpdateStatusSave = () => {
    if (!updatingStatusAdm) return;
    setAdmissionsList(prev => prev.map(a => a.id === updatingStatusAdm.id ? { ...a, status: selectedStatus } : a));
    const targetName = updatingStatusAdm.studentName;
    setUpdatingStatusAdm(null);
    setActionSuccessToast(`Updated admission status for ${targetName} to "${selectedStatus.toUpperCase()}"`);
    setTimeout(() => setActionSuccessToast(null), 4000);
  };

  const handleAssignSupportSave = () => {
    if (!assigningSupportAdm) return;
    const specialistName = selectedSpecialist.split('(')[0].trim();
    setAdmissionsList(prev => prev.map(a => a.id === assigningSupportAdm.id ? {
      ...a,
      accessNeeds: `${a.accessNeeds} • Specialist: ${specialistName}`,
      status: 'approved'
    } : a));
    const targetName = assigningSupportAdm.studentName;
    setAssigningSupportAdm(null);
    setActionSuccessToast(`Assigned ${specialistName} to ${targetName} and marked application APPROVED.`);
    setTimeout(() => setActionSuccessToast(null), 4000);
  };

  const handleApply = (jobId: string) => {
    setAppliedJobId(jobId);
    setAppliedSuccessMessage(
      language === 'hi'
        ? 'सत्यापित यूडीआईडी व सुगमता प्रोफाइल के साथ आवेदन सफलतापूर्वक जमा किया गया!'
        : language === 'mr'
        ? 'सत्यापित युडीआयडी आणि सुलभता प्रोफाईलसह अर्ज यशस्वीरित्या सादर केला!'
        : 'Application submitted with verified UDID & Accessibility Profile attached!'
    );
  };

  // Staff view: Inclusive Admissions & Placement Management
  if (isStaff) {
    const totalEnrolled = students.length;
    const pendingAdmissions = admissionsList.filter(a => a.status === 'pending').length;
    const accessibilityRequired = admissionsList.length;
    const studentsPlaced = placementsList.filter(p => p.status === 'placed').length;
    const placementPending = placementsList.length - studentsPlaced;

    const statusColor = (status: string) => {
      if (status === 'approved' || status === 'placed' || status === 'enrolled') return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      if (status === 'under_review') return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
      return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
    };

    const statusLabel = (status: string) => {
      if (status === 'pending') return language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending';
      if (status === 'under_review') return language === 'hi' ? 'समीक्षाधीन' : language === 'mr' ? 'पुनरावलोकनाधीन' : 'Under Review';
      if (status === 'approved') return language === 'hi' ? 'स्वीकृत' : language === 'mr' ? 'मंजूर' : 'Approved';
      if (status === 'enrolled') return language === 'hi' ? 'नामांकित' : language === 'mr' ? 'पटनोंदणी' : 'Enrolled';
      if (status === 'placed') return language === 'hi' ? 'नियुक्त' : language === 'mr' ? 'नियुक्त' : 'Placed';
      return status;
    };

    return (
      <div className="space-y-8 py-2">
        {/* Staff Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
                {language === 'hi' ? 'संस्थागत प्रशासन' : language === 'mr' ? 'संस्थात्मक प्रशासन' : 'Institutional Administration'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                RPwD Act 2016 Section 32
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{t.staffAdmissionsTitle}</h1>
            <p className="text-xs text-blue-100 mt-1">{t.staffAdmissionsSubtitle}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadStaffReport}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'hi' ? 'रिपोर्ट डाउनलोड (.CSV)' : language === 'mr' ? 'अहवाल डाउनलोड (.CSV)' : 'Download Report (.CSV)'}</span>
            </button>
          </div>
        </div>

        {actionSuccessToast && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-400/50 rounded-2xl text-xs text-emerald-200 flex items-center justify-between gap-2 shadow-xl animate-in fade-in-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="font-bold">{actionSuccessToast}</span>
            </div>
            <button onClick={() => setActionSuccessToast(null)} className="text-blue-300 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: t.staffTotalEnrolled, value: totalEnrolled, color: 'text-cyan-300' },
            { label: t.staffPendingAdmissions, value: pendingAdmissions, color: 'text-amber-300' },
            { label: t.staffAccessibilityRequired, value: accessibilityRequired, color: 'text-blue-300' },
            { label: t.staffStudentsPlaced, value: studentsPlaced, color: 'text-emerald-300' },
            { label: t.staffPlacementPending, value: placementPending, color: 'text-rose-300' },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#0f2b5c] border border-cyan-500/30 p-4 rounded-2xl shadow-lg">
              <div className="text-xs text-blue-200 font-semibold mb-1">{kpi.label}</div>
              <div className={`text-3xl font-black ${kpi.color}`}>{localizeNumber(kpi.value, language)}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex gap-2 border-b border-blue-400/20 pb-4">
            {(['admissions', 'placement'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStaffTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  staffTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow'
                    : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'
                }`}
              >
                {tab === 'admissions' ? t.staffAdmTabAdmissions : t.staffAdmTabPlacement}
              </button>
            ))}
          </div>

          {staffTab === 'admissions' ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">{t.staffAdmTabAdmissions}</h3>
              {admissionsList.map((adm) => (
                <div key={adm.id} className="bg-[#081a3b] border border-blue-400/20 hover:border-cyan-400/40 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition shadow-md">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{adm.studentName}</span>
                      <span className="text-[10px] text-cyan-300 font-mono">{adm.grade}</span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${statusColor(adm.status)}`}>
                        {statusLabel(adm.status)}
                      </span>
                      <span className="text-[10px] font-mono text-blue-300/80">UDID: {adm.udidNumber}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-blue-200">
                      <div><strong className="text-slate-400">{language === 'hi' ? 'दिव्यांगता:' : language === 'mr' ? 'दिव्यांगत्व:' : 'Disability:'}</strong> {adm.disability}</div>
                      <div><strong className="text-slate-400">{language === 'hi' ? 'आवश्यकताएं:' : language === 'mr' ? 'आवश्यकता:' : 'Accessibility Needs:'}</strong> <span className="text-cyan-200 font-medium">{adm.accessNeeds}</span></div>
                      <div><strong className="text-slate-400">{language === 'hi' ? 'आवेदन तिथि:' : language === 'mr' ? 'अर्ज तारीख:' : 'Applied:'}</strong> {adm.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setReviewingAdm(adm)}
                      className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3.5 py-2 rounded-xl font-semibold text-xs transition flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{t.staffActionReview}</span>
                    </button>
                    <button
                      onClick={() => {
                        setUpdatingStatusAdm(adm);
                        setSelectedStatus(adm.status);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl transition shadow-md text-xs"
                    >
                      {t.staffActionUpdateStatus}
                    </button>
                    <button
                      onClick={() => setAssigningSupportAdm(adm)}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-3.5 py-2 rounded-xl transition shadow-md text-xs"
                    >
                      {t.staffActionAssignSupport}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">{t.staffAdmTabPlacement}</h3>
              {placementsList.map((pl) => (
                <div key={pl.id} className="bg-[#081a3b] border border-blue-400/20 hover:border-cyan-400/40 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition shadow-md">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{pl.studentName}</span>
                      <span className="text-[10px] text-cyan-300 font-mono">{pl.grade}</span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${statusColor(pl.status)}`}>
                        {statusLabel(pl.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-blue-200">
                      <div><strong className="text-slate-400">{language === 'hi' ? 'नियोक्ता:' : language === 'mr' ? 'नियोक्ता:' : 'Employer:'}</strong> {pl.employer}</div>
                      <div><strong className="text-slate-400">{language === 'hi' ? 'भूमिका:' : language === 'mr' ? 'भूमिका:' : 'Role:'}</strong> {pl.role}</div>
                      <div><strong className="text-slate-400">{language === 'hi' ? 'सहायता प्रदान:' : language === 'mr' ? 'सहाय्य दिले:' : 'Support Provided:'}</strong> {pl.supportProvided}</div>
                      <div><strong className="text-slate-400">{language === 'hi' ? 'तिथि:' : language === 'mr' ? 'तारीख:' : 'Date:'}</strong> {pl.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => setReviewingAdm(pl)} className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3 py-2 rounded-xl font-semibold text-xs transition">{t.staffActionViewPlacement}</button>
                    {pl.status === 'pending' && (
                      <button onClick={() => {
                        setPlacementsList(prev => prev.map(p => p.id === pl.id ? { ...p, status: 'placed' } : p));
                        setActionSuccessToast(`Recorded placement success for ${pl.studentName}`);
                        setTimeout(() => setActionSuccessToast(null), 4000);
                      }} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionRecordPlacement}</button>
                    )}
                  </div>
                </div>
              ))}

              {/* Accessible Employers Section */}
              <div className="mt-6 pt-6 border-t border-blue-400/20">
                <h4 className="text-sm font-bold text-white mb-4">
                  {language === 'hi' ? '🏢 सुगम रोजगार प्रदाता (RPwD भर्ती भागीदार)' : language === 'mr' ? '🏢 सुलभ नियोक्ते (RPwD भरती भागीदार)' : '🏢 Accessible Employers (RPwD Recruitment Partners)'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mockJobs.map(job => (
                    <div key={job.id} className="bg-[#051124] border border-blue-400/20 p-4 rounded-2xl space-y-2">
                      <div className="font-bold text-sm text-white">{job.title}</div>
                      <div className="text-xs text-cyan-300">{job.company}</div>
                      <div className="text-[11px] text-blue-200">{job.location}</div>
                      <div className="text-[10px] text-emerald-300 font-semibold">{job.reservationQuota}</div>
                      <button onClick={() => {
                        setActionSuccessToast(`Referred student to ${job.company}`);
                        setTimeout(() => setActionSuccessToast(null), 4000);
                      }} className="w-full bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold py-2 rounded-xl transition">
                        {language === 'hi' ? 'छात्र को रेफर करें' : language === 'mr' ? 'विद्यार्थी रेफर करा' : 'Refer Student'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL 1: REVIEW ADMISSION APPLICATION */}
        {reviewingAdm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setReviewingAdm(null)}>
            <div className="bg-[#0f2b5c] border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between border-b border-blue-400/20 pb-4">
                <div>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Admissions Dossier Review
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">{reviewingAdm.studentName}</h3>
                  <p className="text-xs text-blue-200">{reviewingAdm.grade || 'Grade Student'} • Applied: {reviewingAdm.date}</p>
                </div>
                <button onClick={() => setReviewingAdm(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-blue-100">
                <div className="p-4 bg-[#081a3b] rounded-2xl border border-blue-400/20 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Disability Classification:</span>
                    <span className="font-bold text-white">{reviewingAdm.disability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Swavlamban UDID:</span>
                    <span className="font-mono text-cyan-300 font-bold">{reviewingAdm.udidNumber || 'JH-84920-VERIFIED'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">RPwD Act Reservation:</span>
                    <span className="font-bold text-emerald-300">Section 32 (5% Quota Eligible)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Guardian Phone:</span>
                    <span className="font-bold text-white">{reviewingAdm.phone || '+91 98351 22910'}</span>
                  </div>
                </div>

                <div className="p-4 bg-[#081a3b] rounded-2xl border border-blue-400/20 space-y-1">
                  <span className="text-xs font-bold text-cyan-300 block">Requested Accessibility Accommodations:</span>
                  <p className="text-white font-medium">{reviewingAdm.accessNeeds || reviewingAdm.supportProvided}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button
                  onClick={() => setReviewingAdm(null)}
                  className="px-4 py-2.5 bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-bold rounded-xl text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setAdmissionsList(prev => prev.map(a => a.id === reviewingAdm.id ? { ...a, status: 'approved' } : a));
                    setActionSuccessToast(`Approved application for ${reviewingAdm.studentName}`);
                    setReviewingAdm(null);
                    setTimeout(() => setActionSuccessToast(null), 4000);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: UPDATE STATUS */}
        {updatingStatusAdm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setUpdatingStatusAdm(null)}>
            <div className="bg-[#0f2b5c] border-2 border-emerald-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <h3 className="text-base font-bold text-white">Update Admission Status</h3>
                <button onClick={() => setUpdatingStatusAdm(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs space-y-3">
                <p className="text-blue-100">
                  Select new status for student <strong className="text-white">{updatingStatusAdm.studentName}</strong>:
                </p>

                <div className="space-y-1.5">
                  <label className="font-semibold text-cyan-300 block">Status *</label>
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="w-full bg-[#081a3b] border border-cyan-400/40 rounded-xl p-3 text-xs text-white font-bold"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="under_review">Under Review / Verification</option>
                    <option value="approved">Approved</option>
                    <option value="enrolled">Enrolled in Class</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setUpdatingStatusAdm(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">
                  Cancel
                </button>
                <button onClick={handleUpdateStatusSave} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-md">
                  Save Status
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: ASSIGN ACCESSIBILITY SUPPORT SPECIALIST */}
        {assigningSupportAdm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setAssigningSupportAdm(null)}>
            <div className="bg-[#0f2b5c] border-2 border-cyan-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <h3 className="text-base font-bold text-white">Assign Accessibility Specialist</h3>
                <button onClick={() => setAssigningSupportAdm(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs space-y-3">
                <p className="text-blue-100">
                  Assign a certified RCI specialist for <strong className="text-white">{assigningSupportAdm.studentName}</strong> ({assigningSupportAdm.disability}):
                </p>

                <div className="space-y-1.5">
                  <label className="font-semibold text-cyan-300 block">Select RCI Specialist *</label>
                  <select
                    value={selectedSpecialist}
                    onChange={e => setSelectedSpecialist(e.target.value)}
                    className="w-full bg-[#081a3b] border border-cyan-400/40 rounded-xl p-3 text-xs text-white font-bold"
                  >
                    <option value="Priya Kumari (Certified RCI Scribe)">Priya Kumari — Certified RCI Scribe (Visual)</option>
                    <option value="Rahul Verma (ISL Sign Interpreter)">Rahul Verma — Level 2 Sign Language Interpreter (Hearing)</option>
                    <option value="Dr. Meera Sen (Special Educator)">Dr. Meera Sen — Special Educator & IEP Specialist</option>
                    <option value="Suresh Yadav (Accessibility Coordinator)">Suresh Yadav — Campus Escort & Mobility Coordinator</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setAssigningSupportAdm(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">
                  Cancel
                </button>
                <button onClick={handleAssignSupportSave} className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black rounded-xl text-xs shadow-md">
                  Confirm &amp; Assign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              {language === 'hi' ? 'शिक्षा से रोजगार संपूर्ण जीवनचक्र (यूनेस्को व आरपीडब्ल्यूडी अनुरूप)' : language === 'mr' ? 'शिक्षणापासून रोजगारापर्यंत संपूर्ण जीवनचक्र (युनेस्को आणि आरपीडब्ल्यूडी नुसार)' : 'Full Education-To-Employment Lifecycle (UNESCO & RPWD Aligned)'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {t.lifeHeroTitle}
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            {t.lifeHeroSubtitle}
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
            {language === 'hi' ? '१. प्रवेश व दाखिला' : language === 'mr' ? '१. प्रवेश आणि नोंदणी' : '1. Intake & Admissions'}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'progress' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' : 'text-blue-200 hover:text-white'
            }`}
          >
            {language === 'hi' ? '२. प्रगति व निरंतरता' : language === 'mr' ? '२. प्रगती आणि सातत्य' : '2. Progress & Retention'}
          </button>
          <button
            onClick={() => setActiveTab('outgo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'outgo' ? 'bg-emerald-600 text-white shadow-md' : 'text-blue-200 hover:text-white'
            }`}
          >
            {language === 'hi' ? '३. प्लेसमेंट व आजीविका' : language === 'mr' ? '३. प्लेसमेंट आणि करिअर' : '3. Placement & Outgo'}
          </button>
        </div>
      </div>

      {/* UNESCO & WHODAS Benchmark Card */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs shadow-xl">
        <div className="space-y-1">
          <span className="text-cyan-300 font-semibold uppercase tracking-wider text-[10px]">
            {language === 'hi' ? 'यूनेस्को २०१९ मानक:' : language === 'mr' ? 'युनेस्को २०१९ मानक:' : 'UNESCO 2019 Benchmark:'}
          </span>
          <div className="text-sm font-bold text-white">
            {language === 'hi' ? 'लैंगिक समावेश व निरंतरता रडार' : language === 'mr' ? 'लिंग समावेश आणि धारणा रडार' : 'Gender Inclusion & Retention Radar'}
          </div>
          <p className="text-blue-100 text-[11px] leading-relaxed">
            {language === 'hi' ? 'झारखंड के ५ जिलों में दिव्यांग बालिकाओं हेतु ड्रॉपआउट-शून्य निगरानी सक्रिय।' : language === 'mr' ? 'झारखंडमधील ५ जिल्ह्यांमध्ये दिव्यांग विद्यार्थिनींसाठी गळती-शून्य देखरेख सक्रिय.' : 'Zero-dropout monitoring active for specially-abled female students across 5 districts.'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-teal-300 font-semibold uppercase tracking-wider text-[10px]">
            {language === 'hi' ? 'WHODAS २.० मानक:' : language === 'mr' ? 'WHODAS २.० मानक:' : 'WHODAS 2.0 Standard:'}
          </span>
          <div className="text-sm font-bold text-white">
            {language === 'hi' ? 'स्वतंत्र कार्यप्रणाली व गतिशीलता' : language === 'mr' ? 'स्वतंत्र कार्यप्रणाली आणि गतिशीलता' : 'Independent Functioning & Mobility'}
          </div>
          <p className="text-blue-100 text-[11px] leading-relaxed">
            {language === 'hi' ? 'प्रत्येक परिसर के लिए मानकीकृत कार्यात्मक गतिशीलता एवं कक्षा सुगमता स्कोरिंग।' : language === 'mr' ? 'प्रत्येक परिसरासाठी मानकीकृत कार्यात्मक गतिशीलता आणि वर्ग सुलभता स्कोअरिंग.' : 'Standardized functional mobility & classroom accessibility scoring for every campus.'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
            {language === 'hi' ? 'आरपीडब्ल्यूडी धारा ३४ अधिदेश:' : language === 'mr' ? 'आरपीडब्ल्यूडी कलम ३४ आदेश:' : 'RPWD Section 34 Mandate:'}
          </span>
          <div className="text-sm font-bold text-white">
            {language === 'hi' ? '४% सरकारी व कॉर्पोरेट आरक्षण' : language === 'mr' ? '४% सरकारी व कॉर्पोरेट आरक्षण' : '4% Public & Corporate Reservation'}
          </div>
          <p className="text-blue-100 text-[11px] leading-relaxed">
            {language === 'hi' ? 'स्नातक दिव्यांग विद्यार्थियों का सत्यापित सकारात्मक कार्रवाई नियोक्ताओं से सीधा मिलान।' : language === 'mr' ? 'पदवीधर दिव्यांग विद्यार्थ्यांची थेट सकारात्मक कृती नियोक्त्यांशी जोडणी.' : 'Direct mapping of graduating disabled students to verified affirmative action employers.'}
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
                {language === 'hi' ? 'समावेशी प्रवेश व दाखिला पोर्टल' : language === 'mr' ? 'समावेशी प्रवेश आणि नोंदणी पोर्टल' : 'Inclusive Intake & Accessible Admission Gateway'}
              </h3>
              <p className="text-xs text-blue-200">
                {language === 'hi' ? 'यूडीआईडी सत्यापन, ५% आरपीडब्ल्यूडी धारा ३२ पाठ्यक्रम आरक्षण व सीट आवंटन' : language === 'mr' ? 'युडीआयडी पडताळणी, ५% आरपीडब्ल्यूडी कलम ३२ अभ्यासक्रम आरक्षण आणि जागा वाटप' : 'UDID Verification, 5% RPWD Section 32 Course Reservation & Seat Allocation'}
              </p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40">
              {language === 'hi' ? 'दाखिला खुला (२०२६-२७)' : language === 'mr' ? 'प्रवेश सुरू (२०२६-२७)' : 'Admissions Open (2026-27)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">
                {language === 'hi' ? 'कुल दिव्यांग आवेदन पूछताछ' : language === 'mr' ? 'एकूण दिव्यांग अर्ज चौकशी' : 'Total Specially Abled Inquiries'}
              </span>
              <span className="text-2xl font-black text-white">{localizeNumber(642, language)} {language === 'hi' ? 'आवेदन' : language === 'mr' ? 'अर्ज' : 'Applications'}</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">
                {language === 'hi' ? 'यूडीआईडी कार्ड सत्यापित' : language === 'mr' ? 'युडीआयडी कार्ड पडताळणी' : 'UDID Cards Verified'}
              </span>
              <span className="text-2xl font-black text-emerald-400">{localizePercent(100, language)} {language === 'hi' ? 'स्वचालित' : language === 'mr' ? 'स्वयंचलित' : 'Automated'}</span>
            </div>
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
              <span className="text-blue-300 block mb-1">
                {language === 'hi' ? 'सामान्य धाराओं में आवंटित सीटें' : language === 'mr' ? 'मुख्य प्रवाहात वाटप केलेल्या जागा' : 'Seats Allocated in Regular Streams'}
              </span>
              <span className="text-2xl font-black text-cyan-300">{localizeNumber(512, language)} {language === 'hi' ? 'समावेशित' : language === 'mr' ? 'समावेशित' : 'Mainstreamed'}</span>
            </div>
          </div>

          <div className="bg-[#081a3b] p-5 rounded-2xl border border-blue-400/20 space-y-3">
            <h4 className="font-bold text-sm text-white">
              {language === 'hi' ? 'नए विद्यार्थियों हेतु ऑनबोर्डिंग चेकलिस्ट:' : language === 'mr' ? 'नवीन विद्यार्थ्यांसाठी ऑनबोर्डिंग चेकलिस्ट:' : 'Onboarding Checklist for New Students:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'hi' ? 'स्वचालित WHODAS २.० कार्यात्मक सुगमता मूल्यांकन' : language === 'mr' ? 'स्वयंचलित WHODAS २.० कार्यात्मक सुलभता मूल्यांकन' : 'Automated WHODAS 2.0 functional accessibility assessment'}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'hi' ? 'कक्षा बैठक व रैंप मार्ग दिशा-निर्देशन मैपिंग' : language === 'mr' ? 'वर्ग बसण्याची जागा आणि रॅम्प मार्ग अभिमुखता मॅपिंग' : 'Classroom seating & ramp path orientation mapping'}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'hi' ? 'समर्पित विशेष शिक्षक व सहपाठी मार्गदर्शक आवंटन' : language === 'mr' ? 'समर्पित विशेष शिक्षक आणि समवयस्क मार्गदर्शक वाटप' : 'Assign dedicated Special Educator & Peer Mentor'}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'hi' ? 'डिजिटल सुगम पाठ्यपुस्तकें व सहायक उपकरण वितरण' : language === 'mr' ? 'डिजिटल सुलभ पाठ्यपुस्तके आणि सहाय्यक साधने वाटप' : 'Issue digital accessible textbooks & assistive devices'}</span>
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
                {language === 'hi' ? 'शैक्षणिक प्रगति, निरंतरता व परामर्श मॉनिटर' : language === 'mr' ? 'शैक्षणिक प्रगती, सातत्य आणि समुपदेशन मॉनिटर' : 'Academic Progression, Retention & Counseling Monitor'}
              </h3>
              <p className="text-xs text-blue-200">
                {language === 'hi' ? 'निरंतर हस्तक्षेप योजना और शून्य-ड्रॉपआउट सुरक्षा उपाय' : language === 'mr' ? 'सतत हस्तक्षेप नियोजन आणि शून्य-गळती सुरक्षा उपाय' : 'Continuous intervention planning and zero-dropout safeguard'}
              </p>
            </div>
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/40">
              {language === 'hi' ? 'निरंतरता दर:' : language === 'mr' ? 'सातत्य दर:' : 'Retention Rate:'} {localizePercent('98.6', language)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {students.slice(0, 3).map((s) => (
              <div key={s.id} className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white">{s.fullName}</span>
                  <span className="text-emerald-400">{localizePercent(s.academicPerformanceScore, language)} {language === 'hi' ? 'स्कोर' : language === 'mr' ? 'गुण' : 'Score'}</span>
                </div>
                <div className="text-[11px] text-blue-200 capitalize">{s.grade} • {s.accessibilityProfile.primaryCategory}</div>
                <div className="text-[10px] text-cyan-300 font-semibold">
                  {language === 'hi' ? 'आईएलपी स्थिति:' : language === 'mr' ? 'आयएलपी स्थिती:' : 'ILP Status:'} {s.ilpStatus.toUpperCase()}
                </div>
                <div className="pt-2 border-t border-blue-400/20 flex justify-between text-[10px] text-blue-300">
                  <span>{language === 'hi' ? 'परामर्श: २ सत्र' : language === 'mr' ? 'समुपदेशन: २ सत्रे' : 'Counseling: 2 Sessions'}</span>
                  <span className="text-emerald-400 font-semibold">{language === 'hi' ? 'संतोषजनक' : language === 'mr' ? 'समाधानकारक' : 'On Track'}</span>
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
                {language === 'hi' ? 'समावेशी स्नातक प्लेसमेंट व रोजगार गेटवे' : language === 'mr' ? 'समावेशी पदवीधर प्लेसमेंट आणि रोजगार गेटवे' : 'Inclusive Graduate Placement & Employment Gateway'}
              </h3>
              <p className="text-xs text-blue-200">
                {language === 'hi'
                  ? 'सत्यापित सुविधाओं के साथ दिव्यांग स्नातकों को सार्वजनिक क्षेत्र एवं कॉर्पोरेट आजीविका में सहायता।'
                  : language === 'mr'
                  ? 'सत्यापित सवलतींसह दिव्यांग पदवीधरांना सार्वजनिक क्षेत्र आणि कॉर्पोरेट करिअरमध्ये मदत.'
                  : 'Assisting differently-abled graduates into public sector & corporate careers with verified accommodations.'}
              </p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40">
              {language === 'hi' ? '१००% सकारात्मक कार्रवाई सत्यापित' : language === 'mr' ? '१००% सकारात्मक कृती सत्यापित' : '100% Affirmative Action Verified'}
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
                    {language === 'hi' ? 'कार्यस्थल सुविधाएं सुनिश्चित:' : language === 'mr' ? 'कामाच्या ठिकाणी सवलती हमी:' : 'Workplace Accommodations Guaranteed:'}
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
                  <span className="text-blue-300">
                    {language === 'hi' ? 'उपयुक्त:' : language === 'mr' ? 'योग्य:' : 'Suitable for:'} <span className="text-white font-semibold">{job.matchedDisabilities.join(', ')} {language === 'hi' ? 'दिव्यांगता' : language === 'mr' ? 'दिव्यांगत्व' : 'Disabilities'}</span>
                  </span>
                  <button
                    onClick={() => handleApply(job.id)}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    {appliedJobId === job.id ? (language === 'hi' ? '✓ आवेदन भेजा गया' : language === 'mr' ? '✓ अर्ज पाठवला' : '✓ Application Sent') : (language === 'hi' ? 'यूडीआईडी प्रोफाइल से आवेदन करें' : language === 'mr' ? 'युडीआयडी प्रोफाईलसह अर्ज करा' : 'Apply with UDID Profile')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUCCESS APPLICATION MODAL */}
      {appliedSuccessMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50"
          onClick={() => setAppliedSuccessMessage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#0f2b5c] border-2 border-emerald-400/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAppliedSuccessMessage(null)}
              className="absolute top-4 right-4 text-blue-200 hover:text-white p-1 rounded-xl hover:bg-[#081a3b] transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-lg mx-auto">
              <div className="w-full h-full bg-[#081a3b] rounded-[14px] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white tracking-tight">
                {language === 'hi' ? 'आवेदन सफलतापूर्वक जमा!' : language === 'mr' ? 'अर्ज यशस्वीरित्या सादर!' : 'Application Submitted!'}
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                {appliedSuccessMessage}
              </p>
            </div>

            <div className="p-3 bg-[#081a3b] border border-cyan-500/20 rounded-2xl text-[11px] text-cyan-200 font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Swavlamban UDID Verified &amp; Accommodations Attached</span>
            </div>

            <button
              onClick={() => setAppliedSuccessMessage(null)}
              className="w-full py-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 font-black rounded-xl text-xs hover:brightness-110 transition shadow-md"
            >
              {language === 'hi' ? 'ठीक है (बंद करें)' : language === 'mr' ? 'ओके (बंद करा)' : 'Done'}
            </button>
          </div>
        </div>
      )}

      {/* INFO NOTIFICATION MODAL */}
      {infoModalMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50"
          onClick={() => setInfoModalMessage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#0f2b5c] border border-cyan-400/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInfoModalMessage(null)}
              className="absolute top-4 right-4 text-blue-200 hover:text-white p-1 rounded-xl hover:bg-[#081a3b]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <p className="text-xs text-white font-bold leading-relaxed">{infoModalMessage}</p>

            <button
              onClick={() => setInfoModalMessage(null)}
              className="w-full py-2.5 bg-[#081a3b] hover:bg-[#123366] text-cyan-300 font-bold border border-cyan-400/30 rounded-xl text-xs transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
