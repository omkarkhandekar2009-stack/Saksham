'use client';

import React, { useState, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { i18n } from '@/lib/i18n';
import { AccessibilityEngine } from '@/lib/accessibility';
import { ACCESSIBLE_RESOURCES, AccessibleResource } from '@/data/accessibleResources';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Upload,
  FileText,
  HelpCircle,
  Award,
  Layers,
  ChevronRight,
  Lightbulb,
  Check,
  AlertCircle,
  ExternalLink,
  Search,
  GraduationCap,
  Briefcase,
  Play,
  RotateCcw,
  Clock,
  Shield,
  Compass,
  BookmarkCheck,
  Target,
  FileCode2,
  HeartHandshake,
} from 'lucide-react';


interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface StudyConcept {
  title: string;
  explanation: string;
  example?: string;
}

interface ImportantTerm {
  term: string;
  meaning: string;
}

interface StudyDocument {
  title: string;
  fileName: string;
  fileSize: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  overview?: string;
  mainConcepts?: StudyConcept[];
  realWorldExample?: string;
  importantTerms?: ImportantTerm[];
  examFocus?: string[];
  quickRevision?: string[];
  studySequence?: string[];
  summary: string;
  simplifiedExplanation: string;
  keyConcepts: string[];
  flashcards: { front: string; back: string }[];
  quiz: QuizQuestion[];
  suggestedStudyOrder?: string[];
  topicsToRevise?: string[];
  provider?: string;
  isLargeDoc?: boolean;
}

