import { useState, useEffect } from 'react';
import {
  Role,
  Student,
  ServiceRequest,
  ExamAccommodation,
  InstitutionAudit,
  ComplianceRequirement,
  InstitutionComplianceRecord,
  IncidentReport,
  GovernancePolicy,
  AIRecommendation,
  NotificationItem,
  AccessibilitySettings,
  AccessibilityProfessional,
  SupportRequest,
  ProfessionalAssignment,
} from '@/types';
import {
  mockStudents,
  mockServiceRequests,
  mockExamAccommodations,
  mockAudits,
  mockComplianceRequirements,
  mockComplianceRecords,
  mockIncidents,
  mockPolicies,
  mockAIRecommendations,
  mockNotifications,
  mockProfessionals,
  mockSupportRequests,
  mockAssignments,
} from './seedData';
import { Language } from './i18n';

interface AppState {
  isAuthenticated: boolean;
  currentRole: Role;
  language: Language;
  accessibilitySettings: AccessibilitySettings;
  students: Student[];
  serviceRequests: ServiceRequest[];
  examAccommodations: ExamAccommodation[];
  audits: InstitutionAudit[];
  complianceRequirements: ComplianceRequirement[];
  complianceRecords: InstitutionComplianceRecord[];
  incidents: IncidentReport[];
  policies: GovernancePolicy[];
  aiRecommendations: AIRecommendation[];
  notifications: NotificationItem[];
  professionals: AccessibilityProfessional[];
  supportRequests: SupportRequest[];
  assignments: ProfessionalAssignment[];
  activeProfessionalId: string;
  demoFlowStep: number | null; // null = inactive, 1..7 = active step
  videoIntroKey: number;
  playVideoIntro: () => void;
}

const defaultAccessibilitySettings: AccessibilitySettings = {
  contrastMode: 'normal',
  fontSizeScale: 100,
  dyslexicFont: false,
  screenReaderActive: false,
  speechRate: 1.0,
  reducedMotion: false,
  voiceInputActive: false,
  activeLanguage: 'hi',
};

// Deterministic initial state for server and client hydration
class Store {
  private state: AppState = {
    isAuthenticated: false,
    currentRole: 'student',
    language: 'hi',
    accessibilitySettings: defaultAccessibilitySettings,
    students: mockStudents,
    serviceRequests: mockServiceRequests,
    examAccommodations: mockExamAccommodations,
    audits: mockAudits,
    complianceRequirements: mockComplianceRequirements,
    complianceRecords: mockComplianceRecords,
    incidents: mockIncidents,
    policies: mockPolicies,
    aiRecommendations: mockAIRecommendations,
    notifications: mockNotifications,
    professionals: mockProfessionals,
    supportRequests: mockSupportRequests,
    assignments: mockAssignments,
    activeProfessionalId: 'prof-1',
    demoFlowStep: null,
    videoIntroKey: 0,
    playVideoIntro: () => {},
  };

  private listeners: Set<() => void> = new Set();

  public getState(): AppState {
    return this.state;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public setRole(role: Role) {
    this.state.currentRole = role;
    this.state.isAuthenticated = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem('saksham_role', role);
      localStorage.setItem('saksham_auth', 'true');
    }
    this.notify();
  }

  public login(role: Role) {
    this.state.isAuthenticated = true;
    this.state.currentRole = role;
    if (typeof window !== 'undefined') {
      localStorage.setItem('saksham_role', role);
      localStorage.setItem('saksham_auth', 'true');
    }
    this.notify();
  }

  public logout() {
    this.state.isAuthenticated = false;
    this.state.currentRole = 'student';
    if (typeof window !== 'undefined') {
      localStorage.removeItem('saksham_role');
      localStorage.removeItem('saksham_auth');
    }
    this.notify();
  }

  public setAuth(isAuthenticated: boolean, role?: Role) {
    this.state.isAuthenticated = isAuthenticated;
    if (role) this.state.currentRole = role;
    if (typeof window !== 'undefined') {
      if (isAuthenticated) {
        localStorage.setItem('saksham_auth', 'true');
        if (role) localStorage.setItem('saksham_role', role);
      } else {
        localStorage.removeItem('saksham_auth');
        localStorage.removeItem('saksham_role');
      }
    }
    this.notify();
  }

  public setLanguage(lang: Language) {
    this.state.language = lang;
    this.state.accessibilitySettings.activeLanguage = lang;
    if (typeof window !== 'undefined') localStorage.setItem('saksham_lang', lang);
    this.notify();
  }

