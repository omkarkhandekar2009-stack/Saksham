export type Role =
  | 'student'
  | 'institution_staff'
  | 'government'
  | 'accessibility_professional'
  | 'professional'
  | 'parent'
  | 'teacher'
  | 'special_educator'
  | 'counselor'
  | 'accessibility_coordinator'
  | 'examination_coordinator'
  | 'institution_admin'
  | 'principal'
  | 'support_staff'
  | 'it_admin'
  | 'auditor'
  | 'district_officer'
  | 'government_authority'
  | 'super_admin';


export type DisabilityCategory =
  | 'visual'
  | 'hearing'
  | 'mobility'
  | 'speech'
  | 'cognitive'
  | 'learning_difficulties'
  | 'neurodiverse'
  | 'temporary';

export type CommunicationPreference = 'sign_language' | 'audio' | 'large_text' | 'tactile' | 'simplified_text' | 'standard';
export type LearningFormatPreference = 'audio_visual' | 'text_to_speech' | 'braille_digital' | 'simplified_syntax' | 'interactive';
export type ExaminationFormatPreference = 'extra_time' | 'scribe' | 'reader' | 'digital_accessible' | 'alternative_format';

export interface AccessibilityProfile {
  id: string;
  studentId: string;
  categories: DisabilityCategory[];
  primaryCategory: DisabilityCategory;
  severity: 'mild' | 'moderate' | 'severe';
  communicationPreference: CommunicationPreference;
  learningFormatPreference: LearningFormatPreference;
  examinationFormatPreference: ExaminationFormatPreference;
  assistiveTechNeeded: string[];
  classroomAccommodationsNeeded: string[];
  digitalAccommodationsNeeded: string[];
  transportationNeeded: boolean;
  notes?: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  fullName: string;
  age: number;
  grade: string;
  section: string;
  institutionId: string;
  institutionName: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  emergencyContact: string;
  disabilityPercentage?: number;
  udidCardNumber?: string;
  profileImage?: string;
  accessibilityProfile: AccessibilityProfile;
  academicPerformanceScore: number; // 0-100
  supportHistoryCount: number;
  activeAccommodationsCount: number;
  ilpStatus: 'draft' | 'active' | 'under_review' | 'approved';
  ispStatus: 'draft' | 'active' | 'under_review' | 'approved';
}

export type ServiceType =
  | 'assistive_device'
  | 'classroom_support'
  | 'sign_language_interpreter'
  | 'scribe'
  | 'reader'
  | 'note_taker'
  | 'transportation'
  | 'accessible_material'
  | 'exam_accommodation'
  | 'counselor_session'
  | 'special_educator_session';

export type ServiceStatus = 'pending' | 'under_review' | 'approved' | 'assigned' | 'in_progress' | 'completed' | 'rejected';

export interface ServiceRequest {
  id: string;
  ticketNumber: string;
  studentId: string;
  studentName: string;
  institutionId: string;
  serviceType: ServiceType;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: ServiceStatus;
  requestedBy: string;
  assignedToStaffId?: string;
  assignedToStaffName?: string;
  createdAt: string;
  updatedAt: string;
  approvalNotes?: string;
}

export interface ExamAccommodation {
  id: string;
  examName: string;
  subjectCode: string;
  studentId: string;
  studentName: string;
  institutionId: string;
  examDate: string;
  extraTimeMinutes: number;
  scribeNeeded: boolean;
  scribeAssignedName?: string;
  readerNeeded: boolean;
  readerAssignedName?: string;
  interpreterNeeded: boolean;
  alternativePaperNeeded: boolean;
  status: 'requested' | 'approved' | 'allocated' | 'completed';
  invigilatorNotes?: string;
}

export interface AuditChecklistItem {
  id: string;
  category: 'infrastructure' | 'digital' | 'classroom' | 'laboratory' | 'washroom' | 'entrance' | 'signage' | 'emergency' | 'transport' | 'staff';
  title: string;
  description: string;
  isCompliant: boolean;
  score: number; // 0-10
  evidenceUrl?: string;
  notes?: string;
}

export interface InstitutionAudit {
  id: string;
  institutionId: string;
  institutionName: string;
  district: string;
  auditorId: string;
  auditorName: string;
  auditDate: string;
  overallScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  checklistItems: AuditChecklistItem[];
  status: 'draft' | 'submitted' | 'verified' | 'rejected';
  remediationDeadlines?: string;
}