const sampleDocs: Record<string, StudyDocument> = {
  photosynthesis: {
    title: 'Plant Biology: Photosynthesis & Energy Transfer',
    fileName: 'Chapter_4_Photosynthesis.pdf',
    fileSize: '2.4 MB',
    difficulty: 'medium',
    topic: 'Photosynthesis (प्रकाश संश्लेषण / प्रकाशसंश्लेषण)',
    overview:
      'Photosynthesis is the foundational biochemical engine of the biosphere. Green plants, algae, and cyanobacteria absorb radiant solar energy and convert inorganic carbon dioxide and water into chemical bond energy stored in glucose, releasing essential oxygen as a vital byproduct.',
    mainConcepts: [
      {
        title: '1. Chlorophyll & Light Absorption',
        explanation:
          'Chlorophyll a and b pigments inside chloroplast thylakoid membranes trap photon energy from sunlight, predominantly absorbing blue and red wavelengths.',
        example:
          'Green leaves look green because chlorophyll absorbs blue/red light and reflects green light back to our eyes.',
      },
      {
        title: '2. Light-Dependent Reactions (Thylakoids)',
        explanation:
          'Water molecules (H₂O) undergo photolysis, splitting into protons, electrons, and oxygen gas (O₂), generating ATP and NADPH energy currencies.',
        example:
          'Like charging a rechargeable battery with solar panels during the sunny daytime.',
      },
      {
        title: '3. Calvin Cycle / Dark Reactions (Stroma)',
        explanation:
          'ATP and NADPH power the fixation of carbon dioxide (CO₂) into high-energy three-carbon sugar precursors, ultimately forming glucose (C₆H₁₂O₆).',
        example:
          'Like using the stored battery power in the kitchen to bake nutritious bread for later use.',
      },
    ],
    realWorldExample:
      'Think of a house powered by rooftop solar panels: sunlight charges lithium batteries during the day (Light Reactions), and the stored power runs the kitchen appliances to make food anytime (Calvin Cycle).',
    importantTerms: [
      {
        term: 'Chloroplast (हरितलवक)',
        meaning: 'The specialized plant cell organelle where photosynthesis takes place.',
      },
      {
        term: 'Stomata (रंध्र)',
        meaning: 'Microscopic pores on leaf surfaces that open and close to regulate gas exchange (CO₂ in, O₂ out).',
      },
      {
        term: 'Photolysis (जल का प्रकाश अपघटन)',
        meaning: 'The splitting of water molecules by photon energy during light-dependent reactions.',
      },
      {
        term: 'Glucose (C₆H₁₂O₆)',
        meaning: 'The vital 6-carbon carbohydrate synthesized as chemical energy for plant growth.',
      },
    ],
    examFocus: [
      'The balanced overall chemical equation: 6CO₂ + 6H₂O + Solar Energy → C₆H₁₂O₆ + 6O₂',
      'Structural distinction between Thylakoids (site of light reactions) and Stroma (site of Calvin Cycle)',
      'The role of stomatal guard cells in transpiration and carbon intake',
    ],
    quickRevision: [
      '• Photosynthesis transforms sunlight into stored chemical glucose energy.',
      '• Chlorophyll pigment in chloroplasts absorbs solar photons.',
      '• Water is split in thylakoids, releasing oxygen into the atmosphere.',
      '• Carbon dioxide is fixed in the stroma during the Calvin Cycle.',
      '• All aerobic life on Earth depends directly on this process for food and oxygen.',
    ],
    studySequence: [
      '1. Memorize the balanced chemical equation and inputs/outputs',
      '2. Study chloroplast structure (Thylakoids vs. Stroma)',
      '3. Review Light Reactions vs. Calvin Cycle step-by-step',
      '4. Test recall with flashcards and practice quiz',
    ],
    summary:
      '## 🌿 Photosynthesis Chapter Overview\n\n• **Core Process:** Photosynthesis converts solar radiant energy into bio-chemical glucose energy using water and carbon dioxide.\n• **Key Reaction:** 6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂\n• **High-Yield Exam Focus:** Light-dependent reactions in the Thylakoids and Calvin Cycle in the Stroma.',
    simplifiedExplanation:
      '🌿 **Photosynthesis Simplified Overview:**\n\n1. **Plant Kitchen:** Green leaves act like little solar-powered kitchens. They catch sunlight using chlorophyll.\n2. **The Recipe:** Sunlight + Water from the soil + Carbon Dioxide from the air.\n3. **The Delicious Result:** Sweet plant sugar (glucose) plus fresh Oxygen for us to breathe!',
    keyConcepts: [
      'Chlorophyll captures sunlight (क्लोरोफिल प्रकाश को सोखता है)',
      'Stomata absorb carbon dioxide from air (रंध्र कार्बन डाइऑक्साइड लेते हैं)',
      'Roots absorb water and essential minerals (जड़ें पानी और खनिज सोखती हैं)',
      'Oxygen is released as a vital byproduct (ऑक्सीजन उप-उत्पाद के रूप में निकलती है)',
    ],
    flashcards: [
      {
        front: 'What pigment gives leaves their green color?',
        back: 'Chlorophyll (क्लोरोफिल) — absorbs blue and red wavelengths from solar light.',
      },
      {
        front: 'What are the two main products of photosynthesis?',
        back: 'Glucose (sugar for plant growth) and Oxygen (released into the air).',
      },
      {
        front: 'Where does photosynthesis primarily take place in a plant cell?',
        back: 'In the Chloroplasts (हरितलवक) containing thylakoid membranes.',
      },
      {
        front: 'Which gas is absorbed by plants through stomata?',
        back: 'Carbon Dioxide (CO₂) from the ambient atmosphere.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What do plants use as their primary energy source during photosynthesis?',
        options: ['Moonlight', 'Sunlight (सूर्य का प्रकाश)', 'Artificial Heat', 'Soil Nutrients only'],
        correctIndex: 1,
        explanation: 'Plants use radiant light energy from the sun to synthesize glucose molecules.',
      },
      {
        id: 'q2',
        question: 'Which gas is released into the atmosphere as a byproduct?',
        options: ['Carbon Dioxide', 'Nitrogen', 'Oxygen (ऑक्सीजन)', 'Helium'],
        correctIndex: 2,
        explanation: 'Water molecules are split during light reactions, releasing oxygen into the atmosphere.',
      },
      {
        id: 'q3',
        question: 'Which part of the plant absorbs water and minerals from the soil?',
        options: ['Roots (जड़ें)', 'Flower petals', 'Bark', 'Fruit'],
        correctIndex: 0,
        explanation: 'Root hair cells absorb groundwater through osmosis and transport it up via xylem.',
      },
      {
        id: 'q4',
        question: 'In which cellular organelle does photosynthesis occur?',
        options: ['Mitochondria', 'Chloroplast (हरितलवक)', 'Ribosome', 'Nucleus'],
        correctIndex: 1,
        explanation: 'Chloroplasts contain chlorophyll pigments and thylakoids where the photosynthetic reactions take place.',
      },
      {
        id: 'q5',
        question: 'What sugar molecule is produced as stored chemical energy?',
        options: ['Sucrose', 'Glucose (ग्लूकोज)', 'Lactose', 'Fructose'],
        correctIndex: 1,
        explanation: 'Glucose (C₆H₁₂O₆) is synthesized as the primary carbohydrate for plant cellular respiration.',
      },
    ],
    suggestedStudyOrder: ['1. Read Simple Analogy', '2. Review 4 Flashcards', '3. Take 5-Question Quiz'],
    topicsToRevise: ['Light Reactions', 'Calvin Cycle', 'Stomata Gas Exchange'],
  },
  constitution: {
    title: 'Civics: RPWD Act 2016 & Educational Rights',
    fileName: 'RPWD_Act_Inclusive_Education.pdf',
    fileSize: '1.8 MB',
    difficulty: 'easy',
    topic: 'Inclusive Education Rights (समावेशी शिक्षा अधिकार)',
    overview:
      'The Rights of Persons with Disabilities (RPWD) Act 2016 is India’s landmark statutory framework aligned with the UNCRPD. It guarantees non-discrimination, reasonable accommodations, 5% higher education reservations, and barrier-free inclusive learning environments across all educational institutions.',
    mainConcepts: [
      {
        title: '1. Section 16 — Non-Discrimination in Admissions',
        explanation:
          'All recognized government and private educational institutions must admit students with disabilities without discrimination and provide education and opportunities on an equal basis with others.',
        example:
          'A university cannot reject an application on medical grounds if the student meets academic criteria.',
      },
      {
        title: '2. Reasonable Accommodations & Scribes',
        explanation:
          'Institutions must provide accessible learning materials, certified exam scribes, assistive tech, and minimum 20 minutes compensatory time per hour of exam.',
        example:
          'A 3-hour university exam grants an eligible student with visual impairment 60 minutes of additional compensatory time.',
      },
      {
        title: '3. Section 32 — Higher Education Reservations',
        explanation:
          'Mandates at least 5% reservation of seats for persons with benchmark disabilities (40%+ disability certificate) in all government and government-aided higher education institutions.',
        example:
          'Engineering and medical colleges maintain a dedicated 5% quota for verified UDID card holders.',
      },
    ],
    realWorldExample:
      'When an entrance exam candidate with muscular dystrophy registers, the examination board is legally mandated to allocate a ground-floor center, assign a qualified scribe, and grant 20 minutes compensatory time per hour automatically.',
    importantTerms: [
      {
        term: 'Benchmark Disability',
        meaning: 'A person with not less than 40% of a specified disability certified by a competent medical authority.',
      },
      {
        term: 'Compensatory Time',
        meaning: 'Statutory additional examination time of minimum 20 minutes per hour for eligible candidates.',
      },
      {
        term: 'Reasonable Accommodation',
        meaning: 'Necessary and appropriate modifications to ensure persons with disabilities enjoy rights on an equal basis.',
      },
    ],
    examFocus: [
      'Section 16 (Duty of educational institutions) vs. Section 17 (Specific measures for teacher training and accessibility)',
      'Statutory reservation percentages: 5% in Higher Education (Sec 32) and 4% in Public Employment (Sec 34)',
      'The 21 specified disabilities recognized under the Schedule of the RPWD Act 2016',
    ],
    quickRevision: [
      '• RPWD Act 2016 guarantees inclusive education without discrimination.',
      '• Institutions must provide scribes and 20 min/hour compensatory time.',
      '• 5% reservation in higher educational institutions for benchmark disabilities.',
      '• Built environment, digital portals, and courseware must be accessible.',
      '• Grievance redressal is available through the State & Chief Commissioner for PwD.',
    ],
    studySequence: [
      '1. Read Section 16 & 17 educational guarantees',
      '2. Understand the definition of Benchmark Disability and UDID certification',
      '3. Review exam accommodations and reservation quotas',
      '4. Complete the practice quiz to verify legal understanding',
    ],
    summary:
      '## ⚖️ RPWD Act 2016 Educational Provisions\n\n• **Zero Discrimination:** Section 16 mandates equal admissions and inclusive education.\n• **Accommodations:** Mandatory exam scribes and 20 min/hr compensatory time.\n• **Higher Education Quota:** Section 32 establishes a 5% statutory reservation.',
    simplifiedExplanation:
      '⚖️ **RPWD Act Simplified Overview:**\n\n1. **Zero Denial:** No school or college can deny admission due to disability.\n2. **Reasonable Accommodations:** Mandatory scribes, extra exam time (20 min/hr), and ramps.\n3. **Equal Opportunity:** Equal access to libraries, labs, and 5% reservation in higher education.',
    keyConcepts: [
      'Section 16: Duty of educational institutions to provide inclusive education',
      'Section 17: Specific measures to facilitate inclusive education and teacher training',
      '5% Statutory reservation in higher education institutions (Section 32)',
      'Compensatory time of minimum 20 minutes per hour for eligible candidates',
    ],
    flashcards: [
      {
        front: 'What does RPWD Act Section 16 guarantee?',
        back: 'Equal admission rights and inclusive education without discrimination for students with disabilities.',
      },
      {
        front: 'How much extra time is mandated for candidates using a scribe?',
        back: 'Minimum 20 minutes per hour of examination.',
      },
      {
        front: 'Can an institution refuse admission based on disability?',
        back: 'No. Admission refusal based on disability is strictly illegal under Section 16.',
      },
    ],
    quiz: [
      {
        id: 'qc1',
        question: 'According to the RPWD Act 2016, how much extra time is granted to eligible exam candidates?',
        options: ['5 minutes per hour', '10 minutes per hour', '20 minutes per hour (20 मिनट प्रति घंटा)', 'No extra time'],
        correctIndex: 2,
        explanation: 'Statutory guidelines grant minimum 20 minutes of compensatory time per hour of examination.',
      },
      {
        id: 'qc2',
        question: 'Can a recognized educational institution refuse admission based on disability?',
        options: ['Yes, anytime', 'No, it is strictly prohibited by law (कानूनन वर्जित है)', 'Only with committee approval', 'Only in private colleges'],
        correctIndex: 1,
        explanation: 'Section 16 strictly prohibits discrimination and admission refusal based on disability.',
      },
    ],
    suggestedStudyOrder: ['1. Read Rights Summary', '2. Review Statutory Flashcards', '3. Test Legal Knowledge Quiz'],
    topicsToRevise: ['Section 16 Mandates', 'Scribe Compensatory Rules'],
  },
};

