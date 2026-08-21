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
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { language } = useAppStore();
  const t = i18n[language];

  const navItems = [
    { label: t.navDashboard, href: '/dashboard', icon: LayoutDashboard },
    { label: t.navLifecycle, href: '/lifecycle', icon: GraduationCap },
    { label: t.navStudents, href: '/students', icon: Users },
    { label: t.navLearning, href: '/learning', icon: BookOpen },
    { label: t.navServices, href: '/accessibility', icon: HeartHandshake },
    { label: t.navExams, href: '/examinations', icon: FileCheck2 },
    { label: t.navAudit, href: '/audit', icon: Building2 },
    { label: t.navCompliance, href: '/compliance', icon: Scale },
    { label: t.navGovernance, href: '/governance', icon: ShieldCheck },
    { label: t.navConduct, href: '/conduct', icon: AlertOctagon },
    { label: t.navAuthorities, href: '/authorities', icon: Landmark },
  ];

  return (
    <aside className="w-64 bg-[#0c234a] border-r border-cyan-500/20 text-blue-100 hidden lg:flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-4rem)] shadow-xl">
      <div className="space-y-6">
        <div>
          <h4 className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider px-3 mb-2">
            Ecosystem Modules
          </h4>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs transition ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-md border border-cyan-300/40'
                      : 'text-blue-200 hover:bg-[#123366] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-3.5 bg-[#081a3b] border border-cyan-500/30 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          UNESCO & RPWD Aligned
        </div>
        <p className="text-[11px] text-blue-200 leading-tight">
          Inclusive Education & Governance Gateway active across 5 districts.
        </p>
      </div>
    </aside>
  );
};
