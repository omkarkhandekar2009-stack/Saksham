'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
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
} from 'lucide-react';

export default function DashboardPage() {
  const {
    currentRole,
    students,
    serviceRequests,
    examAccommodations,
    audits,
    aiRecommendations,
  } = useAppStore();

  const activeStudent = students[0];
  const pendingRequests = serviceRequests.filter((s) => s.status === 'pending' || s.status === 'under_review');
  const activeExamAccommodations = examAccommodations.filter((e) => e.status === 'approved' || e.status === 'allocated');

  const [contentCheckText, setContentCheckText] = useState('');
  const [contentCheckResult, setContentCheckResult] = useState<string | null>(null);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const handleCheckContentAccessibility = () => {
    if (!contentCheckText.trim()) return;
    setContentCheckResult('Analyzing...');
    setTimeout(() => {
      setContentCheckResult(
        '✅ WCAG 2.1 AA Analysis:\n- Readability Score: Grade 8 (Optimal for inclusive learning)\n- Contrast: Pass\n- Suggested Improvement: Add alt text for embedded diagrams.'
      );
    }, 600);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-0.5 rounded-full capitalize">
              Role: {currentRole.replace('_', ' ')} Dashboard
            </span>
            <span className="text-xs text-slate-500">| System Status: Operational</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Inclusive Governance & Support Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time accessibility analytics, accommodation workflows & compliance monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/accessibility"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4" />
            New Accommodation Request
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Active Support Cases</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{students.length}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 100% Student Profiles Verified
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Pending Requests</span>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">{pendingRequests.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Requires coordinator approval</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Exam Scribe Allocations</span>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{activeExamAccommodations.length}</div>
          <div className="text-[11px] text-emerald-600 mt-1">Scribes & Extra Time Allocated</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Institution Audit Score</span>
            <div className="p-1.5 bg-teal-50 text-teal-600 rounded-lg">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-teal-600">{audits[0]?.overallScore}%</div>
          <div className="text-[11px] text-teal-600 mt-1">Grade A (High Accessibility)</div>
        </div>
      </div>

      {/* DEDICATED ROLE-SPECIFIC VIEWS */}

      {/* 1. STUDENT VIEW */}
      {currentRole === 'student' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  My Accessibility & Learning Profile
                </h3>
                <p className="text-xs text-slate-500">Student: {activeStudent.fullName} ({activeStudent.rollNumber})</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                IEP Approved
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-1">Disability Category</span>
                <span className="text-sm font-bold text-slate-900 capitalize">{activeStudent.accessibilityProfile.primaryCategory} ({activeStudent.disabilityPercentage}%)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-1">Learning Mode</span>
                <span className="text-sm font-bold text-emerald-700 capitalize">{activeStudent.accessibilityProfile.learningFormatPreference.replace(/_/g, ' ')}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-1">Attendance Rate</span>
                <span className="text-sm font-bold text-blue-700">96.4%</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-1">Exam Format</span>
                <span className="text-sm font-bold text-indigo-700 capitalize">{activeStudent.accessibilityProfile.examinationFormatPreference}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Active Classroom Accommodations:</h4>
              <div className="flex flex-wrap gap-2">
                {activeStudent.accessibilityProfile.classroomAccommodationsNeeded.map((acc, idx) => (
                  <span key={idx} className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {acc}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
              <Link href="/learning" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-md">
                <BookOpen className="w-4 h-4" /> Start Adaptive Learning
              </Link>
              <Link href="/accessibility" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 transition">
                <FileCheck2 className="w-4 h-4 text-blue-600" /> Request New Scribe / Device
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>My Support Requests</span>
              <Link href="/accessibility" className="text-xs text-blue-600 hover:underline">View All</Link>
            </h3>

            <div className="space-y-3">
              {serviceRequests.map((req) => (
                <div key={req.id} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-blue-700">{req.ticketNumber}</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full capitalize">
                      {req.status}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900">{req.title}</div>
                  <div className="text-[10px] text-slate-500">Type: {req.serviceType}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PARENT / GUARDIAN VIEW */}
      {currentRole === 'parent' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Child Academic & Inclusion Progress
                </h3>
                <p className="text-xs text-slate-500">Child: Aarav Sharma (Grade 11 - Science)</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                Support Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-1">Academic Performance</span>
                <span className="text-xl font-black text-emerald-700">88% (Grade A)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-1">Accommodation Status</span>
                <span className="text-xl font-black text-blue-700">4 Active</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-1">Attendance Record</span>
                <span className="text-xl font-black text-teal-700">96.4%</span>
              </div>
            </div>

            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Book Meeting with Special Educator / Counselor</h4>
              <p className="text-xs text-slate-600">Schedule one-on-one progress review session with Prof. Smita Joshi.</p>
              {appointmentBooked ? (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Consultation booked for 26 Aug 2026 at 3:00 PM!
                </div>
              ) : (
                <button
                  onClick={() => setAppointmentBooked(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation Slot
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">Teacher & Counselor Messages</h3>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-emerald-700">
                  <span>Prof. Smita Joshi</span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-slate-600">Aarav showed excellent progress using the NVDA screen reader during Physics lab.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-blue-700">
                  <span>Dr. Meena Iyer (Counselor)</span>
                  <span className="text-[10px] text-slate-400">3 days ago</span>
                </div>
                <p className="text-slate-600">Individualized Support Plan (ISP) review scheduled for next week.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TEACHER & SPECIAL EDUCATOR VIEW */}
      {(currentRole === 'teacher' || currentRole === 'special_educator') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Class Accessibility & Content Validator
                </h3>
                <p className="text-xs text-slate-500">Class: Grade 11 Science (Total: 45 Students | 4 Specially Abled)</p>
              </div>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                Matrix Active
              </span>
            </div>

            {/* Content Accessibility Checker */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                AI Content Accessibility Checker
              </h4>
              <textarea
                rows={3}
                value={contentCheckText}
                onChange={(e) => setContentCheckText(e.target.value)}
                placeholder="Paste lesson material or assignment text to test accessibility..."
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleCheckContentAccessibility}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition shadow-md"
              >
                Validate Content Accessibility
              </button>

              {contentCheckResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 whitespace-pre-line leading-relaxed">
                  {contentCheckResult}
                </div>
              )}
            </div>

            {/* Students List with Special Needs */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Specially Abled Students in Class:
              </h4>
              <div className="space-y-2">
                {students.map((s) => (
                  <div key={s.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{s.fullName}</span>
                      <span className="text-slate-500 ml-2">({s.rollNumber})</span>
                      <div className="text-[11px] text-emerald-700 capitalize">{s.accessibilityProfile.primaryCategory} (Accommodations: {s.accessibilityProfile.classroomAccommodationsNeeded.join(', ')})</div>
                    </div>
                    <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-lg border border-blue-200">
                      Score: {s.academicPerformanceScore}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">Intervention & IEP Actions</h3>
            <div className="space-y-3 text-xs">
              <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 space-y-2">
                <div className="font-bold text-amber-800 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Learning Gap Detected
                </div>
                <p className="text-slate-700">Diya Patil requires simplified diagram notation for Chemistry Chapter 4.</p>
                <button
                  onClick={() => alert('Intervention assigned to special educator queue!')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded-lg text-[11px] shadow-md"
                >
                  Create Remedial Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EXAMINATION COORDINATOR VIEW */}
      {currentRole === 'examination_coordinator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-600" />
                  Examination Duty & Scribe Roster
                </h3>
                <p className="text-xs text-slate-500">Allocated Scribes, Readers & Special Seating for Room 104 & 105</p>
              </div>
              <Link href="/examinations" className="text-xs font-bold text-blue-600 hover:underline">
                Full Matrix
              </Link>
            </div>

            <div className="space-y-3">
              {examAccommodations.map((ea) => (
                <div key={ea.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-blue-700">{ea.examName} ({ea.subjectCode})</span>
                    <span className="text-emerald-700">+{ea.extraTimeMinutes} Mins Extra Time</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>Student: <span className="text-slate-900 font-semibold">{ea.studentName}</span></div>
                    <div>Assigned Scribe: <span className="text-emerald-700 font-semibold">{ea.scribeAssignedName || 'Pending'}</span></div>
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium">{ea.invigilatorNotes}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">Duty Instructions Generator</h3>
            <p className="text-xs text-slate-600">Print or email invigilator accommodation compliance packets for upcoming exams.</p>
            <button
              onClick={() => alert('Invigilator compliance instruction packet generated!')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
            >
              Generate Invigilator Duty PDF
            </button>
          </div>
        </div>
      )}

      {/* 5. AUDITOR, INSTITUTION ADMIN, PRINCIPAL, DISTRICT & GOVERNMENT VIEW */}
      {(currentRole === 'institution_admin' ||
        currentRole === 'principal' ||
        currentRole === 'auditor' ||
        currentRole === 'district_officer' ||
        currentRole === 'government_authority' ||
        currentRole === 'super_admin' ||
        currentRole === 'counselor' ||
        currentRole === 'accessibility_coordinator' ||
        currentRole === 'support_staff' ||
        currentRole === 'it_admin') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Institutional Accessibility Audit & Compliance
                </h3>
                <p className="text-xs text-slate-500">Government Institute of Inclusive Science, Mumbai (MH-MUM-101)</p>
              </div>
              <Link href="/audit" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Audit Checklist <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {audits[0]?.checklistItems.map((item) => (
                <div key={item.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 capitalize">{item.category}</span>
                    <span className={item.isCompliant ? 'text-emerald-600' : 'text-rose-600'}>
                      {item.score}/10
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-900 truncate">{item.title}</div>
                  <div className="text-[10px] text-slate-500">{item.description}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions Bar */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/compliance" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md">
                View RPWD Compliance Engine
              </Link>
              <Link href="/authorities" className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 transition">
                District Analytics Map
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-emerald-600" />
              AI Governance Insights
            </h3>

            <div className="space-y-3">
              {aiRecommendations.map((ai) => (
                <div key={ai.id} className="bg-blue-50/50 border border-blue-200 p-4 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-amber-700">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {ai.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">{ai.confidenceScore}% Confidence</span>
                  </div>
                  <div className="font-bold text-slate-900">{ai.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{ai.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
