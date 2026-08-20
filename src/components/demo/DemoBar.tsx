'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Role } from '@/types';
import { Play, UserCheck } from 'lucide-react';

const roleLabels: Record<Role, string> = {
  student: '1. Student',
  parent: '2. Parent / Guardian',
  teacher: '3. Class Teacher',
  special_educator: '4. Special Educator',
  counselor: '5. School Counselor',
  accessibility_coordinator: '6. Accessibility Coordinator',
  examination_coordinator: '7. Exam Coordinator',
  institution_admin: '8. Institution Admin',
  principal: '9. Principal / Head',
  support_staff: '10. Support Staff',
  it_admin: '11. IT Admin',
  auditor: '12. Accessibility Auditor',
  district_officer: '13. District Officer',
  government_authority: '14. Govt Education Authority',
  super_admin: '15. Super Admin',
};

export const DemoBar: React.FC = () => {
  const { currentRole, setRole, setDemoFlowStep } = useAppStore();

  return (
    <div className="bg-[#0a1f42] text-white px-4 py-2 border-b border-cyan-500/30 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs z-40">
      <div className="flex items-center gap-2">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 px-2.5 py-0.5 rounded font-black tracking-wider uppercase text-[10px] shadow-sm">
          SIH1500 Hackathon Demo Mode
        </span>
        <span className="hidden md:inline text-cyan-200">
          Switch role instantly to test all 15 RBAC permission views:
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto py-0.5 max-w-2xl no-scrollbar">
        <label className="text-blue-200 font-semibold flex items-center gap-1 shrink-0">
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          Active Role:
        </label>
        <select
          value={currentRole}
          onChange={(e) => setRole(e.target.value as Role)}
          className="bg-[#0f2b5c] text-cyan-200 border border-cyan-400/50 rounded-lg px-2.5 py-1 font-bold text-xs focus:ring-2 focus:ring-cyan-400 outline-none cursor-pointer"
        >
          {Object.entries(roleLabels).map(([roleKey, label]) => (
            <option key={roleKey} value={roleKey} className="bg-[#0f2b5c] text-white">
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setDemoFlowStep(1)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1 rounded-lg flex items-center gap-1.5 transition shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Guided Demo Flow
        </button>
      </div>
    </div>
  );
};
