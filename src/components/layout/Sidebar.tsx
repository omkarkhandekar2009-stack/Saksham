'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { i18n } from '@/lib/i18n';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  HeartHandshake,
  FileCheck2,
  Building2,
  Scale,
  ShieldCheck,
  Landmark,
  AlertOctagon,
  Sparkles,
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
  Clock,
  User,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment =
    currentRole === 'government' ||
    currentRole === 'government_authority' ||
    currentRole === 'district_officer' ||
    currentRole === 'super_admin';

  // Build role-appropriate navigation structure
  let navItems = [];

  if (isProfessional) {
    // Accessibility Support Professional Navigation
    navItems = [
      { label: language === 'hi' ? 'डैशबोर्ड' : language === 'mr' ? 'डॅशबोर्ड' : 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: language === 'hi' ? 'सहायता अनुरोध' : language === 'mr' ? 'मदत विनंत्या' : 'Support Requests', href: '/professional/requests', icon: FileCheck2 },
      { label: language === 'hi' ? 'मेरे असाइनमेंट' : language === 'mr' ? 'माझे असाइनमेंट' : 'My Assignments', href: '/professional/assignments', icon: Calendar },
      { label: language === 'hi' ? 'उपलब्धता व समय' : language === 'mr' ? 'उपलब्धता व वेळापत्रक' : 'Availability & Schedule', href: '/professional/schedule', icon: Clock },
      { label: language === 'hi' ? 'मेरी प्रोफाइल' : language === 'mr' ? 'माझे प्रोफाइल' : 'My Profile', href: '/professional/profile', icon: User },
      { label: language === 'hi' ? 'प्रमाणपत्र व योग्यता' : language === 'mr' ? 'प्रमाणपत्रे व पात्रता' : 'Certifications', href: '/professional/certifications', icon: Award },
    ];
  } else if (isStudent) {
    // Student prioritized navigation (9 standard modules)
    navItems = [
      { label: t.navHome || t.navDashboard || 'Home', href: '/dashboard', icon: LayoutDashboard },
      { label: t.navMyProfile || 'My Profile', href: '/students', icon: Users },
      { label: t.navLifecycle || 'Admissions & Careers', href: '/lifecycle', icon: GraduationCap },
      { label: t.navOpportunities || 'Jobs & Internships', href: '/opportunities', icon: Briefcase },
      { label: t.navLearning || 'Learn with AI', href: '/learning', icon: BookOpen },
      { label: t.navServices || 'Get Support', href: '/accessibility', icon: HeartHandshake },
      { label: t.navExams || 'Exam Support', href: '/examinations', icon: FileCheck2 },
      { label: t.navGovernance || 'Schemes & NGOs', href: '/governance', icon: ShieldCheck },
      { label: t.navConduct || 'Report an Issue', href: '/conduct', icon: AlertOctagon },
    ];

  } else if (isGovernment) {
    // Government / Regulatory Authority navigation
    navItems = [
      { label: t.navDashboard, href: '/dashboard', icon: LayoutDashboard },
      { label: t.navStudents, href: '/students', icon: Users },
      { label: t.navAudit, href: '/audit', icon: Building2 },
      { label: t.navCompliance, href: '/compliance', icon: Scale },
      { label: t.navGovernance, href: '/governance', icon: ShieldCheck },
      { label: t.navIssuesReported || 'Issues Reported', href: '/conduct', icon: AlertOctagon },
      { label: t.navAuthorities, href: '/authorities', icon: Landmark },
    ];
  } else {
    // College / Institution Staff navigation — NO Learn with AI, Compliance, Authority Analytics
    navItems = [
      { label: t.navHome || t.navDashboard || 'Home', href: '/dashboard', icon: LayoutDashboard },
      { label: t.navStudents || 'Students & Profiles', href: '/students', icon: Users },
      { label: t.navLifecycle || 'Admissions & Careers', href: '/lifecycle', icon: GraduationCap },
      { label: t.navSupportRequested || 'Support Requested', href: '/accessibility', icon: HeartHandshake },
      { label: t.navExams || 'Exam Support', href: '/examinations', icon: FileCheck2 },
      { label: t.navAudit || 'Institutional Audit', href: '/audit', icon: Building2 },
      { label: t.navGovernance || 'Schemes & NGOs', href: '/governance', icon: ShieldCheck },
      { label: t.navIssuesReported || 'Issues Reported', href: '/conduct', icon: AlertOctagon },
    ];
  }

  const roleLabel = isProfessional
    ? (language === 'hi' ? 'विशेषज्ञ दृश्य' : language === 'mr' ? 'विशेषज्ञ दृश्य' : 'Professional View')
    : isStudent
    ? (language === 'hi' ? 'विद्यार्थी दृश्य' : language === 'mr' ? 'विद्यार्थी दृश्य' : 'Student View')
    : isGovernment
    ? (language === 'hi' ? 'प्राधिकरण दृश्य' : language === 'mr' ? 'प्राधिकरण दृश्य' : 'Authority View')
    : (language === 'hi' ? 'संस्थान दृश्य' : language === 'mr' ? 'संस्था दृश्य' : 'Institution View');

  return (
    <aside className="w-56 md:w-60 lg:w-64 bg-[#0c234a] border-r border-cyan-500/20 text-blue-100 flex flex-col justify-between p-3.5 lg:p-4 shrink-0 min-h-[calc(100vh-4rem)] shadow-xl z-10">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between px-2.5 mb-2.5">
            <h4 className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">
              Ecosystem Modules
            </h4>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#081a3b] text-cyan-200 border border-blue-400/20">
              {roleLabel}
            </span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-md border border-cyan-300/40'
                      : 'text-blue-200 hover:bg-[#123366] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-3 bg-[#081a3b] border border-cyan-500/30 rounded-2xl shadow-md">
        {!isStudent && !isProfessional && !isGovernment ? (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Jamshedpur Special Ed.</span>
            </div>
            <p className="text-[10px] text-blue-200 leading-tight">
              Jamshedpur Special Education &amp; Tech Inst. (JH-JSR-101)
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">UNESCO &amp; RPWD Aligned</span>
            </div>
            <p className="text-[10px] text-blue-200 leading-tight">
              Inclusive Education &amp; Governance Gateway active across Jharkhand districts.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
