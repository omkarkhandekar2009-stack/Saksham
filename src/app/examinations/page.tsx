'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber } from '@/lib/i18n';
import { FileCheck2, Clock, ShieldCheck, CheckCircle2, X, Check } from 'lucide-react';
import { exportToCSV } from '@/lib/exportUtils';

export default function ExaminationsPage() {
  const { examAccommodations, language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;
  const [staffExamFilter, setStaffExamFilter] = React.useState<'all' | 'pending' | 'approved' | 'completed'>('all');
  const [examRequestsList, setExamRequestsList] = React.useState([
    { id: 'ea-001', student: 'Aarav Sharma', disability: 'Visual (Severe)', exam: 'Physics Board Exam', date: '2026-09-15', accommodation: 'Scribe + Screen Reader', extraTime: '+60 min', status: 'approved', assignedTo: 'Priya Kumari (Certified Scribe)', center: 'Ranchi Exam Center 4, Hall 2' },
    { id: 'ea-002', student: 'Ananya Deshmukh', disability: 'Hearing (Moderate)', exam: 'Mathematics Paper II', date: '2026-09-18', accommodation: 'Sign Language Interpreter', extraTime: '+40 min', status: 'pending', assignedTo: '—', center: 'Jamshedpur Center 1' },
    { id: 'ea-003', student: 'Rohan Verma', disability: 'Mobility (60%)', exam: 'Chemistry Practical', date: '2026-09-20', accommodation: 'Accessible Ground Floor Lab', extraTime: '+40 min', status: 'pending', assignedTo: '—', center: 'Bokaro Center 2' },
    { id: 'ea-004', student: 'Priya Singh', disability: 'Learning Difficulty', exam: 'English Literature', date: '2026-09-22', accommodation: 'Reader + Enlarged Print', extraTime: '+60 min', status: 'completed', assignedTo: 'Suresh Yadav', center: 'Dhanbad Center 3' },
  ]);

  const [reviewingExam, setReviewingExam] = React.useState<any | null>(null);
  const [assigningExam, setAssigningExam] = React.useState<any | null>(null);
  const [updatingExamStatus, setUpdatingExamStatus] = React.useState<any | null>(null);
  const [selectedScribe, setSelectedScribe] = React.useState('Priya Kumari (Certified RCI Scribe)');
  const [selectedExamStatus, setSelectedExamStatus] = React.useState('approved');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment = currentRole === 'government' || currentRole === 'government_authority' || currentRole === 'district_officer' || currentRole === 'super_admin';
  const isStaff = !isStudent && !isProfessional && !isGovernment;

  if (isStaff) {
    const filtered = staffExamFilter === 'all' ? examRequestsList : examRequestsList.filter(r => r.status === staffExamFilter);
    const statusColor = (s: string) => s === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' : s === 'pending' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
    const statusLabel = (s: string) => s === 'approved' ? (language === 'hi' ? 'स्वीकृत' : language === 'mr' ? 'मंजूर' : 'Approved') : s === 'pending' ? (language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending') : (language === 'hi' ? 'पूर्ण' : language === 'mr' ? 'पूर्ण' : 'Completed');

    const handleAssignScribeSave = () => {
      if (!assigningExam) return;
      const scribeName = selectedScribe.split('(')[0].trim();
      setExamRequestsList(prev => prev.map(r => r.id === assigningExam.id ? { ...r, assignedTo: scribeName, status: 'approved' } : r));
      const targetName = assigningExam.student;
      setAssigningExam(null);
      setToastMessage(`Assigned exam scribe ${scribeName} to ${targetName} and marked APPROVED.`);
      setTimeout(() => setToastMessage(null), 4000);
    };

    const handleUpdateStatusSave = () => {
      if (!updatingExamStatus) return;
      setExamRequestsList(prev => prev.map(r => r.id === updatingExamStatus.id ? { ...r, status: selectedExamStatus } : r));
      const targetName = updatingExamStatus.student;
      setUpdatingExamStatus(null);
      setToastMessage(`Updated exam accommodation status for ${targetName} to "${selectedExamStatus.toUpperCase()}"`);
      setTimeout(() => setToastMessage(null), 4000);
    };

    return (
      <div className="space-y-8 py-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
                {language === 'hi' ? 'परीक्षा सुविधा समन्वय' : language === 'mr' ? 'परीक्षा सवलत समन्वय' : 'Exam Accommodation Coordination'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">RPWD §16/17</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{t.staffExamMgmtTitle}</h1>
            <p className="text-xs text-blue-100 mt-1">{t.staffExamMgmtSubtitle}</p>
          </div>
          <button
            onClick={() => {
              const headers = ['Request ID', 'Student Name', 'Disability', 'Examination', 'Exam Date', 'Accommodation Required', 'Extra Time', 'Status', 'Assigned Scribe/Specialist'];
              const rows = examRequestsList.map(r => [r.id, r.student, r.disability, r.exam, r.date, r.accommodation, r.extraTime, r.status, r.assignedTo]);
              exportToCSV('Saksham_Exam_Accommodations_Report_2026', headers, rows);
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <FileCheck2 className="w-4 h-4" />
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

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: language === 'hi' ? 'कुल अनुरोध' : language === 'mr' ? 'एकूण विनंत्या' : 'Total Requests', value: examRequestsList.length, color: 'text-cyan-300' },
            { label: language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending', value: examRequestsList.filter(r => r.status === 'pending').length, color: 'text-amber-300' },
            { label: language === 'hi' ? 'स्वीकृत' : language === 'mr' ? 'मंजूर' : 'Approved', value: examRequestsList.filter(r => r.status === 'approved').length, color: 'text-emerald-300' },
            { label: language === 'hi' ? 'पूर्ण' : language === 'mr' ? 'पूर्ण' : 'Completed', value: examRequestsList.filter(r => r.status === 'completed').length, color: 'text-blue-300' },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#0f2b5c] border border-cyan-500/30 p-4 rounded-2xl shadow-lg">
              <div className="text-xs text-blue-200 font-semibold mb-1">{kpi.label}</div>
              <div className={`text-3xl font-black ${kpi.color}`}>{localizeNumber(kpi.value, language)}</div>
            </div>
          ))}
        </div>

        {/* Filter + Table */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'approved', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setStaffExamFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${staffExamFilter === f ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow' : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'}`}
              >
                {f === 'all' ? (language === 'hi' ? 'सभी' : language === 'mr' ? 'सर्व' : 'All') : statusLabel(f)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map(req => (
              <div key={req.id} className="bg-[#081a3b] border border-blue-400/20 hover:border-cyan-400/40 p-5 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition shadow-md">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{req.student}</span>
                    <span className="text-[10px] text-cyan-300 font-mono">{req.disability}</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${statusColor(req.status)}`}>{statusLabel(req.status)}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-blue-200">
                    <div><strong className="text-slate-400">{language === 'hi' ? 'परीक्षा:' : language === 'mr' ? 'परीक्षा:' : 'Exam:'}</strong> {req.exam}</div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'तिथि:' : language === 'mr' ? 'तारीख:' : 'Date:'}</strong> {req.date}</div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'सुविधा:' : language === 'mr' ? 'सवलत:' : 'Accommodation:'}</strong> {req.accommodation}</div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'अतिरिक्त समय:' : language === 'mr' ? 'अतिरिक्त वेळ:' : 'Extra Time:'}</strong> <span className="text-emerald-300 font-bold">{req.extraTime}</span></div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'नियुक्त:' : language === 'mr' ? 'नियुक्त:' : 'Assigned To:'}</strong> <span className="text-cyan-200 font-bold">{req.assignedTo}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setReviewingExam(req)} className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3 py-2 rounded-xl font-semibold text-xs transition">{t.staffActionReview}</button>
                  {req.status === 'pending' && (
                    <button onClick={() => {
                      setExamRequestsList(prev => prev.map(r => r.id === req.id ? { ...r, status: 'approved' } : r));
                      setToastMessage(`Approved exam accommodation for ${req.student}`);
                      setTimeout(() => setToastMessage(null), 4000);
                    }} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">
                      {language === 'hi' ? 'स्वीकृत करें' : language === 'mr' ? 'मंजूर करा' : 'Approve'}
                    </button>
                  )}
                  <button onClick={() => setAssigningExam(req)} className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionAssignSupport}</button>
                  <button onClick={() => {
                    setUpdatingExamStatus(req);
                    setSelectedExamStatus(req.status);
                  }} className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionUpdateStatus}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW EXAM MODAL */}
        {reviewingExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setReviewingExam(null)}>
            <div className="bg-[#0f2b5c] border-2 border-cyan-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between border-b border-blue-400/20 pb-3">
                <div>
                  <span className="text-[10px] text-cyan-300 font-bold uppercase">Exam Accommodation Review</span>
                  <h3 className="text-lg font-black text-white">{reviewingExam.student}</h3>
                  <p className="text-cyan-300 font-bold mt-0.5">{reviewingExam.exam}</p>
                </div>
                <button onClick={() => setReviewingExam(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-[#081a3b] rounded-2xl border border-blue-400/20 space-y-2 text-blue-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Disability Profile:</span>
                  <span className="font-bold text-white">{reviewingExam.disability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scheduled Date:</span>
                  <span className="font-bold text-white">{reviewingExam.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Exam Center:</span>
                  <span className="font-bold text-white">{reviewingExam.center}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">RPwD Compensatory Extra Time:</span>
                  <span className="font-bold text-emerald-300">{reviewingExam.extraTime} (20 min/hr quota)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Scribe / Assistant:</span>
                  <span className="font-bold text-cyan-300">{reviewingExam.assignedTo}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setReviewingExam(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Close</button>
                <button onClick={() => {
                  setExamRequestsList(prev => prev.map(r => r.id === reviewingExam.id ? { ...r, status: 'approved' } : r));
                  setToastMessage(`Approved exam request for ${reviewingExam.student}`);
                  setReviewingExam(null);
                  setTimeout(() => setToastMessage(null), 4000);
                }} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Approve Accommodation</button>
              </div>
            </div>
          </div>
        )}

        {/* ASSIGN EXAM SCRIBE MODAL */}
        {assigningExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setAssigningExam(null)}>
            <div className="bg-[#0f2b5c] border-2 border-cyan-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <h3 className="text-base font-bold text-white">Assign Exam Scribe / Specialist</h3>
                <button onClick={() => setAssigningExam(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-blue-100">Select certified invigilator scribe for <strong className="text-white">{assigningExam.student}</strong> ({assigningExam.exam}):</p>
                <select
                  value={selectedScribe}
                  onChange={e => setSelectedScribe(e.target.value)}
                  className="w-full bg-[#081a3b] border border-cyan-400/40 rounded-xl p-3 text-xs text-white font-bold"
                >
                  <option value="Priya Kumari (Certified RCI Scribe)">Priya Kumari — Certified RCI Scribe (Visual)</option>
                  <option value="Rahul Verma (Sign Language Scribe)">Rahul Verma — ISL Sign Interpreter Scribe</option>
                  <option value="Suresh Yadav (Exam Reader)">Suresh Yadav — Certified Exam Question Reader</option>
                  <option value="Dr. Meera Sen (Special Educator Invigilator)">Dr. Meera Sen — Special Educator Invigilator</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setAssigningExam(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Cancel</button>
                <button onClick={handleAssignScribeSave} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Confirm &amp; Assign</button>
              </div>
            </div>
          </div>
        )}

        {/* UPDATE EXAM STATUS MODAL */}
        {updatingExamStatus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setUpdatingExamStatus(null)}>
            <div className="bg-[#0f2b5c] border-2 border-emerald-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <h3 className="text-base font-bold text-white">Update Exam Status</h3>
                <button onClick={() => setUpdatingExamStatus(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-blue-100">Update status for <strong className="text-white">{updatingExamStatus.student}</strong>:</p>
                <select
                  value={selectedExamStatus}
                  onChange={e => setSelectedExamStatus(e.target.value)}
                  className="w-full bg-[#081a3b] border border-cyan-400/40 rounded-xl p-3 text-xs text-white font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed / Exam Conducted</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setUpdatingExamStatus(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Cancel</button>
                <button onClick={handleUpdateStatusSave} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Save Status</button>
              </div>
            </div>
          </div>
        )}

        {/* RPWD Extra Time Reference */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            {language === 'hi' ? 'RPWD अतिरिक्त समय संदर्भ तालिका' : language === 'mr' ? 'RPWD अतिरिक्त वेळ संदर्भ सारणी' : 'RPWD Compensatory Extra-Time Reference'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[['1 hr', '+20 min'], ['2 hrs', '+40 min'], ['3 hrs', '+60 min'], ['4 hrs', '+80 min']].map(([duration, extra]) => (
              <div key={duration} className="bg-[#081a3b] rounded-xl p-3 border border-blue-400/20 text-center">
                <div className="text-blue-200">{duration}</div>
                <div className="text-emerald-300 font-black text-lg">{extra}</div>
              </div>
            ))}
          </div>
        </div>
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
              {language === 'hi' ? 'परीक्षा सुशासन व संचालन' : language === 'mr' ? 'परीक्षा सुशासन आणि संचालन' : 'Examination Governance & Conduct'}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              {language === 'hi' ? 'आरपीडब्ल्यूडी धारा १६/१७ अनुरूप' : language === 'mr' ? 'आरपीडब्ल्यूडी कलम १६/१७ नुसार' : 'RPWD Section 16/17 Aligned'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {t.examHeroTitle}
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            {t.examHeroSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Extra-time Calculator Card */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            {language === 'hi' ? 'आरपीडब्ल्यूडी अतिरिक्त समय नियम' : language === 'mr' ? 'आरपीडब्ल्यूडी अतिरिक्त वेळ नियम' : 'RPWD Compensatory Extra-Time Rules'}
          </h3>
          <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-3 text-xs">
            <div className="font-bold text-white">
              {language === 'hi' ? 'मानक: प्रति घंटा २० मिनट अतिरिक्त समय' : language === 'mr' ? 'मानक: दर तासाला २० मिनिटे अतिरिक्त वेळ' : 'Official Standard: 20 Minutes per Hour of Exam'}
            </div>
            <p className="text-blue-100 text-[11px] leading-relaxed">
              {language === 'hi'
                ? 'दिव्यांगता श्रेणी (≥४०%) वाले सभी विद्यार्थी सिस्टम द्वारा स्वचालित रूप से परिकलित प्रतिपूरक अतिरिक्त समय के हकदार हैं।'
                : language === 'mr'
                ? 'दिव्यांगत्व श्रेणी (≥४०%) असलेले सर्व विद्यार्थी प्रणालीद्वारे स्वयंचलितपणे मोजलेल्या अतिरिक्त वेळेस पात्र आहेत.'
                : 'Students with benchmark disabilities (≥40%) are entitled to compensatory extra time automatically calculated by the system.'}
            </p>
            <div className="pt-2 border-t border-blue-400/20 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-blue-300">{language === 'hi' ? '२-घंटे की भौतिकी परीक्षा:' : language === 'mr' ? '२-तासांची भौतिकशास्त्र परीक्षा:' : '2-Hour Physics Exam:'}</span>
                <span className="text-emerald-400 font-bold">+{localizeNumber(40, language)} {language === 'hi' ? 'मिनट' : language === 'mr' ? 'मिनिटे' : 'Mins Extra'}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-blue-300">{language === 'hi' ? '३-घंटे की गणित बोर्ड परीक्षा:' : language === 'mr' ? '३-तासांची गणित बोर्ड परीक्षा:' : '3-Hour Board Mathematics Paper:'}</span>
                <span className="text-emerald-400 font-bold">+{localizeNumber(60, language)} {language === 'hi' ? 'मिनट' : language === 'mr' ? 'मिनिटे' : 'Mins Extra'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Accommodation List */}
        <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center justify-between">
            <span>{language === 'hi' ? 'स्वीकृत परीक्षा सुविधाएं' : language === 'mr' ? 'मंजूर परीक्षा सवलती' : 'Approved Exam Accommodations'} ({localizeNumber(examAccommodations.length, language)})</span>
          </h3>

          <div className="space-y-3">
            {examAccommodations.map((ea) => (
              <div key={ea.id} className="bg-[#081a3b] border border-blue-400/20 p-5 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-cyan-300 font-mono">{ea.subjectCode} - {ea.examName}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                    {ea.status === 'allocated' || ea.status === 'approved' ? t.statusApproved : t.statusPending}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <span className="text-blue-300 block">{language === 'hi' ? 'विद्यार्थी का नाम:' : language === 'mr' ? 'विद्यार्थ्याचे नाव:' : 'Student Name:'}</span>
                    <span className="font-bold text-white">{ea.studentName}</span>
                  </div>
                  <div>
                    <span className="text-blue-300 block">{language === 'hi' ? 'प्रतिपूरक अतिरिक्त समय:' : language === 'mr' ? 'प्रतिपूरक अतिरिक्त वेळ:' : 'Compensatory Extra Time:'}</span>
                    <span className="font-bold text-emerald-400">+{localizeNumber(ea.extraTimeMinutes, language)} {language === 'hi' ? 'मिनट' : language === 'mr' ? 'मिनिटे' : 'Minutes'}</span>
                  </div>
                  <div>
                    <span className="text-blue-300 block">{language === 'hi' ? 'आवंटित प्रमाणित लेखक:' : language === 'mr' ? 'वाटप केलेले प्रमाणित लेखक:' : 'Assigned Certified Scribe:'}</span>
                    <span className="font-bold text-cyan-200">{ea.scribeAssignedName || (language === 'hi' ? 'आवंटन जारी' : language === 'mr' ? 'वाटप सुरू' : 'Pending')}</span>
                  </div>
                  <div>
                    <span className="text-blue-300 block">{language === 'hi' ? 'परीक्षा तिथि:' : language === 'mr' ? 'परीक्षा तारीख:' : 'Exam Date:'}</span>
                    <span className="font-bold text-white">{ea.examDate}</span>
                  </div>
                </div>

                {ea.invigilatorNotes && (
                  <div className="bg-[#0f2b5c] p-3 rounded-xl border border-blue-400/20 text-[11px] text-blue-100">
                    <span className="font-bold text-amber-300 block mb-0.5">
                      {language === 'hi' ? 'पर्यवेक्षक निर्देश:' : language === 'mr' ? 'पर्यवेक्षक सूचना:' : 'Invigilator Instructions:'}
                    </span>
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
