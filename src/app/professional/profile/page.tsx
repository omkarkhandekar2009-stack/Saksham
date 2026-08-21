'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  Shield,
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Edit3,
  Mail,
  Phone,
  BookOpen,
  User,
  X,
  Save,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function ProfessionalProfilePage() {
  const { professionals, activeProfessionalId, updateProfessionalProfile } = useAppStore();
  const activeProf = professionals.find((p) => p.id === activeProfessionalId) || professionals[0];

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activeProf?.name || 'Priya Kumari');
  const [phone, setPhone] = useState(activeProf?.phone || '+91 98351 22340');
  const [qualification, setQualification] = useState(activeProf?.qualification || 'M.A. English & RCI Certified Inclusion Assistant');
  const [experienceYears, setExperienceYears] = useState(activeProf?.experienceYears || 4);
  const [organization, setOrganization] = useState(activeProf?.organization || 'Jharkhand Disability Support Council');
  const [certificationDetails, setCertificationDetails] = useState(activeProf?.certificationDetails || 'RCI Registration #RCI-A11Y-2022-894');
  const [serviceArea, setServiceArea] = useState(activeProf?.serviceArea || 'Ranchi Urban & Doranda');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfessionalProfile(activeProf.id, {
      name,
      phone,
      qualification,
      experienceYears,
      organization,
      certificationDetails,
      serviceArea,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const isVerified = activeProf?.status === 'verified';

  return (
    <div className="space-y-6 py-2">
      {/* Banner */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Professional Profile Registry
            </span>
            <span className="text-[11px] text-blue-200">| Official Support Credential</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            My Professional Profile
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl mt-1 leading-relaxed">
            Manage your public credential dossier, certified services, and verification badge displayed to schools and colleges.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 shrink-0"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-400/40 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in-50 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Profile Updated!</strong> Your changes have been recorded in the platform service registry.
          </span>
        </div>
      )}

      {/* Profile Card & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Verification Badge */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl space-y-6 shadow-xl text-center">
          <div className="relative w-28 h-28 mx-auto">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 p-1 shadow-lg">
              <div className="w-full h-full rounded-[22px] bg-[#081a3b] flex items-center justify-center text-4xl font-black text-cyan-300">
                {activeProf?.name.charAt(0)}
              </div>
            </div>
            {isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-xl shadow-md" title="Verified by Saksham">
                <CheckCircle2 className="w-5 h-5 text-slate-950" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">{activeProf?.name}</h2>
            <p className="text-xs text-cyan-300 font-semibold capitalize">
              {activeProf?.primaryService?.replace(/_/g, ' ')}
            </p>
            <p className="text-[11px] text-blue-200">{activeProf?.district}, Jharkhand</p>
          </div>

          {/* Verification Status Banner */}
          {isVerified ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-400/40 rounded-2xl space-y-1 shadow-md">
              <div className="flex items-center justify-center gap-1.5 text-emerald-300 font-black text-xs uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>VERIFIED BY SAKSHAM</span>
              </div>
              <p className="text-[10px] text-emerald-200/80">
                Validated by State Education Directorate &amp; RCI Registry
              </p>
            </div>
          ) : (
            <div className="p-4 bg-amber-950/80 border border-amber-400/40 rounded-2xl space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 font-black text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>PENDING VERIFICATION</span>
              </div>
              <p className="text-[10px] text-amber-200/80">
                Certificates under review by Institution Authorities
              </p>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-blue-400/20">
            <div className="bg-[#081a3b] p-3 rounded-xl border border-blue-400/20">
              <span className="text-slate-400 block text-[10px]">Rating</span>
              <strong className="text-emerald-400 text-sm">★ {activeProf?.rating}</strong>
            </div>
            <div className="bg-[#081a3b] p-3 rounded-xl border border-blue-400/20">
              <span className="text-slate-400 block text-[10px]">Sessions Done</span>
              <strong className="text-cyan-300 text-sm">{activeProf?.completedSessions}</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Full Professional Dossier */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>Professional Qualifications &amp; Specializations</span>
              </h3>
              <span className="text-blue-300">Registered: {activeProf?.registeredAt}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-1">
                <span className="text-slate-400 block text-[11px]">Primary Specialization</span>
                <span className="text-sm font-bold text-white capitalize">{activeProf?.primaryService?.replace(/_/g, ' ')}</span>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-1">
                <span className="text-slate-400 block text-[11px]">Highest Academic Qualification</span>
                <span className="text-sm font-bold text-cyan-300">{activeProf?.qualification}</span>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-1">
                <span className="text-slate-400 block text-[11px]">Experience</span>
                <span className="text-sm font-bold text-white">{activeProf?.experienceYears} Years in Inclusive Education</span>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-1">
                <span className="text-slate-400 block text-[11px]">Languages Known</span>
                <span className="text-sm font-bold text-emerald-300">{activeProf?.languages.join(', ')}</span>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300">Certifications &amp; License Roster</span>
                <Link href="/professional/certifications" className="text-[11px] text-cyan-300 hover:underline">
                  View Documents →
                </Link>
              </div>
              <p className="text-blue-100 font-mono text-[11px] bg-[#051124] p-3 rounded-xl border border-blue-400/20">
                {activeProf?.certificationDetails}
              </p>
            </div>

            {/* Availability & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-1">
                <span className="text-slate-400 block text-[11px]">Service Coverage Zone</span>
                <span className="text-xs font-bold text-white">{activeProf?.serviceArea}</span>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-1">
                <span className="text-slate-400 block text-[11px]">Available Hours</span>
                <span className="text-xs font-bold text-teal-300">{activeProf?.availableHours}</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-200">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{activeProf?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{activeProf?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyan-400" />
                <span>Edit Professional Profile</span>
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#123366]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-white mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-white mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-white mb-1">Service Area</label>
                  <input
                    type="text"
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-white mb-1">Organization (Optional)</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-bold px-4 py-2 rounded-xl text-xs border border-blue-400/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black px-5 py-2 rounded-xl text-xs shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
