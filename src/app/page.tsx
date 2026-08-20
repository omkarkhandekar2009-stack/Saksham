'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Sparkles,
  Users,
  Building2,
  Scale,
  BrainCircuit,
  FileCheck2,
  ArrowRight,
  Monitor,
  Eye,
  Award,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  Lock,
  GraduationCap,
  Briefcase,
  AlertTriangle,
  Volume2,
  BarChart3,
  HelpCircle,
  LogIn,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* 1. STANDALONE PUBLIC HEADER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 p-0.5 shadow-md group-hover:scale-105 transition">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-wider text-slate-900">
                  INCLUDE<span className="text-blue-600">360</span>
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  SIH1500
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                AI-Powered Inclusive Education & Governance Ecosystem
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
            <a href="#problem" className="hover:text-blue-600 transition">UNESCO Crisis Data</a>
            <a href="#lifecycle" className="hover:text-blue-600 transition">4-Stage Lifecycle</a>
            <a href="#pillars" className="hover:text-blue-600 transition">Core Pillars</a>
            <a href="#roles" className="hover:text-blue-600 transition">15-Role Network</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/kiosk"
              className="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 transition"
            >
              <Monitor className="w-4 h-4 text-blue-600" />
              Campus Kiosk
            </Link>

            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 transform hover:-translate-y-0.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Launch</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN EXPANSIVE CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        {/* 2. HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-emerald-50 border border-slate-200 p-8 sm:p-16 shadow-xl text-center md:text-left">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100/70 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Smart India Hackathon • National Problem Statement SIH1500</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Inclusive Education Without{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600">
                Barriers.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl">
              <strong>INCLUDE360</strong> is an AI-powered national operating system connecting specially abled students, parents, teachers, accessibility coordinators, institutions, and government authorities for seamless conduct, legal compliance, and holistic education-to-career governance.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <Link
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl shadow-lg flex items-center gap-2 text-base transition transform hover:-translate-y-0.5"
              >
                <span>Get Started / Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/dashboard"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-2xl shadow-md flex items-center gap-2 text-sm transition"
              >
                <Shield className="w-4 h-4" />
                <span>Live System Dashboard</span>
              </Link>

              <Link
                href="/kiosk"
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-4 rounded-2xl border border-slate-300 flex items-center gap-2 text-sm transition shadow-xs"
              >
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>Digital Campus Kiosk</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. REAL-TIME PLATFORM STATISTICS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Specially Abled Students Active', value: '500+', sub: 'UDID Verified Across 5 Districts', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Monitored Inclusive Institutions', value: '12', sub: 'Schools, Colleges & Academies', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'State Compliance Average', value: '89.4%', sub: 'RPWD Act & WHODAS 2.0 Standard', icon: Scale, color: 'text-teal-600', bg: 'bg-teal-50' },
            { label: 'Exam Scribe Fulfillment', value: '98%', sub: 'Zero Bottleneck Guarantee', icon: FileCheck2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
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
              The Critical Challenge in Indian Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Why Inclusive Education Governance is Urgent
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Data insights cited from the UNESCO State of the Education Report for India & WHO WHODAS 2.0 Standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="text-4xl font-black text-rose-600">27%</div>
              <div className="font-bold text-base text-slate-900">Left Out of the School System</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                According to UNESCO 2019, 27% of disabled children aged 5-19 years in India do not have access to any educational institution.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="text-4xl font-black text-amber-600">3/4th</div>
              <div className="font-bold text-base text-slate-900">5-Year-Olds Excluded Early</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nearly 75% of five-year-old specially-abled children are left out, with girls facing significantly higher deprivation rates.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="text-4xl font-black text-blue-600">1 Billion+</div>
              <div className="font-bold text-base text-slate-900">World Population with Special Needs</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                WHO states 15% of the global population is differently abled. Without systemic digital-physical tools, architectural barriers persist.
              </p>
            </div>
          </div>
        </section>

        {/* 5. THE 4-STAGE STUDENT LIFECYCLE (HOW INCLUDE360 WORKS) */}
        <section id="lifecycle" className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full">
              Complete Education-to-Employment Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How INCLUDE360 Empowers Students
            </h2>
            <p className="text-xs text-slate-500">
              From admission intake to classroom learning, examination accommodations, and affirmative-action career placement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </span>
              <h3 className="font-bold text-lg text-slate-900">Inclusive Intake</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated Swavlamban UDID card validation & 5% RPWD Section 32 Course Quota seat allocation into regular mainstream classes.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </span>
              <h3 className="font-bold text-lg text-slate-900">Adaptive Learning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                AI Concept Simplifiers, Text-to-Speech audio lessons, OpenDyslexic font modes & customized Individualized Education Plans (IEP).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </span>
              <h3 className="font-bold text-lg text-slate-900">Fair Examinations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                RPWD statutory 20 mins/hour compensatory extra time calculator, certified postgraduate scribe matching, and invigilator guidelines.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                4
              </span>
              <h3 className="font-bold text-lg text-slate-900">Affirmative Career</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct connection to verified RPWD Section 34 Affirmative Action public and private sector jobs with guaranteed accommodations.
              </p>
            </div>
          </div>
        </section>

        {/* 6. CORE PILLARS GRID */}
        <section id="pillars" className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-0.5 rounded-full">
              Enterprise Technology Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              The 4 Pillars of INCLUDE360
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Combining hybrid digital-physical gateways with artificial intelligence and strict legal governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. WCAG 2.1 AAA Universal Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Native Web Speech Text-to-Speech synthesizer (Alt+R), high-contrast presets (Yellow-on-Black), OpenDyslexic font toggles, 100-200% font scaling, and English/Hindi/Marathi regional language switches.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Statutory Compliance & Audit Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated legal compliance monitoring for the Rights of Persons with Disabilities (RPWD) Act 2016 (Sections 16 & 17), UGC Guidelines, and Chief Commissioner of Disabilities infrastructure checklists.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl w-fit">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. AI Accessibility & Scribe Forecasting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Predictive AI models analyzing upcoming semester exams across districts to forecast exam scribe demands, prevent shortages, and generate automated Plain Language Concept Summaries.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">4. Hybrid Physical Campus Digital Kiosks</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated touch & voice-guided campus kiosks with large touch targets, automated audio prompts, fast scribe booking, and an instant Emergency Transit Assistance beacon for wheelchair escorts.
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
                15 Connected Stakeholder Roles
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Every stakeholder receives role-tailored views, action items, and data privileges.
              </p>
            </div>
            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <span>Sign In to Role Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            {[
              '1. Student',
              '2. Parent / Guardian',
              '3. Class Teacher',
              '4. Special Educator',
              '5. School Counselor',
              '6. Accessibility Coord.',
              '7. Exam Coordinator',
              '8. Institution Admin',
              '9. Principal / Head',
              '10. Support Staff',
              '11. IT Administrator',
              '12. Accessibility Auditor',
              '13. District Officer',
              '14. Govt Authority',
              '15. Super Administrator',
            ].map((roleName, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-slate-800 text-center hover:bg-blue-50 hover:border-blue-300 transition">
                {roleName}
              </div>
            ))}
          </div>
        </section>

        {/* 8. CALL TO ACTION BANNER */}
        <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Enter the Inclusive Education Operating System?
          </h2>
          <p className="text-blue-200 text-sm max-w-2xl mx-auto leading-relaxed">
            Sign in using your Swavlamban UDID card, staff email, or Government Single Sign-On (MeriPehchaan).
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link
              href="/auth/login"
              className="bg-white text-blue-900 font-black px-8 py-3.5 rounded-2xl text-sm shadow-lg hover:bg-blue-50 transition"
            >
              Sign In to Ecosystem
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-900/60 hover:bg-blue-900 text-white font-bold px-6 py-3.5 rounded-2xl border border-blue-400/40 text-sm transition"
            >
              Explore Live Dashboard
            </Link>
          </div>
        </section>

        {/* 9. GOVERNMENT & INSTITUTIONAL FOOTER */}
        <footer className="bg-white border border-slate-200 rounded-3xl p-8 text-xs text-slate-500 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="font-black text-slate-900 text-base flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-600" />
                INCLUDE<span className="text-blue-600">360</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                AI-Powered Inclusive Education, Student Accessibility & Legal Governance Ecosystem. Built for Smart India Hackathon SIH1500.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">Statutory Frameworks</div>
              <ul className="space-y-1 text-[11px]">
                <li>• RPWD Act 2016 (Sec 16, 17, 32, 34)</li>
                <li>• UGC Accessibility Guidelines</li>
                <li>• NEP 2020 Inclusive Mandates</li>
                <li>• WHODAS 2.0 Disability Standards</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">Quick Navigation</div>
              <ul className="space-y-1 text-[11px]">
                <li><Link href="/auth/login" className="hover:text-blue-600">Unified Sign In Portal</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Role-Based Dashboard</Link></li>
                <li><Link href="/lifecycle" className="hover:text-blue-600">Student Intake & Placements</Link></li>
                <li><Link href="/kiosk" className="hover:text-blue-600">Campus Digital Kiosk</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">Accessibility Compliance</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Compliant with WCAG 2.1 Level AAA guidelines. Includes native screen reading, high-contrast modes, OpenDyslexic font, and multilingual voice navigation.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <div>&copy; 2026 INCLUDE360. All rights reserved. Smart India Hackathon.</div>
            <div className="text-emerald-700 font-bold">100% Inclusive • Accessible • Compliant</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
