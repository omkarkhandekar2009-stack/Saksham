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
} from './seedData';
import { Language } from './i18n';

interface AppState {
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
  demoFlowStep: number | null; // null = inactive, 1..7 = active step
}

const defaultAccessibilitySettings: AccessibilitySettings = {
  contrastMode: 'normal',
  fontSizeScale: 100,
  dyslexicFont: false,
  screenReaderActive: false,
  speechRate: 1.0,
  reducedMotion: false,
  voiceInputActive: false,
  activeLanguage: 'en',
};

// Deterministic initial state for server and client hydration
class Store {
  private state: AppState = {
    currentRole: 'student',
    language: 'en',
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
    demoFlowStep: null,
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
    if (typeof window !== 'undefined') localStorage.setItem('saksham_role', role);
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

  public setDemoFlowStep(step: number | null) {
    this.state.demoFlowStep = step;
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
      const savedRole = localStorage.getItem('saksham_role') as Role;
      if (savedRole && savedRole !== globalStore.getState().currentRole) {
        globalStore.setRole(savedRole);
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
    setRole: (role: Role) => globalStore.setRole(role),
    setLanguage: (lang: Language) => globalStore.setLanguage(lang),
    updateAccessibilitySettings: (p: Partial<AccessibilitySettings>) => globalStore.updateAccessibilitySettings(p),
    addStudent: (student: Student) => globalStore.addStudent(student),
    addServiceRequest: (req: ServiceRequest) => globalStore.addServiceRequest(req),
    updateServiceRequestStatus: (id: string, status: ServiceRequest['status']) => globalStore.updateServiceRequestStatus(id, status),
    addIncidentReport: (inc: IncidentReport) => globalStore.addIncidentReport(inc),
    setDemoFlowStep: (step: number | null) => globalStore.setDemoFlowStep(step),
  };
}
