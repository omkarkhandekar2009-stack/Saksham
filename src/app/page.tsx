'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber, localizePercent } from '@/lib/i18n';
import {
  Shield,
  Users,
  Building2,
  Scale,
  BrainCircuit,
  FileCheck2,
  ArrowRight,
  Monitor,
  Eye,
  LogIn,
} from 'lucide-react';

export default function HomePage() {
  const { language, isAuthenticated, currentRole, mounted } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const getDashboardRoute = (): string => {
    if (!isAuthenticated) return '/auth/login';
    switch (currentRole) {
      case 'government':
      case 'government_authority':
      case 'district_officer':
      case 'super_admin':
        return '/authorities';
      case 'accessibility_professional':
      case 'professional':
        return '/professional/requests';
      case 'institution_staff':
      case 'institution_admin':
      case 'special_educator':
      case 'accessibility_coordinator':
      case 'examination_coordinator':
      case 'principal':
      case 'support_staff':
      case 'it_admin':
      case 'counselor':
      case 'auditor':
      case 'teacher':
        return '/dashboard';
      case 'student':
      case 'parent':
      default:
        return '/dashboard';
    }
  };

  const dashboardHref = mounted && isAuthenticated ? getDashboardRoute() : '/auth/login';

  const roleNames = [
    t.homeRole1 || '1. Student',
    t.homeRole2 || '2. Parent / Guardian',
    t.homeRole3 || '3. Class Teacher',
    t.homeRole4 || '4. Special Educator',
    t.homeRole5 || '5. School Counselor',
    t.homeRole6 || '6. Accessibility Coord.',
    t.homeRole7 || '7. Exam Coordinator',
    t.homeRole8 || '8. Institution Admin',
    t.homeRole9 || '9. Principal / Head',
    t.homeRole10 || '10. Support Staff',
    t.homeRole11 || '11. IT Administrator',
    t.homeRole12 || '12. Accessibility Auditor',
    t.homeRole13 || '13. District Officer',
    t.homeRole14 || '14. Govt Authority',
    t.homeRole15 || '15. Super Administrator',
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* 1. STANDALONE PUBLIC HEADER */}
      <header className="bg-[#051124] border-b border-blue-900/40 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-500 p-0.5 shadow-md group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#081a3b] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-white">
                  Sak<span className="text-cyan-300">sham</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-blue-200">
            <a href="#problem" className="hover:text-white transition">{t.homeNavAbout || 'About'}</a>
            <a href="#lifecycle" className="hover:text-white transition">{t.homeNavLearners || 'Learners'}</a>
            <a href="#roles" className="hover:text-white transition">{t.homeNavEducators || 'Educators'}</a>
            <a href="#pillars" className="hover:text-white transition">{t.homeNavInstitutions || 'Institutions'}</a>
            <a href="#problem" className="hover:text-white transition">{t.homeNavResources || 'Resources'}</a>
            <a href="#pillars" className="hover:text-white transition">{t.homeNavContact || 'Contact Us'}</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="bg-[#081a3b] hover:bg-[#123366] text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-blue-400/30 transition flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.homeNavLogin || 'Login'}</span>
            </Link>
            <Link
              href={dashboardHref}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-black px-4 sm:px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 transform hover:-translate-y-0.5"
            >
              <span>{t.homeNavExploreDashboard || 'Explore Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. FULL-WIDTH HERO SECTION (INTEGRATED CLASSROOM BACKGROUND) */}
      <section className="relative w-full bg-[#051124] overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[position:80%_center] sm:bg-[position:right_center]"
          style={{ backgroundImage: "url('/hero-classroom.png')" }}
          role="img"
          aria-label="Inclusive Indian classroom with teacher assisting specially-abled students reading books, using braille device and in wheelchair"
        />

        {/* Navy Gradient Overlay for pristine text readability on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#051124] via-[#051124]/90 sm:via-[#051124]/75 md:via-[#051124]/65 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051124]/70 via-transparent to-[#051124]/30 pointer-events-none sm:hidden" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              {t.homeHeroTitle1 || 'Education'}<br />
              {t.homeHeroTitle2 || 'Without Barriers'}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-blue-100/90 font-normal leading-relaxed max-w-lg">
              {t.homeHeroSubtitle || 'One inclusive platform for every learner.'}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <Link
                href={dashboardHref}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-sm transition transform hover:-translate-y-0.5"
              >
                <span>{t.homeHeroBtnPrimary || 'Explore Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#problem"
                className="bg-[#081a3b]/60 hover:bg-white/10 text-white border border-white/25 hover:border-white/40 font-semibold px-6 py-3.5 rounded-xl text-sm transition flex items-center gap-2 backdrop-blur-xs"
              >
                <span>{t.homeHeroBtnSecondary || 'Learn More'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN EXPANSIVE CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* 3. REAL-TIME PLATFORM STATISTICS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: t.homeStatStudentsLabel || 'Specially Abled Students Active',
              value: `${localizeNumber('569', language)}+`,
              sub: t.homeStatStudentsSub || 'UDID Verified Across 5 Districts',
              icon: Users,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              label: t.homeStatInstLabel || 'Monitored Inclusive Institutions',
              value: localizeNumber('8', language),
              sub: t.homeStatInstSub || 'Schools, Colleges & Academies',
              icon: Building2,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
            },
            {
              label: t.homeStatCompLabel || 'State Compliance Average',
              value: localizePercent('88.4', language),
              sub: t.homeStatCompSub || 'RPWD Act & WHODAS 2.0 Standard',
              icon: Scale,
              color: 'text-teal-600',
              bg: 'bg-teal-50',
            },
            {
              label: t.homeStatScribeLabel || 'Exam Scribe Fulfillment',
              value: localizePercent('98', language),
              sub: t.homeStatScribeSub || 'Zero Bottleneck Guarantee',
              icon: FileCheck2,
              color: 'text-indigo-600',
              bg: 'bg-indigo-50',
            },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">{stat.sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* 4. PROBLEM STATEMENT & UNESCO 2019 CRISIS DATA */}
        <section id="problem" className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold px-3 py-0.5 rounded-full">
              {t.homeProblemBadge || 'The Critical Challenge in Indian Education'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {t.homeProblemTitle || 'Why Inclusive Education Governance is Urgent'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t.homeProblemSub || 'Data insights cited from the UNESCO State of the Education Report for India & WHO WHODAS 2.0 Standards.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="text-4xl font-black text-rose-600">{t.homeProblemCard1Val || '27%'}</div>
              <div className="font-bold text-base text-slate-900">{t.homeProblemCard1Title || 'Left Out of the School System'}</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homeProblemCard1Desc || 'According to UNESCO 2019, 27% of disabled children aged 5-19 years in India do not have access to any educational institution.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="text-4xl font-black text-amber-600">{t.homeProblemCard2Val || '3/4th'}</div>
              <div className="font-bold text-base text-slate-900">{t.homeProblemCard2Title || '5-Year-Olds Excluded Early'}</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homeProblemCard2Desc || 'Nearly 75% of five-year-old specially-abled children are left out, with girls facing significantly higher deprivation rates.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="text-4xl font-black text-blue-600">{t.homeProblemCard3Val || '1 Billion+'}</div>
              <div className="font-bold text-base text-slate-900">{t.homeProblemCard3Title || 'World Population with Special Needs'}</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homeProblemCard3Desc || 'WHO states 15% of the global population is differently abled. Without systemic digital-physical tools, architectural barriers persist.'}
              </p>
            </div>
          </div>
        </section>

        {/* 5. THE 4-STAGE STUDENT LIFECYCLE (HOW SAKSHAM WORKS) */}
        <section id="lifecycle" className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full">
              {t.homeLifecycleBadge || 'Complete Education-to-Employment Pipeline'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.homeLifecycleTitle || 'How Saksham Empowers Students'}
            </h2>
            <p className="text-xs text-slate-500">
              {t.homeLifecycleSub || 'From admission intake to classroom learning, examination accommodations, and affirmative-action career placement.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                {localizeNumber(1, language)}
              </span>
              <h3 className="font-bold text-lg text-slate-900">{t.homeLifecycleStep1Title || 'Inclusive Intake'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homeLifecycleStep1Desc || 'Automated Swavlamban UDID card validation & 5% RPWD Section 32 Course Quota seat allocation into regular mainstream classes.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                {localizeNumber(2, language)}
              </span>
              <h3 className="font-bold text-lg text-slate-900">{t.homeLifecycleStep2Title || 'Adaptive Learning'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homeLifecycleStep2Desc || 'AI Concept Simplifiers, Text-to-Speech audio lessons, OpenDyslexic font modes & customized Individualized Education Plans (IEP).'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                {localizeNumber(3, language)}
              </span>
              <h3 className="font-bold text-lg text-slate-900">{t.homeLifecycleStep3Title || 'Fair Examinations'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homeLifecycleStep3Desc || 'RPWD statutory 20 mins/hour compensatory extra time calculator, certified postgraduate scribe matching, and invigilator guidelines.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                {localizeNumber(4, language)}
              </span>
              <h3 className="font-bold text-lg text-slate-900">{t.homeLifecycleStep4Title || 'Affirmative Career'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homeLifecycleStep4Desc || 'Direct connection to verified RPWD Section 34 Affirmative Action public and private sector jobs with guaranteed accommodations.'}
              </p>
            </div>
          </div>
        </section>

        {/* 6. CORE PILLARS GRID */}
        <section id="pillars" className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-0.5 rounded-full">
              {t.homePillarsBadge || 'Enterprise Technology Architecture'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {t.homePillarsTitle || 'The 4 Pillars of Saksham'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t.homePillarsSub || 'Combining hybrid digital-physical gateways with artificial intelligence and strict legal governance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.homePillar1Title || '1. WCAG 2.1 AAA Universal Accessibility'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homePillar1Desc || 'Native Web Speech Text-to-Speech synthesizer (Alt+R), high-contrast presets (Yellow-on-Black), OpenDyslexic font toggles, 100-200% font scaling, and English/Hindi/Marathi regional language switches.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.homePillar2Title || '2. Statutory Compliance & Audit Engine'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homePillar2Desc || 'Automated legal compliance monitoring for the Rights of Persons with Disabilities (RPWD) Act 2016 (Sections 16 & 17), UGC Guidelines, and Chief Commissioner of Disabilities infrastructure checklists.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl w-fit">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.homePillar3Title || '3. AI Accessibility & Scribe Forecasting'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homePillar3Desc || 'Predictive AI models analyzing upcoming semester exams across districts to forecast exam scribe demands, prevent shortages, and generate automated Plain Language Concept Summaries.'}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.homePillar4Title || '4. Hybrid Physical Campus Digital Kiosks'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.homePillar4Desc || 'Dedicated touch & voice-guided campus kiosks with large touch targets, automated audio prompts, fast scribe booking, and an instant Emergency Transit Assistance beacon for wheelchair escorts.'}
              </p>
            </div>
          </div>
        </section>

        {/* 7. 15-ROLE ECOSYSTEM DIRECTORY */}
        <section id="roles" className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                {t.homeRolesTitle || '15 Connected Stakeholder Roles'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t.homeRolesSub || 'Every stakeholder receives role-tailored views, action items, and data privileges.'}
              </p>
            </div>
            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <span>{t.homeRolesBtn || 'Sign In to Role Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            {roleNames.map((roleName, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-slate-800 text-center hover:bg-blue-50 hover:border-blue-300 transition">
                {roleName}
              </div>
            ))}
          </div>
        </section>

        {/* 8. CALL TO ACTION BANNER */}
        <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            {t.homeCtaTitle || 'Ready to Enter the Inclusive Education Operating System?'}
          </h2>
          <p className="text-blue-200 text-sm max-w-2xl mx-auto leading-relaxed">
            {t.homeCtaSub || 'Sign in using your Swavlamban UDID card, staff email, or Government Single Sign-On (MeriPehchaan).'}
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link
              href="/auth/login"
              className="bg-white text-blue-900 font-black px-8 py-3.5 rounded-2xl text-sm shadow-lg hover:bg-blue-50 transition"
            >
              {t.homeCtaBtn1 || 'Sign In to Ecosystem'}
            </Link>
            <Link
              href={dashboardHref}
              className="bg-blue-900/60 hover:bg-blue-900 text-white font-bold px-6 py-3.5 rounded-2xl border border-blue-400/40 text-sm transition"
            >
              {t.homeCtaBtn2 || 'Explore Live Dashboard'}
            </Link>
          </div>
        </section>

        {/* 9. GOVERNMENT & INSTITUTIONAL FOOTER */}
        <footer className="bg-white border border-slate-200 rounded-3xl p-8 text-xs text-slate-500 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="font-black text-slate-900 text-base flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-600" />
                Sak<span className="text-blue-600">sham</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t.homeFooterTagline || 'AI-Powered Inclusive Education, Student Accessibility & Legal Governance Ecosystem.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{t.homeFooterFrameworksTitle || 'Statutory Frameworks'}</div>
              <ul className="space-y-1 text-[11px]">
                <li>{t.homeFooterFw1 || '• RPWD Act 2016 (Sec 16, 17, 32, 34)'}</li>
                <li>{t.homeFooterFw2 || '• UGC Accessibility Guidelines'}</li>
                <li>{t.homeFooterFw3 || '• NEP 2020 Inclusive Mandates'}</li>
                <li>{t.homeFooterFw4 || '• WHODAS 2.0 Disability Standards'}</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{t.homeFooterNavTitle || 'Quick Navigation'}</div>
              <ul className="space-y-1 text-[11px]">
                <li><Link href="/auth/login" className="hover:text-blue-600">{t.homeFooterNav1 || 'Unified Sign In Portal'}</Link></li>
                <li><Link href={dashboardHref} className="hover:text-blue-600">{t.homeFooterNav2 || 'Role-Based Dashboard'}</Link></li>
                <li><Link href="/lifecycle" className="hover:text-blue-600">{t.homeFooterNav3 || 'Student Intake & Placements'}</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{t.homeFooterComplianceTitle || 'Accessibility Compliance'}</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t.homeFooterComplianceText || 'Compliant with WCAG 2.1 Level AAA guidelines. Includes native screen reading, high-contrast modes, OpenDyslexic font, and multilingual voice navigation.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <div>{t.homeFooterCopyright || '© 2026 Saksham. All rights reserved.'}</div>
            <div className="text-emerald-700 font-bold">{t.homeFooterBadge || '100% Inclusive • Accessible • Compliant'}</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