export default function LearningPage() {
  const { language, currentRole } = useAppStore();
  const t = i18n[language] || i18n.hi;

  const isStudent = currentRole === 'student' || currentRole === 'parent';
  const isProfessional = currentRole === 'accessibility_professional' || currentRole === 'professional';
  const isGovernment = currentRole === 'government' || currentRole === 'government_authority' || currentRole === 'district_officer' || currentRole === 'super_admin';
  const isStaff = !isStudent && !isProfessional && !isGovernment;


  const [selectedDocKey, setSelectedDocKey] = useState<string>('photosynthesis');
  const [activeDoc, setActiveDoc] = useState<StudyDocument>(sampleDocs.photosynthesis);
  const [learningMode, setLearningMode] = useState<'explain' | 'quiz' | 'flashcards' | 'summary'>('explain');
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [numQuizQuestions, setNumQuizQuestions] = useState<number>(10);

  // Upload & Pipeline States
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Interactive Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Flashcards State
  const [activeFlashcardIdx, setActiveFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Accessible Learning Library States
  const [libraryCategory, setLibraryCategory] = useState<'education' | 'skills'>('education');
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState('all');
  const [selectedAccessibilityFilter, setSelectedAccessibilityFilter] = useState('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('all');

  // Staff route guard — shown AFTER all hooks (React rules)
  if (isStaff) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 space-y-6">
        <div className="bg-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-10 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="bg-[#081a3b] text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {language === 'hi' ? 'विद्यार्थी मॉड्यूल' : language === 'mr' ? 'विद्यार्थी मॉड्यूल' : 'Student Module'}
            </span>
            <h1 className="text-2xl font-black text-white">
              {language === 'hi' ? 'यह सुविधा केवल विद्यार्थियों के लिए उपलब्ध है' : language === 'mr' ? 'ही सुविधा केवळ विद्यार्थ्यांसाठी उपलब्ध आहे' : 'Learn with AI — Students Only'}
            </h1>
            <p className="text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
              {language === 'hi'
                ? 'एआई-संचालित अनुकूली अधिगम केंद्र केवल नामांकित विद्यार्थियों के लिए है। संस्थान कर्मचारी पहुंच प्रतिबंधित है।'
                : language === 'mr'
                ? 'एआई-चालित अनुकूली शिक्षण केंद्र केवळ नोंदणीकृत विद्यार्थ्यांसाठी आहे. संस्था कर्मचारी प्रवेश प्रतिबंधित आहे.'
                : 'The AI-powered Adaptive Learning Hub is exclusively for enrolled students. Institution staff access is restricted.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="/dashboard" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md inline-flex items-center gap-1.5">
              <span>{language === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : language === 'mr' ? 'डॅशबोर्डवर परत जा' : 'Return to Dashboard'}</span>
            </a>
            <a href="/audit" className="bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-400/30 font-semibold px-5 py-2.5 rounded-xl text-xs transition">
              {language === 'hi' ? 'संस्थागत ऑडिट' : language === 'mr' ? 'संस्थात्मक ऑडिट' : 'Institutional Audit'}
            </a>
          </div>
        </div>
      </div>
    );
  }


  // Handle PDF Upload & Deep AI Pipeline
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadedFileName(file.name);
    setIsProcessing(true);
    setUserAnswers({});
    setShowQuizResults(false);
    setActiveFlashcardIdx(0);
    setIsFlipped(false);

    setLoadingStepText(
      language === 'hi' ? 'PDF अपलोड हो रहा है...' : language === 'mr' ? 'PDF अपलोड होत आहे...' : 'Uploading PDF...'
    );

    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficultyLevel);
    formData.append('language', language);
    formData.append('numQuestions', numQuizQuestions.toString());

    setTimeout(() => {
      setLoadingStepText(
        language === 'hi'
          ? 'पाठ्य सामग्री का विश्लेषण किया जा रहा है...'
          : language === 'mr'
          ? 'अभ्यास साहित्याचे विश्लेषण केले जात आहे...'
          : 'Extracting and analyzing study concepts...'
      );
    }, 600);

    setTimeout(() => {
      setLoadingStepText(
        language === 'hi'
          ? 'आपकी व्यक्तिगत शिक्षण मार्गदर्शिका तैयार हो रही है...'
          : language === 'mr'
          ? 'आपली वैयक्तिक शिक्षण मार्गदर्शिका तयार होत आहे...'
          : 'Synthesizing grounded learning guide & quiz...'
      );
    }, 1200);

    try {
      const res = await fetch('/api/adaptive-learning', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        if (data.error === 'SCANNED_PDF') {
          setUploadError(
            '⚠️ This PDF appears to contain scanned pages or images rather than selectable text. Please upload a text-based PDF or use OCR support.'
          );
        } else {
          setUploadError(data.message || 'Unable to process this file. Please try again.');
        }
        setIsProcessing(false);
        return;
      }

      setLoadingStepText(
        language === 'hi' ? 'AI शिक्षण मार्गदर्शिका तैयार है।' : language === 'mr' ? 'AI शिक्षण मार्गदर्शिका तयार आहे.' : 'AI analysis complete.'
      );

      setTimeout(() => {
        setIsProcessing(false);
        setActiveDoc({
          title: data.title || `Study Guide: ${file.name}`,
          fileName: data.fileName || file.name,
          fileSize: data.fileSize || `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          difficulty: difficultyLevel,
          topic: data.topic || file.name.replace(/\.[^/.]+$/, ''),
          overview: data.overview || data.simplifiedExplanation,
          mainConcepts: data.mainConcepts || [],
          realWorldExample: data.realWorldExample || '',
          importantTerms: data.importantTerms || [],
          examFocus: data.examFocus || [],
          quickRevision: data.quickRevision || [],
          studySequence: data.studySequence || data.suggestedStudyOrder || [],
          summary: data.summary,
          simplifiedExplanation: data.simplifiedExplanation,
          keyConcepts: data.keyConcepts || [],
          flashcards: data.flashcards || [],
          quiz: data.quiz || [],
          suggestedStudyOrder: data.suggestedStudyOrder || data.studySequence || [],
          topicsToRevise: data.topicsToRevise || [],
          provider: data.provider,
          isLargeDoc: data.isLargeDoc,
        });

        AccessibilityEngine.speak(
          language === 'hi'
            ? 'दस्तावेज़ सफलतापूर्वक संसाधित हुआ। आपकी व्यक्तिगत शिक्षण मार्गदर्शिका और प्रश्नोत्तरी तैयार हैं।'
            : language === 'mr'
            ? 'दस्तावेज यशस्वीरीत्या प्रक्रिया झाला. आपली वैयक्तिक शिक्षण मार्गदर्शिका आणि क्विझ तयार आहेत.'
            : 'PDF processed successfully. Your grounded learning guide and interactive quiz are ready.',
          language
        );
      }, 500);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setUploadError('AI processing is temporarily unavailable. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleSelectSample = (key: string) => {
    setSelectedDocKey(key);
    setActiveDoc(sampleDocs[key]);
    setUploadedFileName(null);
    setUploadError(null);
    setUserAnswers({});
    setShowQuizResults(false);
    setActiveFlashcardIdx(0);
    setIsFlipped(false);
  };

  const handleOptionSelect = (qId: string, optIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    activeDoc.quiz.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  // Read Aloud Handler
  const handleReadAloud = (textToRead: string) => {
    if (isSpeaking) {
      AccessibilityEngine.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const clean = textToRead.replace(/[*_#•>]/g, '').slice(0, 500);
      AccessibilityEngine.speak(clean, language);
      setTimeout(() => setIsSpeaking(false), 9000);
    }
  };

  // Filter Library Resources (Curated Inclusive Education & Verified Skills)
  const filteredLibraryResources = ACCESSIBLE_RESOURCES.filter((res) => {
    const matchesCategory = res.category === libraryCategory;
    const matchesSubject = selectedSubjectFilter === 'all' || res.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
    const matchesLang = selectedLanguageFilter === 'all' || res.languages.includes(selectedLanguageFilter);
    const matchesAccess =
      selectedAccessibilityFilter === 'all' || res.accessibilityFeatures.some((feat) => feat.toLowerCase().includes(selectedAccessibilityFilter.toLowerCase()));

    const matchesSearch =
      librarySearchQuery === '' ||
      res.title.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
      res.channel.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
      res.targetAudience.some((aud) => aud.toLowerCase().includes(librarySearchQuery.toLowerCase()));

    return matchesCategory && matchesSubject && matchesLang && matchesAccess && matchesSearch;
  });

  const availableSubjects = Array.from(
    new Set(ACCESSIBLE_RESOURCES.filter((r) => r.category === libraryCategory).map((r) => r.subject))
  );


  return (
    <div className="space-y-10 py-2">
      {/* Header Banner */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {t.learnHeroBadge}
          </span>
          <span className="bg-blue-500/20 text-cyan-200 border border-blue-400/30 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
            Document-Grounded AI Study Companion
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{t.learnHeroTitle}</h1>
        <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">{t.learnHeroDesc}</p>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: PDF UPLOAD & LEARNING CUSTOMIZATION */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Box */}
        <div className="lg:col-span-2 bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-400/20 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                <span>Upload Study Material (PDF)</span>
              </h2>
              <p className="text-xs text-blue-200">
                Upload your Software Engineering, Mathematics, Science or Courseware PDF to generate genuine grounded study notes.
              </p>
            </div>
            <span className="text-[11px] text-cyan-300 font-mono">Max: 25 MB</span>
          </div>

          {/* Upload Dropzone */}
          <div className="p-6 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-3xl bg-[#081a3b] text-center space-y-3 transition cursor-pointer relative group">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              disabled={isProcessing}
            />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 mx-auto flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#081a3b] rounded-[14px] flex items-center justify-center">
                <FileText className="w-7 h-7 text-cyan-300" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {uploadedFileName ? uploadedFileName : 'Click or Drag & Drop Chapter PDF Here'}
              </p>
              <p className="text-xs text-blue-200 mt-1">
                Textbooks, Lecture Notes, Question Papers, and Handouts
              </p>
            </div>
          </div>

          {/* Upload Error Display with Retry */}
          {uploadError && (
            <div className="p-4 bg-rose-950/80 border border-rose-400/50 rounded-2xl text-xs text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in-50">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs shrink-0 self-end sm:self-auto"
              >
                Retry Upload
              </button>
            </div>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="p-5 bg-[#081a3b] border border-cyan-400/40 rounded-2xl space-y-3 animate-pulse">
              <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>{loadingStepText || 'Analyzing document concepts with AI...'}</span>
                </div>
                <span>Please wait...</span>
              </div>
              <div className="w-full bg-[#051124] h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full w-3/4 animate-pulse rounded-full" />
              </div>
            </div>
          )}

          {/* Large Document Badge */}
          {activeDoc.isLargeDoc && (
            <div className="p-3 bg-blue-950/60 border border-blue-400/30 rounded-xl text-[11px] text-blue-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Large document detected:</strong> Processed chapter by chapter to extract high-yield concepts and practice questions.
              </span>
            </div>
          )}
        </div>

        {/* Configuration & Ready Samples */}
        <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Learning Customization</span>
            </h3>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-blue-200">
                Explanation &amp; Quiz Depth:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficultyLevel(level)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition border ${
                      difficultyLevel === level
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-300 shadow-md'
                        : 'bg-[#081a3b] border-blue-400/20 text-blue-200 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Count Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-blue-200">
                Practice Quiz Question Count:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setNumQuizQuestions(cnt)}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      numQuizQuestions === cnt
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-300 shadow-md'
                        : 'bg-[#081a3b] border-blue-400/20 text-blue-200 hover:text-white'
                    }`}
                  >
                    {cnt} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Ready Sample Chapters */}
            <div className="space-y-2 pt-2 border-t border-blue-400/20">
              <label className="block text-xs font-bold text-blue-200">
                Or Try Ready Sample Chapters:
              </label>
              <div className="space-y-2">
                {Object.keys(sampleDocs).map((key) => {
                  const doc = sampleDocs[key];
                  const isSelected = selectedDocKey === key && !uploadedFileName;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectSample(key)}
                      className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between text-xs ${
                        isSelected
                          ? 'bg-[#123366] border-cyan-400 text-white shadow-md'
                          : 'bg-[#081a3b] border-blue-400/20 text-blue-200 hover:bg-[#0c234a]'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold block truncate">{doc.title}</span>
                        <span className="text-[10px] text-cyan-300 font-mono">{doc.fileSize}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#081a3b] rounded-2xl border border-cyan-500/20 text-[11px] text-cyan-200 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Document-Grounded Tutor Active</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 2: PROCESSED STUDY MATERIAL & LEARNING ACTIONS */}
      {/* ============================================================ */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        {/* Document Header & Mode Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                ✓ Grounded in Document
              </span>
              <span className="text-xs text-blue-300 font-mono">{activeDoc.fileName}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{activeDoc.title}</h2>
            <p className="text-xs text-cyan-300 capitalize">
              Topic: {activeDoc.topic} • Mode: {difficultyLevel.toUpperCase()} Depth
            </p>
          </div>

          {/* Action Tabs: Explain Simply / Quiz / Flashcards / Summary */}
          <div className="flex flex-wrap items-center gap-2 bg-[#081a3b] border border-cyan-500/30 p-1.5 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setLearningMode('explain')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                learningMode === 'explain'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Explain Simply</span>
            </button>

            <button
              onClick={() => setLearningMode('quiz')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                learningMode === 'quiz'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Generate Quiz ({activeDoc.quiz.length})</span>
            </button>

            <button
              onClick={() => setLearningMode('flashcards')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                learningMode === 'flashcards'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards ({activeDoc.flashcards.length})</span>
            </button>

            <button
              onClick={() => setLearningMode('summary')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                learningMode === 'summary'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Summary</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* MODE 1: GROUNDED SIMPLIFIED LEARNING BREAKDOWN */}
        {/* ------------------------------------------------------------ */}
        {learningMode === 'explain' && (
          <div className="space-y-8 animate-in fade-in-50">
            {/* Top Bar with Read Aloud */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span>AI Simplified Learning Breakdown</span>
                </h3>
                <p className="text-xs text-blue-200">
                  Pedagogical tutor breakdown grounded strictly in your uploaded material ({difficultyLevel.toUpperCase()} Mode).
                </p>
              </div>

              <button
                onClick={() =>
                  handleReadAloud(
                    `${activeDoc.overview || ''} ${activeDoc.mainConcepts?.map((c) => `${c.title}. ${c.explanation}`).join(' ') || ''}`
                  )
                }
                className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition flex items-center gap-1.5 ${
                  isSpeaking
                    ? 'bg-rose-600 text-white border-rose-500'
                    : 'bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border-cyan-500/30'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Stop Audio' : 'Read Aloud'}</span>
              </button>
            </div>

            {/* 1. What is this topic about? */}
            <div className="p-6 bg-[#081a3b] rounded-3xl border border-cyan-500/30 space-y-2 shadow-inner">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>1. What is this topic about?</span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                {activeDoc.overview || activeDoc.simplifiedExplanation}
              </p>
            </div>

            {/* 2. Main Concepts */}
            {activeDoc.mainConcepts && activeDoc.mainConcepts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>2. Main Concepts from Document ({activeDoc.mainConcepts.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeDoc.mainConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-[#081a3b] rounded-3xl border border-blue-400/20 hover:border-cyan-400/40 space-y-3 transition flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-600/30 text-cyan-300 border border-blue-400/30 text-xs flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                          <span>{concept.title}</span>
                        </h4>
                        <p className="text-xs text-blue-100 leading-relaxed">
                          {concept.explanation}
                        </p>
                      </div>
                      {concept.example && (
                        <div className="p-3 bg-[#051124] rounded-2xl border border-cyan-500/20 text-[11px] text-cyan-200">
                          <strong className="text-cyan-400">Example: </strong>
                          <span>{concept.example}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Real-World Practical Example */}
            {activeDoc.realWorldExample && (
              <div className="p-6 bg-gradient-to-br from-[#0c234a] to-[#081a3b] rounded-3xl border border-cyan-400/30 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>3. Real-World Practical Scenario</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  {activeDoc.realWorldExample}
                </p>
              </div>
            )}

            {/* 4. Important Terms & Definitions */}
            {activeDoc.importantTerms && activeDoc.importantTerms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  <span>4. Important Terminology &amp; Definitions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeDoc.importantTerms.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#081a3b] rounded-2xl border border-blue-400/20 space-y-1.5 text-xs"
                    >
                      <span className="font-bold text-cyan-300 block">{item.term}</span>
                      <p className="text-blue-100 text-[11px] leading-relaxed">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. High-Yield Exam Focus & 6. Quick Revision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 5. Exam Focus */}
              {activeDoc.examFocus && activeDoc.examFocus.length > 0 && (
                <div className="p-6 bg-[#081a3b] rounded-3xl border border-blue-400/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>5. High-Yield Exam Focus</span>
                  </div>
                  <ul className="space-y-2 text-xs text-blue-100">
                    {activeDoc.examFocus.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 6. Quick Revision Points */}
              {activeDoc.quickRevision && activeDoc.quickRevision.length > 0 && (
                <div className="p-6 bg-[#081a3b] rounded-3xl border border-blue-400/20 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                    <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                    <span>6. Quick Revision Points</span>
                  </div>
                  <ul className="space-y-2 text-xs text-blue-100">
                    {activeDoc.quickRevision.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point.replace(/^[•\s-]+/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 7. Suggested Study Sequence */}
            {activeDoc.studySequence && activeDoc.studySequence.length > 0 && (
              <div className="p-5 bg-[#081a3b] rounded-3xl border border-cyan-500/20 space-y-3">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  7. Suggested Study Roadmap:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  {activeDoc.studySequence.map((step, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#051124] rounded-2xl border border-blue-400/30 text-xs text-blue-100 flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="truncate">{step.replace(/^\d+\.\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* MODE 2: GENERATE QUIZ */}
        {/* ------------------------------------------------------------ */}
        {learningMode === 'quiz' && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <span>Interactive Practice Quiz ({activeDoc.quiz.length} Questions)</span>
                </h3>
                <p className="text-xs text-blue-200">
                  Questions generated strictly from your uploaded study material.
                </p>
              </div>

              {showQuizResults && (
                <button
                  onClick={() => {
                    setUserAnswers({});
                    setShowQuizResults(false);
                  }}
                  className="bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-500/30 font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              )}
            </div>

            {/* Score Banner when Submitted */}
            {showQuizResults && (
              <div className="p-6 bg-gradient-to-br from-blue-900/60 to-[#081a3b] border-2 border-emerald-400/50 rounded-3xl space-y-3 animate-in zoom-in-95 shadow-xl text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Assessment Result
                    </span>
                    <h4 className="text-2xl font-black text-white">
                      Your Score: {calculateScore()} / {activeDoc.quiz.length} (
                      {Math.round((calculateScore() / activeDoc.quiz.length) * 100)}%)
                    </h4>
                  </div>
                  <div className="p-3 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-2xl text-xs font-bold">
                    {calculateScore() >= activeDoc.quiz.length * 0.8
                      ? '🌟 Excellent Mastery!'
                      : '📖 Good Effort — Review Suggested Topics Below'}
                  </div>
                </div>

                {/* Topics to Revise */}
                {activeDoc.topicsToRevise && activeDoc.topicsToRevise.length > 0 && (
                  <div className="pt-2 border-t border-blue-400/20 text-xs text-blue-200">
                    <span className="font-bold text-cyan-300">Topics you should revise: </span>
                    <span>{activeDoc.topicsToRevise.join(', ')}</span>
                  </div>
                )}
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {activeDoc.quiz.map((q, qIndex) => {
                const selectedOpt = userAnswers[q.id];

                return (
                  <div
                    key={q.id}
                    className="p-5 bg-[#081a3b] rounded-3xl border border-blue-400/20 space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-white leading-snug">
                        {qIndex + 1}. {q.question}
                      </h4>
                      <button
                        onClick={() => handleReadAloud(q.question)}
                        className="text-cyan-300 hover:text-white p-1 rounded hover:bg-[#0c234a]"
                        title="Read Question"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIndex) => {
                        let btnStyle =
                          'bg-[#051124] border-blue-400/20 text-blue-100 hover:border-cyan-400/50';

                        if (selectedOpt === optIndex) {
                          btnStyle =
                            'bg-blue-600 text-white font-bold border-cyan-300 shadow-md';
                        }

                        if (showQuizResults) {
                          if (optIndex === q.correctIndex) {
                            btnStyle =
                              'bg-emerald-950/80 text-emerald-200 border-emerald-400 font-bold ring-1 ring-emerald-400';
                          } else if (selectedOpt === optIndex && selectedOpt !== q.correctIndex) {
                            btnStyle = 'bg-rose-950/80 text-rose-200 border-rose-400';
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            type="button"
                            onClick={() => !showQuizResults && handleOptionSelect(q.id, optIndex)}
                            className={`p-3 rounded-2xl border text-left transition ${btnStyle}`}
                          >
                            <span className="font-bold mr-2">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showQuizResults && (
                      <div className="p-3.5 bg-[#051124] rounded-2xl border border-blue-400/20 text-blue-200 text-xs">
                        <strong className="text-cyan-300">Explanation: </strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!showQuizResults && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setShowQuizResults(true);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs shadow-md transition disabled:opacity-50"
                >
                  Submit Quiz &amp; View Score
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* MODE 3: FLASHCARDS */}
        {/* ------------------------------------------------------------ */}
        {learningMode === 'flashcards' && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>Interactive Flashcards ({activeDoc.flashcards.length} Cards)</span>
                </h3>
                <p className="text-xs text-blue-200">
                  Card {activeFlashcardIdx + 1} of {activeDoc.flashcards.length} • Click card to flip
                </p>
              </div>

              <button
                onClick={() =>
                  handleReadAloud(
                    isFlipped
                      ? activeDoc.flashcards[activeFlashcardIdx]?.back
                      : activeDoc.flashcards[activeFlashcardIdx]?.front
                  )
                }
                className="text-xs font-bold px-3 py-2 rounded-xl bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Card</span>
              </button>
            </div>

            {/* 3D Flip Card Container */}
            {activeDoc.flashcards.length > 0 && (
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[220px] sm:min-h-[260px] bg-gradient-to-br from-[#0c234a] to-[#081a3b] border-2 border-cyan-400/40 hover:border-cyan-300 p-8 rounded-3xl shadow-2xl flex flex-col justify-between cursor-pointer transition transform hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-cyan-300 uppercase tracking-wider">
                    {isFlipped ? 'Answer / Explanation (Back)' : 'Question / Term (Front)'}
                  </span>
                  <span className="text-slate-400">Click anywhere to flip ⟳</span>
                </div>

                <div className="my-auto text-center py-4">
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {isFlipped
                      ? activeDoc.flashcards[activeFlashcardIdx]?.back
                      : activeDoc.flashcards[activeFlashcardIdx]?.front}
                  </p>
                </div>

                <div className="text-center text-[11px] text-blue-300">
                  Tap to {isFlipped ? 'show question' : 'reveal answer'}
                </div>
              </div>
            )}

            {/* Flashcard Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setActiveFlashcardIdx((prev) =>
                    prev > 0 ? prev - 1 : activeDoc.flashcards.length - 1
                  );
                }}
                className="bg-[#081a3b] hover:bg-[#123366] text-blue-200 border border-blue-400/30 font-bold px-4 py-2.5 rounded-xl text-xs transition"
              >
                ← Previous Card
              </button>

              <div className="text-xs font-mono text-cyan-300">
                {activeFlashcardIdx + 1} / {activeDoc.flashcards.length}
              </div>

              <button
                onClick={() => {
                  setIsFlipped(false);
                  setActiveFlashcardIdx((prev) =>
                    prev < activeDoc.flashcards.length - 1 ? prev + 1 : 0
                  );
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-md transition"
              >
                Next Card →
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* MODE 4: SUMMARY */}
        {/* ------------------------------------------------------------ */}
        {learningMode === 'summary' && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Chapter Summary &amp; Exam Checklist</span>
              </h3>
              <button
                onClick={() => handleReadAloud(activeDoc.summary)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition flex items-center gap-1.5 ${
                  isSpeaking
                    ? 'bg-rose-600 text-white border-rose-500'
                    : 'bg-[#081a3b] hover:bg-[#123366] text-cyan-300 border-cyan-500/30'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Stop Audio' : 'Read Aloud'}</span>
              </button>
            </div>

            <div className="bg-[#081a3b] border border-blue-400/20 p-6 rounded-3xl text-xs sm:text-sm text-blue-100 whitespace-pre-line leading-relaxed shadow-inner">
              {activeDoc.summary}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeDoc.keyConcepts.map((kc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#081a3b] rounded-2xl border border-blue-400/20 flex items-center gap-2 text-xs text-blue-100"
                >
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{kc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SECTION 3: ACCESSIBLE LEARNING LIBRARY */}
      {/* ============================================================ */}
      <div className="bg-[#0f2b5c] border border-cyan-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-400/20 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#081a3b] text-cyan-300 border border-cyan-400/40 text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                Inclusive Learning Hub
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                100% Verified Playlists
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Accessible Learning Library</h2>
            <p className="text-xs text-blue-100 mt-1">
              Curated, verified educational and skill-development playlists specifically adapted for specially-abled learners and accessible study.
            </p>
          </div>

          {/* Category Tabs: Education vs Skills & Earning */}
          <div className="flex items-center gap-2 bg-[#081a3b] border border-cyan-500/30 p-1.5 rounded-2xl text-xs font-bold">
            <button
              onClick={() => {
                setLibraryCategory('education');
                setSelectedSubjectFilter('all');
              }}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                libraryCategory === 'education'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>A. EDUCATION &amp; ACADEMICS</span>
            </button>

            <button
              onClick={() => {
                setLibraryCategory('skills');
                setSelectedSubjectFilter('all');
              }}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                libraryCategory === 'skills'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>B. SKILLS &amp; EARNING</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#081a3b] p-4 rounded-2xl border border-blue-400/20 text-xs">
          {/* Search Bar */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-blue-300 absolute left-3 top-3" />
            <input
              type="text"
              value={librarySearchQuery}
              onChange={(e) => setLibrarySearchQuery(e.target.value)}
              placeholder="Search verified resources, channel, subject, or audience..."
              className="w-full bg-[#051124] border border-blue-400/30 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-blue-300/40 focus:outline-none"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="w-full bg-[#051124] border border-blue-400/30 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          {/* Accessibility Feature Filter */}
          <div>
            <select
              value={selectedAccessibilityFilter}
              onChange={(e) => setSelectedAccessibilityFilter(e.target.value)}
              className="w-full bg-[#051124] border border-blue-400/30 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">All Accessibility Features</option>
              <option value="Indian Sign Language">Indian Sign Language</option>
              <option value="Screen Reader Optimized">Screen Reader Optimized</option>
              <option value="Subtitles">Subtitles / CC</option>
              <option value="Audio Friendly">Audio Friendly</option>
              <option value="Visual">Visual &amp; Step-by-Step</option>
              <option value="Beginner Friendly">Beginner Friendly</option>
            </select>
          </div>
        </div>

        {/* Resources Cards Grid (Responsive 3-Column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLibraryResources.map((res) => (
            <div
              key={res.id}
              className={`bg-[#081a3b] border rounded-3xl overflow-hidden shadow-xl transition flex flex-col justify-between group ${
                res.isSpeciallyAbledFocused
                  ? 'border-emerald-400/40 hover:border-emerald-300 ring-1 ring-emerald-500/20'
                  : 'border-cyan-500/20 hover:border-cyan-400/50'
              }`}
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={res.thumbnailUrl}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081a3b] via-transparent to-black/30" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#081a3b]/90 backdrop-blur-xs text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                    {res.subject}
                  </div>

                  {/* Video Count */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Play className="w-3 h-3 fill-white" />
                    <span>Verified Playlist</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  {/* Focus Badge */}
                  <div>
                    {res.isSpeciallyAbledFocused ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-md mb-1.5">
                        <HeartHandshake className="w-3 h-3 text-emerald-400" />
                        <span>Designed for Specially-Abled Learners</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-blue-500/20 text-cyan-200 border border-blue-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-md mb-1.5">
                        <span>{res.resourceTypeLabel}</span>
                      </span>
                    )}

                    <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-[11px] text-cyan-400 font-semibold mt-1">{res.channel}</p>
                  </div>

                  <p className="text-xs text-blue-100 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>

                  {/* Target Audience */}
                  <div className="flex flex-wrap gap-1">
                    {res.targetAudience.map((aud, i) => (
                      <span
                        key={i}
                        className="bg-[#051124] text-blue-200 border border-blue-400/20 text-[10px] px-2 py-0.5 rounded"
                      >
                        🎯 {aud}
                      </span>
                    ))}
                  </div>

                  {/* Verified Accessibility Badges */}
                  <div className="space-y-1.5 pt-1 border-t border-blue-400/10">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Verified Features:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {res.accessibilityFeatures.map((feat, i) => (
                        <span
                          key={i}
                          className="bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Opens original YouTube Playlist in new tab */}
              <div className="p-5 pt-0">
                <a
                  href={res.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0f2b5c] hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-slate-950 text-cyan-200 font-black text-xs py-2.5 px-4 rounded-2xl border border-cyan-500/30 transition flex items-center justify-center gap-1.5 shadow-md group-hover:border-cyan-300"
                >
                  <span>Watch Playlist</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLibraryResources.length === 0 && (
          <div className="p-8 text-center bg-[#081a3b] rounded-3xl border border-blue-400/20 space-y-2">
            <p className="text-sm font-bold text-white">No verified playlists match your current filter.</p>
            <p className="text-xs text-blue-200">Try clearing the search query or selecting a different category.</p>
          </div>
        )}

        {/* Ongoing Curation Banner */}
        <div className="p-4 bg-[#081a3b] rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Quality over Quantity:</strong> Every playlist is verified for accessibility and working links. More verified inclusive STEM and vocational resources are being curated.
            </span>
          </div>
          <span className="text-cyan-300 font-mono text-[11px] shrink-0 self-end sm:self-auto">
            Saksham Accessibility Team
          </span>
        </div>
      </div>
    </div>
  );
}

