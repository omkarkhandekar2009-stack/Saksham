'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber } from '@/lib/i18n';
import { IncidentReport } from '@/types';
import { Plus, Lock, ShieldCheck, X, AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import { exportToCSV } from '@/lib/exportUtils';

export default function ConductPage() {
  const { incidents, addIncidentReport, language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment = currentRole === 'government' || currentRole === 'government_authority' || currentRole === 'district_officer' || currentRole === 'super_admin';
  const isStaff = !isStudent && !isProfessional && !isGovernment;

  const [showReportForm, setShowReportForm] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<IncidentReport['category']>('accessibility_denial');
  const [severity, setSeverity] = useState<IncidentReport['severity']>('moderate');
  const [staffIssueFilter, setStaffIssueFilter] = useState<'all' | 'submitted' | 'under_review' | 'resolved'>('all');
  const [incidentsList, setIncidentsList] = useState([
    { id: 'inc-demo-1', caseNumber: 'INC-2026-101', category: 'accessibility_denial', isAnonymous: false, institutionId: 'inst-01', title: 'Classroom not accessible for wheelchair user', description: 'Student in Grade 9-A unable to access main classroom due to broken ramp.', location: 'Building A, Ground Floor', dateOfIncident: '2026-08-10', severity: 'high', status: 'under_review', createdAt: '2026-08-10 09:30', assignedOfficer: 'Officer Rajesh Sharma (Disciplinary Lead)' },
    { id: 'inc-demo-2', caseNumber: 'INC-2026-102', category: 'bullying_discrimination', isAnonymous: true, institutionId: 'inst-01', title: 'Verbal harassment reported against disabled student', description: 'Anonymous report of verbal bullying targeting a student with hearing impairment.', location: 'School Canteen', dateOfIncident: '2026-08-13', severity: 'moderate', status: 'submitted', createdAt: '2026-08-13 14:15', assignedOfficer: 'Unassigned' },
    { id: 'inc-demo-3', caseNumber: 'INC-2026-103', category: 'assistive_device_failure', isAnonymous: false, institutionId: 'inst-01', title: 'Screen reader software not working in computer lab', description: 'NVDA screen reader crashed on 3 computers used by visually impaired students.', location: 'Computer Lab, Room 204', dateOfIncident: '2026-08-15', severity: 'moderate', status: 'resolved', createdAt: '2026-08-15 11:00', assignedOfficer: 'Dr. Anjali Mehta (Grievance Officer)' },
  ]);

  const [reviewingIncident, setReviewingIncident] = useState<any | null>(null);
  const [assigningOfficerInc, setAssigningOfficerInc] = useState<any | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState('Officer Rajesh Sharma (Disciplinary Lead)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) {
      setFormError(
        language === 'hi'
          ? '⚠️ कृपया रिपोर्ट सबमिट करने से पहले सभी आवश्यक विवरण (शीर्षक, स्थान और विवरण) भरें!'
          : language === 'mr'
          ? '⚠️ कृपया अहवाल सादर करण्यापूर्वी सर्व आवश्यक तपशील (शीर्षक, ठिकाण आणि वर्णन) भरा!'
          : '⚠️ Please fill in all required details (Incident Summary, Campus Location & Detailed Description) before submitting!'
      );
      return;
    }

    setFormError(null);
    const newInc: IncidentReport = {
      id: `inc-${Date.now()}`,
      caseNumber: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      category,
      isAnonymous,
      institutionId: 'inst-01',
      title: title.trim(),
      description: description.trim(),
      location: location.trim() || 'Campus Main Wing',
      dateOfIncident: new Date().toISOString().slice(0, 10),
      severity,
      status: 'submitted',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    addIncidentReport(newInc);
    setTitle('');
    setDescription('');
    setLocation('');
    setShowReportForm(false);
    setSuccessBanner(
      language === 'hi'
        ? '✅ घटना रिपोर्ट गोपनीय रूप से दर्ज कर ली गई है!'
        : language === 'mr'
        ? '✅ घटना अहवाल गोपनीयपणे नोंदवला गेला आहे!'
        : '✅ Incident Report registered confidentially!'
    );
  };

  // Staff and Government view: Issues Reported Management & Governance
  if (isStaff || isGovernment) {
    const allIncidents = [...incidentsList, ...incidents];
    const filtered = staffIssueFilter === 'all' ? allIncidents : allIncidents.filter((i: any) => i.status === staffIssueFilter);

    const statusColor = (s: string) => s === 'resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' : s === 'under_review' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'bg-amber-500/20 text-amber-300 border-amber-400/40';
    const statusLabel = (s: string) => s === 'resolved' ? (language === 'hi' ? 'समाधानित' : language === 'mr' ? 'निराकरण झाले' : 'Resolved') : s === 'under_review' ? (language === 'hi' ? 'समीक्षाधीन' : language === 'mr' ? 'पुनरावलोकनाधीन' : 'Under Review') : (language === 'hi' ? 'दर्ज' : language === 'mr' ? 'नोंदवले' : 'Submitted');
    const severityColor = (s: string) => s === 'high' || s === 'critical' ? 'bg-rose-500/20 text-rose-300 border-rose-400/40' : s === 'moderate' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' : 'bg-green-500/20 text-green-300 border-green-400/40';

    const handleAssignOfficerSave = () => {
      if (!assigningOfficerInc) return;
      const officerName = selectedOfficer.split('(')[0].trim();
      setIncidentsList(prev => prev.map(inc => inc.id === assigningOfficerInc.id ? { ...inc, assignedOfficer: officerName, status: 'under_review' } : inc));
      const caseNo = assigningOfficerInc.caseNumber || assigningOfficerInc.id;
      setAssigningOfficerInc(null);
      setToastMessage(`Assigned Grievance Redressal Officer ${officerName} to case ${caseNo}`);
      setTimeout(() => setToastMessage(null), 4000);
    };

    const handleDownloadReport = () => {
      const headers = ['Case Number', 'Incident Title', 'Category', 'Severity', 'Location', 'Date of Incident', 'Status', 'Assigned Officer', 'Anonymous Report'];
      const rows = allIncidents.map((i: any) => [i.caseNumber || i.id, i.title, i.category, i.severity, i.location, i.dateOfIncident, i.status, i.assignedOfficer || 'Unassigned', i.isAnonymous ? 'Yes' : 'No']);
      exportToCSV('Saksham_Conduct_Incident_Report_2026', headers, rows);
    };

    return (
      <div className="space-y-8 py-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-rose-950/60 text-rose-300 border border-rose-800/60 text-xs font-bold px-3 py-0.5 rounded-full">
                {isGovernment
                  ? (language === 'hi' ? 'राज्य स्तरीय शिकायत निगरानी' : language === 'mr' ? 'राज्यस्तरीय तक्रार देखरेख' : 'Government Oversight & Monitoring')
                  : (language === 'hi' ? 'शिकायत प्रबंधन' : language === 'mr' ? 'तक्रार व्यवस्थापन' : 'Complaint Management')}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">RPwD §4 Grievance Redressal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isGovernment
                ? (language === 'hi' ? 'दर्ज शिकायतें एवं समस्या निवारण पोर्टल' : language === 'mr' ? 'नोंदवलेले मुद्दे आणि तक्रार निवारण पोर्टल' : 'Issues Reported & Grievance Governance')
                : t.staffIssuesTitle}
            </h1>
            <p className="text-xs text-blue-100 mt-1">
              {isGovernment
                ? (language === 'hi' ? 'झारखंड के शैक्षणिक संस्थानों में दर्ज की गई सुगमता संबंधी सभी समस्याओं व शिकायतों की निगरानी करें।' : language === 'mr' ? 'झारखंडमधील शैक्षणिक संस्थांमधील सुलभता समस्या व तक्रारींचे पुनरावलोकन करा.' : 'Monitor, review, assign grievance officers, and audit reported accessibility barriers across Jharkhand institutions.')
                : t.staffIssuesSubtitle}
            </p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <Download className="w-4 h-4" />
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
            { label: language === 'hi' ? 'कुल मामले' : language === 'mr' ? 'एकूण प्रकरणे' : 'Total Issues', value: allIncidents.length, color: 'text-cyan-300' },
            { label: language === 'hi' ? 'दर्ज' : language === 'mr' ? 'नोंदवले' : 'Submitted', value: allIncidents.filter((i: any) => i.status === 'submitted').length, color: 'text-amber-300' },
            { label: language === 'hi' ? 'समीक्षाधीन' : language === 'mr' ? 'पुनरावलोकनाधीन' : 'Under Review', value: allIncidents.filter((i: any) => i.status === 'under_review').length, color: 'text-blue-300' },
            { label: language === 'hi' ? 'समाधानित' : language === 'mr' ? 'निराकरण झाले' : 'Resolved', value: allIncidents.filter((i: any) => i.status === 'resolved').length, color: 'text-emerald-300' },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#0f2b5c] border border-cyan-500/30 p-4 rounded-2xl shadow-lg">
              <div className="text-xs text-blue-200 font-semibold mb-1">{kpi.label}</div>
              <div className={`text-3xl font-black ${kpi.color}`}>{localizeNumber(kpi.value, language)}</div>
            </div>
          ))}
        </div>

        {/* Filter + Issue List */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex flex-wrap gap-2">
            {(['all', 'submitted', 'under_review', 'resolved'] as const).map(f => (
              <button
                key={f}
                onClick={() => setStaffIssueFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${staffIssueFilter === f ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow' : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'}`}
              >
                {f === 'all' ? (language === 'hi' ? 'सभी' : language === 'mr' ? 'सर्व' : 'All') : statusLabel(f)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((inc: any) => (
              <div key={inc.id} className="bg-[#081a3b] border border-blue-400/20 hover:border-rose-400/40 p-5 rounded-2xl flex flex-col lg:flex-row lg:items-start justify-between gap-4 transition shadow-md">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{inc.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{inc.caseNumber}</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${statusColor(inc.status)}`}>{statusLabel(inc.status)}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${severityColor(inc.severity)}`}>{inc.severity}</span>
                    {inc.isAnonymous && <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-slate-700/40 text-slate-300 border-slate-500/30">{language === 'hi' ? 'गुमनाम' : language === 'mr' ? 'अनामित' : 'Anonymous'}</span>}
                  </div>
                  <p className="text-[11px] text-blue-200 leading-relaxed">{inc.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-blue-200">
                    <div><strong className="text-slate-400">{language === 'hi' ? 'स्थान:' : language === 'mr' ? 'स्थान:' : 'Location:'}</strong> {inc.location}</div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'तिथि:' : language === 'mr' ? 'तारीख:' : 'Date:'}</strong> {inc.dateOfIncident}</div>
                    <div><strong className="text-slate-400">{language === 'hi' ? 'अधिकारी:' : language === 'mr' ? 'अधिकारी:' : 'Officer:'}</strong> <span className="text-cyan-200 font-bold">{inc.assignedOfficer || 'Unassigned'}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setReviewingIncident(inc)} className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3 py-2 rounded-xl font-semibold text-xs transition">{t.staffActionReview}</button>
                  {inc.status === 'submitted' && (
                    <button onClick={() => setAssigningOfficerInc(inc)} className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionAssignOfficer}</button>
                  )}
                  {inc.status !== 'resolved' && (
                    <button onClick={() => {
                      setIncidentsList(prev => prev.map(item => item.id === inc.id ? { ...item, status: 'resolved' } : item));
                      setToastMessage(`Marked grievance case ${inc.caseNumber || inc.id} RESOLVED.`);
                      setTimeout(() => setToastMessage(null), 4000);
                    }} className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionMarkResolved}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW INCIDENT MODAL */}
        {reviewingIncident && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setReviewingIncident(null)}>
            <div className="bg-[#0f2b5c] border-2 border-rose-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between border-b border-blue-400/20 pb-3">
                <div>
                  <span className="text-[10px] text-rose-300 font-bold uppercase">Grievance Case Review</span>
                  <h3 className="text-base font-black text-white">{reviewingIncident.title}</h3>
                  <p className="text-cyan-300 font-mono text-[10px]">{reviewingIncident.caseNumber}</p>
                </div>
                <button onClick={() => setReviewingIncident(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-[#081a3b] rounded-2xl border border-blue-400/20 space-y-2 text-blue-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Severity Level:</span>
                  <span className="font-bold text-rose-300 uppercase">{reviewingIncident.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Incident Location:</span>
                  <span className="font-bold text-white">{reviewingIncident.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date Reported:</span>
                  <span className="font-bold text-white">{reviewingIncident.dateOfIncident}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Grievance Officer:</span>
                  <span className="font-bold text-cyan-300">{reviewingIncident.assignedOfficer || 'Unassigned'}</span>
                </div>
                <div className="pt-2 border-t border-blue-400/20">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Grievance Description:</span>
                  <p className="text-white font-medium">{reviewingIncident.description}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setReviewingIncident(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Close</button>
                <button onClick={() => {
                  setIncidentsList(prev => prev.map(item => item.id === reviewingIncident.id ? { ...item, status: 'resolved' } : item));
                  setToastMessage(`Resolved case ${reviewingIncident.caseNumber || reviewingIncident.id}`);
                  setReviewingIncident(null);
                  setTimeout(() => setToastMessage(null), 4000);
                }} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Mark Case Resolved</button>
              </div>
            </div>
          </div>
        )}

        {/* ASSIGN GRIEVANCE OFFICER MODAL */}
        {assigningOfficerInc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50" onClick={() => setAssigningOfficerInc(null)}>
            <div className="bg-[#0f2b5c] border-2 border-cyan-400/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <h3 className="text-base font-bold text-white">Assign Grievance Redressal Officer</h3>
                <button onClick={() => setAssigningOfficerInc(null)} className="text-blue-300 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-blue-100">Select designated officer for case <strong className="text-cyan-300">{assigningOfficerInc.caseNumber || assigningOfficerInc.id}</strong>:</p>
                <select
                  value={selectedOfficer}
                  onChange={e => setSelectedOfficer(e.target.value)}
                  className="w-full bg-[#081a3b] border border-cyan-400/40 rounded-xl p-3 text-xs text-white font-bold"
                >
                  <option value="Officer Rajesh Sharma (Disciplinary Lead)">Officer Rajesh Sharma — Campus Disciplinary Lead</option>
                  <option value="Dr. Anjali Mehta (Grievance Redressal)">Dr. Anjali Mehta — Grievance Redressal Counselor</option>
                  <option value="Inspector V. K. Singh (Safety Officer)">Inspector V. K. Singh — Institutional Safety Officer</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-blue-400/20">
                <button onClick={() => setAssigningOfficerInc(null)} className="px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs">Cancel</button>
                <button onClick={handleAssignOfficerSave} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs shadow-md">Assign Officer</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2">
      {successBanner && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-400/40 rounded-2xl text-xs text-emerald-200 flex items-center justify-between gap-2 animate-in fade-in-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-blue-300 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-950/60 text-rose-300 border border-rose-800/60 text-xs font-bold px-3 py-0.5 rounded-full">
              {language === 'hi' ? 'सुरक्षित व समावेशी परिसर सुशासन' : language === 'mr' ? 'सुरक्षित आणि समावेशी परिसर सुशासन' : 'Safe & Inclusive Campus Governance'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {t.conductHeroTitle}
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            {t.conductHeroSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowReportForm(!showReportForm)}
          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {showReportForm
            ? (language === 'hi' ? 'रिपोर्ट रद्द करें' : language === 'mr' ? 'अहवाल रद्द करा' : 'Cancel Incident Report')
            : t.conductBtnReport}
        </button>
      </div>

      {/* Report Form */}
      {showReportForm && (
        <form onSubmit={handleSubmit} className="bg-[#0f2b5c] border-2 border-rose-500 p-6 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              {language === 'hi' ? 'गोपनीय शिकायत पंजीकरण प्रपत्र' : language === 'mr' ? 'गोपनीय तक्रार नोंदणी अर्ज' : 'Confidential Incident Report Form'}
            </h3>
            <label className="flex items-center gap-2 text-xs text-blue-200 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded"
              />
              {t.conductAnonymous}
            </label>
          </div>

          {formError && (
            <div className="p-3.5 bg-rose-950/90 border-2 border-rose-500 rounded-2xl text-xs text-rose-200 font-bold flex items-center justify-between gap-2 shadow-lg animate-in fade-in-50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{formError}</span>
              </div>
              <button type="button" onClick={() => setFormError(null)} className="text-rose-300 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-blue-200 font-semibold mb-1">{t.conductIncidentType}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value="accessibility_denial">{language === 'hi' ? 'सुगमता में बाधा / सुविधा से इनकार' : language === 'mr' ? 'सुलभतेत अडथळा / सवलत नाकारणे' : 'Accessibility Denial / Barrier'}</option>
                <option value="bullying">{language === 'hi' ? 'तंग करना / उपहास उड़ाना' : language === 'mr' ? 'छळ / चेष्टा करणे' : 'Bullying / Mocking'}</option>
                <option value="harassment">{language === 'hi' ? 'उत्पीड़न' : language === 'mr' ? 'छळवणूक' : 'Harassment'}</option>
                <option value="infrastructure_failure">{language === 'hi' ? 'बुनियादी ढांचा / लिफ्ट विफलता' : language === 'mr' ? 'पायाभूत सुविधा / लिफ्ट बिघाड' : 'Infrastructure / Elevator Failure'}</option>
                <option value="discrimination">{language === 'hi' ? 'भेदभाव' : language === 'mr' ? 'भेदभाव' : 'Discrimination'}</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-200 font-semibold mb-1">{language === 'hi' ? 'गंभीरता स्तर' : language === 'mr' ? 'तीव्रता पातळी' : 'Severity Level'}</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value="minor">{language === 'hi' ? 'सामान्य' : language === 'mr' ? 'सामान्य' : 'Minor'}</option>
                <option value="moderate">{language === 'hi' ? 'मध्यम' : language === 'mr' ? 'मध्यम' : 'Moderate'}</option>
                <option value="severe">{language === 'hi' ? 'गंभीर' : language === 'mr' ? 'गंभीर' : 'Severe'}</option>
                <option value="critical">{language === 'hi' ? 'अति गंभीर (तत्काल ध्यान)' : language === 'mr' ? 'अति गंभीर (तात्काळ लक्ष)' : 'Critical'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">
              {language === 'hi' ? 'घटना का शीर्षक / सारांश' : language === 'mr' ? 'घटनेचे शीर्षक / सारांश' : 'Incident Summary'} <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (formError) setFormError(null);
              }}
              placeholder={language === 'hi' ? 'उदा. लिफ्ट खराब होने से तीसरी मंजिल पर स्थित प्रयोगशाला तक पहुंच में असमर्थ' : language === 'mr' ? 'उदा. लिफ्ट बंद असल्याने तिसऱ्या मजल्यावरील प्रयोगशाळेत जाण्यास अडथळा' : 'e.g. Elevator out of service preventing 3rd floor lab access'}
              className={`w-full bg-[#081a3b] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300 focus:outline-none ${
                formError && !title.trim() ? 'border-rose-500 ring-2 ring-rose-500/50' : 'border-blue-400/30 focus:border-cyan-400'
              }`}
            />
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">
              {language === 'hi' ? 'परिसर स्थान' : language === 'mr' ? 'परिसरातील ठिकाण' : 'Campus Location'} <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (formError) setFormError(null);
              }}
              placeholder={language === 'hi' ? 'उदा. ब्लॉक सी, विज्ञान प्रयोगशाला २' : language === 'mr' ? 'उदा. ब्लॉक सी, विज्ञान प्रयोगशाळा २' : 'e.g. Block C, Science Lab 2'}
              className={`w-full bg-[#081a3b] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300 focus:outline-none ${
                formError && !location.trim() ? 'border-rose-500 ring-2 ring-rose-500/50' : 'border-blue-400/30 focus:border-cyan-400'
              }`}
            />
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">
              {language === 'hi' ? 'विस्तृत विवरण' : language === 'mr' ? 'तपशीलवार वर्णन' : 'Detailed Description'} <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (formError) setFormError(null);
              }}
              placeholder={language === 'hi' ? 'घटना के सटीक तथ्य, गवाह या विवरण प्रदान करें...' : language === 'mr' ? 'घटनेची अचूक माहिती, साक्षीदार किंवा तपशील द्या...' : 'Provide exact facts, witnesses or details...'}
              className={`w-full bg-[#081a3b] border rounded-xl p-3 text-xs text-white placeholder-blue-300 focus:outline-none ${
                formError && !description.trim() ? 'border-rose-500 ring-2 ring-rose-500/50' : 'border-blue-400/30 focus:border-cyan-400'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
          >
            {language === 'hi' ? 'अनुशासन अधिकारी को गोपनीय रिपोर्ट सबमिट करें' : language === 'mr' ? 'शिस्तपालन अधिकाऱ्याकडे गोपनीय अहवाल सादर करा' : 'Submit Confidential Report to Disciplinary Officer'}
          </button>
        </form>
      )}

      {/* Incident Case List */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center justify-between">
          <span>{language === 'hi' ? 'सक्रिय शिकायत व सुरक्षा लॉग' : language === 'mr' ? 'सक्रिय तक्रार आणि सुरक्षा नोंद' : 'Active Conduct & Safety Incident Log'} ({localizeNumber(incidents.length, language)})</span>
        </h3>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div key={inc.id} className="bg-[#081a3b] border border-blue-400/20 p-5 rounded-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-mono">{inc.caseNumber}</span>
                  <span className="bg-rose-950 border border-rose-800 text-rose-300 px-2 py-0.5 rounded capitalize text-[10px]">
                    {inc.category.replace(/_/g, ' ')}
                  </span>
                  {inc.isAnonymous && (
                    <span className="bg-[#0f2b5c] text-blue-200 px-2 py-0.5 rounded text-[10px]">
                      {language === 'hi' ? 'गुमनाम' : language === 'mr' ? 'अनामिक' : 'Anonymous'}
                    </span>
                  )}
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                  inc.status === 'resolved' || inc.status === 'action_taken'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {inc.status === 'resolved' ? t.statusResolved : inc.status === 'under_investigation' ? t.statusInProgress : (inc.status as string).replace(/_/g, ' ')}
                </span>
              </div>

              <div className="font-bold text-sm text-white">{inc.title}</div>
              <p className="text-blue-100 leading-relaxed">{inc.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-blue-300 pt-2 border-t border-blue-400/20">
                <div>{language === 'hi' ? 'स्थान:' : language === 'mr' ? 'ठिकाण:' : 'Location:'} <span className="text-white font-semibold">{inc.location}</span></div>
                <div>{language === 'hi' ? 'जांच अधिकारी:' : language === 'mr' ? 'तपास अधिकारी:' : 'Investigating Officer:'} <span className="text-cyan-300 font-semibold">{inc.investigatingOfficerName || (language === 'hi' ? 'संस्थान प्रमुख को सौंपा गया' : language === 'mr' ? 'संस्था प्रमुखांकडे सोपवले' : 'Assigned to Facility Head')}</span></div>
              </div>

              {inc.resolutionSummary && (
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-emerald-200 text-xs">
                  <span className="font-bold">{language === 'hi' ? 'समाधान कार्रवाई: ' : language === 'mr' ? 'निवारण कृती: ' : 'Resolution Action: '}</span>
                  {inc.resolutionSummary}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