export interface ComplianceRequirement {
  id: string;
  code: string;
  title: string;
  legalReference: string;
  category: 'physical_access' | 'digital_access' | 'academic_accommodation' | 'exam_conduct' | 'staff_training' | 'governance';
  mandatoryLevel: 'essential' | 'desirable' | 'optional';
  evidenceType: 'document' | 'photograph' | 'audit_report' | 'certificate';
}

export interface InstitutionComplianceRecord {
  id: string;
  institutionId: string;
  institutionName: string;
  requirementId: string;
  requirementTitle: string;
  status: 'compliant' | 'partially_compliant' | 'non_compliant' | 'exempt';
  evidenceFileUrl?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  correctiveActionPlan?: string;
  deadline?: string;
}

export interface IncidentReport {
  id: string;
  caseNumber: string;
  category: 'harassment' | 'accessibility_denial' | 'bullying' | 'infrastructure_failure' | 'discrimination' | 'safety_hazard';
  isAnonymous: boolean;
  reporterId?: string;
  reporterRole?: Role;
  victimStudentId?: string;
  institutionId: string;
  title: string;
  description: string;
  location: string;
  dateOfIncident: string;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  status: 'submitted' | 'under_investigation' | 'action_taken' | 'resolved' | 'closed';
  investigatingOfficerName?: string;
  resolutionSummary?: string;
  createdAt: string;
}

export interface GovernancePolicy {
  id: string;
  policyNumber: string;
  title: string;
  category: 'accessibility_standard' | 'accommodation_guideline' | 'anti_discrimination' | 'exam_rules';
  effectiveDate: string;
  version: string;
  approvedBy: string;
  status: 'active' | 'under_revision' | 'archived';
  documentUrl?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  assignedRole: Role;
  assignedToName: string;
  institutionId: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
}

export interface AIRecommendation {
  id: string;
  type: 'accessibility_gap' | 'compliance_gap' | 'accommodation_suggestion' | 'resource_allocation' | 'risk_alert';
  title: string;
  description: string;
  institutionId: string;
  institutionName: string;
  confidenceScore: number; // 0-100
  suggestedAction: string;
  status: 'pending_review' | 'approved' | 'dismissed';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  targetRoles: Role[];
  timestamp: string;
  isRead: boolean;
}

export interface AccessibilitySettings {
  contrastMode: 'normal' | 'dark' | 'high-contrast-yellow' | 'high-contrast-blue';
  fontSizeScale: number; // 100%, 110%, 125%, 150%, 200%
  dyslexicFont: boolean;
  screenReaderActive: boolean;
  speechRate: number; // 0.8 to 1.5
  reducedMotion: boolean;
  voiceInputActive: boolean;
  activeLanguage: 'hi' | 'en' | 'mr';
}

export type ProfessionalServiceType =
  | 'certified_scribe'
  | 'sign_language_interpreter'
  | 'lesson_reader'
  | 'exam_reader'
  | 'assistant_teacher'
  | 'special_educator'
  | 'accessibility_support_assistant';

export type ProfessionalStatus = 'pending_verification' | 'verified' | 'suspended' | 'inactive';

export interface AccessibilityProfessional {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  district: string;
  state: string;
  primaryService: ProfessionalServiceType;
  otherServices: ProfessionalServiceType[];
  qualification: string;
  experienceYears: number;
  languages: string[];
  organization?: string;
  certificationDetails: string;
  certificateDocumentUrl?: string;
  status: ProfessionalStatus;
  rating: number;
  completedSessions: number;
  supportHours: number;
  availableDays: string[];
  availableHours: string;
  serviceArea: string;
  preference: 'remote' | 'in_person' | 'both';
  registeredAt: string;
}

export interface SupportRequest {
  id: string;
  studentId: string;
  studentName: string;
  institutionId: string;
  institutionName: string;
  supportType: ProfessionalServiceType;
  subjectOrEvent: string;
  date: string;
  time: string;
  durationHours: number;
  location: string;
  district: string;
  languagePreference: string[];
  additionalRequirements: string;
  status: 'matching' | 'pending' | 'accepted' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  assignedProfessionalId?: string;
  assignedProfessionalName?: string;
  createdAt: string;
}

export interface ProfessionalAssignment {
  id: string;
  requestId: string;
  studentId: string;
  studentName: string;
  institutionName: string;
  supportType: ProfessionalServiceType;
  subjectOrEvent: string;
  date: string;
  time: string;
  durationHours: number;
  location: string;
  status: 'pending' | 'accepted' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  professionalId: string;
  professionalName: string;
  compensation?: string;
}


