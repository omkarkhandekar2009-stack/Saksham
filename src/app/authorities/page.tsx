'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber, localizePercent } from '@/lib/i18n';
import {
  Landmark,
  Building2,
  Scale,
  AlertTriangle,
  Download,
  ShieldAlert,
  Search,
  Eye,
  BarChart3,
  TrendingUp,
  MapPin,
  Sparkles,
  CheckCircle2,
  Users,
  HeartHandshake,
  X,
  Clock,
  ShieldCheck,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface MonitoredInstitution {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  code: string;
  district: string;
  districtHi: string;
  districtMr: string;
  type: 'Higher Secondary' | 'College / Institute' | 'Vocational Center';
  overallScore: number;
  physicalScore: number;
  digitalScore: number;
  humanSupportScore: number;
  examScore: number;
  studentsEnrolled: number;
  specialEducators: number;
  verifiedScribes: number;
  status: 'compliant' | 'moderate' | 'high_risk';
  remediationPlan: string;
  remediationPlanHi: string;
  remediationPlanMr: string;
  principalOrHead: string;
  contactEmail: string;
}

const jharkhandMonitoredInstitutions: MonitoredInstitution[] = [
  {
    id: 'jh-ran-101',
    name: 'Ranchi Government Inclusive Model High School',
    nameHi: 'रांची राजकीय समावेशी मॉडल उच्च विद्यालय',
    nameMr: 'रांची शासकीय समावेशी मॉडेल उच्च माध्यमिक विद्यालय',
    code: 'JH-RAN-101',
    district: 'Ranchi',
    districtHi: 'रांची',
    districtMr: 'रांची',
    type: 'Higher Secondary',
    overallScore: 92,
    physicalScore: 95,
    digitalScore: 90,
    humanSupportScore: 92,
    examScore: 92,
    studentsEnrolled: 84,
    specialEducators: 6,
    verifiedScribes: 12,
    status: 'compliant',
    remediationPlan: 'Full compliance achieved. Upgrading smart tactile navigation boards.',
    remediationPlanHi: 'पूर्ण अनुपालन प्राप्त। स्मार्ट स्पर्श पथ नेविगेशन बोर्ड उन्नयन जारी।',
    remediationPlanMr: 'पूर्ण अनुपालन साध्य. स्मार्ट स्पर्श पथ नेव्हिगेशन बोर्ड अपग्रेड सुरू.',
    principalOrHead: 'Dr. Sunita Murmu',
    contactEmail: 'principal.ran101@jharkhand.gov.in',
  },
  {
    id: 'jh-jsr-204',
    name: 'Jamshedpur Special Education & Technical Institute',
    nameHi: 'जमशेदपुर विशेष शिक्षा एवं तकनीकी संस्थान',
    nameMr: 'जमशेदपूर विशेष शिक्षण व तांत्रिक संस्था',
    code: 'JH-JSR-204',
    district: 'East Singhbhum',
    districtHi: 'पूर्वी सिंहभूम (जमशेदपुर)',
    districtMr: 'पूर्व सिंहभूम (जमशेदपूर)',
    type: 'College / Institute',
    overallScore: 89,
    physicalScore: 92,
    digitalScore: 88,
    humanSupportScore: 86,
    examScore: 90,
    studentsEnrolled: 112,
    specialEducators: 8,
    verifiedScribes: 15,
    status: 'compliant',
    remediationPlan: 'Accessible labs established. Expanding sign language classroom interpreters.',
    remediationPlanHi: 'सुगम प्रयोगशालाएं स्थापित। सांकेतिक भाषा दुभाषिया विस्तार प्रक्रिया जारी।',
    remediationPlanMr: 'सुलभ प्रयोगशाळा स्थापित. सांकेतिक भाषा दुभाषी विस्तार प्रक्रिया सुरू.',
    principalOrHead: 'Prof. Rajeshwar Soren',
    contactEmail: 'director.jsr204@jharkhand.edu.in',
  },
  {
    id: 'jh-dhn-309',
    name: 'Dhanbad Inclusive Secondary Academy',
    nameHi: 'धनबाद समावेशी माध्यमिक अकादमी',
    nameMr: 'धनबाद समावेशी माध्यमिक अकादमी',
    code: 'JH-DHN-309',
    district: 'Dhanbad',
    districtHi: 'धनबाद',
    districtMr: 'धनबाद',
    type: 'Higher Secondary',
    overallScore: 68,
    physicalScore: 60,
    digitalScore: 65,
    humanSupportScore: 70,
    examScore: 76,
    studentsEnrolled: 54,
    specialEducators: 2,
    verifiedScribes: 4,
    status: 'high_risk',
    remediationPlan: 'Statutory notice served: Ramp construction & screen reader computer lab setup underway.',
    remediationPlanHi: 'वैधानिक नोटिस जारी: रैंप निर्माण और स्क्रीन रीडर कंप्यूटर लैब स्थापना जारी।',
    remediationPlanMr: 'वैधानिक नोटीस जारी: रॅम्प बांधकाम आणि स्क्रीन रीडर कॉम्प्युटर लॅब उभारणी सुरू.',
    principalOrHead: 'Sri Anil Kumar Tiwary',
    contactEmail: 'head.dhn309@jharkhand.gov.in',
  },
  {
    id: 'jh-bok-412',
    name: 'Bokaro Steel City Model School for Specially-Abled',
    nameHi: 'बोकारो स्टील सिटी मॉडल दिव्यांग विद्यालय',
    nameMr: 'बोकारो स्टील सिटी मॉडेल दिव्यांग शाळा',
    code: 'JH-BOK-412',
    district: 'Bokaro',
    districtHi: 'बोकारो',
    districtMr: 'बोकारो',
    type: 'Higher Secondary',
    overallScore: 94,
    physicalScore: 96,
    digitalScore: 92,
    humanSupportScore: 95,
    examScore: 94,
    studentsEnrolled: 96,
    specialEducators: 7,
    verifiedScribes: 14,
    status: 'compliant',
    remediationPlan: 'Exemplary benchmark institution. Hosting district-level peer inclusive workshops.',
    remediationPlanHi: 'अनुकरणीय बेंचमार्क संस्थान। जिला स्तरीय समावेशी कार्यशालाएं आयोजित।',
    remediationPlanMr: 'आदर्श बेंचमार्क संस्था. जिल्हास्तरीय समावेशी कार्यशाळा आयोजित.',
    principalOrHead: 'Dr. Madhuri Kumari',
    contactEmail: 'principal.bok412@bokaro.gov.in',
  },
  {
    id: 'jh-haz-515',
    name: 'Hazaribagh St. Xavier Accessible Higher Education Center',
    nameHi: 'हजारीबाग सेंट जेवियर्स सुगम उच्च शिक्षा केंद्र',
    nameMr: 'हजारीबाग सेंट झेव्हियर्स सुलभ उच्च शिक्षण केंद्र',
    code: 'JH-HAZ-515',
    district: 'Hazaribagh',
    districtHi: 'हजारीबाग',
    districtMr: 'हजारीबाग',
    type: 'College / Institute',
    overallScore: 86,
    physicalScore: 88,
    digitalScore: 84,
    humanSupportScore: 85,
    examScore: 88,
    studentsEnrolled: 68,
    specialEducators: 5,
    verifiedScribes: 9,
    status: 'compliant',
    remediationPlan: 'Braille library expanded. Audio recording booths for lectures operational.',
    remediationPlanHi: 'ब्रेल पुस्तकालय विस्तारित। व्याख्यानों हेतु ऑडियो रिकॉर्डिंग बूथ सक्रिय।',
    remediationPlanMr: 'ब्रेल ग्रंथालय विस्तारित. व्याख्यानांसाठी ऑडिओ रेकॉर्डिंग बूथ कार्यरत.',
    principalOrHead: 'Fr. V. Ekka SJ',
    contactEmail: 'admin.haz515@xavier.edu.in',
  },
  {
    id: 'jh-deo-621',
    name: 'Deoghar Regional Inclusive Poly-Skill Center',
    nameHi: 'देवघर क्षेत्रीय समावेशी बहु-कौशल केंद्र',
    nameMr: 'देवघर प्रादेशिक समावेशी बहु-कौशल्य केंद्र',
    code: 'JH-DEO-621',
    district: 'Deoghar',
    districtHi: 'देवघर',
    districtMr: 'देवघर',
    type: 'Vocational Center',
    overallScore: 78,
    physicalScore: 80,
    digitalScore: 74,
    humanSupportScore: 76,
    examScore: 82,
    studentsEnrolled: 62,
    specialEducators: 3,
    verifiedScribes: 6,
    status: 'moderate',
    remediationPlan: 'Accessible machinery for tactile manufacturing training installed. Hiring 2 special tutors.',
    remediationPlanHi: 'स्पर्श निर्माण प्रशिक्षण हेतु सुगम मशीनरी स्थापित। २ विशेष शिक्षकों की नियुक्ति जारी।',
    remediationPlanMr: 'स्पर्श उत्पादन प्रशिक्षणासाठी सुलभ यंत्रसामग्री स्थापित. २ विशेष शिक्षकांची भरती सुरू.',
    principalOrHead: 'Er. Rakesh Ranjan',
    contactEmail: 'centerhead.deo621@jharkhand.gov.in',
  },
  {
    id: 'jh-dum-734',
    name: 'Dumka Tribal Inclusive Model High School',
    nameHi: 'दुमका जनजातीय समावेशी मॉडल उच्च विद्यालय',
    nameMr: 'दुमका आदिवासी समावेशी मॉडेल उच्च माध्यमिक विद्यालय',
    code: 'JH-DUM-734',
    district: 'Dumka',
    districtHi: 'दुमका',
    districtMr: 'दुमका',
    type: 'Higher Secondary',
    overallScore: 74,
    physicalScore: 72,
    digitalScore: 70,
    humanSupportScore: 75,
    examScore: 78,
    studentsEnrolled: 48,
    specialEducators: 3,
    verifiedScribes: 5,
    status: 'moderate',
    remediationPlan: 'Solar powered digital audio courseware supplied. Accessible toilet block upgrade underway.',
    remediationPlanHi: 'सौर ऊर्जा संचालित डिजिटल ऑडियो कोर्सवेयर प्रदान। सुगम शौचालय उन्नयन जारी।',
    remediationPlanMr: 'सौरऊर्जेवर चालणारे डिजिटल ऑडिओ कोर्सवेअर पुरवले. सुलभ शौचालय ब्लॉक अपग्रेड सुरू.',
    principalOrHead: 'Smt. Malti Hansda',
    contactEmail: 'headmistress.dum734@jharkhand.gov.in',
  },
  {
    id: 'jh-pal-845',
    name: 'Palamu Divyang Empowerment & Skill Campus',
    nameHi: 'पलामू दिव्यांग सशक्तिकरण एवं कौशल परिसर',
    nameMr: 'पलामू दिव्यांग सबलीकरण व कौशल्य संकुल',
    code: 'JH-PAL-845',
    district: 'Palamu',
    districtHi: 'पलामू',
    districtMr: 'पलामू',
    type: 'Vocational Center',
    overallScore: 64,
    physicalScore: 58,
    digitalScore: 60,
    humanSupportScore: 68,
    examScore: 72,
    studentsEnrolled: 42,
    specialEducators: 2,
    verifiedScribes: 3,
    status: 'high_risk',
    remediationPlan: 'High priority audit remediation: wheelchair pathway and lift procurement sanctioned.',
    remediationPlanHi: 'उच्च प्राथमिकता सुधार: व्हीलचेयर मार्ग और लिफ्ट खरीद स्वीकृत व प्रगति पर।',
    remediationPlanMr: 'उच्च प्राधान्य सुधार: व्हीलचेअर मार्ग आणि लिफ्ट खरेदी मंजूर व प्रगतीपथावर.',
    principalOrHead: 'Shri Manoj Pandey',
    contactEmail: 'director.pal845@jharkhand.gov.in',
  },
];

const districtBenchmarks = [
  { district: 'Ranchi', districtHi: 'रांची', avgScore: 91.2, schools: 4, students: 320, rampCoverage: '98%', scribeRatio: '1:4', status: 'Compliant' },
  { district: 'East Singhbhum', districtHi: 'पूर्वी सिंहभूम', avgScore: 89.4, schools: 3, students: 280, rampCoverage: '94%', scribeRatio: '1:5', status: 'Compliant' },
  { district: 'Bokaro', districtHi: 'बोकारो', avgScore: 92.5, schools: 3, students: 240, rampCoverage: '96%', scribeRatio: '1:4', status: 'Compliant' },
  { district: 'Hazaribagh', districtHi: 'हजारीबाग', avgScore: 85.8, schools: 2, students: 160, rampCoverage: '88%', scribeRatio: '1:6', status: 'Compliant' },
  { district: 'Dhanbad', districtHi: 'धनबाद', avgScore: 73.6, schools: 3, students: 190, rampCoverage: '72%', scribeRatio: '1:9', status: 'Under Remediation' },
  { district: 'Deoghar', districtHi: 'देवघर', avgScore: 78.0, schools: 1, students: 90, rampCoverage: '80%', scribeRatio: '1:7', status: 'Moderate' },
  { district: 'Dumka', districtHi: 'दुमका', avgScore: 74.0, schools: 1, students: 75, rampCoverage: '74%', scribeRatio: '1:8', status: 'Moderate' },
  { district: 'Palamu', districtHi: 'पलामू', avgScore: 64.0, schools: 1, students: 60, rampCoverage: '60%', scribeRatio: '1:10', status: 'High Risk' },
];

export default function AuthoritiesPage() {
  const { currentRole, language } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'compliant' | 'moderate' | 'high_risk'>('all');
  const [activeTab, setActiveTab] = useState<'institutions' | 'district_benchmarks' | 'remediation_queue'>('institutions');

  // Modal States
  const [selectedInst, setSelectedInst] = useState<MonitoredInstitution | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeTargetId, setNoticeTargetId] = useState<string>('jh-dhn-309');
  const [noticeDispatched, setNoticeDispatched] = useState(false);

  const isGovernment =
    currentRole === 'government' ||
    currentRole === 'government_authority' ||
    currentRole === 'district_officer' ||
    currentRole === 'super_admin';

  // Strict Role Guard: Only Government SSO users are permitted on /authorities
  if (!isGovernment) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="bg-[#081a3b] text-rose-300 border border-rose-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {language === 'hi' ? 'सरकारी प्राधिकरण केवल' : language === 'mr' ? 'केवळ सरकारी प्राधिकरण' : 'Government SSO Required'}
            </span>
            <h1 className="text-2xl font-black text-white">
              {language === 'hi' ? 'प्राधिकरण विश्लेषण पहुंच प्रतिबंधित' : language === 'mr' ? 'प्राधिकरण विश्लेषण प्रवेश प्रतिबंधित' : 'Authority Analytics Restricted'}
            </h1>
            <p className="text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
              {language === 'hi'
                ? 'राज्य एवं जिला स्तरीय शिक्षा विश्लेषण पोर्टल केवल अधिकृत सरकारी विनियामक एवं प्रशासनिक अधिकारियों के लिए आरक्षित है।'
                : language === 'mr'
                ? 'राज्य आणि जिल्हा पातळीवरील शिक्षण विश्लेषण पोर्टल केवळ अधिकृत सरकारी नियामक आणि प्रशासकीय अधिकाऱ्यांसाठी राखीव आहे.'
                : 'The State & District Level Educational Governance Analytics portal is reserved strictly for authenticated Government Regulatory Officers.'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
            >
              <span>{language === 'hi' ? 'डैशबोर्ड पर लौटें' : language === 'mr' ? 'डॅशबोर्डवर परत जा' : 'Return to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter logic
  const filteredInstitutions = jharkhandMonitoredInstitutions.filter((inst) => {
    if (districtFilter !== 'all' && inst.district.toLowerCase() !== districtFilter.toLowerCase()) {
      return false;
    }
    if (statusFilter !== 'all' && inst.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = inst.name.toLowerCase().includes(q) || inst.nameHi.includes(q) || inst.nameMr.includes(q);
      const matchCode = inst.code.toLowerCase().includes(q);
      const matchDistrict = inst.district.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchDistrict) return false;
    }
    return true;
  });

  const highRiskCount = jharkhandMonitoredInstitutions.filter((i) => i.status === 'high_risk').length;
  const totalStudents = jharkhandMonitoredInstitutions.reduce((acc, i) => acc + i.studentsEnrolled, 0);
  const totalScribes = jharkhandMonitoredInstitutions.reduce((acc, i) => acc + i.verifiedScribes, 0);

  const getStatusBadge = (status: MonitoredInstitution['status']) => {
    if (status === 'compliant') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 inline-flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          {t.statusCompliant || 'Compliant'}
        </span>
      );
    }
    if (status === 'moderate') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black bg-amber-500/20 text-amber-300 border border-amber-400/40 inline-flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {language === 'hi' ? 'सुधार जारी' : language === 'mr' ? 'सुधारणा सुरू' : 'Remediation Active'}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black bg-rose-500/20 text-rose-300 border border-rose-400/40 inline-flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        {language === 'hi' ? 'उच्च जोखिम' : language === 'mr' ? 'उच्च जोखीम' : 'High Risk'}
      </span>
    );
  };

  const handleDispatchNotice = () => {
    setNoticeDispatched(true);
    setTimeout(() => {
      setNoticeDispatched(false);
      setShowNoticeModal(false);
      alert(
        language === 'hi'
          ? '✅ आरपीडब्ल्यूडी धारा १६ के तहत वैधानिक सुधारात्मक नोटिस सफलतापूर्वक जारी किया गया!'
          : language === 'mr'
          ? '✅ आरपीडब्ल्यूडी कलम १६ अंतर्गत वैधानिक सुधारात्मक नोटीस यशस्वीरित्या जारी केली!'
          : '✅ Statutory RPwD Section 16 Remediation Notice successfully dispatched to the institution head!'
      );
    }, 1000);
  };

  return (
    <div className="space-y-5 py-1 max-w-full overflow-hidden">
      {/* Header Banner - Compact & Professional */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-xl">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
              <Landmark className="w-3.5 h-3.5 text-cyan-400" />
              {language === 'hi' ? 'प्रशासनिक सुशासन दृश्य' : language === 'mr' ? 'प्रशासकीय सुशासन दृश्य' : 'Administrative Governance View'}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {language === 'hi' ? 'झारखंड राज्य • २४ जिले' : language === 'mr' ? 'झारखंड राज्य • २४ जिल्हे' : 'Jharkhand State • 24 Districts'}
            </span>
            <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              RPwD Act 2016 §§16/17
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t.authoritiesHeroTitle || 'State & District Inclusive Education Analytics'}
          </h1>
          <p className="text-xs text-blue-100 leading-normal max-w-2xl">
            {language === 'hi'
              ? 'राज्य एवं जिला स्तरीय समावेशी शिक्षा निगरानी, वैधानिक जोखिम सूचकांक, अनुपालन प्रवर्तन एवं संसाधन आवंटन।'
              : language === 'mr'
              ? 'राज्य आणि जिल्हा पातळीवरील समावेशी शिक्षण देखरेख, वैधानिक जोखीम निर्देशांक, अनुपालन अंमलबजावणी आणि संसाधनांचे वाटप.'
              : 'State & District level inclusive education monitoring, statutory risk indexing, compliance enforcement & resource allocations.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.btnExportDossier || 'Export Official Dossier'}</span>
          </button>
          <button
            onClick={() => setShowNoticeModal(true)}
            className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t.complianceIssueNotice || 'Issue Statutory Remediation Notice'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Compact Scale */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Monitored Institutions */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-3.5 sm:p-4 rounded-xl shadow-lg flex flex-col justify-between hover:border-cyan-400/50 transition">
          <div>
            <div className="flex items-center justify-between text-[11px] text-blue-200 font-semibold mb-1">
              <span>{t.dashCoveredInstitutions || 'Monitored Institutions'}</span>
              <div className="p-1.5 bg-[#081a3b] text-cyan-400 rounded-lg border border-blue-400/20">
                <Building2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{localizeNumber(jharkhandMonitoredInstitutions.length, language)}</div>
          </div>
          <div className="text-[10px] sm:text-[11px] text-blue-200 mt-1.5 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>{language === 'hi' ? '८ सघन निगरानी जिले' : language === 'mr' ? '८ सघन निरीक्षण जिल्हे' : 'Across 8 Monitored Districts'}</span>
          </div>
        </div>

        {/* State Average Compliance */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-3.5 sm:p-4 rounded-xl shadow-lg flex flex-col justify-between hover:border-emerald-400/50 transition">
          <div>
            <div className="flex items-center justify-between text-[11px] text-blue-200 font-semibold mb-1">
              <span>{t.dashStateComplianceAvg || 'State Average Compliance'}</span>
              <div className="p-1.5 bg-[#081a3b] text-emerald-400 rounded-lg border border-blue-400/20">
                <Scale className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{localizePercent('88.4', language)}</div>
          </div>
          <div className="text-[10px] sm:text-[11px] text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+{localizePercent('4.2', language)} {language === 'hi' ? 'वार्षिक सुधार' : language === 'mr' ? 'वार्षिक सुधारणा' : 'YoY Improvement'}</span>
          </div>
        </div>

        {/* High Risk Institutions */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-3.5 sm:p-4 rounded-xl shadow-lg flex flex-col justify-between hover:border-rose-400/50 transition">
          <div>
            <div className="flex items-center justify-between text-[11px] text-blue-200 font-semibold mb-1">
              <span>{t.dashHighRiskInst || 'High Risk Institutions'}</span>
              <div className="p-1.5 bg-[#081a3b] text-rose-400 rounded-lg border border-blue-400/20">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">{localizeNumber(highRiskCount, language)}</div>
          </div>
          <div className="text-[10px] sm:text-[11px] text-rose-300 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>{language === 'hi' ? 'सुधार प्रक्रिया जारी' : language === 'mr' ? 'सुधारणा प्रक्रिया सुरू' : 'Remediation Underway'}</span>
          </div>
        </div>

        {/* Specially-Abled Students */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-3.5 sm:p-4 rounded-xl shadow-lg flex flex-col justify-between hover:border-teal-400/50 transition">
          <div>
            <div className="flex items-center justify-between text-[11px] text-blue-200 font-semibold mb-1">
              <span>{t.dashTotalSpeciallyAbled || 'Total Specially-Abled Students'}</span>
              <div className="p-1.5 bg-[#081a3b] text-teal-300 rounded-lg border border-blue-400/20">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-teal-300">{localizeNumber(totalStudents, language)}+</div>
          </div>
          <div className="text-[10px] sm:text-[11px] text-teal-200 font-bold mt-1.5 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>100% UDID Verified</span>
          </div>
        </div>
      </div>

      {/* Main Content Tabs & Viewport */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-400/20 pb-3">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'institutions', label: language === 'hi' ? 'संस्थागत सुगमता सूचकांक' : language === 'mr' ? 'संस्थात्मक सुलभता निर्देशांक' : 'Institutional Accessibility Index', icon: Building2 },
              { id: 'district_benchmarks', label: language === 'hi' ? 'जिला तुलनात्मक बेंचमार्क' : language === 'mr' ? 'जिल्हा तुलनात्मक निकष' : 'District Benchmark Comparison', icon: BarChart3 },
              { id: 'remediation_queue', label: language === 'hi' ? 'सुधारात्मक कार्ययोजना कतार' : language === 'mr' ? 'सुधारणा कृती आराखडा रांग' : 'Statutory Remediation Queue', icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md border border-cyan-300/40'
                      : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-cyan-300 font-semibold">
            {language === 'hi' ? `प्रदर्शित: ${filteredInstitutions.length} संस्थान` : language === 'mr' ? `दर्शवित आहे: ${filteredInstitutions.length} संस्था` : `Showing ${filteredInstitutions.length} Institutions`}
          </div>
        </div>

        {/* Tab 1: Institutions Directory */}
        {activeTab === 'institutions' && (
          <div className="space-y-4">
            {/* Search & Filters Toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 bg-[#081a3b] p-3 rounded-xl border border-blue-400/20">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-blue-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'संस्थान या कोड खोजें...' : language === 'mr' ? 'संस्था किंवा कोड शोधा...' : 'Search institution or code...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#051124] border border-blue-400/30 text-white text-xs pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-400 placeholder:text-blue-300/60"
                />
              </div>

              {/* District Filter */}
              <div>
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="w-full bg-[#051124] border border-blue-400/30 text-cyan-300 font-bold text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="all" className="bg-[#0f2b5c] text-white">{language === 'hi' ? 'सभी जिले (All Districts)' : language === 'mr' ? 'सर्व जिल्हे (All Districts)' : 'All Districts (8)'}</option>
                  <option value="Ranchi" className="bg-[#0f2b5c] text-white">Ranchi (रांची)</option>
                  <option value="East Singhbhum" className="bg-[#0f2b5c] text-white">East Singhbhum / Jamshedpur (पूर्वी सिंहभूम)</option>
                  <option value="Dhanbad" className="bg-[#0f2b5c] text-white">Dhanbad (धनबाद)</option>
                  <option value="Bokaro" className="bg-[#0f2b5c] text-white">Bokaro (बोकारो)</option>
                  <option value="Hazaribagh" className="bg-[#0f2b5c] text-white">Hazaribagh (हजारीबाग)</option>
                  <option value="Deoghar" className="bg-[#0f2b5c] text-white">Deoghar (देवघर)</option>
                  <option value="Dumka" className="bg-[#0f2b5c] text-white">Dumka (दुमका)</option>
                  <option value="Palamu" className="bg-[#0f2b5c] text-white">Palamu (पलामू)</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full bg-[#051124] border border-blue-400/30 text-cyan-300 font-bold text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="all" className="bg-[#0f2b5c] text-white">{language === 'hi' ? 'सभी स्थितियां (All Statuses)' : language === 'mr' ? 'सर्व स्थिती (All Statuses)' : 'All Statuses'}</option>
                  <option value="compliant" className="bg-[#0f2b5c] text-white">{language === 'hi' ? 'सत्यापित अनुपालक (≥85%)' : language === 'mr' ? 'सत्यापित अनुपालक (≥85%)' : 'Compliant (≥85%)'}</option>
                  <option value="moderate" className="bg-[#0f2b5c] text-white">{language === 'hi' ? 'मध्यम (70–84%)' : language === 'mr' ? 'मध्यम (70–84%)' : 'Moderate (70–84%)'}</option>
                  <option value="high_risk" className="bg-[#0f2b5c] text-white">{language === 'hi' ? 'उच्च जोखिम (<70%)' : language === 'mr' ? 'उच्च जोखीम (<70%)' : 'High Risk (<70%)'}</option>
                </select>
              </div>

              {/* Reset Filter Button */}
              <div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDistrictFilter('all');
                    setStatusFilter('all');
                  }}
                  className="w-full bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 text-xs font-bold py-1.5 rounded-lg border border-blue-400/30 transition flex items-center justify-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'फ़िल्टर हटाएं' : language === 'mr' ? 'फिल्टर काढा' : 'Reset Filters'}</span>
                </button>
              </div>
            </div>

            {/* Institutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredInstitutions.map((inst) => {
                const isRisk = inst.status === 'high_risk';
                const isModerate = inst.status === 'moderate';

                return (
                  <div
                    key={inst.id}
                    className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-all duration-200 flex flex-col justify-between ${
                      isRisk
                        ? 'bg-rose-950/25 border-rose-800/60 shadow-lg'
                        : isModerate
                        ? 'bg-amber-950/20 border-amber-600/40 shadow-md'
                        : 'bg-[#081a3b] border-blue-400/20 hover:border-cyan-400/50 shadow-md'
                    }`}
                  >
                    <div className="space-y-2.5">
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-cyan-300 font-mono text-[11px] bg-[#051124] px-2 py-0.5 rounded border border-blue-500/30">
                          {inst.code}
                        </span>
                        {getStatusBadge(inst.status)}
                      </div>

                      {/* Institution Title */}
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1 leading-snug">
                          {language === 'hi' ? inst.nameHi : language === 'mr' ? inst.nameMr : inst.name}
                        </h4>
                        <div className="text-[11px] text-cyan-300 mt-0.5 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{language === 'hi' ? inst.districtHi : language === 'mr' ? inst.districtMr : inst.district}</span>
                          <span className="text-blue-300">•</span>
                          <span className="text-blue-200">{inst.type}</span>
                        </div>
                      </div>

                      {/* Score Progress Bar */}
                      <div className="space-y-1 bg-[#051124] p-2.5 rounded-xl border border-blue-400/20">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-blue-200">{t.auditOverallScore || 'Overall Accessibility Score'}</span>
                          <span className={`font-black ${isRisk ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {localizePercent(inst.overallScore, language)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#081a3b] rounded-full overflow-hidden border border-blue-400/20">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isRisk
                                ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                                : isModerate
                                ? 'bg-gradient-to-r from-cyan-500 to-amber-400'
                                : 'bg-gradient-to-r from-blue-500 to-emerald-400'
                            }`}
                            style={{ width: `${inst.overallScore}%` }}
                          />
                        </div>

                        {/* Metric Micro Pills */}
                        <div className="grid grid-cols-2 gap-1 pt-1.5 text-[9px] sm:text-[10px] text-blue-200 font-medium">
                          <div className="flex justify-between bg-[#081a3b] px-1.5 py-0.5 rounded">
                            <span>🏛️ {language === 'hi' ? 'भौतिक' : 'Physical'}:</span>
                            <span className="font-bold text-white">{inst.physicalScore}%</span>
                          </div>
                          <div className="flex justify-between bg-[#081a3b] px-1.5 py-0.5 rounded">
                            <span>💻 {language === 'hi' ? 'डिजिटल' : 'Digital'}:</span>
                            <span className="font-bold text-white">{inst.digitalScore}%</span>
                          </div>
                          <div className="flex justify-between bg-[#081a3b] px-1.5 py-0.5 rounded">
                            <span>🤝 {language === 'hi' ? 'मानव' : 'Support'}:</span>
                            <span className="font-bold text-white">{inst.humanSupportScore}%</span>
                          </div>
                          <div className="flex justify-between bg-[#081a3b] px-1.5 py-0.5 rounded">
                            <span>📝 {language === 'hi' ? 'परीक्षा' : 'Exams'}:</span>
                            <span className="font-bold text-white">{inst.examScore}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Stat Counters */}
                      <div className="flex items-center justify-between text-[11px] text-blue-200">
                        <span className="flex items-center gap-1 font-medium">
                          <Users className="w-3 h-3 text-cyan-400" />
                          <span>{localizeNumber(inst.studentsEnrolled, language)} {language === 'hi' ? 'दिव्यांग छात्र' : 'Specially-Abled'}</span>
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <HeartHandshake className="w-3 h-3 text-emerald-400" />
                          <span>{localizeNumber(inst.verifiedScribes, language)} {language === 'hi' ? 'लेखक' : 'Scribes'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2.5 mt-1 border-t border-blue-400/20 flex gap-2">
                      <button
                        onClick={() => setSelectedInst(inst)}
                        className="flex-1 bg-[#0f2b5c] hover:bg-[#123366] text-cyan-300 font-bold text-xs py-2 rounded-xl border border-cyan-400/30 transition flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'विस्तृत ऑडिट देखें' : language === 'mr' ? 'तपशीलवार ऑडिट पहा' : 'View Audit Details'}</span>
                      </button>
                      {isRisk && (
                        <button
                          onClick={() => {
                            setNoticeTargetId(inst.id);
                            setShowNoticeModal(true);
                          }}
                          className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-2.5 py-2 rounded-xl transition shadow-sm flex items-center gap-1"
                          title="Dispatch Statutory Remediation Notice"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: District Benchmark Comparison Matrix */}
        {activeTab === 'district_benchmarks' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                {language === 'hi' ? 'झारखंड जिला स्तरीय तुलनात्मक सुगमता मेट्रिक्स' : language === 'mr' ? 'झारखंड जिल्हा पातळीवरील तुलनात्मक सुलभता मेट्रिक्स' : 'Jharkhand District Comparative Accessibility Matrix'}
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                {language === 'hi'
                  ? 'आरपीडब्ल्यूडी अधिनियम २०१६ धारा १६/१७ के अंतर्गत जिलों की भौतिक, डिजिटल व मानव सहायता तत्परता की तुलना।'
                  : language === 'mr'
                  ? 'आरपीडब्ल्यूडी कायदा २०१६ कलम १६/१७ अंतर्गत जिल्ह्यांची भौतिक, डिजिटल आणि मानव सहाय्य तयारीची तुलना.'
                  : 'Comparative benchmark evaluating physical infrastructure, digital courseware, and certified human resources across monitored districts.'}
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-blue-400/20 bg-[#081a3b]">
              <table className="w-full text-left text-xs text-blue-100">
                <thead className="bg-[#051124] text-cyan-300 uppercase font-black tracking-wider text-[10px] border-b border-blue-400/20">
                  <tr>
                    <th className="p-3">{language === 'hi' ? 'जिला' : language === 'mr' ? 'जिल्हा' : 'District'}</th>
                    <th className="p-3">{language === 'hi' ? 'औसत स्कोर' : language === 'mr' ? 'सरासरी स्कोअर' : 'Avg Score'}</th>
                    <th className="p-3">{language === 'hi' ? 'संस्थान' : language === 'mr' ? 'संस्था' : 'Schools'}</th>
                    <th className="p-3">{language === 'hi' ? 'दिव्यांग छात्र' : language === 'mr' ? 'दिव्यांग विद्यार्थी' : 'Students'}</th>
                    <th className="p-3">{language === 'hi' ? 'रैंप / लिफ्ट' : language === 'mr' ? 'रॅम्प / लिफ्ट' : 'Ramp / Lift'}</th>
                    <th className="p-3">{language === 'hi' ? 'लेखक अनुपात' : language === 'mr' ? 'लेखक प्रमाण' : 'Scribe Ratio'}</th>
                    <th className="p-3">{language === 'hi' ? 'स्थिति' : language === 'mr' ? 'स्थिती' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-400/10">
                  {districtBenchmarks.map((d, idx) => (
                    <tr key={idx} className="hover:bg-[#0f2b5c]/50 transition">
                      <td className="p-3 font-bold text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{language === 'hi' ? d.districtHi : d.district}</span>
                      </td>
                      <td className="p-3">
                        <span className={`font-black ${d.avgScore >= 85 ? 'text-emerald-400' : d.avgScore >= 70 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {localizePercent(d.avgScore, language)}
                        </span>
                      </td>
                      <td className="p-3">{localizeNumber(d.schools, language)}</td>
                      <td className="p-3 font-semibold text-cyan-200">{localizeNumber(d.students, language)}</td>
                      <td className="p-3 font-semibold text-emerald-300">{d.rampCoverage}</td>
                      <td className="p-3 text-blue-200">{d.scribeRatio}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${
                            d.status === 'Compliant'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                              : d.status === 'High Risk'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Statutory Remediation Queue */}
        {activeTab === 'remediation_queue' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                {language === 'hi' ? 'उच्च प्राथमिकता सुधारात्मक निगरानी कतार' : language === 'mr' ? 'उच्च प्राधान्य सुधारणा देखरेख रांग' : 'High Priority Statutory Remediation Queue'}
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                {language === 'hi'
                  ? 'आरपीडब्ल्यूडी धारा १६ गैर-अनुपालन के अंतर्गत सुधारात्मक कार्ययोजना में शामिल संस्थान।'
                  : language === 'mr'
                  ? 'आरपीडब्ल्यूडी कलम १६ गैर-अनुपालनांतर्गत सुधारणा कृती आराखड्यात समाविष्ट संस्था.'
                  : 'Institutions currently undergoing mandated architectural and digital accessibility corrections under RPWD Section 16.'}
              </p>
            </div>

            <div className="space-y-3">
              {jharkhandMonitoredInstitutions
                .filter((i) => i.status !== 'compliant')
                .map((inst) => (
                  <div
                    key={inst.id}
                    className="bg-[#081a3b] border border-amber-500/30 hover:border-amber-400/60 p-4 sm:p-5 rounded-2xl space-y-3 shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-400/20 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-cyan-300 bg-[#051124] px-2 py-0.5 rounded border border-blue-500/30">
                            {inst.code}
                          </span>
                          <span className="font-bold text-white text-sm sm:text-base">
                            {language === 'hi' ? inst.nameHi : language === 'mr' ? inst.nameMr : inst.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-blue-300 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{inst.district}</span>
                          <span>•</span>
                          <span>{language === 'hi' ? `प्रमुख: ${inst.principalOrHead}` : `Head: ${inst.principalOrHead}`}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <span className="text-[9px] text-blue-300 uppercase font-bold block">{language === 'hi' ? 'वर्तमान स्कोर' : 'Score'}</span>
                          <span className="text-base font-black text-rose-400">{inst.overallScore}%</span>
                        </div>
                        {getStatusBadge(inst.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-[#051124] p-3 rounded-xl border border-blue-400/20 space-y-0.5">
                        <span className="text-cyan-300 font-bold block text-[11px]">🚨 {language === 'hi' ? 'चिह्नित कमियां' : 'Identified Deficiencies'}</span>
                        <p className="text-[10px] sm:text-[11px] text-blue-200 leading-normal">
                          {inst.overallScore < 70
                            ? (language === 'hi' ? 'रैंप की अनुपलब्धता, अनुपयुक्त शौचालय एवं ब्रेल/स्क्रीन रीडर कंप्यूटरों की कमी।' : 'Lack of compliant wheelchair ramps, accessible restrooms & screen reader labs.')
                            : (language === 'hi' ? 'विशेष शिक्षकों की संख्या कम एवं डिजिटल ई-सामग्री आंशिक रूप से सुगम।' : 'Shortage of full-time special educators and partial digital courseware accessibility.')}
                        </p>
                      </div>

                      <div className="bg-[#051124] p-3 rounded-xl border border-blue-400/20 space-y-0.5">
                        <span className="text-emerald-400 font-bold block text-[11px]">🛠️ {language === 'hi' ? 'सुधारात्मक कार्ययोजना' : 'Remediation Action'}</span>
                        <p className="text-[10px] sm:text-[11px] text-blue-200 leading-normal">
                          {language === 'hi' ? inst.remediationPlanHi : language === 'mr' ? inst.remediationPlanMr : inst.remediationPlan}
                        </p>
                      </div>

                      <div className="bg-[#051124] p-3 rounded-xl border border-blue-400/20 space-y-1.5 flex flex-col justify-between">
                        <div>
                          <span className="text-amber-300 font-bold block text-[11px]">⏱️ {language === 'hi' ? 'अनुपालन समय-सीमा' : 'Target Deadline'}</span>
                          <p className="text-[10px] sm:text-[11px] text-white font-semibold">
                            {language === 'hi' ? '३१ अक्टूबर २०२६ (६० दिवस शेष)' : '31 October 2026 (60 Days Left)'}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setNoticeTargetId(inst.id);
                            setShowNoticeModal(true);
                          }}
                          className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-[11px] py-1.5 rounded-lg transition shadow-xs"
                        >
                          {language === 'hi' ? 'अनुस्मारक नोटिस जारी करें' : language === 'mr' ? 'स्मरणपत्र नोटीस जारी करा' : 'Dispatch Reminder Notice'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Institutional Audit Details Modal */}
      {selectedInst && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 border-b border-blue-400/20 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-cyan-300 bg-[#081a3b] px-2 py-0.5 rounded border border-blue-400/30">
                    {selectedInst.code}
                  </span>
                  {getStatusBadge(selectedInst.status)}
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {language === 'hi' ? selectedInst.nameHi : language === 'mr' ? selectedInst.nameMr : selectedInst.name}
                </h3>
                <p className="text-xs text-cyan-300 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedInst.district} District • {selectedInst.type}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedInst(null)}
                className="p-1.5 bg-[#081a3b] hover:bg-[#123366] text-blue-200 rounded-lg transition border border-blue-400/20"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="bg-[#081a3b] p-2.5 rounded-xl border border-blue-400/20">
                <span className="text-[10px] text-blue-300 block">🏛️ {language === 'hi' ? 'भौतिक' : 'Physical'}</span>
                <span className="text-base font-black text-white">{selectedInst.physicalScore}%</span>
              </div>
              <div className="bg-[#081a3b] p-2.5 rounded-xl border border-blue-400/20">
                <span className="text-[10px] text-blue-300 block">💻 {language === 'hi' ? 'डिजिटल' : 'Digital'}</span>
                <span className="text-base font-black text-white">{selectedInst.digitalScore}%</span>
              </div>
              <div className="bg-[#081a3b] p-2.5 rounded-xl border border-blue-400/20">
                <span className="text-[10px] text-blue-300 block">🤝 {language === 'hi' ? 'मानव' : 'Support'}</span>
                <span className="text-base font-black text-white">{selectedInst.humanSupportScore}%</span>
              </div>
              <div className="bg-[#081a3b] p-2.5 rounded-xl border border-blue-400/20">
                <span className="text-[10px] text-blue-300 block">📝 {language === 'hi' ? 'परीक्षा' : 'Exams'}</span>
                <span className="text-base font-black text-white">{selectedInst.examScore}%</span>
              </div>
            </div>

            {/* Key Infrastructure Parameters */}
            <div className="space-y-2 bg-[#081a3b] p-3.5 rounded-xl border border-blue-400/20 text-xs">
              <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'hi' ? 'सत्यापित सुगमता मानक' : language === 'mr' ? 'सत्यापित सुलभता निकष' : 'Verified Accessibility Standards'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-blue-200 text-[11px]">
                <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Wheelchair Accessible Entrance & Ramps</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Tactile Paving & Braille Floor Plan Signage</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Designated Disabled Restroom Facilities</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Screen Reader Enabled Workstations (NVDA)</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Certified Scribe & Interpreter Roster</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> RPWD Section 16 Extra Time Protocols</div>
              </div>
            </div>

            {/* Administrative Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#051124] p-3 rounded-xl border border-blue-400/20 text-blue-200">
              <div>
                <strong className="text-slate-400 block text-[10px]">{language === 'hi' ? 'संस्थान प्रमुख:' : 'Principal / Head:'}</strong>
                <span className="text-white font-semibold">{selectedInst.principalOrHead}</span>
              </div>
              <div>
                <strong className="text-slate-400 block text-[10px]">{language === 'hi' ? 'आधिकारिक ईमेल:' : 'Official Email:'}</strong>
                <span className="text-cyan-300 font-mono text-[11px]">{selectedInst.contactEmail}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2.5 pt-1">
              <button
                onClick={() => setSelectedInst(null)}
                className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 px-4 py-2 rounded-xl text-xs font-bold transition border border-blue-400/30"
              >
                {language === 'hi' ? 'बंद करें' : language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
              <button
                onClick={() => {
                  alert(language === 'hi' ? 'संस्थान विस्तृत ऑडिट रिपोर्ट डाउनलोड हो रही है...' : 'Downloading full institution audit dossier...');
                  setSelectedInst(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-sm transition"
              >
                {language === 'hi' ? 'पूर्ण ऑडिट डाउनलोड करें' : 'Download Complete Dossier'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Dossier Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400" />
                {t.btnExportDossier || 'Export State Compliance Dossier'}
              </h3>
              <button onClick={() => setShowExportModal(false)} className="text-blue-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-blue-200 leading-normal">
              {language === 'hi'
                ? 'झारखंड राज्य के सभी मान्यता प्राप्त संस्थानों का समग्र सुगमता स्कोर, आरपीडब्ल्यूडी अनुपालन रिपोर्ट एवं सुधार योजना निर्यात करें।'
                : 'Export comprehensive macro-level accessibility evaluations, RPWD Section 16 compliance ratings, and corrective actions across Jharkhand.'}
            </p>

            <div className="space-y-2">
              {[
                { format: 'PDF Document (.pdf)', desc: 'Official formatted report with regional charts and seals', icon: '📄' },
                { format: 'CSV Spreadsheet (.csv)', desc: 'Raw tabular metrics for data analysis and government filing', icon: '📊' },
                { format: 'JSON Data Package (.json)', desc: 'Machine readable API export for National PwD Portal sync', icon: '⚙️' },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    alert(`Exporting dossier in ${item.format}...`);
                    setShowExportModal(false);
                  }}
                  className="p-3 bg-[#081a3b] hover:bg-[#123366] border border-blue-400/20 hover:border-cyan-400/50 rounded-xl cursor-pointer transition flex items-center gap-2.5"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <span className="font-bold text-white text-xs block">{item.format}</span>
                    <span className="text-[10px] text-blue-200">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowExportModal(false)}
              className="w-full bg-[#081a3b] hover:bg-[#123366] text-blue-200 text-xs font-bold py-2 rounded-xl border border-blue-400/30 transition"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {/* Statutory Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f2b5c] border border-rose-500/40 rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                {t.complianceIssueNotice || 'Issue Statutory RPwD Notice'}
              </h3>
              <button onClick={() => setShowNoticeModal(false)} className="text-blue-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-blue-200">
              <p>
                {language === 'hi'
                  ? 'यह नोटिस दिव्यांगजन अधिकार अधिनियम २०१६ की धारा १६ एवं १७ के तहत अनिवार्य सुधारात्मक कार्रवाई का निर्देश देता है।'
                  : 'This notice serves a mandatory statutory remediation directive under Section 16 & 17 of the RPwD Act 2016.'}
              </p>

              <div className="bg-[#081a3b] p-3 rounded-xl border border-rose-400/30 space-y-1.5">
                <span className="font-bold text-white block text-xs">{language === 'hi' ? 'लक्षित संस्थान:' : 'Target Institution:'}</span>
                <select
                  value={noticeTargetId}
                  onChange={(e) => setNoticeTargetId(e.target.value)}
                  className="w-full bg-[#051124] border border-blue-400/30 text-cyan-300 font-bold text-xs p-2 rounded-lg"
                >
                  {jharkhandMonitoredInstitutions
                    .filter((i) => i.status !== 'compliant')
                    .map((i) => (
                      <option key={i.id} value={i.id} className="bg-[#0f2b5c] text-white">
                        {i.name} ({i.code} - {i.overallScore}%)
                      </option>
                    ))}
                </select>
              </div>

              <div className="bg-[#051124] p-2.5 rounded-lg border border-blue-400/20 text-[10px] text-blue-300 space-y-0.5">
                <div>• Mandated response timeline: <strong>30 Days</strong></div>
                <div>• Required remediation: Wheelchair ramps, accessible courseware, exam scribes</div>
                <div>• Legal penalty clause: Section 89 RPwD Act statutory liability warning</div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                onClick={() => setShowNoticeModal(false)}
                className="flex-1 bg-[#081a3b] hover:bg-[#123366] text-blue-200 text-xs font-bold py-2 rounded-xl border border-blue-400/30 transition"
              >
                {language === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleDispatchNotice}
                disabled={noticeDispatched}
                className="flex-1 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs py-2 rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                {noticeDispatched ? (
                  <span>{language === 'hi' ? 'भेजा जा रहा है...' : 'Dispatching...'}</span>
                ) : (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'नोटिस जारी करें' : 'Dispatch Directive'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
