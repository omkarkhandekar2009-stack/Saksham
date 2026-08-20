'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ServiceType } from '@/types';
import { HeartHandshake, Plus, CheckCircle2, Clock } from 'lucide-react';

export default function AccessibilityServicesPage() {
  const { serviceRequests, addServiceRequest, updateServiceRequestStatus } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('scribe');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newReq = {
      id: `sr-${Date.now()}`,
      ticketNumber: `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: 'std-001',
      studentName: 'Aarav Sharma',
      institutionId: 'inst-01',
      serviceType,
      title,
      description,
      urgency,
      status: 'pending' as const,
      requestedBy: 'Aarav Sharma (Student)',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    addServiceRequest(newReq);
    setTitle('');
    setDescription('');
    setShowForm(false);
    alert('✅ Service Request submitted successfully!');
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Central Service Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Accessibility Service Requests & Accommodations
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Request scribes, Indian Sign Language interpreters, readers, assistive devices & campus transport.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel Request' : 'New Service Request'}
        </button>
      </div>

      {/* New Request Modal / Collapsible Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0f2b5c] border-2 border-cyan-400 p-6 rounded-3xl space-y-4 shadow-2xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-400" />
            Submit Accessibility Support Ticket
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-blue-200 font-semibold mb-1">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as ServiceType)}
                className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value="scribe">Certified Scribe</option>
                <option value="sign_language_interpreter">Sign Language Interpreter</option>
                <option value="reader">Exam / Lesson Reader</option>
                <option value="assistive_device">Assistive Technology Device</option>
                <option value="transportation">Wheelchair Campus Transport</option>
                <option value="accessible_material">Braille / High Contrast Material</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-200 font-semibold mb-1">Urgency Level</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scribe required for Chemistry Mid-Term"
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-blue-200 text-xs font-semibold mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe specific accommodations needed..."
              className="w-full bg-[#081a3b] border border-blue-400/30 rounded-xl p-3 text-xs text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg hover:opacity-95 transition"
          >
            Submit Request to Accessibility Coordinator
          </button>
        </form>
      )}

      {/* Ticket List */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center justify-between">
          <span>Active Service Requests ({serviceRequests.length})</span>
        </h3>

        <div className="space-y-3">
          {serviceRequests.map((req) => (
            <div key={req.id} className="bg-[#081a3b] border border-blue-400/20 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 font-mono">{req.ticketNumber}</span>
                  <span className="bg-[#0f2b5c] border border-cyan-500/30 text-cyan-200 px-2 py-0.5 rounded capitalize">
                    {req.serviceType.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black capitalize ${
                    req.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {req.status}
                  </span>

                  {req.status === 'pending' || req.status === 'under_review' ? (
                    <button
                      onClick={() => updateServiceRequestStatus(req.id, 'approved')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-2.5 py-1 rounded transition shadow-sm"
                    >
                      Approve Request
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="font-bold text-sm text-white">{req.title}</div>
              <p className="text-blue-100">{req.description}</p>
              <div className="text-[10px] text-blue-300 flex items-center justify-between pt-1 border-t border-blue-400/20">
                <span>Requested by: {req.requestedBy}</span>
                <span>Date: {req.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