  public updateAccessibilitySettings(partial: Partial<AccessibilitySettings>) {
    this.state.accessibilitySettings = { ...this.state.accessibilitySettings, ...partial };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('saksham_access_settings', JSON.stringify(this.state.accessibilitySettings));
      } catch (e) {}
    }
    this.notify();
  }

  public addStudent(student: Student) {
    this.state.students = [student, ...this.state.students];
    this.notify();
  }

  public addServiceRequest(req: ServiceRequest) {
    this.state.serviceRequests = [req, ...this.state.serviceRequests];
    this.notify();
  }

  public updateServiceRequestStatus(id: string, status: ServiceRequest['status']) {
    this.state.serviceRequests = this.state.serviceRequests.map((s) => (s.id === id ? { ...s, status } : s));
    this.notify();
  }

  public addIncidentReport(inc: IncidentReport) {
    this.state.incidents = [inc, ...this.state.incidents];
    this.notify();
  }

  // --- Accessibility Professional Methods ---
  public registerProfessional(
    profData: Omit<AccessibilityProfessional, 'id' | 'status' | 'registeredAt' | 'rating' | 'completedSessions' | 'supportHours'>
  ): AccessibilityProfessional {
    const newProf: AccessibilityProfessional = {
      ...profData,
      id: `prof-${Date.now()}`,
      status: 'pending_verification',
      rating: 5.0,
      completedSessions: 0,
      supportHours: 0,
      registeredAt: new Date().toISOString().split('T')[0],
    };
    this.state.professionals = [newProf, ...this.state.professionals];
    this.state.activeProfessionalId = newProf.id;
    this.state.currentRole = 'accessibility_professional';

    // Add notification for staff/admin
    this.addNotification({
      id: `notif-prof-reg-${Date.now()}`,
      title: 'New Professional Verification Pending',
      message: `${newProf.name} registered for ${newProf.primaryService.replace(/_/g, ' ')} (${newProf.district}).`,
      type: 'info',
      targetRoles: ['institution_staff', 'government', 'institution_admin'],
      timestamp: 'Just now',
      isRead: false,
    });

    this.notify();
    return newProf;
  }

  public verifyProfessional(id: string) {
    this.state.professionals = this.state.professionals.map((p) =>
      p.id === id ? { ...p, status: 'verified' } : p
    );
    this.addNotification({
      id: `notif-prof-ver-${Date.now()}`,
      title: 'Professional Verified',
      message: `Profile verified and added to Saksham Active Service Roster.`,
      type: 'success',
      targetRoles: ['accessibility_professional'],
      timestamp: 'Just now',
      isRead: false,
    });
    this.notify();
  }

  public suspendProfessional(id: string) {
    this.state.professionals = this.state.professionals.map((p) =>
      p.id === id ? { ...p, status: 'suspended' } : p
    );
    this.notify();
  }

  public updateProfessionalAvailability(
    id: string,
    days: string[],
    hours: string,
    serviceArea: string,
    preference: 'remote' | 'in_person' | 'both'
  ) {
    this.state.professionals = this.state.professionals.map((p) =>
      p.id === id
        ? {
            ...p,
            availableDays: days,
            availableHours: hours,
            serviceArea,
            preference,
          }
        : p
    );
    this.notify();
  }

  public updateProfessionalProfile(id: string, updates: Partial<AccessibilityProfessional>) {
    this.state.professionals = this.state.professionals.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    this.notify();
  }

  public submitSupportRequest(
    reqData: Omit<SupportRequest, 'id' | 'status' | 'createdAt'>
  ): SupportRequest {
    const newReq: SupportRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'matching',
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.state.supportRequests = [newReq, ...this.state.supportRequests];

    // Notify professionals
    this.addNotification({
      id: `notif-req-${Date.now()}`,
      title: 'New Accessibility Support Request',
      message: `New ${newReq.supportType.replace(/_/g, ' ')} request in ${newReq.district} on ${newReq.date}.`,
      type: 'info',
      targetRoles: ['accessibility_professional'],
      timestamp: 'Just now',
      isRead: false,
    });

    this.notify();
    return newReq;
  }

  public acceptSupportRequest(requestId: string, professionalId: string) {
    const req = this.state.supportRequests.find((r) => r.id === requestId);
    const prof = this.state.professionals.find((p) => p.id === professionalId);

    if (req && prof) {
      // Update request status
      this.state.supportRequests = this.state.supportRequests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'accepted',
              assignedProfessionalId: prof.id,
              assignedProfessionalName: prof.name,
            }
          : r
      );

      // Create new assignment
      const newAssignment: ProfessionalAssignment = {
        id: `asg-${Date.now()}`,
        requestId: req.id,
        studentId: req.studentId,
        studentName: req.studentName,
        institutionName: req.institutionName,
        supportType: req.supportType,
        subjectOrEvent: req.subjectOrEvent,
        date: req.date,
        time: req.time,
        durationHours: req.durationHours,
        location: req.location,
        status: 'accepted',
        professionalId: prof.id,
        professionalName: prof.name,
        compensation: '₹1,200 (State Sponsored)',
      };

      this.state.assignments = [newAssignment, ...this.state.assignments];

      // Notify student
      this.addNotification({
        id: `notif-asg-std-${Date.now()}`,
        title: 'Support Request Accepted',
        message: `${prof.name} (${prof.qualification}) has accepted your ${req.supportType.replace(/_/g, ' ')} request for ${req.date}.`,
        type: 'success',
        targetRoles: ['student', 'parent'],
        timestamp: 'Just now',
        isRead: false,
      });

      // Notify staff
      this.addNotification({
        id: `notif-asg-staff-${Date.now()}`,
        title: 'Accessibility Assignment Confirmed',
        message: `${prof.name} assigned to student ${req.studentName} for ${req.subjectOrEvent}.`,
        type: 'info',
        targetRoles: ['institution_staff', 'examination_coordinator'],
        timestamp: 'Just now',
        isRead: false,
      });
    }

    this.notify();
  }

  public completeAssignment(assignmentId: string) {
    this.state.assignments = this.state.assignments.map((a) =>
      a.id === assignmentId ? { ...a, status: 'completed' } : a
    );
    this.notify();
  }

  public addNotification(notif: NotificationItem) {
    this.state.notifications = [notif, ...this.state.notifications];
    this.notify();
  }

  public setDemoFlowStep(step: number | null) {
    this.state.demoFlowStep = step;
    this.notify();
  }

  public triggerVideoIntro() {
    this.state.videoIntroKey = Date.now();
    this.notify();
  }
}


