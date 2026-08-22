'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/exportUtils';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Download,
  Building2,
  Check,
  Sparkles,
  X,
} from 'lucide-react';

export default function ProfessionalAssignmentsPage() {
  const { assignments, completeAssignment } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownloadDutySlip = (asg: any) => {
    const headers = [
      'Duty Authorization Ref',
      'Support Type',
      'Subject / Exam Event',
      'Institution Name',
      'Student ID',
      'Session Date',
      'Time Slot',
      'Duration',
      'Venue / Hall Location',
      'Compensation / Honorarium',
      'Assignment Status',
      'RCI Verification Status'
    ];
    const row = [
      asg.id,
      asg.supportType,
      asg.subjectOrEvent,
      asg.institutionName,
      asg.studentId,
      asg.date,
      asg.time,
      `${asg.durationHours} Hours`,
      asg.location,
      asg.compensation,
      asg.status,
      'Verified RCI Professional'
    ];
    exportToCSV(`Duty_Authorization_Slip_${asg.id}`, headers, [row]);
    setToastMessage(`Official Duty Authorization Slip CSV downloaded for ${asg.subjectOrEvent} (${asg.id})!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleMarkCompleted = (asgId: string, subject: string) => {
    completeAssignment(asgId);
    setToastMessage(`Assignment "${subject}" marked as COMPLETED! Honorarium processed.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filteredAssignments = assignments.filter((asg) => {
    if (activeTab === 'active') return asg.status === 'in_progress' || asg.status === 'accepted';
    if (activeTab === 'upcoming') return asg.status === 'confirmed' || asg.status === 'pending';
    if (activeTab === 'completed') return asg.status === 'completed';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'accepted':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
      case 'in_progress':
        return 'bg-teal-500/20 text-teal-300 border-teal-400/40 animate-pulse';
      case 'completed':
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Banner */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Accessibility Support Roster
            </span>
            <span className="text-[11px] text-blue-200">| Statutory Duty Allocations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            My Accessibility Assignments
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl mt-1 leading-relaxed">
            Track and manage your scheduled examination scribe duties, sign language sessions, and reading accommodations.
          </p>
        </div>

        <Link
          href="/professional/requests"
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 shrink-0"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Browse More Requests</span>
        </Link>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-400/50 rounded-2xl text-xs text-emerald-200 flex items-center justify-between gap-2 shadow-xl animate-in fade-in-50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-blue-300 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#0f2b5c] border border-cyan-500/30 p-2 rounded-2xl shadow-md w-fit text-xs font-bold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
              : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'
          }`}
        >
          All Assignments ({assignments.length})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'active'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
              : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'
          }`}
        >
          Active / In-Progress ({assignments.filter((a) => a.status === 'accepted' || a.status === 'in_progress').length})
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'upcoming'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
              : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'
          }`}
        >
          Upcoming ({assignments.filter((a) => a.status === 'confirmed').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'completed'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
              : 'text-blue-200 hover:text-white hover:bg-[#081a3b]'
          }`}
        >
          Completed ({assignments.filter((a) => a.status === 'completed').length})
        </button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => (
          <div
            key={asg.id}
            className="bg-[#0f2b5c] border border-cyan-500/30 hover:border-cyan-400/50 p-6 rounded-3xl shadow-xl transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-400/20 pb-4">
              <div className="flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider">
                  {asg.supportType.replace(/_/g, ' ')}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{asg.subjectOrEvent}</h3>
                  <p className="text-xs text-blue-200">{asg.institutionName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border capitalize ${getStatusBadge(
                    asg.status
                  )}`}
                >
                  {asg.status.replace(/_/g, ' ')}
                </span>
                <span className="text-teal-300 bg-[#081a3b] border border-cyan-500/30 text-xs font-bold px-3 py-1 rounded-lg">
                  {asg.compensation}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 text-blue-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Session Date</span>
                  <strong className="text-white">{asg.date}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Time &amp; Duration</span>
                  <strong className="text-white">{asg.time} ({asg.durationHours}h)</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Venue Location</span>
                  <strong className="text-white truncate block">{asg.location}</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-blue-300">
                Student ID: <strong className="text-white">#{asg.studentId}</strong> • Duty Ref: <strong className="text-cyan-300">{asg.id}</strong>
              </div>

              <div className="flex items-center gap-2">
                {asg.status !== 'completed' && (
                  <button
                    onClick={() => handleMarkCompleted(asg.id, asg.subjectOrEvent)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Mark as Completed</span>
                  </button>
                )}

                <button
                  onClick={() => handleDownloadDutySlip(asg)}
                  className="bg-[#081a3b] hover:bg-[#123366] text-cyan-200 border border-cyan-500/30 font-semibold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Duty Slip</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
