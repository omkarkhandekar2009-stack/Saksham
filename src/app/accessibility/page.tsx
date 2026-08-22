'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';

import { i18n, localizeNumber } from '@/lib/i18n';
import { exportToCSV } from '@/lib/exportUtils';

import { ProfessionalServiceType, AccessibilityProfessional } from '@/types';

import {
  HeartHandshake,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Shield,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  Filter,
  Check,
  X,
  Eye,
} from 'lucide-react';

const SUPPORT_TYPES: { id: ProfessionalServiceType; label: string; desc: string }[] = [
  { id: 'certified_scribe', label: 'Certified Scribe', desc: 'Exam dictation & writing assistance' },
  { id: 'sign_language_interpreter', label: 'Sign Language Interpreter', desc: 'Indian Sign Language (ISL) interpretation' },
  { id: 'lesson_reader', label: 'Lesson Reader', desc: 'Textbook & lecture audio reading' },
  { id: 'exam_reader', label: 'Exam Reader', desc: 'Reading questions during tests' },
  { id: 'assistant_teacher', label: 'Assistant Teacher', desc: 'Classroom companion & notes' },
  { id: 'special_educator', label: 'Special Educator', desc: 'IEP & cognitive learning support' },
  { id: 'accessibility_support_assistant', label: 'Accessibility Support Assistant', desc: 'Campus escort & device support' },
];

const DISTRICTS = [
  'Ranchi',
  'Dhanbad',
  'East Singhbhum (Jamshedpur)',
  'Bokaro',
  'Hazaribagh',
  'Khunti',
];

