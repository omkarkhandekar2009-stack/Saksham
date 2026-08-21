'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  X,
  Info,
  Sparkles,
  Clock,
  UserCheck,
  Send,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { pwdJobsData, PwDJob, normalizeUrl } from '@/data/pwdJobsData';
import { pwdInternshipsData, PwDInternship } from '@/data/pwdInternshipsData';

type OpportunityItem = PwDJob | PwDInternship;

export default function OpportunitiesPage() {
  const searchInputId = useId();
  const locationSelectId = useId();
  const categorySelectId = useId();
  const workModeSelectId = useId();
  const relevanceSelectId = useId();

  // Active Tab: 'jobs' | 'internships'
  const [activeTab, setActiveTab] = useState<'jobs' | 'internships'>('jobs');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All Work Modes');
  const [selectedRelevance, setSelectedRelevance] = useState<string>('All Relevance Types');

  // Pagination State (10 items per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Saved Bookmarks
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Dialog / Modal States
  const [viewingDetailItem, setViewingDetailItem] = useState<{ item: OpportunityItem; isJob: boolean } | null>(null);
  const [applyingItem, setApplyingItem] = useState<{ title: string; company: string; applyUrl?: string; isJob: boolean } | null>(null);

  // Form State
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantSkills, setApplicantSkills] = useState<string>('');
  const [applicantAccommodations, setApplicantAccommodations] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Accessibility Focus & Announcement
  const [srAnnouncement, setSrAnnouncement] = useState<string>('');
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  // Active Dataset based on tab
  const activeDataset: OpportunityItem[] = activeTab === 'jobs' ? pwdJobsData : pwdInternshipsData;

  // Derived Unique Filter Lists based on Active Tab Dataset
  const locationsList = ['All Locations', ...Array.from(new Set(activeDataset.map((j) => j.location)))];
  const categoriesList = ['All Categories', ...Array.from(new Set(activeDataset.map((j) => j.category)))];
  const workModesList = ['All Work Modes', ...Array.from(new Set(activeDataset.map((j) => j.workMode)))];
  const relevanceList = ['All Relevance Types', ...Array.from(new Set(activeDataset.map((j) => j.relevance)))];

  // Filtering Dataset
  const filteredDataset = activeDataset.filter((item) => {
    if (selectedLocation !== 'All Locations' && item.location !== selectedLocation) return false;
    if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) return false;
    if (selectedWorkMode !== 'All Work Modes' && item.workMode !== selectedWorkMode) return false;
    if (selectedRelevance !== 'All Relevance Types' && item.relevance !== selectedRelevance) return false;

    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchTitle = (item.title || '').toLowerCase().includes(query);
      const matchCompany = (item.company || '').toLowerCase().includes(query);
      const matchCategory = (item.category || '').toLowerCase().includes(query);
      const matchLocation = (item.location || '').toLowerCase().includes(query);
      const matchRelevance = (item.relevance || '').toLowerCase().includes(query);
      if (!matchTitle && !matchCompany && !matchCategory && !matchLocation && !matchRelevance) return false;
    }
    return true;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredDataset.length / itemsPerPage) || 1;
  const paginatedDataset = filteredDataset.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page & filters when switching tabs
  const handleTabChange = (tab: 'jobs' | 'internships') => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedCategory('All Categories');
    setSelectedWorkMode('All Work Modes');
    setSelectedRelevance('All Relevance Types');
    setSrAnnouncement(`Switched tab to ${tab === 'jobs' ? 'Jobs' : 'Internships'}.`);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSrAnnouncement(`Found ${filteredDataset.length} matching ${activeTab}.`);
  }, [searchQuery, selectedLocation, selectedCategory, selectedWorkMode, selectedRelevance, activeTab]);

  // Handle Escape Key for Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewingDetailItem) setViewingDetailItem(null);
        if (applyingItem) setApplyingItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewingDetailItem, applyingItem]);

  // Focus trap / restoration helper
  const openModalWithFocus = (action: () => void) => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    action();
    setTimeout(() => {
      modalCloseButtonRef.current?.focus();
    }, 50);
  };

  const closeModalAndRestoreFocus = (closeAction: () => void) => {
    closeAction();
    setTimeout(() => {
      previousActiveElement.current?.focus();
    }, 50);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedCategory('All Categories');
    setSelectedWorkMode('All Work Modes');
    setSelectedRelevance('All Relevance Types');
    setSrAnnouncement(`Cleared all ${activeTab} filters.`);
  };

  const toggleSave = (id: string, title: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
      setSrAnnouncement(`Removed ${title} from saved listings.`);
    } else {
      setSavedIds([...savedIds, id]);
      setSrAnnouncement(`Saved ${title} to your bookmarked listings.`);
    }
  };

  const handleOpenApplyForm = (item: { title: string; company: string; applyUrl?: string; isJob: boolean }) => {
    setApplyingItem(item);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantSkills('');
    setApplicantAccommodations('');
    setSubmissionSuccess(false);
    setSrAnnouncement(`Opened application form for ${item.title}.`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionSuccess(true);
    setSrAnnouncement(`Submitted local expression of interest for ${applyingItem?.title}.`);
  };

  return (
    <div className="space-y-8 py-2 max-w-full overflow-hidden">
      {/* Screen Reader Announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {srAnnouncement}
      </div>

      {/* Hero Banner Header */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
        <div className="space-y-2.5 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Inclusive Career Opportunities
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Jobs & Internships for Every Ability
          </h1>
          <p className="text-base sm:text-lg font-bold text-cyan-300 italic">
            “Your skills define your future—not your barriers.”
          </p>
          <p className="text-sm text-blue-100/90 leading-relaxed">
            Explore accessible employment and internship opportunities across Jharkhand with PwD reservations and workplace accommodations.
          </p>
        </div>

        {/* Dynamic Local Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-[#081a3b] border border-cyan-500/20 rounded-2xl">
            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">CSV Jobs</div>
            <div className="text-xl sm:text-2xl font-black text-white">{pwdJobsData.length}</div>
          </div>
          <div className="p-3.5 bg-[#081a3b] border border-cyan-500/20 rounded-2xl">
            <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">CSV Internships</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-300">{pwdInternshipsData.length}</div>
          </div>
          <div className="p-3.5 bg-[#081a3b] border border-cyan-500/20 rounded-2xl">
            <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">Matching Search</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300">{filteredDataset.length}</div>
          </div>
          <div className="p-3.5 bg-[#081a3b] border border-cyan-500/20 rounded-2xl">
            <div className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Bookmarked</div>
            <div className="text-xl sm:text-2xl font-black text-blue-200">{savedIds.length}</div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
        {/* Navigation Tabs (Jobs / Internships) */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
            Select Opportunity Directory
          </h2>
          <div
            role="tablist"
            aria-label="Opportunities Category Tabs"
            className="flex flex-wrap items-center gap-3 border-b border-blue-400/20 pb-4"
          >
            <button
              role="tab"
              id="tab-jobs"
              aria-controls="panel-opportunities"
              aria-selected={activeTab === 'jobs'}
              tabIndex={activeTab === 'jobs' ? 0 : -1}
              onClick={() => handleTabChange('jobs')}
              className={`min-h-[44px] px-6 py-3 rounded-2xl text-sm font-bold transition-all border outline-none focus:ring-2 focus:ring-cyan-300 flex items-center gap-2 ${
                activeTab === 'jobs'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg border-cyan-400'
                  : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20 hover:bg-[#0c244d]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Jobs
            </button>

            <button
              role="tab"
              id="tab-internships"
              aria-controls="panel-opportunities"
              aria-selected={activeTab === 'internships'}
              tabIndex={activeTab === 'internships' ? 0 : -1}
              onClick={() => handleTabChange('internships')}
              className={`min-h-[44px] px-6 py-3 rounded-2xl text-sm font-bold transition-all border outline-none focus:ring-2 focus:ring-cyan-300 flex items-center gap-2 ${
                activeTab === 'internships'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg border-cyan-400'
                  : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20 hover:bg-[#0c244d]'
              }`}
            >
              <Clock className="w-4 h-4" />
              Internships
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-400" />
              Search & Filter {activeTab === 'jobs' ? 'Jobs' : 'Internships'}
            </h3>
            {(searchQuery || selectedLocation !== 'All Locations' || selectedCategory !== 'All Categories' || selectedWorkMode !== 'All Work Modes' || selectedRelevance !== 'All Relevance Types') && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-cyan-300 hover:text-white underline font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-300 p-1"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {/* Search Field */}
            <div className="space-y-1 xl:col-span-2">
              <label htmlFor={searchInputId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                Keyword Search
              </label>
              <div className="relative">
                <input
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab === 'jobs' ? 'jobs' : 'internships'} by title, company, category...`}
                  className="w-full bg-[#081a3b] text-white placeholder-blue-300/60 border border-cyan-500/30 rounded-xl py-2.5 pl-9 pr-8 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 min-h-[44px]"
                />
                <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Location Select */}
            <div className="space-y-1">
              <label htmlFor={locationSelectId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Location
              </label>
              <select
                id={locationSelectId}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 cursor-pointer min-h-[44px]"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#0f2b5c] text-white">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div className="space-y-1">
              <label htmlFor={categorySelectId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                Category
              </label>
              <select
                id={categorySelectId}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 cursor-pointer min-h-[44px]"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0f2b5c] text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Mode Select */}
            <div className="space-y-1">
              <label htmlFor={workModeSelectId} className="text-xs font-bold text-cyan-200 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                Work Mode
              </label>
              <select
                id={workModeSelectId}
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 cursor-pointer min-h-[44px]"
              >
                {workModesList.map((wm) => (
                  <option key={wm} value={wm} className="bg-[#0f2b5c] text-white">
                    {wm}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tab Specific Disclaimer Notice */}
        {activeTab === 'jobs' ? (
          <div className="p-4 bg-[#081a3b] border border-cyan-400/30 rounded-2xl text-xs text-cyan-100 flex items-start gap-3 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> Job information is based only on the provided source directory. Candidates must verify current vacancies, eligibility, deadlines, and PwD provisions on the official recruitment website before applying.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-[#081a3b] border border-cyan-400/30 rounded-2xl text-xs text-cyan-100 flex items-start gap-3 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> Internship information is based only on the provided source directory. Candidates must verify current availability, eligibility, deadlines, and PwD provisions on the official website before applying.
            </p>
          </div>
        )}

        {/* Results List Section */}
        <div id="panel-opportunities" role="tabpanel" aria-labelledby={activeTab === 'jobs' ? 'tab-jobs' : 'tab-internships'} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-400/20 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {activeTab === 'jobs' ? <Briefcase className="w-4 h-4 text-cyan-400" /> : <Clock className="w-4 h-4 text-cyan-400" />}
              Showing {filteredDataset.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filteredDataset.length)} of {filteredDataset.length} matching {activeTab}
            </h3>
            <span className="text-xs text-blue-300 font-medium">
              Source: Jharkhand PwD {activeTab === 'jobs' ? 'Jobs Directory (30 Records)' : 'Internships Directory (32 Records)'}
            </span>
          </div>

          {filteredDataset.length === 0 ? (
            <div className="p-10 text-center bg-[#081a3b] border border-cyan-500/20 rounded-2xl space-y-3">
              {activeTab === 'jobs' ? <Briefcase className="w-12 h-12 text-cyan-400/50 mx-auto" /> : <Clock className="w-12 h-12 text-cyan-400/50 mx-auto" />}
              <p className="text-base font-bold text-white">No {activeTab} match your search or filter criteria.</p>
              <p className="text-xs text-blue-200">
                Try adjusting your search query or resetting filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-300 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            /* Compact Single-Column List Rows Layout for Both Jobs and Internships */
            <div className="space-y-3">
              {paginatedDataset.map((item) => {
                const isSaved = savedIds.includes(item.id);
                const isJob = activeTab === 'jobs';

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#081a3b] border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
                  >
                    {/* Primary Content Row */}
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold border uppercase tracking-wider ${
                          isJob
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {item.category || (isJob ? 'Job' : 'Internship')}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-200 border border-blue-500/30">
                          {item.workMode || 'Not provided.'}
                        </span>
                        <span className="text-[11px] text-cyan-200/90 font-medium inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          {item.location || 'Not provided.'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-extrabold text-white leading-snug break-words">
                          {item.title}
                        </h4>
                        <p className="text-xs font-semibold text-cyan-200 mt-0.5">
                          {item.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-blue-200 pt-0.5">
                        <div>
                          <span className="text-blue-400 font-semibold">Relevance:</span>{' '}
                          <span className="text-emerald-300 font-semibold">{item.relevance || 'Not provided.'}</span>
                        </div>
                        <div>
                          <span className="text-blue-400 font-semibold">Deadline:</span>{' '}
                          <span className="text-white font-medium">{item.deadline || 'Not provided.'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 md:pl-4 border-t md:border-t-0 md:border-l border-blue-400/20 pt-3 md:pt-0">
                      <button
                        onClick={() => openModalWithFocus(() => setViewingDetailItem({ item, isJob }))}
                        aria-label={`View Details for ${item.title}`}
                        className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 bg-[#0f2b5c] hover:bg-[#123366] text-blue-100 hover:text-white font-bold text-xs rounded-xl border border-cyan-500/30 transition flex items-center justify-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-300"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        View Details
                      </button>

                      <button
                        onClick={() => toggleSave(item.id, item.title)}
                        aria-pressed={isSaved}
                        aria-label={isSaved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
                        className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border outline-none focus:ring-2 focus:ring-cyan-300 ${
                          isSaved
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-[#0f2b5c] hover:bg-[#123366] text-blue-200 border-cyan-500/30'
                        }`}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-cyan-400" />
                        )}
                      </button>

                      <button
                        onClick={() => openModalWithFocus(() => handleOpenApplyForm({ title: item.title, company: item.company, applyUrl: item.applyUrl, isJob }))}
                        aria-label={`Apply Now for ${item.title}`}
                        className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-300"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Apply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Accessible Pagination (10 per page) */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-blue-400/20">
              <div className="text-xs text-blue-200">
                Page <span className="font-bold text-white">{currentPage}</span> of{' '}
                <span className="font-bold text-white">{totalPages}</span> ({filteredDataset.length} total {activeTab})
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    setSrAnnouncement(`Navigated to page ${currentPage - 1}.`);
                  }}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#081a3b] text-blue-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-cyan-500/20 flex items-center gap-1 transition outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      setSrAnnouncement(`Navigated to page ${pageNum}.`);
                    }}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                    className={`min-h-[44px] w-11 rounded-xl text-xs font-bold transition border outline-none focus:ring-2 focus:ring-cyan-300 ${
                      currentPage === pageNum
                        ? 'bg-cyan-400 text-slate-950 font-black border-cyan-300 shadow-md'
                        : 'bg-[#081a3b] text-blue-200 hover:text-white border-cyan-500/20'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    setSrAnnouncement(`Navigated to page ${currentPage + 1}.`);
                  }}
                  disabled={currentPage === totalPages}
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

      {/* VIEW DETAILS MODAL FOR CSV ITEM (JOBS OR INTERNSHIPS) */}
      {viewingDetailItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => closeModalAndRestoreFocus(() => setViewingDetailItem(null))}
        >
          <div
            className="bg-[#0f2b5c] border border-cyan-400/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-detail-title"
          >
            <div className="flex items-start justify-between border-b border-blue-400/20 pb-3 gap-3">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1 border ${
                  viewingDetailItem.isJob
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {viewingDetailItem.isJob ? 'Directory Job Details' : 'Directory Internship Details'}
                </span>
                <h3 id="view-detail-title" className="text-lg font-extrabold text-white leading-snug">
                  {viewingDetailItem.item.title}
                </h3>
                <p className="text-xs font-semibold text-cyan-300 mt-0.5">
                  {viewingDetailItem.item.company}
                </p>
              </div>
              <button
                ref={modalCloseButtonRef}
                onClick={() => closeModalAndRestoreFocus(() => setViewingDetailItem(null))}
                className="p-1.5 text-blue-200 hover:text-white rounded-xl hover:bg-[#081a3b] transition outline-none focus:ring-2 focus:ring-cyan-300"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Available CSV Fields Only (No Description Box) */}
            <div className="space-y-3 text-xs text-blue-100">
              <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-[#081a3b] rounded-2xl border border-cyan-500/20">
                <div>
                  <span className="text-blue-400 font-semibold block text-[11px]">Location</span>
                  <span className="font-bold text-white">{viewingDetailItem.item.location || 'Not provided.'}</span>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold block text-[11px]">Work Mode</span>
                  <span className="font-bold text-white">{viewingDetailItem.item.workMode || 'Not provided.'}</span>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold block text-[11px]">Category</span>
                  <span className="font-bold text-white">{viewingDetailItem.item.category || 'Not provided.'}</span>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold block text-[11px]">Deadline</span>
                  <span className="font-bold text-white">{viewingDetailItem.item.deadline || 'Not provided.'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-blue-400 font-semibold block text-[11px]">PwD Relevance</span>
                  <span className="font-bold text-emerald-300">{viewingDetailItem.item.relevance || 'Not provided.'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-blue-400 font-semibold block text-[11px]">Recruitment Source</span>
                  <span className="font-bold text-cyan-200">{viewingDetailItem.item.source || 'Not provided.'}</span>
                </div>
              </div>

              {/* Normalized External Source Link */}
              {viewingDetailItem.item.applyUrl && (
                <div className="p-3 bg-[#081a3b] rounded-xl border border-blue-400/20 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-blue-300 uppercase font-bold block">Official Portal</span>
                    <span className="text-xs font-bold text-white">{viewingDetailItem.item.applyUrl}</span>
                  </div>
                  <a
                    href={normalizeUrl(viewingDetailItem.item.applyUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-3.5 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs rounded-xl border border-cyan-500/40 transition flex items-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-300"
                  >
                    <span>Open Official Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-blue-400/20">
              <button
                onClick={() => closeModalAndRestoreFocus(() => setViewingDetailItem(null))}
                className="min-h-[44px] px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs hover:bg-[#102a54] transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = viewingDetailItem;
                  closeModalAndRestoreFocus(() => setViewingDetailItem(null));
                  openModalWithFocus(() => handleOpenApplyForm({
                    title: target.item.title,
                    company: target.item.company,
                    applyUrl: target.item.applyUrl,
                    isJob: target.isJob
                  }));
                }}
                className="min-h-[44px] px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black rounded-xl text-xs hover:from-cyan-300 hover:to-blue-400 transition flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION FORM MODAL */}
      {applyingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => closeModalAndRestoreFocus(() => setApplyingItem(null))}
        >
          <div
            className="bg-[#0f2b5c] border border-cyan-400/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-form-title"
          >
            <div className="flex items-start justify-between border-b border-blue-400/20 pb-3 gap-3">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                  Expression of Interest
                </span>
                <h3 id="apply-form-title" className="text-lg font-extrabold text-white leading-tight">
                  {applyingItem.title}
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  Organization: <span className="text-cyan-200 font-semibold">{applyingItem.company}</span>
                </p>
              </div>
              <button
                ref={modalCloseButtonRef}
                onClick={() => closeModalAndRestoreFocus(() => setApplyingItem(null))}
                className="p-1.5 text-blue-200 hover:text-white rounded-xl hover:bg-[#081a3b] transition outline-none focus:ring-2 focus:ring-cyan-300"
                aria-label="Close application form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mandatory Exact Application Notice */}
            <div className="p-3.5 bg-[#081a3b] border border-cyan-400/30 rounded-2xl text-xs text-cyan-100 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Notice:</strong> “This is a prototype expression-of-interest form. Completing it does not submit an application to the organization. Use the official source link to complete the formal application.”
              </p>
            </div>

            {submissionSuccess ? (
              <div className="p-6 bg-[#081a3b] border border-emerald-500/40 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Expression of Interest Recorded!</h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Your local demo submission for <strong>{applyingItem.title}</strong> at <strong>{applyingItem.company}</strong> has been saved.
                </p>

                {applyingItem.applyUrl && (
                  <div className="pt-2">
                    <a
                      href={normalizeUrl(applyingItem.applyUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition inline-flex items-center gap-2"
                    >
                      <span>Open Official Application Source</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => closeModalAndRestoreFocus(() => setApplyingItem(null))}
                    className="min-h-[44px] px-6 py-2.5 bg-[#0f2b5c] text-blue-200 font-bold rounded-xl text-xs hover:bg-[#102a54] transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label htmlFor="form-full-name" className="font-bold text-white block">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="form-full-name"
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="form-email" className="font-bold text-white block">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="form-phone" className="font-bold text-white block">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-skills" className="font-bold text-white block">
                    Key Skills & Qualifications <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="form-skills"
                    type="text"
                    required
                    value={applicantSkills}
                    onChange={(e) => setApplicantSkills(e.target.value)}
                    placeholder="List your key skills, education, or relevant experience..."
                    className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 min-h-[44px]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-accommodations" className="font-bold text-white block">
                    Required Workplace Accommodations <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="form-accommodations"
                    rows={2}
                    required
                    value={applicantAccommodations}
                    onChange={(e) => setApplicantAccommodations(e.target.value)}
                    placeholder="Specify any accommodations needed (e.g. screen reader support, ramp access, flexible breaks)..."
                    className="w-full bg-[#081a3b] text-white border border-cyan-500/30 rounded-xl p-3 text-xs outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-blue-400/20">
                  {applyingItem.applyUrl ? (
                    <a
                      href={normalizeUrl(applyingItem.applyUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-white font-semibold text-xs flex items-center gap-1 underline focus:outline-none focus:ring-1 focus:ring-cyan-300 p-1"
                    >
                      <span>Open Official Application Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => closeModalAndRestoreFocus(() => setApplyingItem(null))}
                      className="min-h-[44px] px-4 py-2 bg-[#081a3b] text-blue-200 font-bold rounded-xl text-xs hover:bg-[#102a54] transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="min-h-[44px] px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black rounded-xl text-xs hover:from-cyan-300 hover:to-blue-400 transition flex items-center gap-1.5 shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Expression
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
