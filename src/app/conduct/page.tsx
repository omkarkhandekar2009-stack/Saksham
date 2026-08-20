'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { IncidentReport } from '@/types';
import { Plus, Lock } from 'lucide-react';

export default function ConductPage() {
  const { incidents, addIncidentReport } = useAppStore();
  const [showReportForm, setShowReportForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<IncidentReport['category']>('accessibility_denial');
  const [severity, setSeverity] = useState<IncidentReport['severity']>('moderate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newInc: IncidentReport = {
      id: `inc-${Date.now()}`,
      caseNumber: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      category,
      isAnonymous,
      institutionId: 'inst-01',
      title,
      description,
      location: location || 'Campus Main Wing',
      dateOfIncident: new Date().toISOString().slice(0, 10),
      severity,
      status: 'submitted',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    addIncidentReport(newInc);
    setTitle('');
    setDescription('');
    setLocation('');
    setShowReportForm(false);
    alert('✅ Incident Report registered confidentially!');
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-950/60 text-rose-300 border border-rose-800/60 text-xs font-bold px-3 py-0.5 rounded-full">
              Safe & Inclusive Campus Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Conduct, Safety & Barrier Incident Reporting
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Confidential reporting for accessibility denials, bullying, discrimination & infrastructure barriers.
          </p>
        </div>

        <button
          onClick={() => setShowReportForm(!showReportForm)}
          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {showReportForm ? 'Cancel Incident Report' : 'Report Incident Confidentially'}
        </button>
      </div>

      {/* Report Form */}
      {showReportForm && (
        <form onSubmit={handleSubmit} className="bg-[#0f2b5c] border-2 border-rose-500 p-6 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Confidential Incident Report Form
            </h3>
            <label className="flex items-center gap-2 text-xs text-blue-200 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded"
              />
              Submit Anonymously (Hide Identity)
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-blue-200 font-semibold mb-1">Incident Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value="accessibility_denial">Accessibility Denial / Barrier</option>
                <option value="bullying">Bullying / Mocking</option>
                <option value="harassment">Harassment</option>
                <option value="infrastructure_failure">Infrastructure / Elevator Failure</option>
                <option value="discrimination">Discrimination</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-200 font-semibold mb-1">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value="minor">Minor</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">Incident Summary</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Elevator out of service preventing 3rd floor lab access"
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">Campus Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Block C, Science Lab 2"
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide exact facts, witnesses or details..."
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl p-3 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
          >
            Submit Confidential Report to Disciplinary Officer
          </button>
        </form>
      )}

      {/* Incident Case List */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center justify-between">
          <span>Active Conduct & Safety Incident Log ({incidents.length})</span>
        </h3>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div key={inc.id} className="bg-[#081a3b] border border-blue-400/20 p-5 rounded-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-mono">{inc.caseNumber}</span>
                  <span className="bg-rose-950 border border-rose-800 text-rose-300 px-2 py-0.5 rounded capitalize text-[10px]">
                    {inc.category.replace(/_/g, ' ')}
                  </span>
                  {inc.isAnonymous && (
                    <span className="bg-[#0f2b5c] text-blue-200 px-2 py-0.5 rounded text-[10px]">
                      Anonymous
                    </span>
                  )}
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                  inc.status === 'resolved' || inc.status === 'action_taken'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {inc.status.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="font-bold text-sm text-white">{inc.title}</div>
              <p className="text-blue-100 leading-relaxed">{inc.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-blue-300 pt-2 border-t border-blue-400/20">
                <div>Location: <span className="text-white font-semibold">{inc.location}</span></div>
                <div>Investigating Officer: <span className="text-cyan-300 font-semibold">{inc.investigatingOfficerName || 'Assigned to Facility Head'}</span></div>
              </div>

              {inc.resolutionSummary && (
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-emerald-200 text-xs">
                  <span className="font-bold">Resolution Action: </span>
                  {inc.resolutionSummary}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
