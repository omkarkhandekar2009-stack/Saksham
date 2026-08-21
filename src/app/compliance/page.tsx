'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber, localizePercent } from '@/lib/i18n';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
  Filter,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function CompliancePage() {
  const { complianceRecords, currentRole, language } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const [filterStatus, setFilterStatus] = useState<'all' | 'compliant' | 'non_compliant'>('all');

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isGovernment =
    currentRole === 'government_authority' ||
    currentRole === 'district_officer' ||
    currentRole === 'super_admin';

  // If a student tries to access, provide clear privacy-oriented access guidance
  if (isStudent) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="bg-[#081a3b] text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {language === 'hi' ? 'संस्थागत प्रशासन मॉड्यूल' : language === 'mr' ? 'संस्थात्मक प्रशासन मॉड्यूल' : 'Institutional Administration Module'}
            </span>
            <h1 className="text-2xl font-black text-white">
              {language === 'hi' ? 'आंतरिक अनुपालन इंजन प्रतिबंधित है' : language === 'mr' ? 'अंतर्गत अनुपालन इंजिन प्रतिबंधित आहे' : 'Internal Compliance Engine Restricted'}
            </h1>
            <p className="text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
              {language === 'hi'
                ? 'वैधानिक अनुपालन प्रबंधन मॉड्यूल केवल संस्थान प्रशासकों एवं सरकारी विनियामक अधिकारियों हेतु आरक्षित है।'
                : language === 'mr'
                ? 'वैधानिक अनुपालन व्यवस्थापन मॉड्यूल केवळ संस्था प्रशासक आणि सरकारी नियामक अधिकाऱ्यांसाठी राखीव आहे.'
                : 'The statutory compliance management module is reserved for Institutional Administrators and Government Regulatory Officers to audit institutional infrastructure and legal filings.'}
            </p>
          </div>

          <div className="p-4 bg-[#081a3b] rounded-2xl border border-blue-400/20 text-xs text-left text-blue-200 space-y-2">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {language === 'hi' ? 'एक विद्यार्थी के रूप में आप क्या एक्सेस कर सकते हैं?' : language === 'mr' ? 'विद्यार्थी म्हणून आपण काय ॲक्सेस करू शकता?' : 'What can you access as a student?'}
            </div>
            <ul className="space-y-1 text-[11px] list-disc list-inside">
              <li>{language === 'hi' ? 'अपने विद्यार्थी प्रोफ़ाइल पर व्यक्तिगत सुगमता सुविधाएं देखें।' : language === 'mr' ? 'आपल्या विद्यार्थी प्रोफाईलवर वैयक्तिक सुलभता सवलती पहा.' : 'View your personal accessibility accommodations on your Learner Profile.'}</li>
              <li>{language === 'hi' ? 'सार्वजनिक प्राधिकरण विश्लेषण पर संस्था-स्तरीय सुगमता ट्रैक करें।' : language === 'mr' ? 'सार्वजनिक प्राधिकरण विश्लेषणावर संस्था-स्तरीय सुलभता ट्रॅक करा.' : 'Track institution-level aggregated accessibility on Public Authority Analytics.'}</li>
              <li>{language === 'hi' ? 'परीक्षा सहायता से लेखक व सहायक उपकरण का अनुरोध करें।' : language === 'mr' ? 'परीक्षा सहाय्यामधून लेखक आणि सहाय्यक उपकरणांची विनंती करा.' : 'Request exam scribes and assistive tools via Exam Accommodations.'}</li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
            >
              <span>{language === 'hi' ? 'डैशबोर्ड पर लौटें' : language === 'mr' ? 'डॅशबोर्डवर परत जा' : 'Return to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/authorities"
              className="bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-semibold px-5 py-2.5 rounded-xl text-xs transition"
            >
              {language === 'hi' ? 'सार्वजनिक पारदर्शिता डेटा देखें' : language === 'mr' ? 'सार्वजनिक पारदर्शकता डेटा पहा' : 'View Public Transparency Data'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isStaff = !isStudent && !isGovernment &&
    currentRole !== 'accessibility_professional' && currentRole !== 'professional';

  if (isStaff) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="bg-[#081a3b] text-rose-300 border border-rose-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {language === 'hi' ? 'सरकारी अधिकारी मॉड्यूल' : language === 'mr' ? 'सरकारी अधिकारी मॉड्यूल' : 'Government Authority Module'}
            </span>
            <h1 className="text-2xl font-black text-white">
              {language === 'hi' ? 'अनुपालन इंजन: केवल सरकारी अधिकारियों के लिए' : language === 'mr' ? 'अनुपालन इंजिन: केवळ सरकारी अधिकाऱ्यांसाठी' : 'Compliance Engine — Government Access Only'}
            </h1>
            <p className="text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
              {language === 'hi'
                ? 'वैधानिक अनुपालन निगरानी मॉड्यूल केवल सरकारी प्राधिकरण अधिकारियों के लिए है। संस्थान कर्मचारी अपने संस्थागत ऑडिट पोर्टल के माध्यम से स्व-रिपोर्टिंग कर सकते हैं।'
                : language === 'mr'
                ? 'वैधानिक अनुपालन देखरेख मॉड्यूल केवळ सरकारी प्राधिकरण अधिकाऱ्यांसाठी आहे. संस्था कर्मचारी संस्थात्मक ऑडिट पोर्टलद्वारे स्व-अहवाल देऊ शकतात.'
                : 'The statutory compliance monitoring module is reserved for Government Authority officers. Institution staff can perform self-reporting through the Institutional Audit portal.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/dashboard" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md flex items-center gap-1.5">
              <span>{language === 'hi' ? 'डैशबोर्ड पर लौटें' : language === 'mr' ? 'डॅशबोर्डवर परत जा' : 'Return to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/audit" className="bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-semibold px-5 py-2.5 rounded-xl text-xs transition">
              {language === 'hi' ? 'संस्थागत ऑडिट खोलें' : language === 'mr' ? 'संस्थात्मक ऑडिट उघडा' : 'Open Institutional Audit'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const compliantCount = complianceRecords.filter((r) => r.status === 'compliant').length;
  const nonCompliantCount = complianceRecords.filter((r) => r.status !== 'compliant').length;
  const totalCount = complianceRecords.length;

  const filteredRecords = complianceRecords.filter((cr) => {
    if (filterStatus === 'compliant') return cr.status === 'compliant';
    if (filterStatus === 'non_compliant') return cr.status !== 'compliant';
    return true;
  });

  return (
    <div className="space-y-8 py-2">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              {isGovernment ? (language === 'hi' ? 'वैधानिक विनियामक प्राधिकरण' : language === 'mr' ? 'वैधानिक नियामक प्राधिकरण' : 'Statutory Regulatory Authority') : (language === 'hi' ? 'संस्थागत अनुपालन इंजन' : language === 'mr' ? 'संस्थात्मक अनुपालन इंजिन' : 'Institutional Compliance Engine')}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              RPWD Act 2016 (Sec 16/17)
            </span>
            <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {language === 'hi' ? 'डेमो वातावरण • प्रोटोटाइप डेटा' : language === 'mr' ? 'डेमो वातावरण • प्रोटोटाइप डेटा' : 'Demo Environment • Prototype Data'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {t.complianceHeroTitle}
          </h1>
          <p className="text-xs text-blue-100">
            {language === 'hi'
              ? 'आरपीडब्ल्यूडी धारा १६ व १७, यूजीसी सुगमता दिशा-निर्देश एवं मुख्य आयुक्त दिव्यांगजन मानकों हेतु स्वचालित विधिक सत्यापन।'
              : language === 'mr'
              ? 'आरपीडब्ल्यूडी कलम १६ आणि १७, यूजीसी सुलभता मार्गदर्शक तत्त्वे आणि मुख्य आयुक्त दिव्यांगजन मानकांसाठी स्वयंचलित कायदेशीर पडताळणी.'
              : 'Automated legal verification for RPWD Section 16 & 17, UGC Accessibility Mandates, and Chief Commissioner for Persons with Disabilities norms.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(language === 'hi' ? 'सक्रिय सत्र हेतु अनुपालन ऑडिट चेकलिस्ट प्रारंभ की गई!' : language === 'mr' ? 'सक्रिय सत्रासाठी अनुपालन ऑडिट चेकलिस्ट सुरू केली!' : 'Verification audit checklist initiated for active semester!')}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:from-blue-500 hover:to-cyan-400 transition flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'hi' ? 'अनुपालन ऑडिट चलाएं' : language === 'mr' ? 'अनुपालन ऑडिट चालवा' : 'Run Compliance Audit'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Summary Statistics Card */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                {language === 'hi' ? 'अनुपालन स्थिति सारांश' : language === 'mr' ? 'अनुपालन स्थिती सारांश' : 'Compliance Status Summary'}
              </h3>
              <span className="text-[10px] text-cyan-300 font-mono">Q3 FY26</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 flex items-center justify-between">
                <div>
                  <span className="text-blue-200 font-semibold block">{language === 'hi' ? 'पूर्णतः अनुपालित अधिदेश' : language === 'mr' ? 'पूर्णतः अनुपालन केलेले आदेश' : 'Fully Compliant Mandates'}</span>
                  <span className="text-[10px] text-emerald-400">{language === 'hi' ? 'राज्य परीक्षकों द्वारा सत्यापित' : language === 'mr' ? 'राज्य परीक्षकांद्वारे सत्यापित' : 'Verified by State Auditors'}</span>
                </div>
                <span className="text-lg font-black text-emerald-400">{localizeNumber(compliantCount, language)} / {localizeNumber(totalCount, language)}</span>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 flex items-center justify-between">
                <div>
                  <span className="text-blue-200 font-semibold block">{language === 'hi' ? 'सुधारात्मक कार्रवाई लंबित' : language === 'mr' ? 'सुधारणा कृती प्रलंबित' : 'Pending Corrective Action'}</span>
                  <span className="text-[10px] text-amber-300">{language === 'hi' ? 'सक्रिय समाधान योजनाएं' : language === 'mr' ? 'सक्रिय निराकरण योजना' : 'Active Remediation Plans'}</span>
                </div>
                <span className="text-lg font-black text-amber-400">{localizeNumber(nonCompliantCount, language)}</span>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 flex items-center justify-between">
                <div>
                  <span className="text-blue-200 font-semibold block">{language === 'hi' ? 'औसत अनुपालन दर' : language === 'mr' ? 'सरासरी अनुपालन दर' : 'Average Compliance Rate'}</span>
                  <span className="text-[10px] text-cyan-300">{language === 'hi' ? '५ निगरानी जिले' : language === 'mr' ? '५ निरीक्षण जिल्हे' : '5 Monitored Districts'}</span>
                </div>
                <span className="text-lg font-black text-cyan-300">{localizePercent('89.4', language)}</span>
              </div>
            </div>

            {/* Compliance Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-semibold text-blue-200">
                <span>{language === 'hi' ? 'जिला अनुपालन प्रगति' : language === 'mr' ? 'जिल्हा अनुपालन प्रगती' : 'District Compliance Progress'}</span>
                <span className="text-emerald-400">{localizePercent('89.4', language)} {language === 'hi' ? 'लक्ष्य प्राप्त' : language === 'mr' ? 'ध्येय साध्य' : 'Target Met'}</span>
              </div>
              <div className="w-full h-2.5 bg-[#081a3b] rounded-full overflow-hidden border border-blue-400/20">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: '89.4%' }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#081a3b] border border-blue-400/20 rounded-2xl text-[11px] text-blue-200 flex items-start gap-2">
            <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              {language === 'hi'
                ? 'निरीक्षित परिसरों में सभी सुधारात्मक कदम वैधानिक ६०-दिवसीय नोटिस अवधि के भीतर हैं।'
                : language === 'mr'
                ? 'निरीक्षण केलेल्या परिसरांमध्ये सर्व सुधारणा पावले वैधानिक ६० दिवसांच्या नोटीस कालावधीत आहेत.'
                : 'All corrective measures across monitored campuses are within statutory 60-day notice periods.'}
            </span>
          </div>
        </div>

        {/* Compliance Mandates List */}
        <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                {language === 'hi' ? 'वैधानिक सुगमता जनादेश रजिस्टर' : language === 'mr' ? 'वैधानिक सुलभता आदेश नोंदवही' : 'Statutory Accessibility Mandate Register'}
              </h3>
              <p className="text-xs text-blue-200">
                {language === 'hi' ? 'सक्रिय निगरानी व कानूनी अनुपालन रिकॉर्ड' : language === 'mr' ? 'सक्रिय देखरेख आणि कायदेशीर अनुपालन नोंदी' : 'Active monitoring and legal compliance records'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-300 font-semibold">{t.btnFilter}:</span>
              <div className="bg-[#081a3b] border border-blue-400/30 p-1 rounded-xl flex gap-1">
                {(['all', 'compliant', 'non_compliant'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      filterStatus === st
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-blue-200 hover:text-white'
                    }`}
                  >
                    {st === 'all'
                      ? (language === 'hi' ? 'सभी' : language === 'mr' ? 'सर्व' : 'All')
                      : st === 'compliant'
                      ? t.statusCompliant
                      : (language === 'hi' ? 'गैर-अनुपालित' : language === 'mr' ? 'गैर-अनुपालन' : 'Non-Compliant')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-[#081a3b] border border-blue-400/20 hover:border-cyan-400/40 p-5 rounded-2xl space-y-3 transition shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{rec.institutionName}</span>
                    <span className="text-xs text-blue-300 font-mono">({(rec as any).district || 'Jharkhand'})</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      rec.status === 'compliant'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                    }`}
                  >
                    {rec.status === 'compliant' ? t.statusCompliant : (language === 'hi' ? 'गैर-अनुपालित' : language === 'mr' ? 'गैर-अनुपालन' : 'Non-Compliant')}
                  </span>
                </div>

                <p className="text-xs text-blue-100 leading-relaxed bg-[#051124] p-3 rounded-xl border border-blue-400/20">
                  <strong className="text-cyan-300">{language === 'hi' ? 'अधिदेश विवरण:' : language === 'mr' ? 'आदेश तपशील:' : 'Mandate:'}</strong> {rec.requirementTitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-blue-200">
                  <div>
                    <strong className="text-slate-400">{language === 'hi' ? 'ऑडिट तिथि:' : language === 'mr' ? 'ऑडिट तारीख:' : 'Audit Date:'}</strong>{' '}
                    <span className="text-white">{rec.verifiedAt || '2026-08-15'}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400">{language === 'hi' ? 'अंतिम सुधारात्मक तिथि:' : language === 'mr' ? 'अंतिम सुधारणा तारीख:' : 'Remediation Deadline:'}</strong>{' '}
                    <span className="text-amber-300">{rec.deadline || (rec as any).remediationDeadline || (language === 'hi' ? 'लागू नहीं' : language === 'mr' ? 'लागू नाही' : 'N/A')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
