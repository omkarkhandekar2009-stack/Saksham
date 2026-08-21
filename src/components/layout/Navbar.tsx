'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Shield, Bell } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { notifications } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="bg-[#0f2b5c] border-b border-cyan-500/30 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-500 p-0.5 shadow-md group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#081a3b] rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="leading-none">
            <div className="flex items-baseline gap-2">
              <span className="font-black text-2xl tracking-tight text-white">
                Sak<span className="text-cyan-300">sham</span>
              </span>
              <span className="hidden md:inline text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                सक्षम
              </span>
            </div>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-200 hidden sm:block">
              Inclusive Education &amp; Student Empowerment
            </p>
          </div>
        </Link>

        {/* Right Action Icons & User Info */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
};
