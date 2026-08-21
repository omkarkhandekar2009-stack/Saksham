'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  Shield,
  Lock,
  ArrowRight,
  Landmark,
  Eye,
  EyeOff,
  Volume2,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  FileCheck2,
  UserCheck,
  Building2,
  Award,
  Sparkles,
} from 'lucide-react';
import { AccessibilityEngine } from '@/lib/accessibility';

export default function LoginPage() {
  const router = useRouter();
  const { setRole, language } = useAppStore();

  const [loginMethod, setLoginMethod] = useState<'udid' | 'staff' | 'sso' | 'professional'>('udid');
  const [udidNumber, setUdidNumber] = useState('MH2710120060088192');
  const [dob, setDob] = useState('2006-05-14');
  const [staffEmail, setStaffEmail] = useState('principal@inclusive.edu.in');
  const [profEmail, setProfEmail] = useState('priya.kumari@sakshampath.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7N4K9');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let res = '';
    for (let i = 0; i < 5; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(res);
  };

  const handleVoiceCaptcha = () => {
    const spaced = captchaCode.split('').join(' ');
    AccessibilityEngine.speak(`Verification Code is: ${spaced}`, language);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (loginMethod === 'udid') {
        setRole('student');
      } else if (loginMethod === 'staff') {
        setRole('institution_staff');
      } else if (loginMethod === 'professional') {
        setRole('accessibility_professional');
      } else {
        setRole('government');
      }
      setIsLoading(false);
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Professional Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-xl tracking-wider text-slate-900">
              Sak<span className="text-blue-600">sham</span>
            </span>
            <p className="text-[10px] text-slate-500 font-medium">
              National Inclusive Education & Accessibility Gateway
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="hidden sm:inline">Official Statutory Portal</span>
          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
            RPWD Act 2016 Aligned
          </span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-xl mx-auto w-full my-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          {/* Header Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Select your authentication method below to securely access your student accommodations, professional assignments, audits, or administrative portal.
            </p>
          </div>

          {/* Authentication Method 4-Tab Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setLoginMethod('udid')}
              className={`py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                loginMethod === 'udid'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="text-center">UDID / Student</span>
            </button>

            <button
              type="button"
              onClick={() => setLoginMethod('staff')}
              className={`py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                loginMethod === 'staff'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-center">Staff & Educator</span>
            </button>

            <button
              type="button"
              onClick={() => setLoginMethod('sso')}
              className={`py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                loginMethod === 'sso'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span className="text-center">Government SSO</span>
            </button>

            <button
              type="button"
              onClick={() => setLoginMethod('professional')}
              className={`py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                loginMethod === 'professional'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span className="text-center">Accessibility Pro</span>
            </button>
          </div>


          {/* FORM BODY */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* METHOD 1: UDID CARD LOGIN */}
            {loginMethod === 'udid' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">
                      Swavlamban UDID Card Number
                    </label>
                    <span className="text-[10px] text-blue-600 font-semibold">18-Digit Card ID</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={udidNumber}
                      onChange={(e) => setUdidNumber(e.target.value)}
                      placeholder="e.g. MH2710120060088192"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-mono tracking-wider focus:outline-none"
                      required
                    />
                    <div className="absolute right-3 top-3 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> UDID Verified
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Unique Disability ID issued under Department of Empowerment of Persons with Disabilities.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Date of Birth / Security PIN
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* METHOD 2: INSTITUTIONAL STAFF LOGIN */}
            {loginMethod === 'staff' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Institutional Email / Employee ID
                  </label>
                  <input
                    type="email"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    placeholder="name@institution.edu.in"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Password</label>
                    <a href="#" className="text-[11px] text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* METHOD 3: GOVERNMENT SSO */}
            {loginMethod === 'sso' && (
              <div className="p-6 bg-blue-50/60 border border-blue-200 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">National Government Single Sign-On</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Official single sign-on for Education Authorities, District Officers, and Government Disability Commissioners via <strong>MeriPehchaan</strong> or <strong>Jan Parichay</strong>.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate with MeriPehchaan (Govt SSO)</span>
                </button>
              </div>
            )}

            {/* METHOD 4: ACCESSIBILITY PROFESSIONAL LOGIN */}
            {loginMethod === 'professional' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">
                      Professional Email / Registration ID
                    </label>
                    <span className="text-[10px] text-blue-600 font-semibold">RCI / Certified Roster</span>
                  </div>
                  <input
                    type="email"
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    placeholder="e.g. priya.kumari@sakshampath.org"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none font-mono"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Certified Scribe, Sign Language Interpreter, Lesson Reader, or Special Educator account.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Password</label>
                    <a href="#" className="text-[11px] text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                  <span className="text-[11px] text-slate-700 font-medium">New Support Professional?</span>
                  <Link
                    href="/auth/register-professional"
                    className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                  >
                    <span>Register for Verification</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}


            {/* CAPTCHA / ACCESSIBLE SECURITY CODE (FOR METHODS 1 & 2) */}
            {loginMethod !== 'sso' && (
              <>
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <label className="block font-bold text-slate-700">Security Verification Code</label>
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-200 text-slate-900 font-mono text-base font-black tracking-widest px-4 py-2 rounded-xl select-none border border-slate-300">
                      {captchaCode}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition border border-slate-200"
                      title="Generate new verification code"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleVoiceCaptcha}
                      className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition border border-blue-200 flex items-center gap-1 text-[11px] font-bold"
                      title="Listen to verification code (Audio Captcha)"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Audio Captcha</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter code above..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    Remember this device for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl text-sm shadow-lg transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <span>Authenticating Credentials...</span>
                  ) : (
                    <>
                      <span>Secure Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Registration & Support Footer */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2 text-xs text-slate-500">
            <p>
              New specially abled student without a profile?{' '}
              <Link href="/auth/register" className="font-bold text-blue-600 hover:underline">
                Register UDID Profile
              </Link>
            </p>
            <p className="text-[11px]">
              Need accessibility or login assistance?{' '}
              <a href="#" className="font-semibold text-slate-700 hover:underline">
                National Disability Helpdesk (1800-11-2026)
              </a>
            </p>
          </div>
        </div>

        {/* Security & Compliance Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
            <span>WCAG 2.1 AAA Compliant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-teal-600" />
            <span>ISO 27001 Data Protected</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal Footer */}
      <footer className="max-w-4xl mx-auto w-full pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
        <p>&copy; 2026 Saksham. All rights reserved. Ministry of Education & RPWD Act 2016 Compliant.</p>
        <p className="text-[11px] text-slate-400">
          Designed for inclusive accessibility with Web Speech Voice API and screen reader compatibility.
        </p>
      </footer>
    </div>
  );
}