export const globalStore = new Store();

export function useAppStore() {
  const [state, setState] = useState<AppState>(globalStore.getState());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Sync from localStorage after client hydration is complete
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('saksham_auth') === 'true';
      const savedRole = localStorage.getItem('saksham_role') as Role;
      if (isAuth && savedRole) {
        globalStore.setAuth(true, savedRole);
      } else {
        globalStore.setAuth(false, savedRole || 'student');
      }
      const savedLang = localStorage.getItem('saksham_lang') as Language;
      if (savedLang && savedLang !== globalStore.getState().language) {
        globalStore.setLanguage(savedLang);
      }
      const savedSettings = localStorage.getItem('saksham_access_settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          globalStore.updateAccessibilitySettings(parsed);
        } catch (e) {}
      }
    }

    const unsubscribe = globalStore.subscribe(() => {
      setState({ ...globalStore.getState() });
    });
    return unsubscribe;
  }, []);

  return {
    ...state,
    mounted,
    login: (role: Role) => globalStore.login(role),
    setAuth: (isAuth: boolean, role?: Role) => globalStore.setAuth(isAuth, role),
    setRole: (role: Role) => globalStore.setRole(role),
    logout: () => globalStore.logout(),
    setLanguage: (lang: Language) => globalStore.setLanguage(lang),
    updateAccessibilitySettings: (p: Partial<AccessibilitySettings>) => globalStore.updateAccessibilitySettings(p),
    addStudent: (student: Student) => globalStore.addStudent(student),
    addServiceRequest: (req: ServiceRequest) => globalStore.addServiceRequest(req),
    updateServiceRequestStatus: (id: string, status: ServiceRequest['status']) => globalStore.updateServiceRequestStatus(id, status),
    addIncidentReport: (inc: IncidentReport) => globalStore.addIncidentReport(inc),
    setDemoFlowStep: (step: number | null) => globalStore.setDemoFlowStep(step),
    registerProfessional: (prof: any) => globalStore.registerProfessional(prof),
    verifyProfessional: (id: string) => globalStore.verifyProfessional(id),
    suspendProfessional: (id: string) => globalStore.suspendProfessional(id),
    updateProfessionalAvailability: (id: string, days: string[], hours: string, area: string, pref: any) =>
      globalStore.updateProfessionalAvailability(id, days, hours, area, pref),
    updateProfessionalProfile: (id: string, updates: any) => globalStore.updateProfessionalProfile(id, updates),
    submitSupportRequest: (req: any) => globalStore.submitSupportRequest(req),
    acceptSupportRequest: (reqId: string, profId: string) => globalStore.acceptSupportRequest(reqId, profId),
    completeAssignment: (asgId: string) => globalStore.completeAssignment(asgId),
    addNotification: (notif: NotificationItem) => globalStore.addNotification(notif),
    playVideoIntro: () => globalStore.triggerVideoIntro(),
  };
}
