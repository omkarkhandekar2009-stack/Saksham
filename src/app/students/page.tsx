'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { Student } from '@/types';
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
  const { students } = useAppStore();
  const [registeredStudents, setRegisteredStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-001');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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

  const currentStudent = combinedStudents.find((s) => s.id === selectedStudentId) || combinedStudents[0];

  const filteredStudents = combinedStudents.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Student Accessibility Profiles & IEP/ISP
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Inclusive Student Register & Support Directory
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Comprehensive disability profiles, learning preferences, accommodation histories & UDID verifications.
          </p>
        </div>

        <button
          onClick={() => alert('New student onboarding modal opened!')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Register Specially Abled Student
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Student List */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center bg-[#081a3b] border border-blue-400/20 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-cyan-300 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or roll number..."
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

        {/* Right Column: Detailed Accessibility Profile & Support Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  {currentStudent.fullName} Profile
                </h2>
                <p className="text-xs text-blue-200">{currentStudent.institutionName}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full">
                  UDID Verified: {currentStudent.udidCardNumber}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">Disability Percentage</span>
                <span className="text-lg font-black text-rose-400">{currentStudent.disabilityPercentage}%</span>
              </div>
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">Academic Score</span>
                <span className="text-lg font-black text-emerald-400">{currentStudent.academicPerformanceScore}%</span>
              </div>
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">ILP Status</span>
                <span className="text-sm font-bold text-cyan-300 uppercase">{currentStudent.ilpStatus}</span>
              </div>
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20">
                <span className="text-blue-300 block mb-1">Emergency Contact</span>
                <span className="text-xs font-bold text-blue-100">{currentStudent.emergencyContact}</span>
              </div>
            </div>

            {/* Disability Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Disability Categories ({currentStudent.accessibilityProfile.categories.length})
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
                Required Accommodations & Assistive Tech
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2">
                  <span className="font-bold text-white">Assistive Devices Needed:</span>
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
                  <span className="font-bold text-white">Classroom Accommodations:</span>
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
    </div>
  );
}
