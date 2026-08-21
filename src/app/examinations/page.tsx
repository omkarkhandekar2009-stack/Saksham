'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber } from '@/lib/i18n';
import { FileCheck2, Clock, ShieldCheck } from 'lucide-react';

export default function ExaminationsPage() {
  const { examAccommodations, language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;
  const [staffExamFilter, setStaffExamFilter] = React.useState<'all' | 'pending' | 'approved' | 'completed'>('all');

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment = currentRole === 'government' || currentRole === 'government_authority' || currentRole === 'district_officer' || currentRole === 'super_admin';
  const isStaff = !isStudent && !isProfessional && !isGovernment;

  if (isStaff) {
    const mockExamRequests = [
      { id: 'ea-001', student: 'Aarav Sharma', disability: 'Visual (Severe)', exam: 'Physics Board Exam', date: '2026-09-15', accommodation: 'Scribe + Screen Reader', extraTime: '+60 min', status: 'approved', assignedTo: 'Priya Kumari' },
      { id: 'ea-002', student: 'Ananya Deshmukh', disability: 'Hearing (Moderate)', exam: 'Mathematics Paper II', date: '2026-09-18', accommodation: 'Sign Language Interpreter', extraTime: '+40 min', status: 'pending', assignedTo: '—' },
      { id: 'ea-003', student: 'Rohan Verma', disability: 'Mobility (60%)', exam: 'Chemistry Practical', date: '2026-09-20', accommodation: 'Accessible Lab Setup', extraTime: '+40 min', status: 'pending', assignedTo: '—' },
      { id: 'ea-004', student: 'Priya Singh', disability: 'Learning Difficulty', exam: 'English Literature', date: '2026-09-22', accommodation: 'Reader + Enlarged Print', extraTime: '+60 min', status: 'completed', assignedTo: 'Suresh Yadav' },
    ];

    const filtered = staffExamFilter === 'all' ? mockExamRequests : mockExamRequests.filter(r => r.status === staffExamFilter);
    const statusColor = (s: string) => s === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' : s === 'pending' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
    const statusLabel = (s: string) => s === 'approved' ? (language === 'hi' ? 'स्वीकृत' : language === 'mr' ? 'मंजूर' : 'Approved') : s === 'pending' ? (language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending') : (language === 'hi' ? 'पूर्ण' : language === 'mr' ? 'पूर्ण' : 'Completed');

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
            onClick={() => alert(language === 'hi' ? 'परीक्षा सुविधा रिपोर्ट डाउनलोड हो रही है...' : language === 'mr' ? 'परीक्षा सवलत अहवाल डाउनलोड होत आहे...' : 'Downloading exam accommodation report...')}
            className="bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0"
          >
            <FileCheck2 className="w-4 h-4" />
            {language === 'hi' ? 'रिपोर्ट डाउनलोड' : language === 'mr' ? 'अहवाल डाउनलोड' : 'Download Report'}
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: language === 'hi' ? 'कुल अनुरोध' : language === 'mr' ? 'एकूण विनंत्या' : 'Total Requests', value: mockExamRequests.length, color: 'text-cyan-300' },
            { label: language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending', value: mockExamRequests.filter(r => r.status === 'pending').length, color: 'text-amber-300' },
            { label: language === 'hi' ? 'स्वीकृत' : language === 'mr' ? 'मंजूर' : 'Approved', value: mockExamRequests.filter(r => r.status === 'approved').length, color: 'text-emerald-300' },
            { label: language === 'hi' ? 'पूर्ण' : language === 'mr' ? 'पूर्ण' : 'Completed', value: mockExamRequests.filter(r => r.status === 'completed').length, color: 'text-blue-300' },
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
                    <div><strong className="text-slate-400">{language === 'hi' ? 'नियुक्त:' : language === 'mr' ? 'नियुक्त:' : 'Assigned To:'}</strong> {req.assignedTo}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => alert(`Reviewing: ${req.student}`)} className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3 py-2 rounded-xl font-semibold text-xs transition">{t.staffActionReview}</button>
                  {req.status === 'pending' && (
                    <>
                      <button onClick={() => alert(`Approved: ${req.student}`)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">
                        {language === 'hi' ? 'स्वीकृत करें' : language === 'mr' ? 'मंजूर करा' : 'Approve'}
                      </button>
                      <button onClick={() => alert(`Assigning support for: ${req.student}`)} className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionAssignSupport}</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

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