export default function AccessibilityServicesPage() {
  const {
    students,
    language,
    currentRole,
    professionals,
    supportRequests,
    submitSupportRequest,
    acceptSupportRequest,
  } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment = currentRole === 'government' || currentRole === 'government_authority' || currentRole === 'district_officer' || currentRole === 'super_admin';
  const isStaff = !isStudent && !isProfessional && !isGovernment;

  const activeStudent = students[0];

  const [activeTab, setActiveTab] = useState<'human_support' | 'active_requests' | 'verified_pros'>('human_support');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [staffStatusFilter, setStaffStatusFilter] = useState<'all' | 'pending' | 'assigned' | 'completed'>('all');
  const [staffRequests, setStaffRequests] = useState([
    { id: 'sr-001', studentName: 'Aarav Sharma', supportType: 'Certified Scribe', requestDate: '2026-08-15', examDate: '2026-09-05', status: 'assigned', professional: 'Priya Kumari (RCI Scribe)', priority: 'high', venue: 'Ranchi Model High School, Hall 2', notes: 'Requires fast dictation & formula writing' },
    { id: 'sr-002', studentName: 'Ananya Deshmukh', supportType: 'Sign Language Interpreter', requestDate: '2026-08-17', examDate: '2026-09-08', status: 'pending', professional: '—', priority: 'medium', venue: 'Jamshedpur Govt High School, Lab 1', notes: 'ISL Level 2 interpreter required' },
    { id: 'sr-003', studentName: 'Rohan Verma', supportType: 'Lesson Reader', requestDate: '2026-08-18', examDate: '2026-09-10', status: 'completed', professional: 'Suresh Yadav (Audio Reader)', priority: 'low', venue: 'Bokaro High School, Library', notes: 'Audio textbook reading assistance' },
    { id: 'sr-004', studentName: 'Priya Singh', supportType: 'Accessibility Support Assistant', requestDate: '2026-08-19', examDate: '2026-09-12', status: 'pending', professional: '—', priority: 'high', venue: 'Dhanbad Public School, Room 102', notes: 'Wheelchair escort & ramp guidance' },
  ]);

  const [reviewingReq, setReviewingReq] = useState<any | null>(null);
  const [assigningReq, setAssigningReq] = useState<any | null>(null);
  const [updatingStatusReq, setUpdatingStatusReq] = useState<any | null>(null);
  const [selectedStaffPro, setSelectedStaffPro] = useState('Priya Kumari (Certified RCI Scribe)');
  const [selectedStaffStatus, setSelectedStaffStatus] = useState('assigned');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [supportType, setSupportType] = useState<ProfessionalServiceType>('certified_scribe');
  const [subjectOrEvent, setSubjectOrEvent] = useState('Grade 10 Mathematics Terminal Exam');
  const [date, setDate] = useState('2026-09-05');
  const [time, setTime] = useState('10:00 AM – 01:00 PM');
  const [durationHours, setDurationHours] = useState(3);
  const [location, setLocation] = useState('Exam Hall 2, Ranchi High School');
  const [district, setDistrict] = useState('Ranchi');
  const [languagePreference, setLanguagePreference] = useState<string[]>(['Hindi', 'English']);
  const [additionalRequirements, setAdditionalRequirements] = useState('Requires formula transcription and graph drawing assistance.');

  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [selectedProfForModal, setSelectedProfForModal] = useState<AccessibilityProfessional | null>(null);
  const [matchedProfId, setMatchedProfId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = submitSupportRequest({
      studentId: activeStudent?.id || 'std-001',
      studentName: activeStudent?.fullName || 'Aarav Sharma',
      institutionId: activeStudent?.institutionId || 'inst-01',
      institutionName: activeStudent?.institutionName || 'Ranchi Government Inclusive Model High School',
      supportType,
      subjectOrEvent,
      date,
      time,
      durationHours,
      location,
      district,
      languagePreference,
      additionalRequirements,
    });

    setSubmittedRequestId(created.id);
    setShowRequestForm(false);
  };

  // Matching Logic (Matches VERIFIED professionals by service, verification, district, language)
  const getMatchedProfessionals = (sType: ProfessionalServiceType, dist: string, langs: string[]) => {
    return professionals.filter((p) => {
      // 1. Must be verified
      if (p.status !== 'verified') return false;

      // 2. Must match primary service or other services
      const matchesService = p.primaryService === sType || p.otherServices.includes(sType);
      if (!matchesService) return false;

      // 3. Match district or allow state-wide
      const matchesDistrict = p.district.toLowerCase() === dist.toLowerCase() || p.preference === 'remote';

      // 4. Match at least one language
      const matchesLang = p.languages.some((l) => langs.includes(l));

      return matchesDistrict || matchesLang;
    });
  };

  const matchedProfessionals = getMatchedProfessionals(supportType, district, languagePreference);

  // Staff view: Accessibility Support Management Dashboard
  if (isStaff) {
    const filtered = staffStatusFilter === 'all' ? staffRequests : staffRequests.filter(r => r.status === staffStatusFilter);
    const pendingCount = staffRequests.filter(r => r.status === 'pending').length;
    const assignedCount = staffRequests.filter(r => r.status === 'assigned').length;
    const completedCount = staffRequests.filter(r => r.status === 'completed').length;

    const statusColors: Record<string, string> = {
      pending: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      assigned: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    };

    const statusLabels: Record<string, string> = {
      pending: language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending',
      assigned: language === 'hi' ? 'नियुक्त' : language === 'mr' ? 'नियुक्त' : 'Assigned',
      completed: language === 'hi' ? 'पूर्ण' : language === 'mr' ? 'पूर्ण' : 'Completed',
    };

    const priorityColors: Record<string, string> = {
      high: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      medium: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      low: 'bg-green-500/20 text-green-300 border-green-400/40',
    };

    const handleAssignSave = () => {
      if (!assigningReq) return;
      const proName = selectedStaffPro.split('(')[0].trim();
      setStaffRequests(prev => prev.map(r => r.id === assigningReq.id ? { ...r, professional: proName, status: 'assigned' } : r));
      const targetName = assigningReq.studentName;
      setAssigningReq(null);
      setToastMessage(`Assigned specialist ${proName} to student ${targetName}`);
      setTimeout(() => setToastMessage(null), 4000);
    };

    const handleUpdateStatusSave = () => {
      if (!updatingStatusReq) return;
      setStaffRequests(prev => prev.map(r => r.id === updatingStatusReq.id ? { ...r, status: selectedStaffStatus } : r));
      const targetName = updatingStatusReq.studentName;
      setUpdatingStatusReq(null);
      setToastMessage(`Updated request status for ${targetName} to "${selectedStaffStatus.toUpperCase()}"`);
      setTimeout(() => setToastMessage(null), 4000);
    };

    return (
      <div className="space-y-8 py-2">
        {/* Header */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
                {language === 'hi' ? 'संस्थागत सहायता प्रशासन' : language === 'mr' ? 'संस्थात्मक सहाय्य प्रशासन' : 'Institutional Support Administration'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">RPWD §16/17</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{t.staffSupportMgmtTitle}</h1>
            <p className="text-xs text-blue-100 max-w-2xl mt-1">{t.staffSupportMgmtSubtitle}</p>
          </div>
          <button
            onClick={() => {
              const headers = ['Request ID', 'Student Name', 'Support Type', 'Request Date', 'Event Date', 'Status', 'Assigned Specialist', 'Priority'];
              const rows = staffRequests.map(r => [r.id, r.studentName, r.supportType, r.requestDate, r.examDate, r.status, r.professional, r.priority]);
              exportToCSV('Saksham_Accessibility_Support_Report_2026', headers, rows);
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <HeartHandshake className="w-4 h-4" />
            {language === 'hi' ? 'रिपोर्ट डाउनलोड (.CSV)' : language === 'mr' ? 'अहवाल डाउनलोड (.CSV)' : 'Download Report (.CSV)'}
          </button>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-400/50 rounded-2xl text-xs text-emerald-200 flex items-center justify-between gap-2 shadow-xl animate-in fade-in-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="font-bold">{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-blue-300 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* KPI Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: language === 'hi' ? 'कुल अनुरोध' : language === 'mr' ? 'एकूण विनंत्या' : 'Total Requests', value: staffRequests.length, color: 'text-cyan-300' },
            { label: language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending', value: pendingCount, color: 'text-amber-300' },
            { label: language === 'hi' ? 'नियुक्त' : language === 'mr' ? 'नियुक्त' : 'Assigned', value: assignedCount, color: 'text-blue-300' },
            { label: language === 'hi' ? 'पूर्ण' : language === 'mr' ? 'पूर्ण' : 'Completed', value: completedCount, color: 'text-emerald-300' },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#0f2b5c] border border-cyan-500/30 p-4 rounded-2xl shadow-lg">
              <div className="text-xs text-blue-200 font-semibold mb-1">{kpi.label}</div>
              <div className={`text-3xl font-black ${kpi.color}`}>{localizeNumber(kpi.value, language)}</div>
            </div>
          ))}
        </div>

        {/* Filter + Table */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-5 shadow-xl">
          {/* Filter Row */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'assigned', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setStaffStatusFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  staffStatusFilter === f
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow'
                    : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'
                }`}
              >
                {f === 'all' ? (language === 'hi' ? 'सभी' : language === 'mr' ? 'सर्व' : 'All') : statusLabels[f]}
              </button>
            ))}
          </div>

          {/* Request List */}
          <div className="space-y-4">
            {filtered.map((req) => (
              <div key={req.id} className="bg-[#081a3b] border border-blue-400/20 hover:border-cyan-400/40 p-5 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition shadow-md">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{req.studentName}</span>
                    <span className="text-xs text-cyan-300 font-mono">{req.supportType}</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${statusColors[req.status] || ''}`}>
                      {statusLabels[req.status] || req.status}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${priorityColors[req.priority] || ''}`}>
                      {req.priority === 'high' ? (language === 'hi' ? 'उच्च' : language === 'mr' ? 'उच्च' : 'High') : req.priority === 'medium' ? (language === 'hi' ? 'मध्यम' : language === 'mr' ? 'मध्यम' : 'Medium') : (language === 'hi' ? 'सामान्य' : language === 'mr' ? 'सामान्य' : 'Low')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-blue-200">
                    <div><strong className="text-slate-400">{language === 'hi' ? 'अनुरोध तिथि:' : language === 'mr' ? 'विनंती तारीख:' : 'Requested:'}</strong> {req.requestDate}</div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'परीक्षा तिथि:' : language === 'mr' ? 'परीक्षा तारीख:' : 'Event Date:'}</strong> {req.examDate}</div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'नियुक्त पेशेवर:' : language === 'mr' ? 'नियुक्त व्यावसायिक:' : 'Assigned To:'}</strong> <span className="text-cyan-200 font-bold">{req.professional}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setReviewingReq(req)} className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3 py-2 rounded-xl font-semibold text-xs transition">{t.staffActionReview}</button>
                  <button onClick={() => setAssigningReq(req)} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionAssignSupport}</button>
                  <button onClick={() => {
                    setUpdatingStatusReq(req);
                    setSelectedStaffStatus(req.status);
                  }} className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionUpdateStatus}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW MODAL */}
        {reviewingReq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setReviewingReq(null)}>
            <div className="bg-[#0f2b5c] border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between border-b border-blue-400/20 pb-3">
                <div>
                  <span className="text-[10px] text-cyan-300 font-bold uppercase">Accessibility Support Review</span>
                  <h3 className="text-lg font-black text-white">{reviewingReq.studentName}</h3>
                  <p className="text-cyan-300 font-bold mt-0.5">{reviewingReq.supportType}</p>
                </div>
                <button onClick={() => setReviewingReq(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-[#081a3b] rounded-2xl border border-blue-400/20 space-y-2 text-blue-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Event Date:</span>
                  <span className="font-bold text-white">{reviewingReq.examDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Venue Location:</span>
                  <span className="font-bold text-white">{reviewingReq.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Assigned Specialist:</span>
                  <span className="font-bold text-emerald-300">{reviewingReq.professional}</span>
                </div>
                <div className="pt-2 border-t border-blue-400/20">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Special Requirements & Notes:</span>
                  <p className="text-white font-medium">{reviewingReq.notes}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setReviewingReq(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Close</button>
                <button onClick={() => {
                  setStaffRequests(prev => prev.map(r => r.id === reviewingReq.id ? { ...r, status: 'assigned' } : r));
                  setToastMessage(`Reviewed and approved support request for ${reviewingReq.studentName}`);
                  setReviewingReq(null);
                  setTimeout(() => setToastMessage(null), 4000);
                }} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Approve Request</button>
              </div>
            </div>
          </div>
        )}

        {/* ASSIGN SPECIALIST MODAL */}
        {assigningReq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setAssigningReq(null)}>
            <div className="bg-[#0f2b5c] border-2 border-cyan-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <h3 className="text-base font-bold text-white">Assign Certified Specialist</h3>
                <button onClick={() => setAssigningReq(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-blue-100">Select verified RCI specialist for <strong className="text-white">{assigningReq.studentName}</strong> ({assigningReq.supportType}):</p>
                <select
                  value={selectedStaffPro}
                  onChange={e => setSelectedStaffPro(e.target.value)}
                  className="w-full bg-[#081a3b] border border-cyan-400/40 rounded-xl p-3 text-xs text-white font-bold"
                >
                  <option value="Priya Kumari (Certified RCI Scribe)">Priya Kumari — Certified RCI Scribe (Visual)</option>
                  <option value="Rahul Verma (ISL Sign Interpreter)">Rahul Verma — Level 2 ISL Sign Language Interpreter (Hearing)</option>
                  <option value="Suresh Yadav (Audio Lesson Reader)">Suresh Yadav — Certified Audio Lesson Reader</option>
                  <option value="Dr. Meera Sen (Special Educator)">Dr. Meera Sen — Special Educator &amp; Campus Guide</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setAssigningReq(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Cancel</button>
                <button onClick={handleAssignSave} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Confirm &amp; Assign</button>
              </div>
            </div>
          </div>
        )}

        {/* UPDATE STATUS MODAL */}
        {updatingStatusReq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setUpdatingStatusReq(null)}>
            <div className="bg-[#0f2b5c] border-2 border-emerald-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <h3 className="text-base font-bold text-white">Update Request Status</h3>
                <button onClick={() => setUpdatingStatusReq(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-blue-100">Update status for <strong className="text-white">{updatingStatusReq.studentName}</strong>:</p>
                <select
                  value={selectedStaffStatus}
                  onChange={e => setSelectedStaffStatus(e.target.value)}
                  className="w-full bg-[#081a3b] border border-cyan-400/40 rounded-xl p-3 text-xs text-white font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="completed">Completed / Fulfilled</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setUpdatingStatusReq(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Cancel</button>
                <button onClick={handleUpdateStatusSave} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Save Status</button>
              </div>
            </div>
          </div>
        )}

        {/* Available Professionals at a Glance */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="font-bold text-white text-sm">
            {language === 'hi' ? 'सत्यापित सहायता पेशेवर (उपलब्ध)' : language === 'mr' ? 'सत्यापित सहाय्य व्यावसायिक (उपलब्ध)' : 'Verified Support Professionals (Available)'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {professionals.filter(p => p.status === 'verified').slice(0, 3).map(prof => (
              <div key={prof.id} className="bg-[#081a3b] border border-blue-400/20 p-4 rounded-2xl space-y-2">
                <div className="font-bold text-sm text-white">{prof.name}</div>
                <div className="text-xs text-cyan-300">{prof.primaryService.replace(/_/g, ' ')}</div>
                <div className="text-[11px] text-blue-200">{prof.district}</div>
                <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold">⭐ {prof.rating?.toFixed(1)} · {localizeNumber(prof.completedSessions, language)} sessions</div>
                <button onClick={() => alert(`Assigning ${prof.name} to a student`)} className="w-full bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold py-2 rounded-xl transition">{t.staffActionAssignSupport}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleRequestAssignment = (profId: string) => {
    if (submittedRequestId) {
      acceptSupportRequest(submittedRequestId, profId);
      setMatchedProfId(profId);
      setTimeout(() => {
        setMatchedProfId(null);
        setActiveTab('active_requests');
      }, 1800);
    } else {
      // Auto create a matching request and assign
      const created = submitSupportRequest({
        studentId: activeStudent?.id || 'std-001',
        studentName: activeStudent?.fullName || 'Aarav Sharma',
        institutionId: activeStudent?.institutionId || 'inst-01',
        institutionName: activeStudent?.institutionName || 'Ranchi Government Inclusive Model High School',
        supportType,
        subjectOrEvent,
        date,
        time,
        durationHours,
        location,
        district,
        languagePreference,
        additionalRequirements,
      });
      acceptSupportRequest(created.id, profId);
      setMatchedProfId(profId);
      setTimeout(() => {
        setMatchedProfId(null);
        setActiveTab('active_requests');
      }, 1800);
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Banner */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              {language === 'hi' ? 'मानव सुगमता सहायता गेटवे' : language === 'mr' ? 'मानव सुलभता सहाय्य गेटवे' : 'Human Accessibility Support Gateway'}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              {language === 'hi' ? 'आरपीडब्ल्यूडी धारा १६/१७ अनुरूप' : language === 'mr' ? 'आरपीडब्ल्यूडी कलम १६/१७ नुसार' : 'RPWD Section 16/17 Aligned'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {t.accHeroTitle}
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl mt-1 leading-relaxed">
            {t.accHeroSubtitle}
          </p>
        </div>

        <button
          onClick={() => {
            setShowRequestForm(true);
            setActiveTab('human_support');
          }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs shadow-md transition flex items-center gap-2 shrink-0 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>{t.accBtnRequestNew}</span>
        </button>
      </div>

      {/* Tabs Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-blue-400/20 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('human_support')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeTab === 'human_support'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-blue-200 hover:bg-[#0f2b5c] hover:text-white'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>{language === 'hi' ? '१. विशेषज्ञ मिलान' : language === 'mr' ? '१. व्यावसायिक जुळवणी' : '1. Support Professional Matching'}</span>
        </button>

        <button
          onClick={() => setActiveTab('active_requests')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeTab === 'active_requests'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-blue-200 hover:bg-[#0f2b5c] hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{language === 'hi' ? '२. सक्रिय सेवा अनुरोध स्थिति' : language === 'mr' ? '२. सक्रिय सेवा विनंती ट्रॅकर' : '2. Active Requests Tracker'} ({localizeNumber(supportRequests.length, language)})</span>
        </button>
        <button
          onClick={() => setActiveTab('verified_pros')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeTab === 'verified_pros'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-blue-200 hover:bg-[#0f2b5c] hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{language === 'hi' ? '३. सत्यापित विशेषज्ञ निर्देशिका' : language === 'mr' ? '३. सत्यापित व्यावसायिक निर्देशिका' : '3. Verified Directory'} ({localizeNumber(professionals.filter(p => p.status === 'verified').length, language)})</span>
        </button>
      </div>

      {/* TAB 1: HUMAN SUPPORT REQUEST & MATCHING ENGINE */}
      {activeTab === 'human_support' && (
        <div className="space-y-6">
          {/* Request Form Modal / Accordion */}
          {showRequestForm && (
            <div className="bg-[#0f2b5c] border-2 border-cyan-400 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl text-slate-950 font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      Request Human Accessibility Support
                    </h3>
                    <p className="text-xs text-blue-200">
                      Fill details below to match with verified RCI-certified professionals.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#081a3b]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-white mb-1.5">1. Select Support Type *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {SUPPORT_TYPES.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => setSupportType(st.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                          supportType === st.id
                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold border-cyan-300 shadow-md'
                            : 'bg-[#081a3b] border-blue-400/20 text-blue-200 hover:border-blue-400/50'
                        }`}
                      >
                        <span className="font-bold text-xs">{st.label}</span>
                        <span className="text-[10px] opacity-80 mt-0.5">{st.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white mb-1">Subject / Examination / Event *</label>
                    <input
                      type="text"
                      value={subjectOrEvent}
                      onChange={(e) => setSubjectOrEvent(e.target.value)}
                      placeholder="e.g. Grade 10 Science Board Exam"
                      className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white mb-1">District (Jharkhand) *</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-white mb-1">Date *</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white mb-1">Time Slot *</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="10:00 AM – 01:00 PM"
                      className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white mb-1">Duration (Hours)</label>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={durationHours}
                      onChange={(e) => setDurationHours(Number(e.target.value))}
                      className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">Venue / Examination Room Location *</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Exam Hall 2, Ranchi Inclusive Model High School, Kanke Road"
                    className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">Additional Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Specify diagram transcription, slow dictation, formula transcribing, etc..."
                    className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-bold px-4 py-2.5 rounded-xl text-xs border border-blue-400/30"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Submit &amp; Match Professionals</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Recommended Verified Professionals Section */}
          <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-400/20 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>Recommended Verified Accessibility Professionals</span>
                </h3>
                <p className="text-xs text-blue-200">
                  Showing verified professionals matching service ({supportType.replace(/_/g, ' ')}), {district}, and language preferences.
                </p>
              </div>

              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40 w-fit">
                {matchedProfessionals.length} Verified Match(es) Found
              </span>
            </div>

            {matchedProfId && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-400/40 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in-50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Assignment Request Dispatched!</strong> Notification sent to professional and added to your active requests.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedProfessionals.map((prof) => (
                <div
                  key={prof.id}
                  className="bg-[#081a3b] border border-cyan-500/20 hover:border-cyan-400/50 p-5 rounded-3xl space-y-4 shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 shadow-sm shrink-0">
                          <div className="w-full h-full bg-[#051124] rounded-[14px] flex items-center justify-center text-cyan-300 font-black text-lg">
                            {prof.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                            <span>{prof.name}</span>
                            <Award className="w-4 h-4 text-emerald-400" />
                          </h4>
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                            <Shield className="w-3 h-3" /> VERIFIED BY SAKSHAM
                          </span>
                        </div>
                      </div>

                      <span className="bg-cyan-500/20 text-cyan-200 text-xs font-bold px-2.5 py-1 rounded-lg border border-cyan-400/30">
                        ★ {prof.rating}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-blue-200 bg-[#051124] p-3 rounded-2xl border border-blue-400/20">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Specialization:</span>
                        <span className="font-bold text-white capitalize">{prof.primaryService.replace(/_/g, ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Languages:</span>
                        <span className="font-bold text-emerald-300">{prof.languages.join(' • ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">District:</span>
                        <span className="font-bold text-white">{prof.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Availability:</span>
                        <span className="font-bold text-teal-300">{prof.availableHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-blue-400/20 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProfForModal(prof)}
                      className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 font-semibold px-3 py-2 rounded-xl text-xs border border-blue-400/30 transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>

                    <button
                      onClick={() => handleRequestAssignment(prof.id)}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition shadow-md flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Request Assignment</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE REQUESTS */}
      {activeTab === 'active_requests' && (
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>Current Support Requests Tracking</span>
            </h3>
            <button
              onClick={() => {
                setShowRequestForm(true);
                setActiveTab('human_support');
              }}
              className="text-xs font-bold text-cyan-300 hover:underline flex items-center gap-1"
            >
              + New Request
            </button>
          </div>

          <div className="space-y-3">
            {supportRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] bg-blue-600/30 px-2.5 py-0.5 rounded">
                      {req.supportType.replace(/_/g, ' ')}
                    </span>
                    <span className="text-slate-400 font-mono">#{req.id}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{req.subjectOrEvent}</h4>
                  <p className="text-blue-200 text-[11px]">{req.institutionName} • {req.date} ({req.time})</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Assigned Specialist</span>
                    <span className="font-bold text-emerald-300 text-xs">
                      {req.assignedProfessionalName || 'Auto-Matching...'}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase ${
                      req.status === 'accepted' || req.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFIED ROSTER */}
      {activeTab === 'verified_pros' && (
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>State Certified Accessibility Professional Roster</span>
              </h3>
              <p className="text-xs text-blue-200">
                100% verified professionals with cleared background checks and disability inclusion licenses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {professionals
              .filter((p) => p.status === 'verified')
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-3 text-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{p.name}</span>
                      <span className="text-emerald-400 font-bold">★ {p.rating}</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                      {p.primaryService.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <p className="text-[11px] text-blue-200">{p.qualification}</p>
                    <div className="text-[10px] text-slate-400">
                      {p.district}, Jharkhand • {p.experienceYears} Years Exp
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProfForModal(p)}
                    className="w-full bg-[#0f2b5c] hover:bg-[#123366] text-cyan-200 border border-cyan-500/30 font-bold py-1.5 rounded-xl text-xs transition"
                  >
                    View Credential Dossier
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Professional Profile Modal */}
      {selectedProfForModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{selectedProfForModal.name}</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>
              <button
                onClick={() => setSelectedProfForModal(null)}
                className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#123366]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2 text-blue-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Specialization:</span>
                  <span className="font-bold text-white capitalize">{selectedProfForModal.primaryService.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qualification:</span>
                  <span className="font-bold text-cyan-300">{selectedProfForModal.qualification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-bold text-white">{selectedProfForModal.experienceYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Languages:</span>
                  <span className="font-bold text-emerald-300">{selectedProfForModal.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">District:</span>
                  <span className="font-bold text-white">{selectedProfForModal.district}, Jharkhand</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Available Days:</span>
                  <span className="font-bold text-white">{selectedProfForModal.availableDays.join(', ')}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-cyan-300 mb-1">RCI &amp; Educational Credentials:</h4>
                <p className="p-3 bg-[#051124] rounded-xl border border-blue-400/20 text-blue-100 font-mono text-[11px]">
                  {selectedProfForModal.certificationDetails}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProfForModal(null)}
                className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-bold px-4 py-2 rounded-xl text-xs border border-blue-400/30"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleRequestAssignment(selectedProfForModal.id);
                  setSelectedProfForModal(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black px-5 py-2 rounded-xl text-xs shadow-md"
              >
                Request Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
