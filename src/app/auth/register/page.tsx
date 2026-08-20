'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import {
  Shield,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Building2,
  FileText,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { addStudent } = useAppStore();

  const [fullName, setFullName] = useState('');
  const [udidNumber, setUdidNumber] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [disabilityCategory, setDisabilityCategory] = useState('visual');
  const [disabilityPercentage, setDisabilityPercentage] = useState(75);
  const [institutionName, setInstitutionName] = useState('Government Institute of Inclusive Science, Mumbai');
  const [grade, setGrade] = useState('Grade 11 - Science');
  const [accommodations, setAccommodations] = useState<string[]>([
    'NVDA / JAWS Screen Reader',
    'Extra Time in Exams (20 mins/hr)',
  ]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAccommodation = (acc: string) => {
    if (accommodations.includes(acc)) {
      setAccommodations(accommodations.filter((a) => a !== acc));
    } else {
      setAccommodations([...accommodations, acc]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !udidNumber) return;

    setIsSubmitting(true);

    // Create student profile in store
    const newStudent = {
      id: `std-${Date.now()}`,
      rollNumber: `ROLL-2026-${Math.floor(100 + Math.random() * 900)}`,
      fullName,
      age: 17,
      grade,
      section: 'A',
      institutionId: 'inst-01',
      institutionName,
      guardianName: 'Guardian of ' + fullName,
      guardianPhone: phone || '+91 98201 11223',
      guardianEmail: email || 'guardian@inclusive.edu.in',
      emergencyContact: phone || '+91 98201 11223',
      disabilityPercentage: Number(disabilityPercentage),
      udidCardNumber: udidNumber,
      academicPerformanceScore: 85,
      supportHistoryCount: 1,
      activeAccommodationsCount: accommodations.length,
      ilpStatus: 'active' as const,
      ispStatus: 'approved' as const,
      accessibilityProfile: {
        id: `acc-${Date.now()}`,
        studentId: `std-${Date.now()}`,
        categories: [disabilityCategory as any],
        primaryCategory: disabilityCategory as any,
        severity: (Number(disabilityPercentage) > 70 ? 'severe' : 'moderate') as 'moderate' | 'severe',
        communicationPreference: 'audio' as const,
        learningFormatPreference: 'audio_visual' as const,
        examinationFormatPreference: 'extra_time' as const,
        assistiveTechNeeded: ['Braille / Screen Reader Display'],
        classroomAccommodationsNeeded: accommodations,
        digitalAccommodationsNeeded: ['High Contrast Theme', 'Dyslexic Font'],
        transportationNeeded: false,
        updatedAt: new Date().toISOString().slice(0, 10),
      },
    };

    addStudent(newStudent);

    // Persist the registered student into the central Supabase `users` table (storage)
    try {
      const { error: dbError } = await supabase.from('users').upsert(
        {
          full_name: fullName,
          phone_or_email: email || phone || udidNumber,
          role: 'student',
          preferred_lang: 'en',
          disability_type: disabilityCategory,
          state: 'Maharashtra',
          district: '',
        },
        { onConflict: 'phone_or_email' }
      );
      if (dbError) console.error('Supabase upsert failed:', dbError.message);
    } catch (err) {
      console.error('Supabase upsert error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Automatically redirect to Sign In page after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 1800);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-xl tracking-wider text-slate-900">
              INCLUDE<span className="text-blue-600">360</span>
            </span>
            <p className="text-[10px] text-slate-500 font-medium">
              National Inclusive Education & Accessibility Gateway
            </p>
          </div>
        </Link>

        <Link
          href="/auth/login"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      {/* Registration Form Card */}
      <div className="max-w-2xl mx-auto w-full my-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          {isSuccess ? (
            /* SUCCESS STATE */
            <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Registration Completed Successfully!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your UDID Card (<strong>{udidNumber}</strong>) and Inclusive Student Profile for <strong>{fullName}</strong> have been registered in the national database.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-800 font-bold inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Redirecting to Sign In portal...</span>
              </div>
            </div>
          ) : (
            /* FORM */
            <>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-0.5 rounded-full text-xs font-bold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Student & Specially Abled Profile Onboarding</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Register Swavlamban UDID Profile
                </h1>
                <p className="text-xs text-slate-500">
                  Create your unified profile to access individualized education plans, accommodations, scribes, and legal quotas.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5 text-xs">
                {/* 1. Personal & UDID Details */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    1. Identity & Disability Certificate
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name (as per UDID)</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Swavlamban UDID Card (18 Digits)</label>
                      <input
                        type="text"
                        value={udidNumber}
                        onChange={(e) => setUdidNumber(e.target.value)}
                        placeholder="MH2710120060088192"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono tracking-wider focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Disability Category</label>
                      <select
                        value={disabilityCategory}
                        onChange={(e) => setDisabilityCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none capitalize"
                      >
                        <option value="visual">Visual Impairment / Blindness</option>
                        <option value="hearing">Hearing Impairment / Deaf</option>
                        <option value="locomotor">Locomotor / Mobility Disability</option>
                        <option value="intellectual">Intellectual Disability</option>
                        <option value="autism">Autism / Neurodiverse</option>
                        <option value="specific_learning">Specific Learning Disability (Dyslexia)</option>
                        <option value="speech_language">Speech & Language Disability</option>
                        <option value="multiple">Multiple Disabilities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Disability Percentage</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="40"
                          max="100"
                          value={disabilityPercentage}
                          onChange={(e) => setDisabilityPercentage(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none font-bold"
                          required
                        />
                        <span className="text-slate-500 font-bold">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Educational Affiliation */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    2. Institutional & Course Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Institution / College Name</label>
                      <input
                        type="text"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Grade / Class / Stream</label>
                      <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder="e.g. Grade 11 - Science / B.Tech CSE"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email ID</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aarav@inclusive.edu.in"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Guardian / Emergency Mobile</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98201 11223"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Preferred Accommodations */}
                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <HeartHandshake className="w-4 h-4 text-teal-600" />
                    3. Required Classroom & Exam Accommodations
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'NVDA / JAWS Screen Reader',
                      'Extra Time in Exams (20 mins/hr)',
                      'Certified Exam Scribe',
                      'Indian Sign Language (ISL) Interpreter',
                      'Wheelchair Ground Floor Seating',
                      'Accessible Audio Textbooks & Braille',
                    ].map((acc) => (
                      <label
                        key={acc}
                        onClick={() => toggleAccommodation(acc)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                          accommodations.includes(acc)
                            ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={accommodations.includes(acc)}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                        />
                        <span className="text-[11px]">{acc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Security Password */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    4. Security Password
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Create Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-sm shadow-lg transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span>Registering UDID Profile...</span>
                  ) : (
                    <>
                      <span>Complete Registration & Link UDID</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
                <span>Already have a registered account? </span>
                <Link href="/auth/login" className="font-bold text-blue-600 hover:underline">
                  Sign In Here
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
        <p>&copy; 2026 INCLUDE360. All rights reserved. Ministry of Social Justice & Empowerment Aligned.</p>
      </footer>
    </div>
  );
}
