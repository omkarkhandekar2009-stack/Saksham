'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  FileCheck2,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Shield,
  Eye,
  X,
  Sparkles,
  Award,
} from 'lucide-react';
import { SupportRequest, ProfessionalServiceType } from '@/types';

export default function ProfessionalRequestsPage() {
  const {
    currentRole,
    supportRequests,
    professionals,
    activeProfessionalId,
    acceptSupportRequest,
  } = useAppStore();

  const activeProf = professionals.find((p) => p.id === activeProfessionalId) || professionals[0];

  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReqForModal, setSelectedReqForModal] = useState<SupportRequest | null>(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [acceptedSuccess, setAcceptedSuccess] = useState<string | null>(null);

  const filteredRequests = supportRequests.filter((req) => {
    const matchesService = selectedService === 'all' || req.supportType === selectedService;
    const matchesDistrict = selectedDistrict === 'all' || req.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesQuery =
      searchQuery === '' ||
      req.subjectOrEvent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesDistrict && matchesQuery;
  });

  const handleAccept = (reqId: string) => {
    setAcceptingId(reqId);
    setTimeout(() => {
      acceptSupportRequest(reqId, activeProf.id);
      setAcceptingId(null);
      setAcceptedSuccess(reqId);
      setTimeout(() => setAcceptedSuccess(null), 4000);
    }, 450);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Banner */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Support Requests Directory
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              Live Matching Engine Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Available Accessibility Support Requests
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl mt-1 leading-relaxed">
            Browse exam scribe, sign language interpretation, lesson reading, and assistant educator requests posted by students and institutions across Jharkhand.
          </p>
        </div>

        <div className="p-3 bg-[#081a3b] border border-cyan-500/30 rounded-2xl text-xs space-y-1">
          <div className="text-slate-400">Logged in as:</div>
          <div className="font-bold text-white flex items-center gap-1.5">
            <span>{activeProf?.name}</span>
            <Award className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-[11px] text-cyan-300 capitalize">{activeProf?.primaryService?.replace(/_/g, ' ')}</div>
        </div>
      </div>

      {acceptedSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-400/40 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in-50 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Request Accepted Successfully!</strong> Added to your active assignments and confirmed with the student &amp; institution.
          </span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by subject, examination, institution, or request ID..."
            className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-blue-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
          >
            <option value="all">All Support Types</option>
            <option value="certified_scribe">Certified Scribe</option>
            <option value="sign_language_interpreter">Sign Language Interpreter</option>
            <option value="lesson_reader">Lesson Reader</option>
            <option value="exam_reader">Exam Reader</option>
            <option value="assistant_teacher">Assistant Teacher</option>
            <option value="special_educator">Special Educator</option>
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
          >
            <option value="all">All Districts</option>
            <option value="Ranchi">Ranchi</option>
            <option value="Dhanbad">Dhanbad</option>
            <option value="East Singhbhum (Jamshedpur)">East Singhbhum</option>
            <option value="Khunti">Khunti</option>
          </select>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.map((req) => {
          const isAccepted = req.status === 'accepted' || req.assignedProfessionalId === activeProf?.id;
          return (
            <div
              key={req.id}
              className="bg-[#0f2b5c] border border-cyan-500/30 hover:border-cyan-400/50 p-5 rounded-3xl space-y-4 shadow-xl transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-[11px] px-3 py-1 rounded-md uppercase tracking-wider">
                      {req.supportType.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-300">#{req.id}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isAccepted
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                    }`}
                  >
                    {isAccepted ? 'Accepted & Scheduled' : 'Available for Matching'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{req.subjectOrEvent}</h3>
                  <p className="text-xs text-blue-200 mt-0.5">{req.institutionName}</p>
                </div>

                <div className="bg-[#081a3b] p-3.5 rounded-2xl border border-blue-400/20 grid grid-cols-2 gap-2 text-xs text-blue-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{req.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>{req.time} ({req.durationHours}h)</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">{req.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-[#051124] p-3 rounded-xl border border-blue-400/20 leading-relaxed">
                  {req.additionalRequirements}
                </p>
              </div>

              <div className="pt-3 border-t border-blue-400/20 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Lang: <strong className="text-cyan-200">{req.languagePreference.join(', ')}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedReqForModal(req)}
                    className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-semibold px-3 py-2 rounded-xl text-xs border border-blue-400/30 transition flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  {isAccepted ? (
                    <button
                      disabled
                      className="bg-emerald-600/30 text-emerald-300 font-bold px-4 py-2 rounded-xl text-xs border border-emerald-400/30"
                    >
                      Accepted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAccept(req.id)}
                      disabled={acceptingId === req.id}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition shadow-md flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{acceptingId === req.id ? 'Accepting...' : 'Accept Request'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Privacy Modal */}
      {selectedReqForModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-md">
                  {selectedReqForModal.supportType.replace(/_/g, ' ').toUpperCase()}
                </span>
                <span className="text-xs text-blue-300 font-mono">#{selectedReqForModal.id}</span>
              </div>
              <button
                onClick={() => setSelectedReqForModal(null)}
                className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#123366]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h3 className="text-base font-bold text-white">{selectedReqForModal.subjectOrEvent}</h3>
                <p className="text-blue-200">{selectedReqForModal.institutionName}</p>
              </div>

              <div className="bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 space-y-2 text-blue-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date &amp; Time:</span>
                  <span className="font-bold text-white">{selectedReqForModal.date} ({selectedReqForModal.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-bold text-white">{selectedReqForModal.durationHours} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-white">{selectedReqForModal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Languages:</span>
                  <span className="font-bold text-white">{selectedReqForModal.languagePreference.join(', ')}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-cyan-300 mb-1">Requirement Notes:</h4>
                <p className="p-3 bg-[#051124] rounded-xl border border-blue-400/20 text-blue-100 leading-relaxed">
                  {selectedReqForModal.additionalRequirements}
                </p>
              </div>

              <div className="p-3 bg-blue-950/60 border border-blue-400/30 rounded-xl text-[11px] text-blue-200 flex items-start gap-2">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Student Privacy Protection:</strong> Full individual medical profile and UDID records remain protected until an official exam assignment is confirmed by the institution.
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedReqForModal(null)}
                className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-bold px-4 py-2 rounded-xl text-xs border border-blue-400/30"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAccept(selectedReqForModal.id);
                  setSelectedReqForModal(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black px-5 py-2 rounded-xl text-xs shadow-md"
              >
                Accept Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
