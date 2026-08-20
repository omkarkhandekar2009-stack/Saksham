'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { ArrowRight, X, Sparkles, User, ShieldCheck, FileCheck, Building2, BrainCircuit, BarChart3 } from 'lucide-react';

const steps = [
  {
    step: 1,
    role: 'student' as const,
    title: 'Student Exam Accommodation Request',
    desc: 'Student Aarav Sharma (Visual Impairment) submits an accommodation request for extra time (40 mins) & certified physics scribe for upcoming board exams.',
    icon: User,
  },
  {
    step: 2,
    role: 'special_educator' as const,
    title: 'Special Educator Case Evaluation & IEP Review',
    desc: 'Special Educator verifies disability percentage (75%) and attaches approved Individualized Education Plan (IEP-2026).',
    icon: ShieldCheck,
  },
  {
    step: 3,
    role: 'examination_coordinator' as const,
    title: 'Exam Coordinator Scribe Allocation',
    desc: 'Exam Coordinator approves extra time and assigns verified Physics postgraduate scribe (Vikram Mehta) with invigilator instructions.',
    icon: FileCheck,
  },
  {
    step: 4,
    role: 'institution_admin' as const,
    title: 'Institution Accessibility Audit Update',
    desc: 'Institution Admin verifies wheelchair ramp and tactile path installation, updating institution audit score from 82% to 91%.',
    icon: Building2,
  },
  {
    step: 5,
    role: 'ai' as const,
    title: 'AI Gap Detection & Resource Prediction',
    desc: 'INCLUDE360 AI Engine detects 28 upcoming scribe demands in Mumbai district and suggests auto-allocating 12 volunteer scribes.',
    icon: BrainCircuit,
  },
  {
    step: 6,
    role: 'district_officer' as const,
    title: 'District & Government Authority Aggregated Dashboard',
    desc: 'District Education Officer views aggregated institution compliance scores, high-risk flags, and district-wide accessibility trends.',
    icon: BarChart3,
  },
];

export const DemoFlowModal: React.FC = () => {
  const { demoFlowStep, setDemoFlowStep, setRole } = useAppStore();

  if (!demoFlowStep) return null;

  const currentStepData = steps.find((s) => s.step === demoFlowStep) || steps[0];

  const handleNext = () => {
    if (demoFlowStep < steps.length) {
      const next = demoFlowStep + 1;
      setDemoFlowStep(next);
      const nextRole = steps.find((s) => s.step === next)?.role;
      if (nextRole && nextRole !== 'ai') {
        setRole(nextRole);
      }
    } else {
      setDemoFlowStep(null);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-lg w-full bg-[#0f2b5c] border-2 border-cyan-400 rounded-3xl shadow-2xl p-5 text-white animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-blue-400/20 mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Hackathon Demo Scenario ({demoFlowStep}/{steps.length})
          </span>
        </div>
        <button
          onClick={() => setDemoFlowStep(null)}
          className="text-blue-300 hover:text-white p-1"
          aria-label="Close demo walkthrough"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start gap-3 my-2">
        <div className="p-3 bg-[#081a3b] border border-cyan-400/30 rounded-2xl text-cyan-400 shrink-0">
          <currentStepData.icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white">{currentStepData.title}</h4>
          <p className="text-xs text-blue-100 mt-1 leading-relaxed">{currentStepData.desc}</p>
        </div>
      </div>

      {/* Progress step dots */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-blue-400/20">
        <div className="flex items-center gap-1.5">
          {steps.map((s) => (
            <div
              key={s.step}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                s.step === demoFlowStep
                  ? 'bg-cyan-400 ring-4 ring-cyan-400/30'
                  : s.step < demoFlowStep
                  ? 'bg-emerald-400'
                  : 'bg-[#081a3b]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition"
        >
          {demoFlowStep === steps.length ? 'Finish Walkthrough' : 'Next Step'}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
