'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ProfessionalServiceType } from '@/types';
import {
  Shield,
  Award,
  ArrowRight,
  CheckCircle2,
  Upload,
  FileText,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

const SERVICE_OPTIONS: { id: ProfessionalServiceType; label: string; desc: string }[] = [
  { id: 'certified_scribe', label: 'Certified Scribe', desc: 'Exam and assessment dictation/writing support' },
  { id: 'sign_language_interpreter', label: 'Sign Language Interpreter', desc: 'ISL interpretation for classroom & workshops' },
  { id: 'lesson_reader', label: 'Lesson Reader', desc: 'Reading courseware, textbooks & digital notes' },
  { id: 'exam_reader', label: 'Exam Reader', desc: 'Reading question papers during examinations' },
  { id: 'assistant_teacher', label: 'Assistant Teacher', desc: 'Inclusive classroom companion & note-taking' },
  { id: 'special_educator', label: 'Special Educator', desc: 'Personalized IEP implementation & cognitive support' },
  { id: 'accessibility_support_assistant', label: 'Accessibility Support Assistant', desc: 'Campus mobility, lab assist & device setup' },
];

const JHARKHAND_DISTRICTS = [
  'Ranchi',
  'Dhanbad',
  'East Singhbhum (Jamshedpur)',
  'Bokaro',
  'Hazaribagh',
  'Deoghar',
  'Giridih',
  'Ramgarh',
  'Khunti',
  'Palamu',
  'Dumka',
  'West Singhbhum (Chaibasa)',
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const LANGUAGES = ['Hindi', 'English', 'Indian Sign Language', 'Santhali', 'Bengali', 'Ho', 'Mundari', 'Urdu'];

export default function RegisterProfessionalPage() {
  const router = useRouter();
  const { registerProfessional } = useAppStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Ranchi');
  const [state, setState] = useState('Jharkhand');
  const [address, setAddress] = useState('');

  const [primaryService, setPrimaryService] = useState<ProfessionalServiceType>('certified_scribe');
  const [otherServices, setOtherServices] = useState<ProfessionalServiceType[]>([]);
  const [qualification, setQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState(2);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Hindi', 'English']);
  const [organization, setOrganization] = useState('');

  const [certificationDetails, setCertificationDetails] = useState('');
  const [certificateUploaded, setCertificateUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const [availableDays, setAvailableDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [availableHours, setAvailableHours] = useState('09:00 AM - 05:00 PM');
  const [serviceArea, setServiceArea] = useState('Ranchi Urban & College Campus');
  const [preference, setPreference] = useState<'remote' | 'in_person' | 'both'>('both');

  const toggleOtherService = (id: ProfessionalServiceType) => {
    if (otherServices.includes(id)) {
      setOtherServices(otherServices.filter((s) => s !== id));
    } else {
      setOtherServices([...otherServices, id]);
    }
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const toggleDay = (day: string) => {
    if (availableDays.includes(day)) {
      if (availableDays.length > 1) {
        setAvailableDays(availableDays.filter((d) => d !== day));
      }
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setCertificateUploaded(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      registerProfessional({
        name: fullName || 'New Accessibility Professional',
        email: email || 'pro@sakshampath.org',
        phone: phone || '+91 98000 00000',
        district,
        state,
        primaryService,
        otherServices,
        qualification: qualification || 'Certified Inclusive Support Specialist',
        experienceYears,
        languages: selectedLanguages,
        organization: organization || undefined,
        certificationDetails: certificationDetails || 'RCI / Certified Disability Support Credential',
        availableDays,
        availableHours,
        serviceArea,
        preference,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-xl tracking-wider text-slate-900">
              Sak<span className="text-blue-600">sham</span>
            </span>
            <p className="text-[10px] text-slate-500 font-medium">
              Accessibility Professional Registration & Verification Gateway
            </p>
          </div>
        </Link>

        <Link
          href="/auth/login"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200"
        >
          Already Registered? Sign In →
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full my-8">
        {isSuccess ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Registration Submitted • Status: PENDING VERIFICATION
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Welcome to Saksham, {fullName}!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your professional profile for <strong>{primaryService.replace(/_/g, ' ').toUpperCase()}</strong> has been submitted. Education authorities and institution admins will verify your certifications within 24-48 hours.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900 capitalize">{primaryService.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">District:</span>
                <span className="font-bold text-slate-900">{district}, {state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Languages:</span>
                <span className="font-bold text-slate-900">{selectedLanguages.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Badge:</span>
                <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                  Pending Verification
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>Go to Professional Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
            {/* Steps Tracker */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  <span>Accessibility Professional Registration</span>
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Join Jharkhand's verified human accessibility support network.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                Step {step} of 3
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* STEP 1: BASIC INFORMATION */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in-50 duration-150">
                  <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                    1. Personal & Contact Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Priya Kumari"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98350 12345"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@sakshampath.org"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">District (Jharkhand) *</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      >
                        {JHARKHAND_DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Residential Address / City *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Circular Road, Lalpur, Ranchi"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <span>Continue to Professional Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL INFORMATION & QUALIFICATIONS */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in-50 duration-150">
                  <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                    2. Specialization & Qualifications
                  </h3>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Primary Support Service *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => setPrimaryService(s.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                            primaryService === s.id
                              ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span className="font-bold text-xs">{s.label}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5">{s.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Highest Qualification *</label>
                      <input
                        type="text"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="e.g. M.A. English / B.Ed Special Education"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Years of Experience</label>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Languages Known *</label>
                    <div className="flex flex-wrap gap-1.5">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            selectedLanguages.includes(lang)
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Affiliated Organization (Optional)</label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Jharkhand Disability Support Association / College Name"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <span>Continue to Verification & Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: VERIFICATION & AVAILABILITY */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in-50 duration-150">
                  <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                    3. Verification Credentials & Availability
                  </h3>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Professional ID / Certification Details *
                    </label>
                    <input
                      type="text"
                      value={certificationDetails}
                      onChange={(e) => setCertificationDetails(e.target.value)}
                      placeholder="e.g. RCI Registration #RCI-A11Y-2024-998 / ISLRTC Certificate"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Upload Certificate / ID Proof (PDF/JPG)</label>
                    <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center space-y-2 hover:bg-slate-100 transition cursor-pointer relative">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <Upload className="w-6 h-6 text-slate-400" />
                      {certificateUploaded ? (
                        <div className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{fileName || 'certificate_doc.pdf'} Uploaded</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-bold text-slate-700">Click or Drag & Drop certificate here</p>
                          <p className="text-[10px] text-slate-500">RCI License, University Degree or Scribe Training Record</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Available Days *</label>
                    <div className="flex flex-wrap gap-1.5">
                      {DAYS.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            availableDays.includes(day)
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Available Hours</label>
                      <input
                        type="text"
                        value={availableHours}
                        onChange={(e) => setAvailableHours(e.target.value)}
                        placeholder="e.g. 09:00 AM - 05:00 PM"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Service Preference</label>
                      <select
                        value={preference}
                        onChange={(e) => setPreference(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      >
                        <option value="both">Both Remote & In-Person</option>
                        <option value="in_person">In-Person Only</option>
                        <option value="remote">Remote / Digital Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Verification Policy:</strong> To protect student academic integrity, all newly registered professionals remain in <em>Pending Verification</em> until certified by educational authorities.
                    </span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-xl text-xs shadow-md transition flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting Registration...' : 'Complete Registration'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500 pt-6 border-t border-slate-200">
        Saksham Inclusive Education & Human Accessibility Support Network • RPWD Act 2016 Aligned
      </div>
    </div>
  );
}
