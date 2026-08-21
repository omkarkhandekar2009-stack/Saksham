'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { useAppStore } from '@/lib/store';
import { AccessibilityBar } from '@/components/accessibility/AccessibilityBar';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AIChatDrawer } from '@/components/ai/AIChatDrawer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { accessibilitySettings } = useAppStore();

  const isPublicPage = pathname === '/' || pathname.startsWith('/auth');

  const themeClass =
    accessibilitySettings.contrastMode === 'high-contrast-yellow'
      ? 'high-contrast-yellow'
      : accessibilitySettings.contrastMode === 'high-contrast-blue'
      ? 'high-contrast-blue'
      : accessibilitySettings.contrastMode === 'dark'
      ? 'contrast-dark'
      : isPublicPage
      ? 'bg-white text-slate-900'
      : 'bg-[#08152e] text-slate-100';

  const fontClass = accessibilitySettings.dyslexicFont ? 'font-dyslexic' : '';

  return (
    <html
      lang={accessibilitySettings.activeLanguage}
      className={`${themeClass} ${fontClass}`}
      style={{ fontSize: `${accessibilitySettings.fontSizeScale}%` }}
    >
      <head>
        <title>Saksham — Inclusive Education Governance & Accessibility Ecosystem</title>
        <meta name="description" content="AI-powered inclusive education, student accessibility, compliance & governance platform." />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        {/* Render Accessibility Bar on all pages for WCAG compliance */}
        <AccessibilityBar />

        {isPublicPage ? (
          /* Public Layout: Full width, No Sidebar, Standalone clean experience */
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
        ) : (
          /* Authenticated / App Ecosystem Layout: Full Sidebar, Navbar and AIChatDrawer */
          <>
            <Navbar />
            <div className="flex flex-1 bg-[#08152e]">
              <Sidebar />
              <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full bg-[#08152e]">
                {children}
              </main>
            </div>
            <AIChatDrawer />
          </>
        )}
      </body>
    </html>
  );
}
