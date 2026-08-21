'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { Student } from '@/types';
import { i18n, localizeNumber, localizePercent } from '@/lib/i18n';
import { Users, CheckCircle2, Plus, Search } from 'lucide-react';


interface RegisteredUser {
  id: string;
  full_name: string;
  phone_or_email: string;
  preferred_lang: string;
  disability_type: string | null;
  state: string | null;
  district: string | null;
  created_at: string;
}

function toStudent(u: RegisteredUser): Student {
  const categories = u.disability_type
    ? u.disability_type.split(',').map((c) => c.trim()).filter(Boolean)
    : ['visual'];
  return {
    id: u.id,
    rollNumber: u.phone_or_email,
    fullName: u.full_name,
    age: 0,
    grade: 'Registered via Portal',
    section: '',
    institutionId: '',
    institutionName: u.district ? `${u.district} District` : 'Registered via Portal',
    guardianName: '',
    guardianPhone: u.phone_or_email,
    guardianEmail: u.phone_or_email,
    emergencyContact: u.phone_or_email,
    disabilityPercentage: 0,
    udidCardNumber: '',
    academicPerformanceScore: 0,
    supportHistoryCount: 0,
    activeAccommodationsCount: 0,
    ilpStatus: 'draft',
    ispStatus: 'draft',
    accessibilityProfile: {
      id: u.id,
      studentId: u.id,
      categories: categories as any,
      primaryCategory: categories[0] as any,
      severity: 'moderate',
      communicationPreference: 'standard',
      learningFormatPreference: 'interactive',
      examinationFormatPreference: 'extra_time',
      assistiveTechNeeded: [],
      classroomAccommodationsNeeded: [],
      digitalAccommodationsNeeded: [],
      transportationNeeded: false,
      updatedAt: u.created_at,
    },
  };
}

