'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import {
  Search,
  Filter,
  X,
  Info,
  MapPin,
  School,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  FileText,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { jharkhandSchoolsData, SpecialSchool } from '@/data/jharkhandSchoolsData';
import { jharkhandCollegesData, SpecialEducationInstitute, normalizeWebsiteUrl } from '@/data/jharkhandCollegesData';

type RatingParamKey = 'all' | 'infrastructure' | 'digital' | 'washroom' | 'laboratory' | 'emergency';

const DEFAULT_ACCESSIBILITY_RATING = {
  infrastructure: 12,
  digital: 10,
  washroom: 11,
  laboratory: 12,
  emergency: 13,
  overall: 58,
  ratingBasis: "Predefined prototype estimate — requires an on-site accessibility audit."
};

function InstitutionRatingsSection({
  institution,
  activeParam,
  setActiveParam,
}: {
  institution: SpecialSchool | SpecialEducationInstitute;
  activeParam: RatingParamKey;
  setActiveParam: (param: RatingParamKey) => void;
}) {
  const hasExactRating = institution.total_accessibility_rating_out_of_100 !== undefined;

  const rating = hasExactRating
    ? {
        infrastructure: institution.accessible_infrastructure_out_of_20!,
        digital: institution.digital_accessibility_out_of_20!,
        washroom: institution.accessible_washrooms_out_of_20!,
        laboratory: institution.accessible_laboratory_and_learning_facilities_out_of_20!,
        emergency: institution.emergency_and_support_services_out_of_20!,
        overall: institution.total_accessibility_rating_out_of_100!,
        ratingBasis: institution.rating_basis!,
        isFallback: false,
      }
    : {
        ...DEFAULT_ACCESSIBILITY_RATING,
        isFallback: true,
      };

  return (
    <div className="space-y-4 pt-2 border-t border-blue-400/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Accessibility Ratings Assessment
          </h4>
          <p className="text-[11px] text-cyan-200 mt-0.5">
            Basis: <span className="text-white font-medium">{rating.ratingBasis}</span>
          </p>
        </div>

        <div className="bg-[#081a3b] border border-cyan-400/30 px-3 py-1.5 rounded-xl text-right shrink-0">
          <span className="text-[10px] text-blue-300 uppercase font-bold block">Overall Rating</span>
          <span className="text-lg font-black text-emerald-400">
            {rating.overall} <span className="text-xs text-blue-300 font-normal">/ 100</span>
          </span>
        </div>
      </div>

      <div className="p-3 bg-[#081a3b] border border-cyan-400/30 rounded-xl text-[11px] text-cyan-100 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          {rating.isFallback
            ? "“Predefined prototype estimate — not based on a completed institutional audit and not an official Government of Jharkhand certification.”"
            : "“Prototype estimate — requires an on-site accessibility audit. This is not an official Government of Jharkhand certification.”"}
        </span>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
          Filter Rating Parameters
        </div>
        <div
          role="group"
          aria-label="Filter rating parameters"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full"
        >
          {(['all', 'infrastructure', 'digital', 'washroom', 'laboratory', 'emergency'] as const).map((param) => {
            const isSelected = activeParam === param;
            return (
              <button
                key={param}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveParam(param)}
                className={`min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-bold capitalize transition-all border outline-none focus:ring-2 focus:ring-cyan-300 flex items-center justify-center text-center break-words leading-tight w-full ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black shadow-md border-cyan-300 ring-1 ring-cyan-300/40'
                    : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20 hover:bg-[#0c244d]'
                }`}
              >
                {param}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {(activeParam === 'all' || activeParam === 'infrastructure') && (
          <div className="p-3 bg-[#081a3b] rounded-xl border border-cyan-500/20 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-white">Accessible Infrastructure</span>
              <span className="text-cyan-300">{rating.infrastructure} / 20</span>
            </div>
            <div
              className="w-full bg-[#0f2b5c] rounded-full h-2.5 overflow-hidden border border-cyan-500/20"
              role="progressbar"
              aria-valuenow={rating.infrastructure}
              aria-valuemin={0}
              aria-valuemax={20}
            >
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full transition-all duration-300"
                style={{ width: `${(rating.infrastructure / 20) * 100}%` }}
              />
            </div>
          </div>
        )}

        {(activeParam === 'all' || activeParam === 'digital') && (
          <div className="p-3 bg-[#081a3b] rounded-xl border border-cyan-500/20 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-white">Digital Accessibility</span>
              <span className="text-cyan-300">{rating.digital} / 20</span>
            </div>
            <div
              className="w-full bg-[#0f2b5c] rounded-full h-2.5 overflow-hidden border border-cyan-500/20"
              role="progressbar"
              aria-valuenow={rating.digital}
              aria-valuemin={0}
              aria-valuemax={20}
            >
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full transition-all duration-300"
                style={{ width: `${(rating.digital / 20) * 100}%` }}
              />
            </div>
          </div>
        )}

        {(activeParam === 'all' || activeParam === 'washroom') && (
          <div className="p-3 bg-[#081a3b] rounded-xl border border-cyan-500/20 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-white">Accessible Washrooms</span>
              <span className="text-cyan-300">{rating.washroom} / 20</span>
            </div>
            <div
              className="w-full bg-[#0f2b5c] rounded-full h-2.5 overflow-hidden border border-cyan-500/20"
              role="progressbar"
              aria-valuenow={rating.washroom}
              aria-valuemin={0}
              aria-valuemax={20}
            >
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full transition-all duration-300"
                style={{ width: `${(rating.washroom / 20) * 100}%` }}
              />
            </div>
          </div>
        )}

        {(activeParam === 'all' || activeParam === 'laboratory') && (
          <div className="p-3 bg-[#081a3b] rounded-xl border border-cyan-500/20 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-white">Laboratory & Learning Facilities</span>
              <span className="text-cyan-300">{rating.laboratory} / 20</span>
            </div>
            <div
              className="w-full bg-[#0f2b5c] rounded-full h-2.5 overflow-hidden border border-cyan-500/20"
              role="progressbar"
              aria-valuenow={rating.laboratory}
              aria-valuemin={0}
              aria-valuemax={20}
            >
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full transition-all duration-300"
                style={{ width: `${(rating.laboratory / 20) * 100}%` }}
              />
            </div>
          </div>
        )}

        {(activeParam === 'all' || activeParam === 'emergency') && (
          <div className="p-3 bg-[#081a3b] rounded-xl border border-cyan-500/20 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-white">Emergency & Support Services</span>
              <span className="text-cyan-300">{rating.emergency} / 20</span>
            </div>
            <div
              className="w-full bg-[#0f2b5c] rounded-full h-2.5 overflow-hidden border border-cyan-500/20"
              role="progressbar"
              aria-valuenow={rating.emergency}
              aria-valuemin={0}
              aria-valuemax={20}
            >
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full transition-all duration-300"
                style={{ width: `${(rating.emergency / 20) * 100}%` }}
              />
            </div>
          </div>
        )}

        {activeParam === 'all' && (
          <div className="p-3.5 bg-[#0f2b5c] rounded-xl border border-cyan-400/40 space-y-1.5">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-cyan-300">Total Accessibility Rating Score</span>
              <span className="text-emerald-400">{rating.overall} / 100</span>
            </div>
            <div
              className="w-full bg-[#081a3b] rounded-full h-3 overflow-hidden border border-cyan-500/30"
              role="progressbar"
              aria-valuenow={rating.overall}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${(rating.overall / 100) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuditPage() {
  const searchInputId = useId();
  const districtSelectId = useId();

  // Navigation Tab: 'schools' | 'colleges'
  const [selectedTab, setSelectedTab] = useState<'schools' | 'colleges'>('schools');

  // Search & District Filter States for Schools
  const [schoolSearchQuery, setSchoolSearchQuery] = useState<string>('');
  const [schoolSelectedDistrict, setSchoolSelectedDistrict] = useState<string>('All Districts');
  const [schoolCurrentPage, setSchoolCurrentPage] = useState<number>(1);

  // Search & District Filter States for Colleges
  const [collegeSearchQuery, setCollegeSearchQuery] = useState<string>('');
  const [collegeSelectedDistrict, setCollegeSelectedDistrict] = useState<string>('All Districts');
  const [collegeCurrentPage, setCollegeCurrentPage] = useState<number>(1);

  const itemsPerPage = 10;

  // Modal / Popup States
  const [viewingSchool, setViewingSchool] = useState<SpecialSchool | null>(null);
  const [viewingCollege, setViewingCollege] = useState<SpecialEducationInstitute | null>(null);
  const [activeRatingParam, setActiveRatingParam] = useState<RatingParamKey>('all');

  // Accessibility Focus & Screen Reader Announcements
  const [srAnnouncement, setSrAnnouncement] = useState<string>('');
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  // Dynamic District Lists
  const schoolDistricts = ['All Districts', ...Array.from(new Set(jharkhandSchoolsData.map((s) => s.district)))];
  const collegeDistricts = ['All Districts', ...Array.from(new Set(jharkhandCollegesData.map((c) => c.district)))];

  // Filtering Schools Data
  const filteredSchools = jharkhandSchoolsData.filter((school) => {
    if (schoolSelectedDistrict !== 'All Districts' && school.district !== schoolSelectedDistrict) return false;

    const query = schoolSearchQuery.toLowerCase().trim();
    if (query) {
      const matchName = school.institution_name.toLowerCase().includes(query);
      const matchType = school.institution_type.toLowerCase().includes(query);
      const matchFocus = school.disability_focus.toLowerCase().includes(query);
      const matchDistrict = school.district.toLowerCase().includes(query);
      const matchAddress = school.address.toLowerCase().includes(query);
      if (!matchName && !matchType && !matchFocus && !matchDistrict && !matchAddress) return false;
    }
    return true;
  });

  const totalSchoolPages = Math.ceil(filteredSchools.length / itemsPerPage) || 1;
  const paginatedSchools = filteredSchools.slice((schoolCurrentPage - 1) * itemsPerPage, schoolCurrentPage * itemsPerPage);

  // Filtering Colleges Data
  const filteredColleges = jharkhandCollegesData.filter((college) => {
    if (collegeSelectedDistrict !== 'All Districts' && college.district !== collegeSelectedDistrict) return false;

    const query = collegeSearchQuery.toLowerCase().trim();
    if (query) {
      const matchName = college.institution_name.toLowerCase().includes(query);
      const matchType = college.institution_type.toLowerCase().includes(query);
      const matchRci = college.rci_code.toLowerCase().includes(query);
      const matchFocus = college.disability_focus.toLowerCase().includes(query);
      const matchCourses = college.courses_or_services.toLowerCase().includes(query);
      const matchDistrict = college.district.toLowerCase().includes(query);
      const matchAddress = college.address.toLowerCase().includes(query);
      if (!matchName && !matchType && !matchRci && !matchFocus && !matchCourses && !matchDistrict && !matchAddress) return false;
    }
    return true;
  });

  const totalCollegePages = Math.ceil(filteredColleges.length / itemsPerPage) || 1;
  const paginatedColleges = filteredColleges.slice((collegeCurrentPage - 1) * itemsPerPage, collegeCurrentPage * itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setSchoolCurrentPage(1);
    setSrAnnouncement(`Found ${filteredSchools.length} matching schools.`);
  }, [schoolSearchQuery, schoolSelectedDistrict]);

  useEffect(() => {
    setCollegeCurrentPage(1);
    setSrAnnouncement(`Found ${filteredColleges.length} matching colleges.`);
  }, [collegeSearchQuery, collegeSelectedDistrict]);

  // Handle Escape Key for Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewingSchool) setViewingSchool(null);
        if (viewingCollege) setViewingCollege(null);
        setTimeout(() => previousActiveElement.current?.focus(), 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewingSchool, viewingCollege]);

  const handleOpenSchoolModal = (school: SpecialSchool) => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    setViewingSchool(school);
    setActiveRatingParam('all');
    setSrAnnouncement(`Opened details and accessibility ratings for ${school.institution_name}.`);
    setTimeout(() => modalCloseButtonRef.current?.focus(), 50);
  };

  const handleOpenCollegeModal = (college: SpecialEducationInstitute) => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    setViewingCollege(college);
    setActiveRatingParam('all');
    setSrAnnouncement(`Opened details for ${college.institution_name}.`);
    setTimeout(() => modalCloseButtonRef.current?.focus(), 50);
  };

  const handleCloseModal = () => {
    setViewingSchool(null);
    setViewingCollege(null);
    setTimeout(() => previousActiveElement.current?.focus(), 50);
  };

  const handleTabChange = (tab: 'schools' | 'colleges') => {
    setSelectedTab(tab);
    setSrAnnouncement(`Switched tab to ${tab === 'schools' ? 'Schools' : 'Colleges & Higher Education'}.`);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: 'schools' | 'colleges') => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextTab = currentTab === 'schools' ? 'colleges' : 'schools';
      handleTabChange(nextTab);
      document.getElementById(`tab-${nextTab}`)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleTabChange('schools');
      document.getElementById('tab-schools')?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      handleTabChange('colleges');
      document.getElementById('tab-colleges')?.focus();
    }
  };

  const clearSchoolFilters = () => {
    setSchoolSearchQuery('');
    setSchoolSelectedDistrict('All Districts');
    setSrAnnouncement('Cleared school search and district filters.');
  };

  const clearCollegeFilters = () => {
    setCollegeSearchQuery('');
    setCollegeSelectedDistrict('All Districts');
    setSrAnnouncement('Cleared college search and district filters.');
  };

  return (
    <div className="space-y-8 py-2 max-w-full overflow-hidden">
      {/* Screen Reader Announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {srAnnouncement}
      </div>

      {/* Hero Banner Header */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="space-y-2 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Jharkhand Institution Accessibility Directory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Institutional Accessibility Audit & Assessment
          </h1>
          <p className="text-sm font-semibold text-cyan-200/90 italic leading-relaxed">
            “Every barrier removed opens a new path to learning, independence, and opportunity.”
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-3.5 bg-[#081a3b]/90 border border-cyan-400/25 rounded-2xl text-xs text-cyan-100 flex items-start gap-2.5 shadow-inner">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> Prototype accessibility scores for demonstration only — not official Government of Jharkhand certifications.
          </p>
        </div>
      </div>

      {/* Tabs and Content Section */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
        {/* Category Navigation Tabs */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
            Select Directory Category
          </h2>
          <div
            role="tablist"
            aria-label="Institution Category Tabs"
            className="flex flex-wrap items-center gap-3 border-b border-blue-400/20 pb-4"
          >
            <button
              role="tab"
              id="tab-schools"
              aria-controls="panel-schools"
              aria-selected={selectedTab === 'schools'}
              tabIndex={selectedTab === 'schools' ? 0 : -1}
              onClick={() => handleTabChange('schools')}
              onKeyDown={(e) => handleTabKeyDown(e, 'schools')}
              className={`min-h-[44px] px-6 py-3 rounded-2xl text-sm font-bold transition-all border outline-none focus:ring-2 focus:ring-cyan-300 flex items-center gap-2 ${
                selectedTab === 'schools'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg border-cyan-400'
                  : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20 hover:bg-[#0c244d]'
              }`}
            >
              <School className="w-4 h-4" />
              Schools
            </button>

            <button
              role="tab"
              id="tab-colleges"
              aria-controls="panel-colleges"
              aria-selected={selectedTab === 'colleges'}
              tabIndex={selectedTab === 'colleges' ? 0 : -1}
              onClick={() => handleTabChange('colleges')}
              onKeyDown={(e) => handleTabKeyDown(e, 'colleges')}
              className={`min-h-[44px] px-6 py-3 rounded-2xl text-sm font-bold transition-all border outline-none focus:ring-2 focus:ring-cyan-300 flex items-center gap-2 ${
                selectedTab === 'colleges'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg border-cyan-400'
                  : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20 hover:bg-[#0c244d]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Colleges & Higher Education
            </button>
          </div>
        </div>

        {/* SCHOOLS TAB CONTENT */}
        {selectedTab === 'schools' && (
          <div id="panel-schools" role="tabpanel" aria-labelledby="tab-schools" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  Search & Filter Special Schools
                </h3>
                {(schoolSearchQuery || schoolSelectedDistrict !== 'All Districts') && (
                  <button
                    onClick={clearSchoolFilters}
                    className="text-xs text-cyan-300 hover:text-white underline font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-300 p-1"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor={searchInputId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    Keyword Search
                  </label>
                  <div className="relative">
                    <input
                      id={searchInputId}
                      type="text"
                      value={schoolSearchQuery}
                      onChange={(e) => setSchoolSearchQuery(e.target.value)}
                      placeholder="Search by school name, type, disability focus, district, or address..."
                      className="w-full bg-[#081a3b] text-white placeholder-blue-300/60 border border-cyan-500/30 rounded-xl py-2.5 pl-9 pr-8 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 min-h-[44px]"
                    />
                    <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                    {schoolSearchQuery && (
                      <button
                        onClick={() => setSchoolSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor={districtSelectId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    District
                  </label>
                  <select
                    id={districtSelectId}
                    value={schoolSelectedDistrict}
                    onChange={(e) => setSchoolSelectedDistrict(e.target.value)}
                    className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 cursor-pointer min-h-[44px]"
                  >
                    {schoolDistricts.map((d) => (
                      <option key={d} value={d} className="bg-[#0f2b5c] text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredSchools.length === 0 ? (
                <div className="p-10 text-center bg-[#081a3b] border border-cyan-500/20 rounded-2xl space-y-3">
                  <School className="w-12 h-12 text-cyan-400/50 mx-auto" />
                  <p className="text-base font-bold text-white">No special schools match your search or filter criteria.</p>
                  <p className="text-xs text-blue-200">
                    Try adjusting your search query or selecting "All Districts".
                  </p>
                  <button
                    onClick={clearSchoolFilters}
                    className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-300 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedSchools.map((school) => (
                    <div
                      key={school.institution_name}
                      className="p-4 rounded-2xl bg-[#081a3b] border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                            {school.institution_type}
                          </span>
                          <span className="text-[11px] text-cyan-200/90 font-medium inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                            {school.district}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-white leading-snug break-words">
                            {school.institution_name}
                          </h4>
                          <p className="text-xs font-semibold text-cyan-200 mt-0.5">
                            Focus: <span className="text-white font-normal">{school.disability_focus}</span>
                          </p>
                        </div>

                        <p className="text-xs text-blue-200/80 truncate max-w-2xl">
                          <span className="text-blue-400 font-medium">Address:</span> {school.address}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 md:pl-4 border-t md:border-t-0 md:border-l border-blue-400/20 pt-3 md:pt-0">
                        <button
                          onClick={() => handleOpenSchoolModal(school)}
                          aria-label={`View Details & Ratings for ${school.institution_name}`}
                          className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-cyan-300"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Details & Ratings
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalSchoolPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-blue-400/20">
                  <div className="text-xs text-blue-200">
                    Page <span className="font-bold text-white">{schoolCurrentPage}</span> of{' '}
                    <span className="font-bold text-white">{totalSchoolPages}</span> ({filteredSchools.length} total schools)
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSchoolCurrentPage((p) => Math.max(1, p - 1));
                        setSrAnnouncement(`Navigated to page ${schoolCurrentPage - 1}.`);
                      }}
                      disabled={schoolCurrentPage === 1}
                      aria-label="Previous Page"
                      className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#081a3b] text-blue-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-cyan-500/20 flex items-center gap-1 transition outline-none focus:ring-2 focus:ring-cyan-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>

                    {Array.from({ length: totalSchoolPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setSchoolCurrentPage(pageNum);
                          setSrAnnouncement(`Navigated to page ${pageNum}.`);
                        }}
                        aria-label={`Page ${pageNum}`}
                        aria-current={schoolCurrentPage === pageNum ? 'page' : undefined}
                        className={`min-h-[44px] w-11 rounded-xl text-xs font-bold transition border outline-none focus:ring-2 focus:ring-cyan-300 ${
                          schoolCurrentPage === pageNum
                            ? 'bg-cyan-400 text-slate-950 font-black border-cyan-300 shadow-md'
                            : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setSchoolCurrentPage((p) => Math.min(totalSchoolPages, p + 1));
                        setSrAnnouncement(`Navigated to page ${schoolCurrentPage + 1}.`);
                      }}
                      disabled={schoolCurrentPage === totalSchoolPages}
                      aria-label="Next Page"
                      className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#081a3b] text-blue-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-cyan-500/20 flex items-center gap-1 transition outline-none focus:ring-2 focus:ring-cyan-300"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* COLLEGES & HIGHER EDUCATION TAB CONTENT */}
        {selectedTab === 'colleges' && (
          <div id="panel-colleges" role="tabpanel" aria-labelledby="tab-colleges" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  Search & Filter Special Education Institutes
                </h3>
                {(collegeSearchQuery || collegeSelectedDistrict !== 'All Districts') && (
                  <button
                    onClick={clearCollegeFilters}
                    className="text-xs text-cyan-300 hover:text-white underline font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-300 p-1"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor={searchInputId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    Keyword Search
                  </label>
                  <div className="relative">
                    <input
                      id={searchInputId}
                      type="text"
                      value={collegeSearchQuery}
                      onChange={(e) => setCollegeSearchQuery(e.target.value)}
                      placeholder="Search name, type, RCI code, focus, courses, district, or address..."
                      className="w-full bg-[#081a3b] text-white placeholder-blue-300/60 border border-cyan-500/30 rounded-xl py-2.5 pl-9 pr-8 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 min-h-[44px]"
                    />
                    <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                    {collegeSearchQuery && (
                      <button
                        onClick={() => setCollegeSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor={districtSelectId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    District
                  </label>
                  <select
                    id={districtSelectId}
                    value={collegeSelectedDistrict}
                    onChange={(e) => setCollegeSelectedDistrict(e.target.value)}
                    className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 cursor-pointer min-h-[44px]"
                  >
                    {collegeDistricts.map((d) => (
                      <option key={d} value={d} className="bg-[#0f2b5c] text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredColleges.length === 0 ? (
                <div className="p-10 text-center bg-[#081a3b] border border-cyan-500/20 rounded-2xl space-y-3">
                  <GraduationCap className="w-12 h-12 text-cyan-400/50 mx-auto" />
                  <p className="text-base font-bold text-white">No institutes match your search or filter criteria.</p>
                  <p className="text-xs text-blue-200">
                    Try adjusting your search query or selecting "All Districts".
                  </p>
                  <button
                    onClick={clearCollegeFilters}
                    className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-300 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedColleges.map((college) => (
                    <div
                      key={college.institution_name}
                      className="p-4 rounded-2xl bg-[#081a3b] border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                            {college.institution_type}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-950 text-emerald-300 border border-emerald-500/30">
                            RCI: {college.rci_code}
                          </span>
                          <span className="text-[11px] text-cyan-200/90 font-medium inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                            {college.district}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-white leading-snug break-words">
                            {college.institution_name}
                          </h4>
                          <p className="text-xs font-semibold text-cyan-200 mt-0.5">
                            Courses / Services: <span className="text-white font-normal">{college.courses_or_services}</span>
                          </p>
                        </div>

                        <p className="text-xs text-blue-200/80 truncate max-w-2xl">
                          <span className="text-blue-400 font-medium">Disability Focus:</span> {college.disability_focus}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 md:pl-4 border-t md:border-t-0 md:border-l border-blue-400/20 pt-3 md:pt-0">
                        <button
                          onClick={() => handleOpenCollegeModal(college)}
                          aria-label={`View Details & Ratings for ${college.institution_name}`}
                          className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-cyan-300"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Details & Ratings
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalCollegePages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-blue-400/20">
                  <div className="text-xs text-blue-200">
                    Page <span className="font-bold text-white">{collegeCurrentPage}</span> of{' '}
                    <span className="font-bold text-white">{totalCollegePages}</span> ({filteredColleges.length} total institutes)
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCollegeCurrentPage((p) => Math.max(1, p - 1));
                        setSrAnnouncement(`Navigated to page ${collegeCurrentPage - 1}.`);
                      }}
                      disabled={collegeCurrentPage === 1}
                      aria-label="Previous Page"
                      className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#081a3b] text-blue-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-cyan-500/20 flex items-center gap-1 transition outline-none focus:ring-2 focus:ring-cyan-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>

                    {Array.from({ length: totalCollegePages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCollegeCurrentPage(pageNum);
                          setSrAnnouncement(`Navigated to page ${pageNum}.`);
                        }}
                        aria-label={`Page ${pageNum}`}
                        aria-current={collegeCurrentPage === pageNum ? 'page' : undefined}
                        className={`min-h-[44px] w-11 rounded-xl text-xs font-bold transition border outline-none focus:ring-2 focus:ring-cyan-300 ${
                          collegeCurrentPage === pageNum
                            ? 'bg-cyan-400 text-slate-950 font-black border-cyan-300 shadow-md'
                            : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setCollegeCurrentPage((p) => Math.min(totalCollegePages, p + 1));
                        setSrAnnouncement(`Navigated to page ${collegeCurrentPage + 1}.`);
                      }}
                      disabled={collegeCurrentPage === totalCollegePages}
                      aria-label="Next Page"
                      className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#081a3b] text-blue-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-cyan-500/20 flex items-center gap-1 transition outline-none focus:ring-2 focus:ring-cyan-300"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SCHOOL DETAILS & RATINGS POPUP MODAL */}
      {viewingSchool && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#0f2b5c] border border-cyan-400/40 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="school-details-title"
          >
            <div className="flex items-start justify-between border-b border-blue-400/20 pb-3 gap-3">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-1">
                  Special School Record
                </span>
                <h3 id="school-details-title" className="text-xl font-extrabold text-white leading-snug">
                  {viewingSchool.institution_name}
                </h3>
                <p className="text-xs font-semibold text-cyan-200 mt-0.5">
                  District: <span className="text-white font-bold">{viewingSchool.district}</span>
                </p>
              </div>
              <button
                ref={modalCloseButtonRef}
                onClick={handleCloseModal}
                className="p-1.5 text-blue-200 hover:text-white rounded-xl hover:bg-[#081a3b] transition outline-none focus:ring-2 focus:ring-cyan-300"
                aria-label="Close details dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-blue-100">
              <div className="p-4 bg-[#081a3b] rounded-2xl border border-cyan-500/20 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-blue-400 font-semibold block text-[11px]">Institution Name</span>
                    <span className="font-bold text-white text-sm">{viewingSchool.institution_name}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold block text-[11px]">Institution Type</span>
                    <span className="font-bold text-white">{viewingSchool.institution_type}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-blue-400 font-semibold block text-[11px]">Disability Focus</span>
                    <span className="font-bold text-cyan-300">{viewingSchool.disability_focus}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold block text-[11px]">District</span>
                    <span className="font-bold text-white">{viewingSchool.district}</span>
                  </div>
                  {viewingSchool.pincode && (
                    <div>
                      <span className="text-blue-400 font-semibold block text-[11px]">Pincode</span>
                      <span className="font-bold text-white">{viewingSchool.pincode}</span>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <span className="text-blue-400 font-semibold block text-[11px]">Address</span>
                    <span className="font-semibold text-white leading-relaxed">{viewingSchool.address}</span>
                  </div>
                  {viewingSchool.website && (
                    <div className="sm:col-span-2">
                      <span className="text-blue-400 font-semibold block text-[11px]">Official Website</span>
                      <a
                        href={normalizeWebsiteUrl(viewingSchool.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Official Website for ${viewingSchool.institution_name}`}
                        className="font-bold text-cyan-300 hover:text-white underline transition break-all"
                      >
                        {viewingSchool.website}
                      </a>
                    </div>
                  )}
                </div>

                {(viewingSchool.phone || viewingSchool.email) && (
                  <div className="pt-2 border-t border-blue-400/20 flex flex-wrap items-center gap-4">
                    {viewingSchool.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-blue-400 font-semibold text-[11px]">Phone:</span>
                        <div className="flex flex-wrap gap-1 font-bold text-cyan-300">
                          {viewingSchool.phone.split(';').map((pNum, idx) => {
                            const trimmed = pNum.trim();
                            return (
                              <a
                                key={idx}
                                href={`tel:${trimmed.replace(/\s+/g, '')}`}
                                className="underline hover:text-white transition focus:outline-none focus:ring-1 focus:ring-cyan-300 p-0.5"
                              >
                                {trimmed}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {viewingSchool.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-blue-400 font-semibold text-[11px]">Email:</span>
                        <div className="flex flex-wrap gap-1 font-bold text-cyan-300">
                          {viewingSchool.email.split(';').map((eAddr, idx) => {
                            const trimmed = eAddr.trim();
                            return (
                              <a
                                key={idx}
                                href={`mailto:${trimmed}`}
                                className="underline hover:text-white transition focus:outline-none focus:ring-1 focus:ring-cyan-300 p-0.5"
                              >
                                {trimmed}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {viewingSchool.website && (
                <div className="p-3 bg-[#081a3b] rounded-xl border border-blue-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-blue-300 uppercase font-bold block">SCHOOL WEB PORTAL</span>
                    <a
                      href={normalizeWebsiteUrl(viewingSchool.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Official Website for ${viewingSchool.institution_name}`}
                      className="text-xs font-bold text-white hover:text-cyan-300 underline transition break-all"
                    >
                      {viewingSchool.website}
                    </a>
                  </div>
                  <a
                    href={normalizeWebsiteUrl(viewingSchool.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Official Website for ${viewingSchool.institution_name}`}
                    className="min-h-[44px] px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-300 shrink-0"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* UNIFIED RATINGS SECTION */}
              <InstitutionRatingsSection
                institution={viewingSchool}
                activeParam={activeRatingParam}
                setActiveParam={setActiveRatingParam}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-blue-400/20">
              <button
                onClick={handleCloseModal}
                className="min-h-[44px] px-6 py-2.5 bg-cyan-400 text-slate-950 font-black rounded-xl text-xs hover:bg-cyan-300 transition shadow-md outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COLLEGE / SPECIAL EDUCATION INSTITUTE DETAILS MODAL */}
      {viewingCollege && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#0f2b5c] border border-cyan-400/40 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="college-details-title"
          >
            <div className="flex items-start justify-between border-b border-blue-400/20 pb-3 gap-3">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-1">
                  Special Education Institute Record
                </span>
                <h3 id="college-details-title" className="text-xl font-extrabold text-white leading-snug">
                  {viewingCollege.institution_name}
                </h3>
                <p className="text-xs font-semibold text-cyan-200 mt-0.5">
                  RCI Code: <span className="text-white font-bold">{viewingCollege.rci_code}</span> | District: <span className="text-white font-bold">{viewingCollege.district}</span>
                </p>
              </div>
              <button
                ref={modalCloseButtonRef}
                onClick={handleCloseModal}
                className="p-1.5 text-blue-200 hover:text-white rounded-xl hover:bg-[#081a3b] transition outline-none focus:ring-2 focus:ring-cyan-300"
                aria-label="Close details dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-blue-100">
              <div className="p-4 bg-[#081a3b] rounded-2xl border border-cyan-500/20 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-blue-400 font-semibold block text-[11px]">Institution Name</span>
                    <span className="font-bold text-white text-sm">{viewingCollege.institution_name}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold block text-[11px]">Institution Type</span>
                    <span className="font-bold text-white">{viewingCollege.institution_type}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold block text-[11px]">RCI Code</span>
                    <span className="font-bold text-emerald-300">{viewingCollege.rci_code}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold block text-[11px]">District</span>
                    <span className="font-bold text-white">{viewingCollege.district}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-blue-400 font-semibold block text-[11px]">Disability Focus</span>
                    <span className="font-bold text-cyan-300">{viewingCollege.disability_focus}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-blue-400 font-semibold block text-[11px]">Courses or Services</span>
                    <span className="font-semibold text-white leading-relaxed">{viewingCollege.courses_or_services}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-blue-400 font-semibold block text-[11px]">Address</span>
                    <span className="font-semibold text-white leading-relaxed">{viewingCollege.address}</span>
                  </div>
                  {viewingCollege.pincode && (
                    <div>
                      <span className="text-blue-400 font-semibold block text-[11px]">Pincode</span>
                      <span className="font-bold text-white">{viewingCollege.pincode}</span>
                    </div>
                  )}
                  {viewingCollege.website && (
                    <div className="sm:col-span-2">
                      <span className="text-blue-400 font-semibold block text-[11px]">Official Website</span>
                      <a
                        href={normalizeWebsiteUrl(viewingCollege.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Official Website for ${viewingCollege.institution_name}`}
                        className="font-bold text-cyan-300 hover:text-white underline transition break-all"
                      >
                        {viewingCollege.website}
                      </a>
                    </div>
                  )}
                </div>

                {(viewingCollege.phone || viewingCollege.email) && (
                  <div className="pt-2 border-t border-blue-400/20 flex flex-wrap items-center gap-4">
                    {viewingCollege.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-blue-400 font-semibold text-[11px]">Phone:</span>
                        <div className="flex flex-wrap gap-1 font-bold text-cyan-300">
                          {viewingCollege.phone.split(';').map((pNum, idx) => {
                            const trimmed = pNum.trim();
                            return (
                              <a
                                key={idx}
                                href={`tel:${trimmed.replace(/\s+/g, '')}`}
                                className="underline hover:text-white transition focus:outline-none focus:ring-1 focus:ring-cyan-300 p-0.5"
                              >
                                {trimmed}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {viewingCollege.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-blue-400 font-semibold text-[11px]">Email:</span>
                        <div className="flex flex-wrap gap-1 font-bold text-cyan-300">
                          {viewingCollege.email.split(';').map((eAddr, idx) => {
                            const trimmed = eAddr.trim();
                            return (
                              <a
                                key={idx}
                                href={`mailto:${trimmed}`}
                                className="underline hover:text-white transition focus:outline-none focus:ring-1 focus:ring-cyan-300 p-0.5"
                              >
                                {trimmed}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {viewingCollege.website && (
                <div className="p-3 bg-[#081a3b] rounded-xl border border-blue-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-blue-300 uppercase font-bold block">Institution Web Portal</span>
                    <a
                      href={normalizeWebsiteUrl(viewingCollege.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Official Website for ${viewingCollege.institution_name}`}
                      className="text-xs font-bold text-white hover:text-cyan-300 underline transition break-all"
                    >
                      {viewingCollege.website}
                    </a>
                  </div>
                  <a
                    href={normalizeWebsiteUrl(viewingCollege.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Official Website for ${viewingCollege.institution_name}`}
                    className="min-h-[44px] px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-300 shrink-0"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* UNIFIED RATINGS SECTION */}
              <InstitutionRatingsSection
                institution={viewingCollege}
                activeParam={activeRatingParam}
                setActiveParam={setActiveRatingParam}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-blue-400/20">
              <button
                onClick={handleCloseModal}
                className="min-h-[44px] px-6 py-2.5 bg-cyan-400 text-slate-950 font-black rounded-xl text-xs hover:bg-cyan-300 transition shadow-md outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
