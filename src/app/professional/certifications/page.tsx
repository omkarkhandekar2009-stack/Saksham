'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Award,
  Shield,
  FileCheck2,
  Upload,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function ProfessionalCertificationsPage() {
  const { professionals, activeProfessionalId } = useAppStore();
  const activeProf = professionals.find((p) => p.id === activeProfessionalId) || professionals[0];

  const [docs, setDocs] = useState([
    {
      id: 'doc-1',
      title: 'Rehabilitation Council of India (RCI) Professional License',
      number: 'RCI-A11Y-2022-894',
      issuer: 'Rehabilitation Council of India (Govt of India)',
      issueDate: '2022-04-10',
      validTill: '2027-04-09',
      status: 'verified',
      type: 'License',
    },
    {
      id: 'doc-2',
      title: 'UGC National Scribe & Inclusion Training Certificate',
      number: 'UGC-A11Y-TR-2023-142',
      issuer: 'State Inclusion & Assessment Board, Jharkhand',
      issueDate: '2023-01-15',
      validTill: 'Lifetime',
      status: 'verified',
      type: 'Certification',
    },
    {
      id: 'doc-3',
      title: 'Higher Secondary & University Degree Credential',
      number: 'Ranchi Univ - Roll #18UGENG049',
      issuer: 'Ranchi University, Jharkhand',
      issueDate: '2021-07-20',
      validTill: 'Lifetime',
      status: 'verified',
      type: 'Degree',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [verifyToast, setVerifyToast] = useState<string | null>(null);

  const handleVerifyProof = (docNum: string) => {
    setVerifyToast(`Certificate ${docNum} verified with blockchain timestamp & Jharkhand State Disability Registry!`);
    setTimeout(() => setVerifyToast(null), 5000);
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      number: newNumber || 'PROV-VER-2026',
      issuer: newIssuer || 'Jharkhand Education Authority',
      issueDate: new Date().toISOString().split('T')[0],
      validTill: '2028-12-31',
      status: 'pending_verification',
      type: 'Certificate',
    };

    setDocs([newDoc, ...docs]);
    setNewTitle('');
    setNewNumber('');
    setNewIssuer('');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Banner */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Statutory Verification Vault
            </span>
            <span className="text-[11px] text-blue-200">| RCI &amp; UGC Standard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Professional Certifications &amp; Credentials
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl mt-1 leading-relaxed">
            All documents registered in the Saksham Vault undergo automated and human validation by the Jharkhand Directorate of Higher &amp; Technical Education.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Credential</span>
        </button>
      </div>

      {verifyToast && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-400/50 rounded-2xl text-xs text-emerald-200 flex items-center justify-between gap-2 shadow-xl animate-in fade-in-50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{verifyToast}</span>
          </div>
          <button onClick={() => setVerifyToast(null)} className="text-blue-300 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Verification Shield Notice */}
      <div className="bg-emerald-950/60 border border-emerald-400/40 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white">Verified Academic Scribe Status Active</h4>
            <p className="text-[11px] text-emerald-200/80">
              Your credentials qualify you for Grade 10, Grade 12, and University level exam scribing and reading accommodations.
            </p>
          </div>
        </div>
        <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline">
          100% Compliant
        </span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((d) => (
          <div
            key={d.id}
            className="bg-[#0f2b5c] border border-cyan-500/30 p-5 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-blue-600/30 text-cyan-300 font-bold text-[10px] px-2.5 py-0.5 rounded-md uppercase">
                  {d.type}
                </span>
                {d.status === 'verified' ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> In Review
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-white">{d.title}</h3>
              <p className="text-xs text-cyan-200 font-mono">{d.number}</p>
            </div>

            <div className="space-y-2 text-xs bg-[#081a3b] p-3.5 rounded-2xl border border-blue-400/20 text-blue-200">
              <div className="flex justify-between">
                <span className="text-slate-400">Issuer:</span>
                <span className="font-bold text-white text-right truncate ml-2">{d.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Valid Till:</span>
                <span className="font-bold text-emerald-400">{d.validTill}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-400/20 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px]">Issued: {d.issueDate}</span>
              <button
                onClick={() => handleVerifyProof(d.number)}
                className="text-cyan-300 hover:text-white font-semibold flex items-center gap-1 text-[11px]"
              >
                <span>Verify Proof</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0f2b5c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Upload New Qualification / Proof</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-blue-300 hover:text-white p-1 rounded hover:bg-[#123366]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDoc} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-white mb-1">Certificate Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Indian Sign Language Level-2 Interpretation Certificate"
                  className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">Credential / License #</label>
                <input
                  type="text"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="e.g. ISLRTC-CERT-2026-88"
                  className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">Issuing Authority</label>
                <input
                  type="text"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  placeholder="e.g. ISLRTC / Rehabilitation Council of India"
                  className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 font-bold px-4 py-2 rounded-xl text-xs border border-blue-400/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black px-5 py-2 rounded-xl text-xs shadow-md"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