export default function StudentsPage() {
  const {
    students,
    currentRole,
    language,
    professionals,
    verifyProfessional,
    suspendProfessional,
  } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const [registeredStudents, setRegisteredStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-001');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'students' | 'professionals'>('students');
  const [profStatusFilter, setProfStatusFilter] = useState<'all' | 'pending' | 'verified' | 'suspended'>('all');
  const [selectedProfModal, setSelectedProfModal] = useState<any | null>(null);

  const isStudent = currentRole === 'student' || currentRole === 'parent';

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, full_name, phone_or_email, preferred_lang, disability_type, state, district, created_at')
          .eq('role', 'student')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (!cancelled && data) {
          setRegisteredStudents((data as RegisteredUser[]).map(toStudent));
        }
      } catch (err) {
        console.error('Failed to load registered students:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Merge DB-registered students with the store (mock) students, de-duped by name
  const combinedStudents = [
    ...students,
    ...registeredStudents.filter(
      (r) => !students.some((s) => s.fullName.toLowerCase() === r.fullName.toLowerCase())
    ),
  ];

  const currentStudent = isStudent
    ? combinedStudents[0]
    : combinedStudents.find((s) => s.id === selectedStudentId) || combinedStudents[0];

  const filteredStudents = combinedStudents.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProfessionals = professionals.filter((p) => {
    if (profStatusFilter === 'pending') return p.status === 'pending_verification';
    if (profStatusFilter === 'verified') return p.status === 'verified';
    if (profStatusFilter === 'suspended') return p.status === 'suspended';
    return true;
  });

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              {isStudent ? t.portalStudent : t.profDirectoryTitle}
            </span>
            <span className="text-[10px] text-blue-300 font-semibold">
              {isStudent ? `• ${t.privacyMode}` : `• ${t.institutionalAccess}`}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {isStudent
              ? t.profHeroTitle
              : activeView === 'students'
              ? t.profDirectoryTitle
              : (language === 'hi' ? 'सुगमता विशेषज्ञ सत्यापन व रोस्टर' : language === 'mr' ? 'सुलभता व्यावसायिक पडताळणी आणि रोस्टर' : 'Accessibility Professionals Verification & Roster')}
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            {isStudent
              ? t.profHeroSubtitle
              : activeView === 'students'
              ? t.profDirectorySubtitle
              : (language === 'hi' ? 'सत्यापित लेखक, दुभाषिए और विशेष शिक्षकों के प्रमाणपत्रों की समीक्षा व प्रबंधन करें।' : language === 'mr' ? 'सत्यापित लेखक, दुभाषी आणि विशेष शिक्षकांच्या प्रमाणपत्रांचे पुनरावलोकन व व्यवस्थापन करा.' : 'Review, verify credentials, and manage state certified scribes, ISL interpreters, and special educators.')}
          </p>
        </div>

        {!isStudent && (
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#081a3b] border border-cyan-500/30 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveView('students')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeView === 'students'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                {t.navStudents} ({localizeNumber(combinedStudents.length, language)})
              </button>
              <button
                onClick={() => setActiveView('professionals')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeView === 'professionals'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                {language === 'hi' ? 'विशेषज्ञ' : language === 'mr' ? 'व्यावसायिक' : 'Professionals'} ({localizeNumber(professionals.length, language)})
              </button>
            </div>
          </div>
        )}
      </div>

      {activeView === 'students' ? (
        <div className={`grid grid-cols-1 ${isStudent ? '' : 'lg:grid-cols-3'} gap-6`}>
          {/* Left Column: Student List (Hidden for students to protect privacy) */}
          {!isStudent && (
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center bg-[#081a3b] border border-blue-400/20 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-cyan-300 mr-2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'hi' ? 'नाम या रोल नंबर से खोजें...' : language === 'mr' ? 'नाव किंवा रोल नंबरने शोधा...' : 'Search by name or roll number...'}
                  className="bg-transparent w-full text-xs text-white placeholder-blue-300 focus:outline-none"
                />
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedStudentId === s.id
                        ? 'bg-[#123366] border-cyan-400 text-white shadow-md'
                        : 'bg-[#081a3b] border-blue-400/20 text-blue-100 hover:bg-[#102a54]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">{s.fullName}</span>
                      <span className="text-[10px] bg-[#081a3b] text-cyan-300 px-2 py-0.5 rounded-full font-mono border border-cyan-500/30">
                        {s.rollNumber}
                      </span>
                    </div>
                    <div className="text-xs text-blue-200 capitalize">{s.grade} • {s.accessibilityProfile.categories.join(', ')}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Right Column: Detailed Accessibility Profile & Support Plan */}
          <div className={`${isStudent ? 'w-full' : 'lg:col-span-2'} space-y-6`}>
            {/* Main Info Card */}
            <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    {currentStudent.fullName}
                  </h2>
                  <p className="text-xs text-blue-200">{currentStudent.institutionName}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full">
                    {t.profStatusUdidVerified}: {currentStudent.udidCardNumber}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                  <span className="text-blue-300 block mb-1">{t.profDisabilityPercent}</span>
                  <span className="text-lg font-black text-rose-400">{localizePercent(currentStudent.disabilityPercentage || 0, language)}</span>
                </div>
                <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                  <span className="text-blue-300 block mb-1">{t.dashAttendanceProgress}</span>
                  <span className="text-lg font-black text-emerald-400">{localizePercent(currentStudent.academicPerformanceScore, language)}</span>
                </div>
                <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                  <span className="text-blue-300 block mb-1">{t.profIepPlan}</span>
                  <span className="text-sm font-bold text-cyan-300 uppercase">{currentStudent.ilpStatus === 'approved' ? t.statusApproved : t.statusDraft}</span>
                </div>
                <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                  <span className="text-blue-300 block mb-1">{t.profEmergencyContact}</span>
                  <span className="text-xs font-bold text-blue-100">{currentStudent.emergencyContact}</span>
                </div>
              </div>

              {/* Disability Categories */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  {t.profDisabilityDetails} ({localizeNumber(currentStudent.accessibilityProfile.categories.length, language)})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentStudent.accessibilityProfile.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold capitalize"
                    >
                      {cat.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accessibility Requirements Grid */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  {t.profAccommodations}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2">
                    <span className="font-bold text-white">{language === 'hi' ? 'सहायक उपकरण आवश्यकताएं:' : language === 'mr' ? 'आवश्यक सहाय्यक उपकरणे:' : 'Assistive Devices Needed:'}</span>
                    <ul className="space-y-1">
                      {currentStudent.accessibilityProfile.assistiveTechNeeded.map((device, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-blue-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {device}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2">
                    <span className="font-bold text-white">{language === 'hi' ? 'कक्षा में सुविधाएं:' : language === 'mr' ? 'वर्गातील सवलती:' : 'Classroom Accommodations:'}</span>
                    <ul className="space-y-1">
                      {currentStudent.accessibilityProfile.classroomAccommodationsNeeded.map((acc, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-blue-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          {acc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ACCESSIBILITY PROFESSIONALS VERIFICATION & MANAGEMENT TAB */
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl text-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
            <div>
              <h3 className="font-bold text-base text-white">
                {language === 'hi' ? 'राज्य दिव्यांगता सहायता विशेषज्ञ निर्देशिका' : language === 'mr' ? 'राज्य दिव्यांगत्व सहाय्य व्यावसायिक निर्देशिका' : 'State Disability Support Professional Registry'}
              </h3>
              <p className="text-xs text-blue-200">
                {language === 'hi' ? 'सत्यापित लेखक, दुभाषिए और विशेष शिक्षकों के लाइसेंस जांचें व प्रबंधित करें।' : language === 'mr' ? 'सत्यापित लेखक, दुभाषी आणि विशेष शिक्षकांच्या परवान्यांची पडताळणी व व्यवस्थापन करा.' : 'Verify licenses, manage active duty status, and oversee exam scribes & special educators.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-300 font-semibold">{t.btnFilter}:</span>
              <div className="bg-[#081a3b] border border-blue-400/30 p-1 rounded-xl flex gap-1">
                {(['all', 'pending', 'verified', 'suspended'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setProfStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg capitalize font-bold transition ${
                      profStatusFilter === st
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-200 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? (language === 'hi' ? 'सभी' : language === 'mr' ? 'सर्व' : 'All') : st === 'pending' ? t.statusPending : st === 'verified' ? t.statusVerified : (language === 'hi' ? 'निलंबित' : language === 'mr' ? 'निलंबित' : 'Suspended')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {filteredProfessionals.map((prof) => (
              <div
                key={prof.id}
                className="bg-[#081a3b] border border-blue-400/20 hover:border-cyan-400/40 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{prof.name}</span>
                    <span className="text-[10px] text-cyan-300 font-mono">({prof.phone})</span>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                        prof.status === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                          : prof.status === 'pending_verification'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                      }`}
                    >
                      {prof.status === 'verified' ? t.statusVerified : prof.status === 'pending_verification' ? t.statusPending : 'SUSPENDED'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-blue-200">
                    <div>
                      <strong className="text-slate-400">{language === 'hi' ? 'विशेषज्ञता:' : language === 'mr' ? 'विशेषज्ञता:' : 'Specialization:'}</strong>{' '}
                      <span className="text-cyan-200 capitalize">{prof.primaryService.replace(/_/g, ' ')}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400">{language === 'hi' ? 'जिला:' : language === 'mr' ? 'जिल्हा:' : 'District:'}</strong>{' '}
                      <span className="text-white">{prof.district}, {language === 'hi' ? 'झारखंड' : language === 'mr' ? 'झारखंड' : 'Jharkhand'}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400">{language === 'hi' ? 'भाषाएं:' : language === 'mr' ? 'भाषा:' : 'Languages:'}</strong>{' '}
                      <span className="text-emerald-300">{prof.languages.join(', ')}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 font-mono bg-[#051124] p-2 rounded-lg border border-blue-400/20">
                    {language === 'hi' ? 'योग्यता:' : language === 'mr' ? 'पात्रता:' : 'Creds:'} {prof.certificationDetails}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedProfModal(prof)}
                    className="bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border border-blue-400/30 px-3 py-2 rounded-xl font-semibold transition"
                  >
                    {t.btnViewDetails}
                  </button>

                  {prof.status !== 'verified' && (
                    <button
                      onClick={() => verifyProfessional(prof.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl transition shadow-md"
                    >
                      {language === 'hi' ? 'लाइसेंस सत्यापित करें' : language === 'mr' ? 'परवाना सत्यापित करा' : 'Verify License'}
                    </button>
                  )}

                  {prof.status !== 'suspended' && (
                    <button
                      onClick={() => suspendProfessional(prof.id)}
                      className="bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-400/40 font-bold px-3 py-2 rounded-xl transition"
                    >
                      {language === 'hi' ? 'निलंबित करें' : language === 'mr' ? 'निलंबित करा' : 'Suspend'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Review Dossier Modal */}
      {selectedProfModal && (
        <div

          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <h3 className="font-bold text-base text-white">
                Professional Credential Review • {selectedProfModal.name}
              </h3>
              <button
                onClick={() => setSelectedProfModal(null)}
                className="text-blue-300 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2 text-blue-200">
              <div><strong>Service:</strong> {selectedProfModal.primaryService.replace(/_/g, ' ').toUpperCase()}</div>
              <div><strong>Qualification:</strong> {selectedProfModal.qualification}</div>
              <div><strong>Experience:</strong> {selectedProfModal.experienceYears} Years</div>
              <div><strong>Languages:</strong> {selectedProfModal.languages.join(', ')}</div>
              <div><strong>District:</strong> {selectedProfModal.district}</div>
              <div><strong>Service Area:</strong> {selectedProfModal.serviceArea}</div>
              <div><strong>Available Hours:</strong> {selectedProfModal.availableHours}</div>
              <div><strong>RCI / Credential:</strong> {selectedProfModal.certificationDetails}</div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProfModal(null)}
                className="bg-[#081a3b] text-blue-200 px-4 py-2 rounded-xl border border-blue-400/30 font-bold"
              >
                Close
              </button>
              {selectedProfModal.status !== 'verified' && (
                <button
                  onClick={() => {
                    verifyProfessional(selectedProfModal.id);
                    setSelectedProfModal(null);
                  }}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold"
                >
                  Verify Professional
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

