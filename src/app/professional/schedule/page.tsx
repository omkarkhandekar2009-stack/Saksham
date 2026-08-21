'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Clock,
  Calendar,
  MapPin,
  CheckCircle2,
  Save,
  Check,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from 'lucide-react';

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ProfessionalSchedulePage() {
  const { professionals, activeProfessionalId, updateProfessionalAvailability } = useAppStore();
  const activeProf = professionals.find((p) => p.id === activeProfessionalId) || professionals[0];

  const [availableDays, setAvailableDays] = useState<string[]>(activeProf?.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [availableHours, setAvailableHours] = useState(activeProf?.availableHours || '09:00 AM - 05:00 PM');
  const [serviceArea, setServiceArea] = useState(activeProf?.serviceArea || 'Ranchi Urban, Morabadi & Doranda');
  const [preference, setPreference] = useState<'remote' | 'in_person' | 'both'>(activeProf?.preference || 'both');
  const [isAvailableNow, setIsAvailableNow] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleDay = (day: string) => {
    if (availableDays.includes(day)) {
      if (availableDays.length > 1) {
        setAvailableDays(availableDays.filter((d) => d !== day));
      }
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfessionalAvailability(activeProf.id, availableDays, availableHours, serviceArea, preference);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Banner */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full">
              Duty Schedule &amp; Matching Engine
            </span>
            <span className="text-[11px] text-blue-200">| Weekly Routine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Availability &amp; Schedule Settings
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl mt-1 leading-relaxed">
            Configure your active support hours, available weekdays, and service zones to receive automated matching requests from nearby schools and colleges.
          </p>
        </div>

        {/* Live Availability Toggle */}
        <div className="p-4 bg-[#081a3b] border border-cyan-500/30 rounded-2xl flex items-center gap-4 shrink-0 shadow-md">
          <div>
            <div className="text-xs font-bold text-white">Duty Availability Status</div>
            <div className="text-[11px] text-emerald-400 font-semibold">
              {isAvailableNow ? '● Ready for New Assignments' : '○ Paused / Unavailable'}
            </div>
          </div>
          <button
            onClick={() => setIsAvailableNow(!isAvailableNow)}
            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isAvailableNow
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {isAvailableNow ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6 text-slate-400" />}
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-400/40 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in-50 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Schedule Preferences Updated!</strong> Matching algorithm will prioritize requests in your designated hours and service area.
          </span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 text-xs">
        {/* Weekly Day Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-white">
            Available Weekdays (Select all that apply)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {ALL_DAYS.map((day) => {
              const isSelected = availableDays.includes(day);
              return (
                <div
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition text-center space-y-1 ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold border-cyan-300 shadow-md'
                      : 'bg-[#081a3b] border-blue-400/20 text-blue-200 hover:border-blue-400/50'
                  }`}
                >
                  <span className="block text-xs">{day.slice(0, 3)}</span>
                  <span className="text-[10px] opacity-80 block">{isSelected ? 'Active' : 'Off'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operating Hours & Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-blue-400/20">
          <div className="space-y-2">
            <label className="block font-bold text-white text-xs">
              Daily Duty Hours Window
            </label>
            <div className="relative">
              <input
                type="text"
                value={availableHours}
                onChange={(e) => setAvailableHours(e.target.value)}
                placeholder="e.g. 09:00 AM - 05:00 PM"
                className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-3 text-xs text-white focus:outline-none"
                required
              />
              <Clock className="w-4 h-4 text-cyan-400 absolute right-3 top-3.5" />
            </div>
            <p className="text-[11px] text-blue-300">
              Exam scribe duty shifts typically range from 2 to 4 hours per session.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-white text-xs">
              Delivery Preference Mode
            </label>
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value as any)}
              className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-3 text-xs text-white focus:outline-none"
            >
              <option value="both">Both In-Person Campus &amp; Remote Digital Support</option>
              <option value="in_person">In-Person Exam Halls &amp; Classrooms Only</option>
              <option value="remote">Remote / Digital Sign Language &amp; Reading Sessions Only</option>
            </select>
            <p className="text-[11px] text-blue-300">
              Select if you are available to travel to exam centers or provide online remote assistance.
            </p>
          </div>
        </div>

        {/* Service Area / Neighborhoods */}
        <div className="space-y-2 pt-2 border-t border-blue-400/20">
          <label className="block font-bold text-white text-xs">
            Service Coverage Area / Neighborhoods
          </label>
          <div className="relative">
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              placeholder="e.g. Ranchi Urban, Kanke Road, Doranda, Morabadi"
              className="w-full bg-[#081a3b] border border-blue-400/30 focus:border-cyan-400 rounded-xl p-3 text-xs text-white focus:outline-none"
              required
            />
            <MapPin className="w-4 h-4 text-emerald-400 absolute right-3 top-3.5" />
          </div>
          <p className="text-[11px] text-blue-300">
            Designate the colleges, schools, or radius where you can provide in-person assistance.
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Availability Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
