'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber, localizePercent } from '@/lib/i18n';




import {
  Users,
  Building2,
  Scale,
  FileCheck2,
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Calendar,
  Sparkles,
  Award,
  MapPin,
  Check,
  User,
  HeartHandshake,
  Shield,
  Eye,
  X,
} from 'lucide-react';
import { SupportRequest } from '@/types';

export default function DashboardPage() {
  const {
    currentRole,
    language,
    students,
    serviceRequests,
    examAccommodations,
    audits,
    aiRecommendations,
    professionals,
    supportRequests,
    assignments,
    activeProfessionalId,
    acceptSupportRequest,
  } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const activeStudent = students[0];
  const activeProf = professionals.find((p) => p.id === activeProfessionalId) || professionals[0];
  const pendingRequests = serviceRequests.filter((s) => s.status === 'pending' || s.status === 'under_review');
  const activeExamAccommodations = examAccommodations.filter((e) => e.status === 'approved' || e.status === 'allocated');

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment =
    currentRole === 'government' ||
    currentRole === 'government_authority' ||
    currentRole === 'district_officer' ||
    currentRole === 'super_admin';
  const isStaff = !isStudent && !isGovernment && !isProfessional;

  const [selectedCollege, setSelectedCollege] = useState('Jamshedpur Special Education & Technical Institute');
  const [contentCheckText, setContentCheckText] = useState('');
  const [contentCheckResult, setContentCheckResult] = useState<string | null>(null);
  const [selectedReqForModal, setSelectedReqForModal] = useState<SupportRequest | null>(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [acceptedSuccess, setAcceptedSuccess] = useState<string | null>(null);

  const handleCheckContentAccessibility = () => {
    if (!contentCheckText.trim()) return;
    setContentCheckResult('Analyzing...');
    setTimeout(() => {
      setContentCheckResult(
        '✅ WCAG 2.1 AA Analysis:\n- Readability Score: Grade 8 (Optimal for inclusive learning)\n- Contrast: Pass\n- Suggested Improvement: Add alt text for embedded diagrams.'
      );
    }, 600);
  };

  const handleAccept = (reqId: string) => {
    setAcceptingId(reqId);
    setTimeout(() => {
      acceptSupportRequest(reqId, activeProf.id);
      setAcceptingId(null);
      setAcceptedSuccess(reqId);
      setTimeout(() => setAcceptedSuccess(null), 4000);
    }, 500);
  };

  const portalBadge = isProfessional
    ? 'Accessibility Professional Portal • Verified Human Support'
    : isStudent
    ? `${t.portalStudent} • Inclusive Learning Hub`
    : isGovernment
    ? `${t.portalGov} • State & District Governance`
    : `${t.portalStaff} • ${selectedCollege}`;

  return (
    <div className="space-y-8 py-2">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              {portalBadge}
            </span>
            <span className="text-[11px] text-blue-200 font-medium">| System Status: Operational</span>
            <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {t.demoEnvironment}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {isProfessional
              ? 'Accessibility Professional Dashboard'
              : isStudent
              ? t.dashStudentTitle
              : isGovernment
              ? t.dashGovTitle
              : `${selectedCollege} — Inclusion Dashboard`}
          </h1>
          <p className="text-xs text-blue-100 max-w-3xl leading-relaxed">
            {isProfessional
              ? 'Connect with students and institutions that need verified accessibility support.'
              : isStudent
              ? t.dashStudentDesc
              : isGovernment
              ? t.dashGovDesc
              : `Manage student accessibility accommodations, exam scribes, and RPwD compliance for ${selectedCollege}.`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isProfessional ? (
            <Link
              href="/professional/schedule"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 hover:from-blue-500 hover:to-cyan-400"
            >
              <Clock className="w-4 h-4" />
              Update Availability &amp; Schedule
            </Link>
          ) : isStudent ? (
            <Link
              href="/accessibility"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 hover:from-blue-500 hover:to-cyan-400"
            >
              <FileCheck2 className="w-4 h-4" />
              {t.dashReqScribe}
            </Link>
          ) : isGovernment ? (
            <Link
              href="/compliance"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 hover:from-blue-500 hover:to-cyan-400"
            >
              <Scale className="w-4 h-4" />
              {t.dashRunAudit}
            </Link>
          ) : (
            <Link
              href="/accessibility"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 hover:from-blue-500 hover:to-cyan-400"
            >
              <FileCheck2 className="w-4 h-4" />
              {t.dashManageAcc}
            </Link>
          )}
        </div>
      </div>

      {/* Active Institution College Banner for Staff */}
      {isStaff && (
        <div className="bg-gradient-to-r from-[#0c234a] via-[#0f2b5c] to-[#081a3b] border-2 border-emerald-500/40 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 rounded-2xl shrink-0 shadow-md">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Active Managed Institution
                </span>
                <span className="text-[11px] text-blue-200 font-mono">Code: JH-JSR-101 • AISHE &amp; RCI Verified</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {selectedCollege}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  East Singhbhum (Jamshedpur), Jharkhand
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">Grade A+ Accessibility Compliance (92.4%)</span>
                <span>•</span>
                <span className="text-cyan-300 font-bold">142 Enrolled PwD Students</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 bg-[#081a3b] p-3 rounded-2xl border border-blue-400/30 space-y-1 text-xs">
            <label className="block font-bold text-slate-300 text-[10px] uppercase">Switch Managed Institution:</label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="bg-[#0f2b5c] border border-cyan-400/40 text-white font-bold rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-300 cursor-pointer"
            >
              <option value="Jamshedpur Special Education & Technical Institute">Jamshedpur Special Education &amp; Technical Institute</option>
              <option value="Ranchi Government Inclusive Model High School">Ranchi Government Inclusive Model High School</option>
              <option value="Dhanbad Accessible Higher Secondary School">Dhanbad Accessible Higher Secondary School</option>
              <option value="Bokaro Inclusive Polytechnic & Skill College">Bokaro Inclusive Polytechnic &amp; Skill College</option>
              <option value="Hazaribagh Special Education Academy">Hazaribagh Special Education Academy</option>
            </select>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isProfessional ? (
          <>
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{language === 'hi' ? 'उपलब्ध सहायता अनुरोध' : language === 'mr' ? 'उपलब्ध मदत विनंत्या' : 'Available Requests'}</span>
                  <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-cyan-300">
                  {localizeNumber(supportRequests.filter((r) => r.status === 'pending' || r.status === 'matching').length, language)}
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-2">
                {language === 'hi' ? `${activeProf?.district || 'रांची'} व निकटवर्ती क्षेत्र` : language === 'mr' ? `${activeProf?.district || 'रांची'} व जवळील क्षेत्र` : `In ${activeProf?.district || 'Ranchi'} & Vicinity`}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{language === 'hi' ? 'सक्रिय असाइनमेंट' : language === 'mr' ? 'सक्रिय असाइनमेंट्स' : 'Active Assignments'}</span>
                  <div className="p-1.5 bg-[#081a3b] text-emerald-400 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  {localizeNumber(assignments.filter((a) => a.status === 'accepted' || a.status === 'in_progress').length, language)}
                </div>
              </div>
              <div className="text-[11px] text-blue-200 mt-2">
                {language === 'hi' ? 'आज १ कार्य प्रगति पर' : language === 'mr' ? 'आज १ काम प्रगतीपथावर' : '1 In Progress Today'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{language === 'hi' ? 'आगामी सत्र' : language === 'mr' ? 'आगामी सत्रे' : 'Upcoming Sessions'}</span>
                  <div className="p-1.5 bg-[#081a3b] text-teal-400 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white">
                  {localizeNumber(assignments.filter((a) => a.status === 'confirmed' || a.status === 'accepted').length, language)}
                </div>
              </div>
              <div className="text-[11px] text-teal-300 font-bold mt-2">
                {language === 'hi' ? 'अगला: भौतिकी बोर्ड परीक्षा' : language === 'mr' ? 'पुढील: भौतिकशास्त्र बोर्ड परीक्षा' : 'Next: Physics Board Exam'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{language === 'hi' ? 'कुल सेवा घंटे' : language === 'mr' ? 'एकूण सेवा तास' : 'Support Hours'}</span>
                  <div className="p-1.5 bg-[#081a3b] text-amber-400 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-300">
                  {localizeNumber(activeProf?.supportHours || 114, language)} {language === 'hi' ? 'घंटे' : language === 'mr' ? 'तास' : 'hrs'}
                </div>
              </div>
              <div className="text-[11px] text-blue-200 mt-2">
                {localizeNumber(activeProf?.completedSessions || 38, language)} {language === 'hi' ? 'सत्र सफलतापूर्वक पूर्ण' : language === 'mr' ? 'सत्रे यशस्वीरित्या पूर्ण' : 'sessions completed'}
              </div>
            </div>
          </>
        ) : isStudent ? (
          <>
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashLearnerStatus}</span>
                  <div className="p-1.5 bg-[#081a3b] text-emerald-400 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-400">{t.profStatusIepApproved}</div>
              </div>
              <div className="text-[11px] text-blue-200 mt-2 flex items-center gap-1">
                <span>{t.profStatusUdidVerified}</span>
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashActiveAcc}</span>
                  <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white">{localizeNumber(activeStudent.accessibilityProfile.classroomAccommodationsNeeded.length, language)}</div>
              </div>
              <div className="text-[11px] text-cyan-300 font-bold mt-2">
                {language === 'hi' ? 'अतिरिक्त समय + डिजिटल ब्रेल + ऑडियो' : language === 'mr' ? 'अतिरिक्त वेळ + डिजिटल ब्रेल + ऑडिओ' : 'Extra Time + Digital Braille + Audio'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashExamScribeStatus}</span>
                  <div className="p-1.5 bg-[#081a3b] text-teal-400 rounded-lg">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-teal-300">{t.statusAllocated}</div>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-2">
                {language === 'hi' ? 'सत्र परीक्षा हेतु लेखक आवंटित' : language === 'mr' ? 'सत्र परीक्षेसाठी लेखक वाटप' : 'Scribe assigned for Mid-Term'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashAttendanceProgress}</span>
                  <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-cyan-300">{localizePercent('96.4', language)}</div>
              </div>
              <div className="text-[11px] text-blue-200 mt-2">
                {language === 'hi' ? 'सतत समावेशी शिक्षण भागीदारी' : language === 'mr' ? 'सातत्यपूर्ण समावेशी शिक्षण सहभाग' : 'Consistent Inclusive Participation'}
              </div>
            </div>
          </>
        ) : isGovernment ? (
          <>
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashCoveredInstitutions}</span>
                  <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white">{localizeNumber(12, language)}</div>
              </div>
              <div className="text-[11px] text-blue-200 mt-2">
                {language === 'hi' ? '५ निगरानी जिलों में सक्रिय' : language === 'mr' ? '५ निरीक्षण जिल्ह्यांमध्ये सक्रिय' : 'Across 5 Monitored Districts'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashStateComplianceAvg}</span>
                  <div className="p-1.5 bg-[#081a3b] text-emerald-400 rounded-lg">
                    <Scale className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-400">{localizePercent('89.4', language)}</div>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-2">
                +{localizePercent('4.2', language)} {language === 'hi' ? 'वार्षिक सुधार' : language === 'mr' ? 'वार्षिक सुधारणा' : 'YoY Improvement'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashHighRiskInst}</span>
                  <div className="p-1.5 bg-[#081a3b] text-rose-400 rounded-lg">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-rose-400">{localizeNumber(1, language)}</div>
              </div>
              <div className="text-[11px] text-rose-300 font-bold mt-2">
                {language === 'hi' ? 'सुधार नोटिस सक्रिय' : language === 'mr' ? 'सुधारणा नोटीस सक्रिय' : 'Remediation Active'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashTotalSpeciallyAbled}</span>
                  <div className="p-1.5 bg-[#081a3b] text-teal-300 rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-teal-300">{localizeNumber(500, language)}+</div>
              </div>
              <div className="text-[11px] text-teal-200 font-bold mt-2">{t.profStatusUdidVerified}</div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashActiveCases}</span>
                  <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white">{localizeNumber(students.length, language)}</div>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-2">
                {localizePercent(100, language)} {language === 'hi' ? 'सुविधाएं ट्रैक की गईं' : language === 'mr' ? 'सवलती ट्रॅक केल्या' : 'Accommodations Tracked'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashPendingRequests}</span>
                  <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-cyan-300">{localizeNumber(pendingRequests.length, language)}</div>
              </div>
              <div className="text-[11px] text-blue-200 mt-2">
                {language === 'hi' ? 'सत्र परीक्षा हेतु आवश्यक' : language === 'mr' ? 'सत्र परीक्षेसाठी आवश्यक' : 'Required for Mid-Terms'}
              </div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{t.dashCampusScore}</span>
                  <div className="p-1.5 bg-[#081a3b] text-emerald-400 rounded-lg">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-400">{localizeNumber('88.5', language)}/{localizeNumber(100, language)}</div>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-2">WCAG 2.1 &amp; RPWD Compliant</div>
            </div>

            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
                  <span>{language === 'hi' ? 'सक्रिय सुगमता विशेषज्ञ' : language === 'mr' ? 'सक्रिय सुलभता व्यावसायिक' : 'Active Human Support Pros'}</span>
                  <div className="p-1.5 bg-[#081a3b] text-teal-400 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-teal-300">{localizeNumber(professionals.filter((p) => p.status === 'verified').length, language)}</div>
              </div>
              <div className="text-[11px] text-teal-200 mt-2">RCI &amp; Scribe Verified</div>
            </div>
          </>
        )}
      </div>


      {/* ============================================================ */}
      {/* 1. ACCESSIBILITY PROFESSIONAL VIEW */}
      {/* ============================================================ */}
      {isProfessional && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column: Support Requests Near You */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-cyan-400" />
                    <span>Support Requests Near You</span>
                  </h3>
                  <p className="text-xs text-blue-200">
                    Live student requests matching your qualification ({activeProf?.primaryService?.replace(/_/g, ' ')}) in {activeProf?.district}
                  </p>
                </div>
                <Link
                  href="/professional/requests"
                  className="text-xs font-bold text-cyan-300 hover:underline flex items-center gap-1"
                >
                  View All Requests <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {acceptedSuccess && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-400/40 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in-50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Request Accepted Successfully!</strong> Added to your active assignments and confirmed with the student &amp; institution.
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {supportRequests.map((req) => {
                  const isAccepted = req.status === 'accepted' || req.assignedProfessionalId === activeProf?.id;
                  return (
                    <div
                      key={req.id}
                      className="bg-[#081a3b] border border-cyan-500/20 hover:border-cyan-400/50 p-5 rounded-2xl space-y-3 transition shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                            {req.supportType.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[11px] font-mono text-cyan-300">#{req.id}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isAccepted
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                          }`}
                        >
                          {isAccepted ? 'Accepted & Scheduled' : 'Matching Available'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white">{req.subjectOrEvent}</h4>
                        <p className="text-xs text-blue-200 mt-0.5">{req.institutionName}</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] bg-[#051124] p-3 rounded-xl border border-blue-400/20 text-blue-200">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{req.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-400" />
                          <span>{req.time} ({req.durationHours}h)</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="truncate">{req.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-400">
                          Languages: <strong className="text-cyan-200">{req.languagePreference.join(', ')}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedReqForModal(req)}
                            className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 font-semibold px-3 py-1.5 rounded-xl text-xs border border-blue-400/30 transition flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>

                          {isAccepted ? (
                            <button
                              disabled
                              className="bg-emerald-600/30 text-emerald-300 font-bold px-4 py-1.5 rounded-xl text-xs border border-emerald-400/30 flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accepted</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAccept(req.id)}
                              disabled={acceptingId === req.id}
                              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-4 py-1.5 rounded-xl text-xs transition shadow-md flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{acceptingId === req.id ? 'Accepting...' : 'Accept Request'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Professional Profile Card & My Assignments */}
          <div className="space-y-6">
            {/* Verified Profile Card */}
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#081a3b] rounded-[14px] flex items-center justify-center text-cyan-300 font-black text-lg">
                    {activeProf?.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{activeProf?.name}</span>
                    <Award className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-cyan-300 font-medium capitalize">
                    {activeProf?.primaryService.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/60 border border-emerald-400/40 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-emerald-300 uppercase text-[10px] tracking-wider">
                    VERIFIED BY SAKSHAM
                  </span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-md">
                  ★ {activeProf?.rating} Rating
                </span>
              </div>

              <div className="space-y-2 text-xs text-blue-200 border-t border-blue-400/20 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">District:</span>
                  <span className="font-bold text-white">{activeProf?.district}, Jharkhand</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-bold text-white">{activeProf?.experienceYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Languages:</span>
                  <span className="font-bold text-white">{activeProf?.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Hours:</span>
                  <span className="font-bold text-white">{activeProf?.availableHours}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/professional/profile"
                  className="block w-full text-center bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-bold text-xs py-2.5 rounded-xl transition"
                >
                  View / Edit Full Profile
                </Link>
              </div>
            </div>

            {/* My Active Assignments Widget */}
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>My Assignments</span>
                </h4>
                <Link
                  href="/professional/assignments"
                  className="text-xs text-cyan-300 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {assignments.slice(0, 3).map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3 bg-[#081a3b] rounded-2xl border border-blue-400/20 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between font-bold">
                      <span className="text-cyan-300 capitalize">{asg.supportType.replace(/_/g, ' ')}</span>
                      <span className="text-emerald-300 capitalize text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                        {asg.status}
                      </span>
                    </div>
                    <p className="text-white font-medium text-xs truncate">{asg.subjectOrEvent}</p>
                    <div className="flex items-center justify-between text-[10px] text-blue-200">
                      <span>{asg.date} • {asg.time}</span>
                      <span className="text-teal-300 font-bold">{asg.compensation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Privacy-Protected Modal */}
      {selectedReqForModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-md">
                  {selectedReqForModal.supportType.replace(/_/g, ' ').toUpperCase()}
                </span>
                <span className="text-xs text-blue-300 font-mono">#{selectedReqForModal.id}</span>
              </div>
              <button
                onClick={() => setSelectedReqForModal(null)}
                className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#123366]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h3 className="text-base font-bold text-white">{selectedReqForModal.subjectOrEvent}</h3>
                <p className="text-blue-200">{selectedReqForModal.institutionName}</p>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2 text-blue-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date &amp; Schedule:</span>
                  <span className="font-bold text-white">{selectedReqForModal.date} ({selectedReqForModal.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-bold text-white">{selectedReqForModal.durationHours} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-white">{selectedReqForModal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Language:</span>
                  <span className="font-bold text-white">{selectedReqForModal.languagePreference.join(', ')}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-cyan-300 mb-1">Requirement Notes:</h4>
                <p className="p-3 bg-[#051124] rounded-xl border border-blue-400/20 text-blue-100 leading-relaxed">
                  {selectedReqForModal.additionalRequirements}
                </p>
              </div>

              {/* Privacy Notice per Requirement 9 */}
              <div className="p-3 bg-blue-950/60 border border-blue-400/30 rounded-xl text-[11px] text-blue-200 flex items-start gap-2">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Student Privacy Protection:</strong> Full individual medical profile and UDID records remain protected until an official exam assignment is confirmed by the institution.
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedReqForModal(null)}
                className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-bold px-4 py-2 rounded-xl text-xs border border-blue-400/30"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAccept(selectedReqForModal.id);
                  setSelectedReqForModal(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black px-5 py-2 rounded-xl text-xs shadow-md"
              >
                Accept Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. STUDENT DASHBOARD VIEW */}
      {/* ============================================================ */}
      {isStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  {language === 'hi' ? 'व्यक्तिगत शिक्षा योजना (IEP)' : language === 'mr' ? 'वैयक्तिक शिक्षण योजना (IEP)' : 'Personalized Individualized Education Plan (IEP)'}
                </h3>
                <p className="text-xs text-blue-200">
                  {language === 'hi' ? 'आरपीडब्ल्यूडी अधिनियम २०१६ के दिशानिर्देशों के तहत सत्यापित' : language === 'mr' ? 'आरपीडब्ल्यूडी कायदा २०१६ मार्गदर्शक तत्त्वांनुसार सत्यापित' : 'Verified under RPWD Act 2016 Guidelines'}
                </p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {t.statusActive} &amp; {t.statusVerified}
              </span>
            </div>

            {/* IEP Summary Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#081a3b] p-4 rounded-xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">{t.profPrimaryCategory}</span>
                <span className="text-sm font-bold text-white capitalize">{activeStudent.accessibilityProfile.primaryCategory}</span>
              </div>
              <div className="bg-[#081a3b] p-4 rounded-xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">{language === 'hi' ? 'गंभीरता स्तर' : language === 'mr' ? 'तीव्रता पातळी' : 'Severity Level'}</span>
                <span className="text-sm font-bold text-emerald-400 capitalize">{activeStudent.accessibilityProfile.severity}</span>
              </div>
              <div className="bg-[#081a3b] p-4 rounded-xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">{t.profCommunicationMode}</span>
                <span className="text-sm font-bold text-cyan-300 capitalize">{activeStudent.accessibilityProfile.communicationPreference.replace('_', ' ')}</span>
              </div>
              <div className="bg-[#081a3b] p-4 rounded-xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">{t.profExamMode}</span>
                <span className="text-sm font-bold text-white capitalize">{activeStudent.accessibilityProfile.examinationFormatPreference}</span>
              </div>
            </div>

            {/* Required Classroom Provisions */}
            <div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                {language === 'hi' ? 'कक्षा में आवश्यक सुविधाएं:' : language === 'mr' ? 'वर्गात आवश्यक सवलती:' : 'Classroom Accommodations:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeStudent.accessibilityProfile.classroomAccommodationsNeeded.map((acc, idx) => (
                  <span key={idx} className="bg-[#081a3b] text-blue-100 text-xs px-3 py-1.5 rounded-lg border border-blue-400/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {acc}
                  </span>
                ))}
              </div>
            </div>

            {/* Assistive Technologies */}
            <div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                {language === 'hi' ? 'आवंटित सहायक उपकरण:' : language === 'mr' ? 'वाटप केलेली सहाय्यक उपकरणे:' : 'Allocated Assistive Technology:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeStudent.accessibilityProfile.assistiveTechNeeded.map((tech, idx) => (
                  <span key={idx} className="bg-[#081a3b] text-cyan-200 text-xs px-3 py-1.5 rounded-lg border border-cyan-500/30 flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" /> {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>{language === 'hi' ? 'आगामी परीक्षा कार्यक्रम' : language === 'mr' ? 'आगामी परीक्षा वेळापत्रक' : 'Upcoming Exam Schedule'}</span>
              <Link href="/examinations" className="text-xs text-cyan-300 hover:underline">{language === 'hi' ? 'सभी देखें' : language === 'mr' ? 'सर्व पहा' : 'View All'}</Link>
            </h3>

            <div className="space-y-3">
              {examAccommodations.slice(0, 2).map((ea) => (
                <div key={ea.id} className="bg-[#081a3b] p-4 rounded-xl border border-blue-400/20 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-cyan-300">{ea.examName}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold text-[10px]">
                      {ea.status === 'allocated' || ea.status === 'approved' ? t.statusApproved : t.statusPending}
                    </span>
                  </div>
                  <div className="text-blue-200">
                    <div>{language === 'hi' ? 'तिथि' : language === 'mr' ? 'तारीख' : 'Date'}: <strong>{ea.examDate}</strong> | {language === 'hi' ? 'कक्ष' : language === 'mr' ? 'खोली' : 'Room'}: <strong>{localizeNumber((ea as any).roomNumber || 'Hall 2', language)}</strong></div>
                    <div>{language === 'hi' ? 'अतिरिक्त समय' : language === 'mr' ? 'अतिरिक्त वेळ' : 'Compensatory Time'}: <strong className="text-emerald-300">+{localizeNumber(ea.extraTimeMinutes, language)} {language === 'hi' ? 'मिनट' : language === 'mr' ? 'मिनिटे' : 'mins'}</strong></div>
                    <div>{language === 'hi' ? 'लेखक' : language === 'mr' ? 'लेखक' : 'Scribe'}: <strong className="text-cyan-300">{ea.scribeAssignedName || (language === 'hi' ? 'आवंटन जारी' : language === 'mr' ? 'वाटप सुरू' : 'Pending')}</strong></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/learning"
                className="block w-full text-center bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-bold text-xs py-2.5 rounded-xl transition"
              >
                {language === 'hi' ? 'अनुकूली शिक्षण केंद्र खोलें →' : language === 'mr' ? 'अनुकूलित शिक्षण केंद्र उघडा →' : 'Access Adaptive Learning Hub →'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. GOVERNMENT / AUTHORITY VIEW */}
      {/* ============================================================ */}
      {isGovernment && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  {language === 'hi' ? 'जिला शिक्षण संस्थान अनुपालन सूचकांक' : language === 'mr' ? 'जिल्हा शैक्षणिक संस्था अनुपालन निर्देशांक' : 'District Educational Institutional Compliance Index'}
                </h3>
                <p className="text-xs text-blue-200">
                  {language === 'hi' ? 'आरपीडब्ल्यूडी अधिनियम २०१६ के अनिवार्य प्रावधानों के तहत निगरानी' : language === 'mr' ? 'आरपीडब्ल्यूडी कायदा २०१६ च्या अनिवार्य तरतुदींनुसार देखरेख' : 'Monitored under RPWD Act 2016 Statutory Mandates'}
                </p>
              </div>
              <Link href="/authorities" className="text-xs font-bold text-cyan-300 hover:underline flex items-center gap-1">
                {language === 'hi' ? 'पूर्ण विश्लेषण' : language === 'mr' ? 'पूर्ण विश्लेषण' : 'Full Analytics'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {audits.map((aud) => (
                <div key={aud.id} className="bg-[#081a3b] p-4 rounded-xl border border-blue-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-white">{aud.institutionName}</h4>
                    <span className="text-blue-300">{language === 'hi' ? 'ऑडिट तिथि:' : language === 'mr' ? 'ऑडिट तारीख:' : 'Audited on:'} {aud.auditDate} | {language === 'hi' ? 'ऑडिटर:' : language === 'mr' ? 'ऑडिटर:' : 'Auditor:'} {aud.auditorName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs text-blue-300 block">{t.auditOverallScore}</span>
                      <span className="text-lg font-black text-emerald-400">{localizeNumber(aud.overallScore, language)}/{localizeNumber(100, language)}</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-lg border border-emerald-400/30 text-[10px] uppercase">
                      {aud.status === 'verified' || (aud as any).status === 'compliant' ? t.statusCompliant : aud.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <span>{t.dashAiInsights}</span>
            </h3>

            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="bg-[#081a3b] p-3.5 rounded-xl border border-blue-400/20 space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-cyan-300">
                    <span>{rec.title}</span>
                    <span className="text-emerald-400">{localizePercent(rec.confidenceScore, language)}</span>
                  </div>
                  <p className="text-blue-200 text-[11px] leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. INSTITUTION STAFF VIEW */}
      {/* ============================================================ */}
      {isStaff && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  {language === 'hi' ? 'संस्थागत छात्र रजिस्टर व सुविधाएं' : language === 'mr' ? 'संस्थात्मक विद्यार्थी नोंदवही आणि सवलती' : 'Institutional Student Directory & Accommodations'}
                </h3>
                <p className="text-xs text-blue-200">
                  {language === 'hi' ? 'सक्रिय पंजीकृत आईईपी व सुगमता वाले विद्यार्थी' : language === 'mr' ? 'सक्रिय नोंदणीकृत आयईपी आणि सवलती असलेले विद्यार्थी' : 'Active Students with Registered IEP & Accommodations'}
                </p>
              </div>
              <Link href="/students" className="text-xs font-bold text-cyan-300 hover:underline flex items-center gap-1">
                {language === 'hi' ? 'संपूर्ण निर्देशिका' : language === 'mr' ? 'पूर्ण डिरेक्टरी' : 'Full Directory'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Content Accessibility Checker */}
            <div className="bg-[#081a3b] p-5 rounded-2xl border border-blue-400/20 space-y-3 text-xs">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {t.dashContentValidator}
              </h4>
              <textarea
                rows={3}
                value={contentCheckText}
                onChange={(e) => setContentCheckText(e.target.value)}
                placeholder={t.dashContentPlaceholder}
                className="w-full bg-[#051124] border border-blue-400/30 rounded-xl p-3 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleCheckContentAccessibility}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-md"
              >
                {t.dashValidateBtn}
              </button>

              {contentCheckResult && (
                <div className="p-3 bg-[#051124] border border-emerald-400/40 rounded-xl text-emerald-300 whitespace-pre-line leading-relaxed">
                  {contentCheckResult}
                </div>
              )}
            </div>

            {/* Students List with Special Needs */}
            <div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                {t.dashTotalSpeciallyAbled}:
              </h4>
              <div className="space-y-2">
                {students.map((s) => (
                  <div key={s.id} className="bg-[#081a3b] p-3.5 rounded-xl border border-blue-400/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{s.fullName}</span>
                      <span className="text-blue-300 ml-2">({s.rollNumber})</span>
                      <div className="text-[11px] text-emerald-300 capitalize">{s.accessibilityProfile.primaryCategory} ({language === 'hi' ? 'सुविधाएं' : language === 'mr' ? 'सवलती' : 'Accommodations'}: {s.accessibilityProfile.classroomAccommodationsNeeded.join(', ')})</div>
                    </div>
                    <span className="bg-blue-500/20 text-cyan-300 font-bold px-2.5 py-1 rounded-lg border border-blue-400/30">
                      {language === 'hi' ? 'स्कोर' : language === 'mr' ? 'गुण' : 'Score'}: {localizePercent(s.academicPerformanceScore, language)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>{t.dashDutyRoster}</span>
              <Link href="/examinations" className="text-xs text-cyan-300 hover:underline">{language === 'hi' ? 'प्रबंधित करें' : language === 'mr' ? 'व्यवस्थापित करा' : 'Manage'}</Link>
            </h3>

            <div className="space-y-3">
              {examAccommodations.map((ea) => (
                <div key={ea.id} className="bg-[#081a3b] p-3.5 rounded-xl border border-blue-400/20 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-cyan-300">{ea.examName} ({ea.subjectCode})</span>
                    <span className="text-emerald-300">+{localizeNumber(ea.extraTimeMinutes, language)}m {language === 'hi' ? 'अतिरिक्त' : language === 'mr' ? 'अतिरिक्त' : 'Extra'}</span>
                  </div>
                  <div className="text-blue-200">
                    {language === 'hi' ? 'विद्यार्थी:' : language === 'mr' ? 'विद्यार्थी:' : 'Student:'} <strong className="text-white">{ea.studentName}</strong>
                  </div>
                  <div className="text-[11px] text-teal-300">
                    {language === 'hi' ? 'आवंटित लेखक:' : language === 'mr' ? 'वाटप केलेले लेखक:' : 'Assigned Scribe:'} {ea.scribeAssignedName || (language === 'hi' ? 'आवंटन प्रक्रिया जारी' : language === 'mr' ? 'वाटप प्रक्रिया सुरू' : 'Pending Assignment')}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/audit"
                className="block w-full text-center bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-bold text-xs py-2.5 rounded-xl transition"
              >
                {language === 'hi' ? 'परिसर सुगमता ऑडिट प्रारंभ करें' : language === 'mr' ? 'परिसर सुलभता ऑडिट सुरू करा' : 'Perform Campus Infrastructure Audit'}
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
