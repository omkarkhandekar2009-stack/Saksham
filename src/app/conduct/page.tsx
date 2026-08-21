'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber } from '@/lib/i18n';
import { IncidentReport } from '@/types';
import { Plus, Lock } from 'lucide-react';

export default function ConductPage() {
  const { incidents, addIncidentReport, language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment = currentRole === 'government' || currentRole === 'government_authority' || currentRole === 'district_officer' || currentRole === 'super_admin';
  const isStaff = !isStudent && !isProfessional && !isGovernment;

  const [showReportForm, setShowReportForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<IncidentReport['category']>('accessibility_denial');
  const [severity, setSeverity] = useState<IncidentReport['severity']>('moderate');
  const [staffIssueFilter, setStaffIssueFilter] = useState<'all' | 'submitted' | 'under_review' | 'resolved'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newInc: IncidentReport = {
      id: `inc-${Date.now()}`,
      caseNumber: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      category,
      isAnonymous,
      institutionId: 'inst-01',
      title,
      description,
      location: location || 'Campus Main Wing',
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
    alert(
      language === 'hi'
        ? '✅ घटना रिपोर्ट गोपनीय रूप से दर्ज कर ली गई है!'
        : language === 'mr'
        ? '✅ घटना अहवाल गोपनीयपणे नोंदवला गेला आहे!'
        : '✅ Incident Report registered confidentially!'
    );
  };

  // Staff view: Issues Reported Management
  if (isStaff) {
    const allIncidents = incidents.length > 0 ? incidents : [
      { id: 'inc-demo-1', caseNumber: 'INC-2026-101', category: 'accessibility_denial', isAnonymous: false, institutionId: 'inst-01', title: 'Classroom not accessible for wheelchair user', description: 'Student in Grade 9-A unable to access main classroom due to broken ramp.', location: 'Building A, Ground Floor', dateOfIncident: '2026-08-10', severity: 'high', status: 'under_review', createdAt: '2026-08-10 09:30' },
      { id: 'inc-demo-2', caseNumber: 'INC-2026-102', category: 'bullying_discrimination', isAnonymous: true, institutionId: 'inst-01', title: 'Verbal harassment reported against disabled student', description: 'Anonymous report of verbal bullying targeting a student with hearing impairment.', location: 'School Canteen', dateOfIncident: '2026-08-13', severity: 'moderate', status: 'submitted', createdAt: '2026-08-13 14:15' },
      { id: 'inc-demo-3', caseNumber: 'INC-2026-103', category: 'assistive_device_failure', isAnonymous: false, institutionId: 'inst-01', title: 'Screen reader software not working in computer lab', description: 'NVDA screen reader crashed on 3 computers used by visually impaired students.', location: 'Computer Lab, Room 204', dateOfIncident: '2026-08-15', severity: 'moderate', status: 'resolved', createdAt: '2026-08-15 11:00' },
    ];

    const filtered = staffIssueFilter === 'all' ? allIncidents : allIncidents.filter((i: any) => i.status === staffIssueFilter);

    const statusColor = (s: string) => s === 'resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' : s === 'under_review' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'bg-amber-500/20 text-amber-300 border-amber-400/40';
    const statusLabel = (s: string) => s === 'resolved' ? (language === 'hi' ? 'समाधानित' : language === 'mr' ? 'निराकरण झाले' : 'Resolved') : s === 'under_review' ? (language === 'hi' ? 'समीक्षाधीन' : language === 'mr' ? 'पुनरावलोकनाधीन' : 'Under Review') : (language === 'hi' ? 'दर्ज' : language === 'mr' ? 'नोंदवले' : 'Submitted');
    const severityColor = (s: string) => s === 'high' || s === 'critical' ? 'bg-rose-500/20 text-rose-300 border-rose-400/40' : s === 'moderate' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' : 'bg-green-500/20 text-green-300 border-green-400/40';

    return (
      <div className="space-y-8 py-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-rose-950/60 text-rose-300 border border-rose-800/60 text-xs font-bold px-3 py-0.5 rounded-full">
                {language === 'hi' ? 'शिकायत प्रबंधन' : language === 'mr' ? 'तक्रार व्यवस्थापन' : 'Complaint Management'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">RPwD §4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{t.staffIssuesTitle}</h1>
            <p className="text-xs text-blue-100 mt-1">{t.staffIssuesSubtitle}</p>
          </div>
          <button
            onClick={() => alert(language === 'hi' ? 'रिपोर्ट डाउनलोड हो रही है...' : language === 'mr' ? 'अहवाल डाउनलोड होत आहे...' : 'Downloading issues report...')}
            className="bg-[#081a3b] hover:bg-[#123366] text-rose-300 border border-rose-400/30 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            {language === 'hi' ? 'रिपोर्ट डाउनलोड' : language === 'mr' ? 'अहवाल डाउनलोड' : 'Download Report'}
          </button>
        </div>

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
                    <div><strong className="text-slate-400">{language === 'hi' ? 'श्रेणी:' : language === 'mr' ? 'श्रेणी:' : 'Category:'}</strong> {inc.category?.replace(/_/g, ' ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => alert(`Reviewing: ${inc.caseNumber}`)} className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3 py-2 rounded-xl font-semibold text-xs transition">{t.staffActionReview}</button>
                  {inc.status === 'submitted' && (
                    <button onClick={() => alert(`Assigning officer to: ${inc.caseNumber}`)} className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionAssignOfficer}</button>
                  )}
                  {inc.status !== 'resolved' && (
                    <button onClick={() => alert(`Marking resolved: ${inc.caseNumber}`)} className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl transition shadow-md text-xs">{t.staffActionMarkResolved}</button>
                  )}
                </div>
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
            <label className="block text-blue-200 text-xs font-semibold mb-1">{language === 'hi' ? 'घटना का शीर्षक / सारांश' : language === 'mr' ? 'घटनेचे शीर्षक / सारांश' : 'Incident Summary'}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. लिफ्ट खराब होने से तीसरी मंजिल पर स्थित प्रयोगशाला तक पहुंच में असमर्थ' : language === 'mr' ? 'उदा. लिफ्ट बंद असल्याने तिसऱ्या मजल्यावरील प्रयोगशाळेत जाण्यास अडथळा' : 'e.g. Elevator out of service preventing 3rd floor lab access'}
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">{language === 'hi' ? 'परिसर स्थान' : language === 'mr' ? 'परिसरातील ठिकाण' : 'Campus Location'}</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. ब्लॉक सी, विज्ञान प्रयोगशाला २' : language === 'mr' ? 'उदा. ब्लॉक सी, विज्ञान प्रयोगशाळा २' : 'e.g. Block C, Science Lab 2'}
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">{language === 'hi' ? 'विस्तृत विवरण' : language === 'mr' ? 'तपशीलवार वर्णन' : 'Detailed Description'}</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'hi' ? 'घटना के सटीक तथ्य, गवाह या विवरण प्रदान करें...' : language === 'mr' ? 'घटनेची अचूक माहिती, साक्षीदार किंवा तपशील द्या...' : 'Provide exact facts, witnesses or details...'}
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl p-3 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
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
