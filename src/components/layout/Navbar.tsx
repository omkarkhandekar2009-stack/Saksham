'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { i18n } from '@/lib/i18n';
import { Shield, Bell, Search, Building2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRole, language, notifications } = useAppStore();
  const t = i18n[language];
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="bg-[#0f2b5c] border-b border-cyan-500/30 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-500 p-0.5 shadow-md group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#081a3b] rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wider text-white">
                INCLUDE<span className="text-cyan-400">360</span>
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/40">
                SIH1500
              </span>
            </div>
            <p className="text-[10px] text-blue-200 font-medium hidden sm:block">
              {t.subTagline}
            </p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md items-center bg-[#081a3b] border border-blue-400/30 focus-within:border-cyan-400 rounded-xl px-3 py-1.5 transition">
          <Search className="w-4 h-4 text-cyan-300 mr-2" />
          <input
            type="text"
            placeholder="Search students, scribes, audits, compliance laws..."
            className="bg-transparent w-full text-xs text-white placeholder-blue-300 focus:outline-none"
          />
        </div>

        {/* Right Action Icons & User Info */}
        <div className="flex items-center gap-3">
          {/* Kiosk Mode Quick Link */}
          <Link
            href="/kiosk"
            className="hidden lg:flex items-center gap-1.5 bg-[#123366] hover:bg-[#184282] text-cyan-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-cyan-400/30 transition"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            Kiosk Mode
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-[#081a3b] hover:bg-[#123366] text-blue-200 border border-blue-400/30 transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-cyan-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0f2b5c] border border-cyan-500/30 rounded-xl shadow-2xl p-3 z-50 text-xs text-white">
                <div className="flex items-center justify-between pb-2 border-b border-blue-400/20 font-bold">
                  <span className="text-white">Notifications</span>
                  <span className="text-[10px] text-cyan-300">{unreadCount} Unread</span>
                </div>
                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 bg-[#081a3b] rounded-lg border border-blue-400/20 hover:border-cyan-400/40"
                    >
                      <div className="font-semibold text-cyan-300 flex items-center justify-between">
                        <span>{n.title}</span>
                        <span className="text-[9px] text-blue-300">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-blue-100 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Role Badge */}
          <div className="flex items-center gap-2 bg-[#081a3b] border border-cyan-400/30 rounded-xl px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[9px] text-cyan-300 uppercase font-bold tracking-wider">Active Role</div>
              <div className="text-xs font-black text-white capitalize">{currentRole.replace('_', ' ')}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
